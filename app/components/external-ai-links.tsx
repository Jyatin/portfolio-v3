"use client";

const BASE_PROMPT = `Tell me about Jyatin Kumar Singh based on his portfolio, including his projects, experience, open-source contributions, skills, research, and engineering interests. Use his portfolio as the primary context and distinguish documented facts from anything not stated. Portfolio URL: `;

function openWithPrompt(provider: "chatgpt" | "claude") {
    const portfolioUrl = `${window.location.origin}/`;
    const prompt = `${BASE_PROMPT}${portfolioUrl}`;
    const encoded = encodeURIComponent(prompt);
    const url = provider === "chatgpt"
        ? `https://chatgpt.com/?q=${encoded}`
        : `https://claude.ai/new?prompt=${encoded}`;

    window.open(url, "_blank", "noopener,noreferrer");
}

export default function ExternalAILinks(): React.JSX.Element {
    return (
        <div className="fixed left-0 top-6 z-[9998] hidden items-center gap-1 sm:flex">
            <button
                type="button"
                onClick={() => openWithPrompt("chatgpt")}
                className="border border-white/15 bg-[#08090d]/95 px-5 py-4 font-mono text-[10px] font-semibold tracking-[0.12em] text-white/85 shadow-xl backdrop-blur-md transition-colors hover:border-white/30 hover:bg-[#101218] hover:text-white"
            >
                Talk to ChatGPT about me
            </button>
            <button
                type="button"
                onClick={() => openWithPrompt("claude")}
                className="border border-white/15 bg-[#08090d]/95 px-5 py-4 font-mono text-[10px] font-semibold tracking-[0.12em] text-white/85 shadow-xl backdrop-blur-md transition-colors hover:border-white/30 hover:bg-[#101218] hover:text-white"
            >
                Talk to Claude about me
            </button>
        </div>
    );
}
