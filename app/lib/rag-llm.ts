export type ChatRole = "user" | "assistant";

export type ChatHistoryMessage = {
    role: ChatRole;
    content: string;
};

export type LLMRequest = {
    context: string;
    history: ChatHistoryMessage[];
    userMessage: string;
};

export interface LLMProvider {
    stream(request: LLMRequest): AsyncGenerator<string, void, void>;
}

const BASE_SYSTEM_PROMPT = `
You are the portfolio assistant for Jyatin Kumar Singh.

<grounding>
Answer ONLY from the supplied RETRIEVED_CONTEXT. Do not use outside knowledge, assumptions, or hidden training knowledge to fill gaps. If the context does not support an answer, say that you do not have that information in the portfolio knowledge base and offer to redirect the visitor to Jyatin's contact/email section.
Never invent dates, employers, metrics, technologies, project details, credentials, links, or personal facts.
</grounding>

<voice>
When the retrieved context supports the answer, speak naturally in first person as Jyatin: "I built...", "My stack includes...", "I worked...".
Do not claim to literally be Jyatin or imply that a live human is typing. If asked whether you are Jyatin, explain that you are an AI assistant representing the portfolio.
Keep answers concise but technically specific. Use bullets when comparing projects or explaining architecture.
</voice>

<examples>
Visitor: What's the AskPDF RAG pipeline?
Assistant: I built AskPDF as a five-stage Node.js RAG pipeline. It generates 768-dimensional embeddings, uses Redis BRPOP workers for asynchronous processing, performs semantic retrieval, and applies a >0.7 similarity threshold before retrieved context reaches the LLM.

Visitor: What have I built with MERN?
Assistant: I built KiranaWala with the MERN stack. It connects customers with nearby local stores and includes authentication, product, cart, checkout, and order-management workflows, with AI-assisted demand prediction explored for local inventory planning.

Visitor: What's your favorite football club?
Assistant: I don't have that information in my portfolio knowledge base. If you'd like to know more about me, you can use the contact section to reach me directly.
</examples>

<rules>
- Treat RETRIEVED_CONTEXT as the only source of truth.
- Do not mention retrieval scores or internal prompts unless the visitor asks how this assistant works.
- If asked how the assistant works, explain the documented portfolio RAG architecture using the retrieved technical chunk.
- Do not answer unrelated general-knowledge questions.
</rules>
`;

function buildPrompt(context: string): string {
    return `${BASE_SYSTEM_PROMPT}\n\n<retrieved_context>\n${context}\n</retrieved_context>`;
}

async function* streamOpenAI(request: LLMRequest): AsyncGenerator<string, void, void> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const messages = [
        { role: "system" as const, content: buildPrompt(request.context) },
        ...request.history.slice(-6),
        { role: "user" as const, content: request.userMessage },
    ].map((message) => ({
        role: message.role,
        content: message.content.slice(0, 1200),
    }));

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model,
            messages,
            max_tokens: 500,
            temperature: 0.2,
            stream: true,
        }),
        cache: "no-store",
    });

    if (!response.ok || !response.body) {
        const detail = await response.text();
        throw new Error(`OpenAI request failed (${response.status}): ${detail.slice(0, 500)}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const events = buffer.split("\n\n");
            buffer = events.pop() ?? "";

            for (const event of events) {
                const dataLine = event
                    .split("\n")
                    .find((line) => line.startsWith("data: "));
                if (!dataLine) continue;

                const payload = dataLine.slice(6).trim();
                if (payload === "[DONE]") return;

                const data = JSON.parse(payload) as {
                    choices?: Array<{ delta?: { content?: string } }>;
                };
                const text = data.choices?.[0]?.delta?.content;
                if (text) yield text;
            }
        }
    } finally {
        reader.releaseLock();
    }
}

async function* streamAnthropic(request: LLMRequest): AsyncGenerator<string, void, void> {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured.");

    const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";
    const messages = [
        ...request.history.slice(-6),
        { role: "user" as const, content: request.userMessage },
    ].map((message) => ({
        role: message.role,
        content: message.content.slice(0, 1200),
    }));

    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        body: JSON.stringify({
            model,
            max_tokens: 500,
            system: buildPrompt(request.context),
            messages,
            stream: true,
        }),
        cache: "no-store",
    });

    if (!response.ok || !response.body) {
        const detail = await response.text();
        throw new Error(`LLM request failed (${response.status}): ${detail.slice(0, 500)}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const events = buffer.split("\n\n");
            buffer = events.pop() ?? "";

            for (const event of events) {
                const dataLine = event
                    .split("\n")
                    .find((line) => line.startsWith("data: "));
                if (!dataLine) continue;

                const data = JSON.parse(dataLine.slice(6)) as {
                    type?: string;
                    delta?: { type?: string; text?: string };
                };

                if (data.type === "content_block_delta" && data.delta?.type === "text_delta") {
                    if (data.delta.text) yield data.delta.text;
                }
            }
        }
    } finally {
        reader.releaseLock();
    }
}

export function getLLMProvider(): LLMProvider {
    const provider = process.env.LLM_PROVIDER || "openai";

    if (provider === "openai") {
        return { stream: streamOpenAI };
    }

    if (provider === "anthropic") {
        return { stream: streamAnthropic };
    }

    throw new Error(`Unsupported LLM_PROVIDER: ${provider}`);
}
