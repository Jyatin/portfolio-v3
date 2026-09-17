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
        if (existing && /^Guest-\d{4}$/.test(existing)) return existing;
        const name = `Guest-${Math.floor(1000 + Math.random() * 9000)}`;
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
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setGuestName(getGuestName());
    }, []);

    useEffect(() => {
        const supabase = getSupabaseBrowserClient();

        if (!supabase) {
            setConnectionError("Supabase environment variables are missing.");
            return;
        }

        const guest = getGuestName();
        const randomId =
            typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
                ? crypto.randomUUID()
                : Math.random().toString(36).slice(2);
        const presenceKey = `${guest}-${randomId}`;
        const channel = supabase.channel(CHANNEL_NAME, {
            config: { presence: { key: presenceKey } },
        });

        const updatePresenceCount = () => {
            setActiveUsers(Math.max(1, Object.keys(channel.presenceState()).length));
        };

        channel
            .on("presence", { event: "sync" }, updatePresenceCount)
            .on("presence", { event: "join" }, updatePresenceCount)
            .on("presence", { event: "leave" }, updatePresenceCount)
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "chat_messages" },
                (payload) => {
                    const incoming = payload.new as ChatMessage;
                    setMessages((current) =>
                        current.some((item) => item.id === incoming.id)
                            ? current
                            : [...current, incoming].slice(-50)
                    );
                }
            )
            .subscribe(async (status) => {
                if (status === "SUBSCRIBED") {
                    setConnected(true);
                    setConnectionError(null);
                    await channel.track({
                        guest_name: guest,
                        online_at: new Date().toISOString(),
                    });
                    updatePresenceCount();
                    return;
                }

                if (status === "CHANNEL_ERROR") {
                    setConnected(false);
                    setConnectionError("Realtime connection failed. Check Supabase Realtime and the chat migration.");
                    return;
                }

                if (status === "TIMED_OUT") {
                    setConnected(false);
                    setConnectionError("Realtime connection timed out. Please refresh the page.");
                    return;
                }

                if (status === "CLOSED") {
                    setConnected(false);
                }
            });

        void (async () => {
            const { data, error } = await supabase
                .from("chat_messages")
                .select("id, guest_id, guest_name, message, created_at")
                .order("created_at", { ascending: false })
                .limit(50);

            if (error) {
                setConnectionError("Chat database is not ready. Run the live-chat Supabase migration.");
                return;
            }

            if (data) setMessages([...(data as ChatMessage[])].reverse());
        })();

        return () => {
            setConnected(false);
            void supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages, open]);

    async function sendMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const value = message.trim();
        if (!value || sending) return;

        const supabase = getSupabaseBrowserClient();
        if (!supabase) {
            setConnectionError("Supabase environment variables are missing.");
            return;
        }

        setSending(true);
        const guest = getGuestName();
        const { error } = await supabase.from("chat_messages").insert({
            guest_id: guest,
            guest_name: guest,
            message: value.slice(0, 500),
        });

        if (error) {
            setConnectionError(`Message could not be sent: ${error.message}`);
        } else {
            setMessage("");
            setConnectionError(null);
        }

        setSending(false);
    }

    return (
        <div className="fixed inset-x-0 bottom-0 z-[99999] pointer-events-none sm:inset-x-auto sm:right-5 sm:bottom-5">
            <div className="flex justify-end px-4 pb-4 sm:px-0 sm:pb-0">
                <div className="pointer-events-auto">
                    {open && (
                        <div className="mb-3 w-[min(92vw,380px)] overflow-hidden border border-white/15 bg-[#101218]/98 text-white shadow-2xl backdrop-blur-xl">
                            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em]"># general</span>
                                        <span className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-emerald-400" : "bg-amber-400"}`} />
                                    </div>
                                    <div className="mt-1 flex items-center gap-1.5 text-white/45">
                                        <UsersRound className="h-3 w-3" />
                                        <span className="font-mono text-[9px] uppercase tracking-[0.16em]">{activeUsers} active users</span>
                                    </div>
                                </div>
                                <button type="button" onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center text-white/50 hover:text-white" aria-label="Close chat">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div ref={messagesRef} className="h-[300px] space-y-4 overflow-y-auto p-4">
                                {messages.length === 0 ? (
                                    <div className="flex h-full items-center justify-center text-center">
                                        <p className="max-w-[260px] font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-white/35">
                                            {connectionError ?? "Start the conversation."}
                                        </p>
                                    </div>
                                ) : (
                                    messages.map((item) => (
                                        <div key={item.id}>
                                            <div className="mb-1 flex items-center gap-2">
                                                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/70">{item.guest_name}</span>
                                                <span className="font-mono text-[8px] text-white/25">
                                                    {new Date(item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                </span>
                                            </div>
                                            <p className="text-sm leading-relaxed text-white/75">{item.message}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="border-t border-white/10 px-4 py-3">
                                <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
                                    {connectionError ? connectionError : `You are chatting as ${guestName}`}
                                </p>
                                <form onSubmit={sendMessage} className="flex gap-2">
                                    <input
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                        maxLength={500}
                                        disabled={!connected}
                                        placeholder={connected ? "Write a message..." : "Connecting..."}
                                        className="min-w-0 flex-1 border border-white/10 bg-black/30 px-3 py-2.5 font-mono text-[10px] text-white outline-none placeholder:text-white/25 disabled:opacity-50"
                                    />
                                    <button type="submit" disabled={!connected || !message.trim() || sending} className="flex h-10 w-10 shrink-0 items-center justify-center bg-white text-black disabled:opacity-30" aria-label="Send message">
                                        <Send className="h-4 w-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    <button type="button" onClick={() => setOpen((value) => !value)} className="flex h-12 items-center gap-3 border border-white/20 bg-[#101218] px-4 text-white shadow-2xl transition hover:border-white/40" aria-label={open ? "Close chat" : "Open chat"}>
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em]">{open ? "Close" : "Live Chat"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
