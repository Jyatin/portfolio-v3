"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ChevronDown, MessageCircle, Send, X } from "lucide-react";

type Role = "user" | "assistant";

type ChatMessage = {
    id: string;
    role: Role;
    content: string;
};

const STARTER_QUESTIONS = [
    "What's the AskPDF RAG pipeline?",
    "What have I built with MERN?",
    "Tell me about JalDrishti 2030",
    "What are my strongest full-stack skills?",
    "What am I looking for in a role?",
];

const INITIAL_MESSAGE: ChatMessage = {
    id: "intro",
    role: "assistant",
    content:
        "Ask me about my projects, experience, skills, research, or the engineering behind this portfolio. I answer from a grounded RAG knowledge base.",
};

function makeId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return Math.random().toString(36).slice(2);
}

export default function LiveChat() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showArchitecture, setShowArchitecture] = useState(false);

    const history = useMemo(
        () =>
            messages
                .filter((item) => item.id !== "intro")
                .slice(-6)
                .map(({ role, content }) => ({ role, content })),
        [messages]
    );

    async function ask(question: string) {
        const value = question.trim();
        if (!value || loading) return;

        setError(null);
        setMessage("");

        const userMessage: ChatMessage = {
            id: makeId(),
            role: "user",
            content: value,
        };
        const assistantId = makeId();

        setMessages((current) => [
            ...current,
            userMessage,
            { id: assistantId, role: "assistant", content: "" },
        ]);
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: value, history }),
            });

            if (!response.ok || !response.body) {
                const detail = await response.text();
                throw new Error(detail || "The assistant could not respond.");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { value: chunk, done } = await reader.read();
                if (done) break;

                const text = decoder.decode(chunk, { stream: true });
                if (!text) continue;

                setMessages((current) =>
                    current.map((item) =>
                        item.id === assistantId
                            ? { ...item, content: item.content + text }
                            : item
                    )
                );
            }
        } catch (requestError) {
            const text = requestError instanceof Error ? requestError.message : "Something went wrong.";
            setError(text);
            setMessages((current) => current.filter((item) => item.id !== assistantId));
        } finally {
            setLoading(false);
        }
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        void ask(message);
    }

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[99999] sm:inset-x-auto sm:right-5 sm:bottom-5">
            <div className="flex justify-end px-4 pb-4 sm:px-0 sm:pb-0">
                <div className="pointer-events-auto w-full sm:w-auto">
                    {open && (
                        <section
                            aria-label="Ask Jyatin"
                            className="mb-3 ml-auto w-[min(94vw,420px)] overflow-hidden border border-white/15 bg-[#101218]/98 text-white shadow-2xl backdrop-blur-xl"
                        >
                            <header className="flex items-start justify-between border-b border-white/10 px-4 py-4 sm:px-5">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/50">
                                            09 / Ask Jyatin
                                        </span>
                                    </div>
                                    <h2 className="mt-2 text-lg font-black uppercase tracking-tight">
                                        Portfolio intelligence
                                    </h2>
                                    <p className="mt-1 max-w-[310px] font-mono text-[8px] uppercase leading-relaxed tracking-[0.16em] text-white/35">
                                        Grounded answers from projects, experience, skills & research
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="flex h-8 w-8 shrink-0 items-center justify-center text-white/45 transition hover:text-white"
                                    aria-label="Close assistant"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </header>

                            <div className="max-h-[min(58vh,520px)] overflow-y-auto">
                                <div className="space-y-4 p-4 sm:p-5">
                                    {messages.map((item) => (
                                        <div key={item.id} className={item.role === "user" ? "pl-6" : "pr-3"}>
                                            <div className="mb-1.5 flex items-center gap-2">
                                                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                                                    {item.role === "user" ? "You" : "Jyatin / AI"}
                                                </span>
                                                {item.role === "assistant" && item.id !== "intro" && loading && !item.content && (
                                                    <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                                                )}
                                            </div>
                                            <p className="whitespace-pre-wrap text-[13px] leading-[1.65] text-white/75">
                                                {item.content || "Thinking…"}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {messages.length === 1 && !loading && (
                                    <div className="border-t border-white/10 px-4 py-4 sm:px-5">
                                        <p className="mb-3 font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
                                            Try asking
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {STARTER_QUESTIONS.map((question) => (
                                                <button
                                                    key={question}
                                                    type="button"
                                                    onClick={() => void ask(question)}
                                                    className="border border-white/10 bg-white/[0.025] px-2.5 py-2 text-left font-mono text-[8px] uppercase tracking-[0.08em] text-white/55 transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
                                                >
                                                    {question}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="border-t border-white/10 px-4 py-3 sm:px-5">
                                    <button
                                        type="button"
                                        onClick={() => setShowArchitecture((current) => !current)}
                                        className="flex w-full items-center justify-between text-left"
                                    >
                                        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/40">
                                            This runs on a RAG pipeline I built — ask it how it works
                                        </span>
                                        <ChevronDown
                                            className={`h-3.5 w-3.5 text-white/30 transition-transform ${showArchitecture ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {showArchitecture && (
                                        <div className="mt-4 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
                                            {[
                                                ["01", "Content", "Semantic chunks in /content/rag"],
                                                ["02", "Retrieve", "Query embedding → top 5 cosine matches"],
                                                ["03", "Threshold", "> 0.70 similarity before context is passed"],
                                                ["04", "Generate", "Provider-swappable streaming LLM"],
                                            ].map(([number, title, detail]) => (
                                                <div key={number} className="bg-[#101218] p-3">
                                                    <span className="font-mono text-[8px] text-white/25">{number}</span>
                                                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">{title}</p>
                                                    <p className="mt-1 text-[10px] leading-relaxed text-white/35">{detail}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-white/10 p-3 sm:p-4">
                                {error && (
                                    <p className="mb-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-rose-300/80">
                                        {error}
                                    </p>
                                )}
                                <form onSubmit={submit} className="flex gap-2">
                                    <input
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                        maxLength={1200}
                                        disabled={loading}
                                        placeholder={loading ? "Streaming response…" : "Ask about my work..."}
                                        className="min-w-0 flex-1 border border-white/10 bg-black/30 px-3 py-3 font-mono text-[10px] text-white outline-none placeholder:text-white/25 disabled:opacity-50"
                                        aria-label="Ask a question about Jyatin"
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading || !message.trim()}
                                        className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-25"
                                        aria-label="Send question"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </form>
                                <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.14em] text-white/20">
                                    No chat logs stored · 8 requests / minute / visitor
                                </p>
                            </div>
                        </section>
                    )}

                    <button
                        type="button"
                        onClick={() => setOpen((current) => !current)}
                        className="ml-auto flex h-12 items-center gap-3 border border-white/20 bg-[#101218] px-4 text-white shadow-2xl transition hover:border-white/40"
                        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
                    >
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
                            {open ? "Close" : "Ask Jyatin"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
