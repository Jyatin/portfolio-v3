"use client";

import { ArrowRight } from "lucide-react";

const chatGptPrompt = encodeURIComponent(
    "Tell me about Jyatin Kumar Singh based on his portfolio, including his projects, experience, open-source contributions, skills, research, and engineering interests."
);

export default function AssistantLinks() {
    return (
        <section
            id="ask-an-assistant"
            aria-label="Ask ChatGPT or Claude about Jyatin"
            className="relative z-30 block w-full border-y border-black/10 bg-[#f5f1e8] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-20 xl:px-24"
            style={{ scrollMarginTop: "80px" }}
        >
            <div className="mx-auto max-w-[1920px]">
                <div className="mb-8 max-w-2xl">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/55">
                        Ask about me
                    </p>
                    <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-foreground">
                        Talk to an AI
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/60 sm:text-lg">
                        Ask ChatGPT or Claude about my projects, engineering experience, open-source work, skills, and research.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                        href={`https://chatgpt.com/?q=${chatGptPrompt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-14 items-center justify-between gap-8 rounded-full border border-black/15 bg-white/70 px-5 py-3.5 text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-black/30 hover:bg-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] sm:min-w-[270px]"
                    >
                        <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 font-sans text-sm font-medium">
                                ◉
                            </span>
                            <span className="text-sm font-medium tracking-tight">Talk to ChatGPT about me</span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>

                    <a
                        href="https://claude.ai/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-14 items-center justify-between gap-8 rounded-full border border-black/15 bg-white/70 px-5 py-3.5 text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-black/30 hover:bg-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] sm:min-w-[270px]"
                    >
                        <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 font-serif text-xs font-semibold italic">
                                IA
                            </span>
                            <span className="text-sm font-medium tracking-tight">Talk to Claude about me</span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
}
