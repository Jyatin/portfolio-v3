"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Download,
    ExternalLink,
    FileText,
    Copy,
    Check,
    Printer,
    Github,
    Linkedin,
    Mail,
} from "lucide-react";

const RESUME_URL = "/jyatin_resume%20(11).pdf";
const EMAIL = "singhjyatin@gmail.com";
const GITHUB_URL = "https://github.com/Jyatin";
const LINKEDIN_URL = "https://www.linkedin.com/in/jyatinsingh/";

export default function ResumePage() {
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    const handlePrint = () => {
        window.open(RESUME_URL, "_blank");
    };

    return (
        <main className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
            {/* Subtle atmospheric ambient background accents matching portfolio aesthetic */}
            <div
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.06),transparent_70%)]"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.015] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
                aria-hidden
            />

            <div className="mx-auto w-full max-w-[1240px] px-4 pb-20 pt-24 sm:px-6 md:px-10 lg:pt-28">
                {/* Top Navigation & Breadcrumb Bar */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/50 transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                        <span>Portfolio Home</span>
                    </Link>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={handleCopyEmail}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/70 transition-all hover:border-foreground/40 hover:text-foreground"
                            title="Copy email to clipboard"
                        >
                            {copiedEmail ? (
                                <>
                                    <Check className="h-3 w-3 text-emerald-500" />
                                    <span>Copied</span>
                                </>
                            ) : (
                                <>
                                    <Mail className="h-3 w-3 text-foreground/40" />
                                    <span>Copy Email</span>
                                </>
                            )}
                        </button>

                        <a
                            href={RESUME_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/70 transition-all hover:border-foreground/40 hover:text-foreground"
                        >
                            <ExternalLink className="h-3 w-3 text-foreground/40" />
                            <span>Open Tab</span>
                        </a>

                        <a
                            href={RESUME_URL}
                            download="Jyatin_Kumar_Singh_Resume.pdf"
                            className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-85 shadow-sm"
                        >
                            <Download className="h-3.5 w-3.5" />
                            <span>Download PDF</span>
                        </a>
                    </div>
                </div>

                {/* Section Header with Horizontal Rule */}
                <div className="mb-6">
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/50 sm:text-xs">
                            03 / Resume
                        </span>
                        <span className="h-px flex-1 bg-border/80" aria-hidden />
                        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40 sm:block">
                            Updated 2026
                        </span>
                    </div>

                    <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-3xl font-black uppercase tracking-tight text-foreground sm:text-4xl md:text-5xl">
                                Curriculum Vitae
                            </h1>
                            <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-foreground/60 sm:text-sm">
                                Jyatin Kumar Singh · Software Development Engineer
                            </p>
                        </div>

                        {/* Availability Badge */}
                        <div className="flex items-center gap-2 rounded-full border border-border/80 bg-muted/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Open for Roles & Internships</span>
                        </div>
                    </div>
                </div>

                {/* Document Viewer Frame */}
                <div className="overflow-hidden rounded-xl border border-border bg-card/40 shadow-2xl shadow-black/40 backdrop-blur-sm">
                    {/* Frame Top Bar */}
                    <div className="flex items-center justify-between border-b border-border/80 bg-muted/40 px-4 py-2.5 sm:px-6">
                        <div className="flex items-center gap-2">
                            {/* Window dots */}
                            <div className="flex items-center gap-1.5 pr-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                                <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                            </div>
                            <div className="hidden h-3 w-px bg-border/80 sm:block" />
                            <div className="flex items-center gap-1.5 text-foreground/70">
                                <FileText className="h-3.5 w-3.5 text-foreground/40" />
                                <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/75">
                                    Jyatin_Kumar_Singh_Resume.pdf
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40 md:inline-block">
                                PDF Document · Standard A4
                            </span>
                            <a
                                href={RESUME_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-foreground/60 transition-colors hover:text-foreground"
                            >
                                <span>Fullscreen</span>
                                <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                        </div>
                    </div>

                    {/* PDF Document Embed Container */}
                    <div className="relative w-full bg-neutral-900/40">
                        <iframe
                            src={`${RESUME_URL}#toolbar=1&navpanes=0&view=FitH`}
                            title="Jyatin Kumar Singh Resume"
                            loading="lazy"
                            className="h-[calc(100vh-240px)] min-h-[740px] w-full border-none bg-white"
                        />
                    </div>
                </div>

                {/* Mobile Fallback Card */}
                <div className="mt-4 block sm:hidden rounded-lg border border-border/80 bg-muted/20 p-4 text-xs text-foreground/70">
                    <p className="font-medium text-foreground">Viewing on mobile?</p>
                    <p className="mt-1 text-foreground/60">
                        Mobile browsers occasionally restrict scrolling inside embedded PDF frames. You can download or open the full PDF directly:
                    </p>
                    <div className="mt-3 flex gap-2">
                        <a
                            href={RESUME_URL}
                            download="Jyatin_Kumar_Singh_Resume.pdf"
                            className="inline-flex items-center gap-1.5 rounded-full border border-foreground bg-foreground px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-background"
                        >
                            <Download className="h-3 w-3" />
                            Download
                        </a>
                        <a
                            href={RESUME_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground"
                        >
                            <ExternalLink className="h-3 w-3" />
                            Open Direct
                        </a>
                    </div>
                </div>

                {/* Footer Metadata & Social Links */}
                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/40 text-center sm:text-left">
                        Full original resume · View online or download original PDF
                    </p>

                    <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                        >
                            <Github className="h-3 w-3" />
                            <span>GitHub</span>
                        </a>
                        <span>·</span>
                        <a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                        >
                            <Linkedin className="h-3 w-3" />
                            <span>LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
