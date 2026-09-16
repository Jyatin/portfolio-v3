"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, Send, UsersRound, X } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser-client";

type ChatMessage = {
    id: string;
    guest_id: string;
    guest_name: string;
    message: string;
    created_at: string;
};

const GUEST_STORAGE_KEY = "portfolio-chat-guest";
const CHANNEL_NAME = "portfolio-live-chat";

function getGuestName() {
    try {
        const existing = sessionStorage.getItem(GUEST_STORAGE_KEY);

        if (existing && /^Guest-\d{4}$/.test(existing)) {
            return existing;
        }

        const suffix = Math.floor(1000 + Math.random() * 9000);
        const name = `Guest-${suffix}`;
        sessionStorage.setItem(GUEST_STORAGE_KEY, name);
        return name;
    } catch {
        return `Guest-${Math.floor(1000 + Math.random() * 9000)}`;
    }
}

export default function LiveChat() {
    const [open, setOpen] = useState(false);
    const [guestName, setGuestName] = useState("Guest-0000");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [activeUsers, setActiveUsers] = useState(1);
    const [connected, setConnected] = useState(false);
    const [sending, setSending] = useState(false);

    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setGuestName(getGuestName());
    }, []);

    useEffect(() => {
        const supabase = getSupabaseBrowserClient();

        if (!supabase) {
            return;
        }

        const guest = getGuestName();
        const presenceKey = `${guest}-${crypto.randomUUID()}`;

        const channel = supabase.channel(CHANNEL_NAME, {
            config: {
                presence: {
                    key: presenceKey,
                },
            },
        });

        const updatePresenceCount = () => {
            const state = channel.presenceState();
            setActiveUsers(Math.max(1, Object.keys(state).length));
        };

        channel
            .on("presence", { event: "sync" }, updatePresenceCount)
            .on("presence", { event: "join" }, updatePresenceCount)
            .on("presence", { event: "leave" }, updatePresenceCount)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "chat_messages",
                },
                (payload) => {
                    const incoming = payload.new as ChatMessage;

                    setMessages((current) => {
                        if (current.some((item) => item.id === incoming.id)) {
                            return current;
                        }

                        return [...current, incoming].slice(-50);
                    });
                }
            )
            .subscribe(async (status) => {
                if (status === "SUBSCRIBED") {
                    setConnected(true);

                    await channel.track({
                        guest_name: guest,
                        online_at: new Date().toISOString(),
                    });

                    updatePresenceCount();
                }
            });

        const loadMessages = async () => {
            const { data } = await supabase
                .from("chat_messages")
                .select("id, guest_id, guest_name, message, created_at")
                .order("created_at", { ascending: false })
                .limit(50);

            if (data) {
                setMessages([...(data as ChatMessage[])].reverse());
            }
        };

        void loadMessages();

        return () => {
            setConnected(false);
            void supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        const container = messagesRef.current;

        if (!container) return;

        container.scrollTop = container.scrollHeight;
    }, [messages, open]);

    async function sendMessage() {
        const value = message.trim();

        if (!value || sending) return;

        const supabase = getSupabaseBrowserClient();

        if (!supabase) return;

        setSending(true);

        const guest = getGuestName();

        const { error } = await supabase.from("chat_messages").insert({
            guest_id: guest,
            guest_name: guest,
            message: value.slice(0, 500),
        });

        if (!error) {
            setMessage("");
        }

        setSending(false);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        void sendMessage();
    }

    return (
        <div className="fixed bottom-5 right-5 z-[80] sm:bottom-7 sm:right-7">
            {open && (
                <div className="mb-3 w-[min(92vw,380px)] overflow-hidden border border-border bg-background/95 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                                    # general
                                </span>
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            </div>

                            <div className="mt-1 flex items-center gap-1.5 text-foreground/45">
                                <UsersRound className="h-3 w-3" />
                                <span className="font-mono text-[9px] uppercase tracking-[0.16em]">
                                    {activeUsers} active users
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="flex h-8 w-8 items-center justify-center text-foreground/50 transition-colors hover:text-foreground"
                            aria-label="Close chat"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div
                        ref={messagesRef}
                        className="h-[300px] space-y-4 overflow-y-auto p-4"
                    >
                        {messages.length === 0 ? (
                            <div className="flex h-full items-center justify-center text-center">
                                <p className="max-w-[230px] font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-foreground/35">
                                    Start the conversation.
                                </p>
                            </div>
                        ) : (
                            messages.map((item) => (
                                <div key={item.id}>
                                    <div className="mb-1 flex items-center gap-2">
                                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/70">
                                            {item.guest_name}
                                        </span>
                                        <span className="font-mono text-[8px] text-foreground/25">
                                            {new Date(item.created_at).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>

                                    <p className="text-sm leading-relaxed text-foreground/70">
                                        {item.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="border-t border-border px-4 py-3">
                        <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/35">
                            You are chatting as {guestName}
                        </p>

                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                maxLength={500}
                                disabled={!connected}
                                placeholder={connected ? "Write a message..." : "Connecting..."}
                                className="min-w-0 flex-1 border border-border bg-muted/20 px-3 py-2.5 font-mono text-[10px] outline-none placeholder:text-foreground/25 focus:border-foreground/30"
                            />

                            <button
                                type="submit"
                                disabled={!connected || !message.trim() || sending}
                                className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-foreground text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                                aria-label="Send message"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="group flex h-12 items-center gap-3 border border-border bg-background/90 px-4 text-foreground shadow-xl backdrop-blur-xl transition-all hover:border-foreground/40"
                aria-label={open ? "Close chat" : "Open chat"}
            >
                <MessageCircle className="h-5 w-5" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
                    {open ? "Close" : "Live Chat"}
                </span>
            </button>
        </div>
    );
}
