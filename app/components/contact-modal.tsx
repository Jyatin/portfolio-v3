"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MessageSquare, Send, X } from "lucide-react";

export default function ContactModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [hpField, setHpField] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Listen for custom events to open the modal
    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            setStatus("idle");
            setErrorMessage(null);
        };

        window.addEventListener("open-contact-modal", handleOpen);
        window.addEventListener("toggle-portfolio-chat", handleOpen);

        return () => {
            window.removeEventListener("open-contact-modal", handleOpen);
            window.removeEventListener("toggle-portfolio-chat", handleOpen);
        };
    }, []);

    // Handle Escape key and focus
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        // Auto-focus the name field
        const timer = setTimeout(() => {
            nameInputRef.current?.focus();
        }, 100);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
            clearTimeout(timer);
        };
    }, [isOpen]);

    const handleClose = () => {
        if (status === "submitting") return;
        setIsOpen(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // 1. Client-side Validation
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedMessage = message.trim();

        if (!trimmedName || trimmedName.length < 2) {
            setErrorMessage("Please enter your name (at least 2 characters).");
            nameInputRef.current?.focus();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (!trimmedMessage || trimmedMessage.length < 5) {
            setErrorMessage("Please write a message with at least 5 characters.");
            return;
        }

        setStatus("submitting");
        setErrorMessage(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: trimmedName,
                    email: trimmedEmail,
                    subject: subject.trim(),
                    message: trimmedMessage,
                    hp_field: hpField,
                }),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                const errorMsg =
                    data?.error ||
                    (res.status === 429
                        ? "Too many messages sent. Please wait a few minutes."
                        : "Failed to send message. Please try again.");
                setErrorMessage(errorMsg);
                setStatus("error");
                return;
            }

            setStatus("success");
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
            setHpField("");
        } catch {
            setErrorMessage("Network error. Please check your connection and try again.");
            setStatus("error");
        }
    };

    const handleReset = () => {
        setStatus("idle");
        setErrorMessage(null);
        setHpField("");
        setTimeout(() => nameInputRef.current?.focus(), 50);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity"
                onClick={handleClose}
                aria-hidden="true"
            />

            {/* Modal Card */}
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card/95 p-6 text-foreground shadow-2xl backdrop-blur-xl transition-all sm:p-8"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/70 pb-4">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/40">
                            <MessageSquare className="h-4 w-4 text-foreground/80" />
                        </span>
                        <div>
                            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                                08 / Messages
                            </span>
                            <h2
                                id="contact-modal-title"
                                className="text-lg font-black uppercase tracking-tight text-foreground sm:text-xl"
                            >
                                Send a Message
                            </h2>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-lg border border-border/60 p-1.5 text-muted-foreground transition-colors hover:border-border hover:bg-muted/50 hover:text-foreground"
                        aria-label="Close dialog"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {status === "success" ? (
                    /* Success Confirmation State */
                    <div className="py-8 text-center sm:py-10">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                            <CheckCircle2 className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                            Message Delivered
                        </h3>
                        <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground sm:text-sm">
                            Thank you for reaching out! Your message has been received and I will reply as soon as possible.
                        </p>

                        <div className="mt-8 flex justify-center gap-3">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="border border-border/80 bg-background/80 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-foreground transition-colors hover:bg-muted"
                            >
                                Send Another
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="bg-foreground px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-background transition-opacity hover:opacity-90"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Input Form */
                    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                        {/* Honeypot field (hidden from real users) */}
                        <div className="hidden" aria-hidden="true">
                            <input
                                type="text"
                                name="hp_field"
                                tabIndex={-1}
                                autoComplete="off"
                                value={hpField}
                                onChange={(e) => setHpField(e.target.value)}
                            />
                        </div>

                        {errorMessage && (
                            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs leading-relaxed text-red-300">
                                {errorMessage}
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="contact-name"
                                className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                            >
                                Name <span className="text-primary">*</span>
                            </label>
                            <input
                                id="contact-name"
                                ref={nameInputRef}
                                type="text"
                                required
                                maxLength={100}
                                disabled={status === "submitting"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="mt-1.5 w-full rounded-lg border border-border bg-background/80 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/40 focus:outline-none sm:text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="contact-email"
                                className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                            >
                                Email <span className="text-primary">*</span>
                            </label>
                            <input
                                id="contact-email"
                                type="email"
                                required
                                maxLength={255}
                                disabled={status === "submitting"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@domain.com"
                                className="mt-1.5 w-full rounded-lg border border-border bg-background/80 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/40 focus:outline-none sm:text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="contact-subject"
                                className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                            >
                                Subject <span className="text-muted-foreground/50">(optional)</span>
                            </label>
                            <input
                                id="contact-subject"
                                type="text"
                                maxLength={200}
                                disabled={status === "submitting"}
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="What is this regarding?"
                                className="mt-1.5 w-full rounded-lg border border-border bg-background/80 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/40 focus:outline-none sm:text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="contact-message"
                                className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                            >
                                Message <span className="text-primary">*</span>
                            </label>
                            <textarea
                                id="contact-message"
                                required
                                rows={4}
                                maxLength={5000}
                                disabled={status === "submitting"}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Your message..."
                                className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background/80 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/40 focus:outline-none sm:text-sm"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {status === "submitting" ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-3.5 w-3.5" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <p className="text-center font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                            Direct email: singhjyatin@gmail.com
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
