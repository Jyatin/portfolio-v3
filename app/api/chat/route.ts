import { embedQuery, retrieve } from "@/app/lib/rag";
import { enforceRagRateLimit, RAG_RATE_LIMIT } from "@/app/lib/rag-rate-limit";
import { getLLMProvider, type ChatHistoryMessage } from "@/app/lib/rag-llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY_MESSAGES = 6;
const MAX_HISTORY_MESSAGE_LENGTH = 1200;

function jsonError(message: string, status: number) {
    return Response.json({ error: message }, { status });
}

function cleanHistory(value: unknown): ChatHistoryMessage[] {
    if (!Array.isArray(value)) return [];

    return value
        .filter(
            (item): item is { role: "user" | "assistant"; content: string } =>
                typeof item === "object" &&
                item !== null &&
                ((item as { role?: unknown }).role === "user" ||
                    (item as { role?: unknown }).role === "assistant") &&
                typeof (item as { content?: unknown }).content === "string"
        )
        .slice(-MAX_HISTORY_MESSAGES)
        .map((item) => ({
            role: item.role,
            content: item.content.trim().slice(0, MAX_HISTORY_MESSAGE_LENGTH),
        }))
        .filter((item) => item.content.length > 0);
}

function streamText(text: string): ReadableStream<Uint8Array> {
    const encoder = new TextEncoder();
    return new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode(text));
            controller.close();
        },
    });
}

export async function POST(request: Request) {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 20_000) {
        return jsonError("Request is too large.", 413);
    }

    const allowed = await enforceRagRateLimit(request);
    if (!allowed) {
        return new Response("Too many requests. Please try again in a minute.", {
            status: 429,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Retry-After": String(RAG_RATE_LIMIT.windowSeconds),
            },
        });
    }

    let body: { message?: unknown; history?: unknown };
    try {
        body = (await request.json()) as { message?: unknown; history?: unknown };
    } catch {
        return jsonError("Invalid JSON body.", 400);
    }

    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message) return jsonError("Message is required.", 400);
    if (message.length > MAX_MESSAGE_LENGTH) {
        return jsonError(`Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`, 413);
    }

    const history = cleanHistory(body.history);

    try {
        // Stage 1: embed the visitor's question.
        const queryEmbedding = await embedQuery(message);

        // Stage 2: retrieve the top semantic matches and enforce the 0.70 floor.
        const matches = await retrieve(queryEmbedding);

        if (matches.length === 0) {
            return new Response(
                streamText(
                    "I don't have that information in my portfolio knowledge base. If you'd like to know something beyond the portfolio, please use the contact section to reach me directly."
                ),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "text/plain; charset=utf-8",
                        "Cache-Control": "no-store",
                        "X-RAG-Retrieved": "0",
                    },
                }
            );
        }

        // Stage 3: only the grounded chunks cross the generation boundary.
        const context = matches
            .map(
                ({ chunk }) =>
                    `<source type="${chunk.type}" title="${chunk.title}">\n${chunk.content}\n</source>`
            )
            .join("\n\n");

        // Stage 4/5: generate and stream a first-person answer from the grounded context.
        const provider = getLLMProvider();
        const generator = provider.stream({
            context,
            history,
            userMessage: message,
        });

        const encoder = new TextEncoder();
        const stream = new ReadableStream<Uint8Array>({
            async start(controller) {
                try {
                    for await (const token of generator) {
                        controller.enqueue(encoder.encode(token));
                    }
                    controller.close();
                } catch (error) {
                    console.error("RAG generation error", error);
                    controller.enqueue(
                        encoder.encode(
                            "\n\nI ran into an issue generating that answer. Please try again or use the contact section to reach me directly."
                        )
                    );
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            status: 200,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-store, no-cache",
                "X-Content-Type-Options": "nosniff",
                "X-RAG-Retrieved": String(matches.length),
            },
        });
    } catch (error) {
        console.error("Portfolio RAG error", error);
        return jsonError("The portfolio assistant is temporarily unavailable.", 500);
    }
}
