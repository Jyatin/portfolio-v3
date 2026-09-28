import { ArrowRight, Bot, Sparkles } from "lucide-react";

const chatGptPrompt = encodeURIComponent(
    "Tell me about Jyatin Kumar Singh based on his portfolio, including his projects, experience, open-source contributions, skills, research, and engineering interests."
);

export default function AssistantLinks() {
    return (
        <section
            id="ask-an-assistant"
            aria-label="Ask an assistant about Jyatin"
            className="relative z-20 w-full overflow-hidden border-t border-black/10 bg-[#f5f1e8] px-5 py-14 text-[#151515] sm:px-8 sm:py-16 md:px-12 lg:px-20 xl:px-24"
            style={{ scrollMarginTop: "80px" }}
        >
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-black/[0.035] blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden="true" style={{ backgroundImage: "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
            <div className="relative mx-auto max-w-[1920px]">
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-black/45"><Sparkles className="h-3 w-3" /> 09 / Ask an assistant</div>
                        <h2 className="max-w-xl text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-[0.88] tracking-[-0.045em]">Curious about<br />my work?</h2>
                    </div>
                    <p className="max-w-xs font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-black/50 sm:text-right">Use an AI assistant to explore my projects, experience, engineering interests, and open-source work.</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <a
                        href={`https://chatgpt.com/?q=${chatGptPrompt}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex min-h-32 flex-col justify-between overflow-hidden rounded-2xl border border-black/15 bg-white/55 p-5 text-black/75 transition-all duration-300 hover:-translate-y-1 hover:border-black/30 hover:bg-white hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]"
                    >
                        <div className="flex items-start justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-black/[0.025]"><Bot className="h-4 w-4" /></span><ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
                        <div><p className="font-mono text-[8px] uppercase tracking-[0.25em] text-black/40">AI assistant / 01</p><p className="mt-1 text-base font-medium tracking-tight text-black/80">Talk to ChatGPT about me</p></div>
                    </a>
                    <a
                        href="https://claude.ai/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex min-h-32 flex-col justify-between overflow-hidden rounded-2xl border border-black/15 bg-white/55 p-5 text-black/75 transition-all duration-300 hover:-translate-y-1 hover:border-black/30 hover:bg-white hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]"
                    >
                        <div className="flex items-start justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-black/[0.025] font-serif text-xs font-semibold italic">IA</span><ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
                        <div><p className="font-mono text-[8px] uppercase tracking-[0.25em] text-black/40">AI assistant / 02</p><p className="mt-1 text-base font-medium tracking-tight text-black/80">Talk to Claude about me</p></div>
                    </a>
                </div>
            </div>
        </section>
    );
}
