"use client";

import { ArrowUpRight } from "lucide-react";

export default function AssistantLinks() {
    return (
        <section
            id="ask-an-assistant"
            aria-label="Ask an assistant about Jyatin"
            className="relative z-10 w-full border-y border-black/10 bg-[#f5f1e8] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-20 xl:px-24"
        >
            <div className="mx-auto max-w-[1920px]">
                <div className="mb-7 flex items-center gap-3">
                    <span className="h-px w-8 bg-black/25" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/55">
                        Or ask an assistant
                    </p>
                </div>

                <div className="grid max-w-3xl gap-3 sm:grid-cols-2">
                    <a
                        href="https://chatgpt.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-h-16 items-center justify-between rounded-2xl border border-black/15 bg-white/40 px-5 py-4 text-foreground/75 transition-all duration-300 hover:-translate-y-1 hover:border-black/30 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
                    >
                        <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 font-mono text-xs font-semibold">◉</span>
                            <span className="text-sm">talk to chatgpt about me</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>

                    <a
                        href="https://claude.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-h-16 items-center justify-between rounded-2xl border border-black/15 bg-white/40 px-5 py-4 text-foreground/75 transition-all duration-300 hover:-translate-y-1 hover:border-black/30 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
                    >
                        <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 font-mono text-xs font-semibold">IA</span>
                            <span className="text-sm">talk to claude about me</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
