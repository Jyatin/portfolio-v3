"use client";

import { useCallback, useEffect, useState } from "react";
import { LockKeyhole, MessageCircle, RefreshCw } from "lucide-react";

type ChatMessage = {
    id: string;
    guest_id: string;
    guest_name: string;
    message: string;
    country_code: string | null;
    created_at: string;
};

const TOKEN_STORAGE_KEY = "portfolio-chat-admin-token";

export default function MessagesPage() {
    const [token, setToken] = useState("");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadMessages = useCallback(async (adminToken: string) => {
        if (!adminToken) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/chat/messages", {
                cache: "no-store",
                headers: { "x-chat-admin-token": adminToken },
            });

            if (response.status === 401) {
                sessionStorage.removeItem(TOKEN_STORAGE_KEY);
                setToken("");
                setError("Invalid owner access token.");
                return;
            }

            const body = (await response.json()) as {
                messages?: ChatMessage[];
                error?: string;
            };

            if (!response.ok) {
                setError(body.error ?? "Could not load messages.");
                return;
            }

            setMessages(body.messages ?? []);
        } catch {
            setError("Could not connect to the chat inbox.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const savedToken = sessionStorage.getItem(TOKEN_STORAGE_KEY) ?? "";
        if (!savedToken) return;

        setToken(savedToken);
        void loadMessages(savedToken);
    }, [loadMessages]);

    useEffect(() => {
        if (!token) return;

        const interval = window.setInterval(() => {
            void loadMessages(token);
        }, 5000);

        return () => window.clearInterval(interval);
    }, [token, loadMessages]);

    function unlock(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const nextToken = input.trim();
        if (!nextToken) return;

        sessionStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
        setToken(nextToken);
        setInput("");
        void loadMessages(nextToken);
    }

    if (!token) {
        return (
            <main className="min-h-screen bg-black px-5 py-16 text-white">
                <div className="mx-auto max-w-md border border-white/10 bg-[#101218] p-7">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center border border-white/15">
                        <LockKeyhole className="h-4 w-4" />
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                        Owner inbox
                    </p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight">Portfolio messages</h1>
                    <p className="mt-3 text-sm leading-relaxed text-white/45">
                        Enter the private owner token configured in Vercel. This page is not linked from the public portfolio.
                    </p>

                    <form onSubmit={unlock} className="mt-7 flex gap-2">
                        <input
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            type="password"
                            autoComplete="off"
                            placeholder="Owner token"
                            className="min-w-0 flex-1 border border-white/10 bg-black/40 px-3 py-3 font-mono text-xs text-white outline-none placeholder:text-white/25"
                        />
                        <button className="bg-white px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-black">
                            Open
                        </button>
                    </form>

                    {error && <p className="mt-4 font-mono text-[10px] text-red-300">{error}</p>}
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black px-5 py-10 text-white sm:px-8">
            <div className="mx-auto max-w-4xl">
                <header className="flex items-end justify-between border-b border-white/10 pb-5">
                    <div>
                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Owner inbox</p>
                        </div>
                        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Visitor messages</h1>
                        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
                            Auto-refreshes every 5 seconds
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => void loadMessages(token)}
                        disabled={loading}
                        className="flex h-10 items-center gap-2 border border-white/15 px-4 font-mono text-[9px] uppercase tracking-[0.14em] text-white/70 hover:border-white/30 disabled:opacity-40"
                    >
                        <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                </header>

                {error && <p className="mt-5 border border-red-300/20 bg-red-300/5 p-3 font-mono text-[10px] text-red-200">{error}</p>}

                <section className="mt-6 space-y-2">
                    {messages.length === 0 ? (
                        <div className="border border-white/10 p-10 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
                            No messages yet.
                        </div>
                    ) : (
                        messages.map((item) => (
                            <article key={item.id} className="border border-white/10 bg-[#101218] p-5">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/75">
                                            {item.guest_name}
                                        </span>
                                        {item.country_code && (
                                            <span className="font-mono text-[9px] uppercase text-white/30">{item.country_code}</span>
                                        )}
                                    </div>
                                    <time className="font-mono text-[9px] text-white/30">
                                        {new Date(item.created_at).toLocaleString()}
                                    </time>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-white/75">{item.message}</p>
                            </article>
                        ))
                    )}
                </section>
            </div>
        </main>
    );
}
