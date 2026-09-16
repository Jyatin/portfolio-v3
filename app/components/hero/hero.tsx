import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

const STACK_TAGS = [
    { label: "Next.js", href: "#about" },
    { label: "TypeScript", href: "#about" },
    { label: "React", href: "#about" },
    { label: "Node.js", href: "#about" },
] as const;

export default function Hero() {
    return (
        <section
            id="home"
            className="relative isolate w-full overflow-hidden bg-background pt-16 pb-12 sm:pt-20 sm:pb-14 md:pt-20 md:pb-16"
        >
            {/* Subtle background grid matching reference */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] dark:opacity-[0.08]"
                aria-hidden="true"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                }}
            />

            <div className="relative z-10 mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                {/* ---------------- MOBILE COMPOSITION (< md) ---------------- */}
                <div className="flex flex-col gap-6 pb-6 md:hidden">
                    {/* Top split row */}
                    <div className="grid grid-cols-[1fr_auto] items-start gap-4">
                        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/70">
                            <div>01 /</div>
                            <div className="mt-2 text-foreground/55 tracking-[0.24em]">
                                From India with<br />Love
                            </div>
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1">
                                <span className="relative flex h-2 w-2 shrink-0">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/40" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                </span>
                                <span className="text-[9px] font-mono uppercase leading-tight tracking-[0.18em] text-foreground/60">
                                    Open for work
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main Title */}
                    <div>
                        <h1 className="text-foreground font-black uppercase leading-[0.88] tracking-[-0.05em] text-[clamp(2.6rem,11.5vw,4.8rem)]">
                            Full-Stack<br />Developer
                        </h1>
                    </div>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-2">
                        {STACK_TAGS.map((tag) => (
                            <Link
                                key={tag.label}
                                href={tag.href}
                                className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-foreground/65 transition-colors duration-200 hover:border-foreground/35 hover:bg-muted hover:text-foreground/85"
                            >
                                {tag.label}
                            </Link>
                        ))}
                    </div>

                    {/* Profile Photograph Container */}
                    <div>
                        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/70">
                            Dr &amp; Me
                        </div>
                        <div className="group relative w-full overflow-hidden border border-border bg-muted/60 aspect-[16/9] shadow-none">
                            <Image
                                src="/images/jyatin.jpg"
                                alt="Jyatin Kumar Singh"
                                priority
                                loading="eager"
                                fill
                                sizes="100vw"
                                className="h-full w-full object-cover object-[60%_50%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                            />
                            {/* 4 Editorial Corner Ticks */}
                            <span className="pointer-events-none absolute left-2 top-2 z-10 h-3 w-3 border-l border-t border-foreground/40 opacity-70 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                            <span className="pointer-events-none absolute right-2 top-2 z-10 h-3 w-3 border-r border-t border-foreground/40 opacity-70 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                            <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-3 w-3 border-l border-b border-foreground/40 opacity-70 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                            <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-3 w-3 border-r border-b border-foreground/40 opacity-70 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                        </div>
                    </div>

                    {/* Right-aligned text & Name */}
                    <div className="text-right">
                        <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-foreground/75">
                            Building practical full-stack applications<br />for real users.
                        </p>
                        <div className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.24em] text-foreground/55">
                            Open for internships / software roles<br />Based in India
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-right font-black uppercase leading-[0.88] tracking-[-0.06em] text-[clamp(3.1rem,13vw,5.2rem)] text-foreground">
                            Jyatin<br />Kumar Singh
                        </div>
                        <div className="mt-2 text-right font-mono text-[10px] uppercase tracking-[0.26em] text-foreground/55">
                            2026 Portfolio
                        </div>
                    </div>

                    {/* Location note */}
                    <div className="grid grid-cols-12 items-start gap-4">
                        <div className="col-span-2 text-lg leading-none select-none text-foreground/70" aria-hidden="true">
                            -&gt;
                        </div>
                        <div className="col-span-10 font-mono text-[10px] uppercase leading-relaxed tracking-[0.28em] text-foreground/70">
                            I based in<br />India,<br />Passionate in Full-Stack &amp; Scalable Systems
                        </div>
                    </div>

                    {/* Action button */}
                    <div className="flex justify-end">
                        <a
                            href="#projects"
                            className="group inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-4 py-2 text-[10px] font-mono uppercase tracking-[0.24em] text-foreground/70 transition-colors duration-200 hover:border-foreground/40 hover:bg-muted hover:text-foreground"
                        >
                            <span>Selected work</span>
                            <ArrowDownRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                        </a>
                    </div>

                    <div className="text-right font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/55">
                        Design &amp; code by Jyatin
                    </div>
                </div>

                {/* ---------------- DESKTOP COMPOSITION (>= md) ---------------- */}
                <div className="hidden flex-col gap-8 md:flex lg:gap-10">
                    {/* Row 1: Title (left) & Work status + 01 (right) */}
                    <div className="grid grid-cols-12 items-start gap-x-8 gap-y-8">
                        <div className="col-span-12 md:col-span-7">
                            <h1 className="text-foreground font-black uppercase leading-[0.88] tracking-[-0.04em] text-[clamp(2.9rem,6.4vw,6.4rem)]">
                                Full-Stack<br />Developer
                            </h1>
                            <div className="mt-4 flex flex-wrap gap-2.5">
                                {STACK_TAGS.map((tag) => (
                                    <Link
                                        key={tag.label}
                                        href={tag.href}
                                        className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-foreground/65 transition-colors duration-200 hover:border-foreground/35 hover:bg-muted hover:text-foreground/85"
                                    >
                                        {tag.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-5 md:text-right">
                            <div className="flex flex-col items-end gap-3.5">
                                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1">
                                    <span className="relative flex h-2 w-2 shrink-0">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/40" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                    </span>
                                    <span className="text-[9px] font-mono uppercase leading-tight tracking-[0.18em] text-foreground/60">
                                        Open for work
                                    </span>
                                </div>
                                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/70 text-right">
                                    <div>01 /</div>
                                    <div className="mt-1.5 text-foreground/55 tracking-[0.26em]">
                                        From India with<br />Love
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Photo & supporting info (left) & Intro, Name, Button (right) */}
                    <div className="grid grid-cols-12 items-start gap-x-8 gap-y-8">
                        {/* Left column: Photo frame + location + signature */}
                        <div className="col-span-12 md:col-span-7">
                            <div className="w-full max-w-[760px]">
                                <div className="group relative w-full overflow-hidden border border-border bg-muted/60 aspect-[16/8] shadow-none transition-shadow duration-300 ease-out">
                                    {/* Hover overlay */}
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-t from-foreground/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    />
                                    <div className="relative z-0 h-full w-full">
                                        <Image
                                            src="/images/jyatin.jpg"
                                            alt="Jyatin Kumar Singh"
                                            priority
                                            loading="eager"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 760px"
                                            className="h-full w-full object-cover object-[60%_50%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                                        />
                                    </div>
                                    {/* 4 Corner Ticks */}
                                    <span className="pointer-events-none absolute left-2 top-2 z-10 h-3 w-3 border-l border-t border-foreground/40 opacity-60 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                                    <span className="pointer-events-none absolute right-2 top-2 z-10 h-3 w-3 border-r border-t border-foreground/40 opacity-60 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                                    <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-3 w-3 border-l border-b border-foreground/40 opacity-60 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                                    <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-3 w-3 border-r border-b border-foreground/40 opacity-60 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                                </div>

                                <div className="mt-5 grid grid-cols-12 items-start gap-4">
                                    <div className="col-span-1 text-lg leading-none select-none text-foreground/70" aria-hidden="true">
                                        -&gt;
                                    </div>
                                    <div className="col-span-11 font-mono text-[10px] uppercase leading-relaxed tracking-[0.28em] text-foreground/70">
                                        I based in<br />India,<br />Passionate in Full-Stack &amp; Scalable Systems
                                    </div>
                                </div>

                                <div className="mt-8 text-left font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/55">
                                    Design &amp; code by Jyatin
                                </div>
                            </div>
                        </div>

                        {/* Right column: Intro copy, Name, Year, Action */}
                        <div className="col-span-12 md:col-span-5 md:text-right">
                            <div className="mb-5 max-w-md md:ml-auto md:text-right">
                                <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-foreground/72">
                                    Building practical full-stack applications<br />for real users.
                                </p>
                                <div className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.24em] text-foreground/55">
                                    Open for internships / software roles<br />Based in India
                                </div>
                            </div>

                            <div className="text-foreground font-black uppercase leading-[0.88] tracking-[-0.05em] text-[clamp(3.2rem,6.2vw,5.8rem)] md:text-right">
                                Jyatin<br />Kumar Singh
                            </div>

                            <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.26em] text-foreground/55 md:text-right">
                                2026 Portfolio
                            </div>

                            <div className="mt-4 flex justify-end">
                                <a
                                    href="#projects"
                                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-4 py-2 text-[10px] font-mono uppercase tracking-[0.24em] text-foreground/70 transition-colors duration-200 hover:border-foreground/40 hover:bg-muted hover:text-foreground"
                                >
                                    <span>Selected work</span>
                                    <ArrowDownRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

