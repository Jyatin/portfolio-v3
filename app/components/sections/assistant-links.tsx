import { ArrowRight } from "lucide-react";

const chatGptPrompt = encodeURIComponent(
    "Tell me about Jyatin Kumar Singh based on his portfolio, including his projects, experience, open-source contributions, skills, research, and engineering interests."
);

export default function AssistantLinks() {
    return (
        <section
            id="ask-an-assistant"
            aria-label="Ask an assistant about Jyatin"
            className="relative z-20 w-full border-t border-black/10 bg-[#f5f1e8] px-5 py-14 sm:px-8 sm:py-16 md:px-12 lg:px-20 xl:px-24"
            style={{ scrollMarginTop: "80px" }}
        >
            <div className="mx-auto max-w-[1920px]">
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/55">
                    Or ask an assistant
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                        href={`https://chatgpt.com/?q=${chatGptPrompt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-14 items-center justify-between gap-8 rounded-full border border-black/15 bg-white/45 px-5 py-3.5 text-foreground/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/30 hover:bg-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)] sm:min-w-[255px]"
                    >
                        <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 font-sans text-sm font-medium">◉</span>
                            <span className="text-sm tracking-tight">talk to ChatGPT about me</span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <a
                        href="https://claude.ai/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-14 items-center justify-between gap-8 rounded-full border border-black/15 bg-white/45 px-5 py-3.5 text-foreground/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/30 hover:bg-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)] sm:min-w-[255px]"
                    >
                        <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 font-serif text-xs font-semibold italic">IA</span>
                            <span className="text-sm tracking-tight">talk to Claude about me</span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
}
