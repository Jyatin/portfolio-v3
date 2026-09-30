import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Download, MapPin, Sparkles } from "lucide-react";

const STACK_TAGS = [
    { label: "Next.js", href: "#about" },
    { label: "TypeScript", href: "#about" },
    { label: "React", href: "#about" },
    { label: "Node.js", href: "#about" },
] as const;

const RESUME_URL = "/resume.pdf";

export default function Hero() {
    return (
        <section id="home" className="relative isolate w-full overflow-hidden bg-background pt-16 pb-12 sm:pt-20 sm:pb-14 md:pt-20 md:pb-16">
            <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] dark:opacity-[0.08]" aria-hidden="true" style={{ backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
            <div className="pointer-events-none absolute -right-32 top-20 z-0 h-80 w-80 rounded-full bg-foreground/[0.045] blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-32 bottom-0 z-0 h-72 w-72 rounded-full bg-foreground/[0.035] blur-3xl" aria-hidden="true" />

            <div className="relative z-10 mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                <div className="flex flex-col gap-6 pb-6 md:hidden">
                    <div className="grid grid-cols-[1fr_auto] items-start gap-4">
                        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/70"><div>01 /</div><div className="mt-2 text-foreground/55 tracking-[0.24em]">From India with<br />Love</div></div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.045] px-3 py-1.5 backdrop-blur-sm"><span className="relative flex h-2 w-2 shrink-0"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/40" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span><span className="text-[9px] font-mono uppercase leading-tight tracking-[0.18em] text-foreground/65">Open for work</span></div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.26em] text-foreground/45"><Sparkles className="h-3 w-3" /> Full-stack / AI / Open Source</div>
                        <h1 className="text-foreground font-black uppercase leading-[0.86] tracking-[-0.055em] text-[clamp(2.6rem,11.5vw,4.8rem)]">Full-Stack<br />Developer</h1>
                    </div>

                    <div className="flex flex-wrap gap-2">{STACK_TAGS.map((tag) => <Link key={tag.label} href={tag.href} className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-foreground/65 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/35 hover:bg-muted hover:text-foreground/85">{tag.label}</Link>)}</div>

                    <div>
                        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/60"><span>Me / 001</span><span>Scroll to explore</span></div>
                        <div className="group relative aspect-[16/9] w-full overflow-hidden border border-foreground/15 bg-muted/60 shadow-[0_25px_80px_-45px_rgba(0,0,0,.55)]">
                            <Image src="/images/jyatin.jpg" alt="Jyatin Kumar Singh" priority loading="eager" fill sizes="100vw" className="h-full w-full object-cover object-[60%_50%] transition-transform duration-700 group-hover:scale-[1.025]" />
                            <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/30 via-transparent to-white/10" />
                            <div className="pointer-events-none absolute bottom-11 left-4 font-[cursive] text-[12px] italic tracking-wide text-white/90 drop-shadow-[0_1px_5px_rgba(0,0,0,.75)]">God&apos;s child</div>
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 font-mono text-[8px] uppercase tracking-[0.22em] text-white/65"><span>JKS / 2026</span><span>India</span></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="border border-border bg-muted/30 p-4"><MapPin className="mb-5 h-4 w-4 text-foreground/45" /><p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-foreground/55">Based in<br /><span className="text-foreground/80">India</span></p></div>
                        <div className="border border-border bg-muted/30 p-4"><p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/45">Focus</p><p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-foreground/70">Products<br />Systems<br />AI / RAG</p></div>
                    </div>

                    <div className="text-right"><div className="font-black uppercase leading-[0.88] tracking-[-0.06em] text-[clamp(3.1rem,13vw,5.2rem)] text-foreground">Jyatin<br />Kumar Singh</div><div className="mt-2 font-mono text-[10px] uppercase tracking-[0.26em] text-foreground/55">2026 Portfolio</div></div>
                    <div className="grid grid-cols-12 items-start gap-4"><div className="col-span-2 text-lg leading-none text-foreground/70" aria-hidden="true">-&gt;</div><div className="col-span-10 font-mono text-[10px] uppercase leading-relaxed tracking-[0.28em] text-foreground/70">Building practical<br />full-stack applications<br />for real users.</div></div>
                    <div className="flex flex-wrap justify-end gap-2"><a href="#projects" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2.5 text-[10px] font-mono uppercase tracking-[0.24em] text-foreground/70 transition-all hover:-translate-y-0.5 hover:bg-muted"><span>Selected work</span><ArrowDownRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></a><a href={RESUME_URL} download="Jyatin_Kumar_Singh_Resume.pdf" className="group inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-4 py-2.5 text-[10px] font-mono uppercase tracking-[0.24em] text-background transition-all hover:-translate-y-0.5 hover:bg-foreground/85"><span>Download CV</span><Download className="h-3.5 w-3.5" /></a></div>
                    <div className="flex items-center justify-between border-t border-border pt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/45"><span>Design &amp; code by Jyatin</span><span>Scroll ↓</span></div>
                </div>

                <div className="hidden flex-col gap-8 md:flex lg:gap-10">
                    <div className="grid grid-cols-12 items-start gap-x-8 gap-y-8">
                        <div className="col-span-12 md:col-span-7">
                            <div className="mb-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-foreground/45"><Sparkles className="h-3 w-3" /> Full-stack / AI / Open source</div>
                            <h1 className="text-foreground font-black uppercase leading-[0.86] tracking-[-0.05em] text-[clamp(2.9rem,6.4vw,6.4rem)]">Full-Stack<br />Developer</h1>
                            <div className="mt-5 flex flex-wrap gap-2.5">{STACK_TAGS.map((tag) => <Link key={tag.label} href={tag.href} className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-foreground/65 transition-all hover:-translate-y-0.5 hover:bg-muted hover:text-foreground">{tag.label}</Link>)}</div>
                        </div>
                        <div className="col-span-12 md:col-span-5 md:text-right"><div className="flex flex-col items-end gap-3.5"><div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.045] px-3 py-1.5 backdrop-blur-sm"><span className="relative flex h-2 w-2 shrink-0"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/40" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span><span className="text-[9px] font-mono uppercase tracking-[0.18em] text-foreground/65">Open for work</span></div><div className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/70 text-right"><div>01 /</div><div className="mt-1.5 text-foreground/55">From India with<br />Love</div></div></div></div>
                    </div>

                    <div className="grid grid-cols-12 items-start gap-x-8 gap-y-8">
                        <div className="col-span-12 md:col-span-7">
                            <div className="w-full max-w-[760px]">
                                <div className="group relative w-full overflow-hidden border border-foreground/15 bg-muted/60 aspect-[16/8] shadow-[0_35px_90px_-55px_rgba(0,0,0,.65)]">
                                    <Image src="/images/jyatin.jpg" alt="Jyatin Kumar Singh" priority loading="eager" fill sizes="(max-width: 768px) 100vw, 760px" className="h-full w-full object-cover object-[60%_50%] transition-transform duration-700 group-hover:scale-[1.025]" />
                                    <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/30 via-transparent to-white/10" />
                                    <div className="pointer-events-none absolute left-4 top-4 border border-white/20 bg-black/20 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.25em] text-white/65 backdrop-blur-sm">JKS / 001</div>
                                    <div className="pointer-events-none absolute bottom-12 left-4 font-[cursive] text-[13px] italic tracking-wide text-white/90 drop-shadow-[0_1px_5px_rgba(0,0,0,.75)]">God&apos;s child</div>
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 font-mono text-[8px] uppercase tracking-[0.22em] text-white/65"><span>Full-stack developer</span><span>India / 2026</span></div>
                                </div>
                                <div className="mt-5 grid grid-cols-12 items-start gap-4"><div className="col-span-1 text-lg leading-none text-foreground/70" aria-hidden="true">-&gt;</div><div className="col-span-11 font-mono text-[10px] uppercase leading-relaxed tracking-[0.28em] text-foreground/70">Based in<br />India,<br />Passionate about Full-Stack Development</div></div>
                                <div className="mt-8 flex items-center justify-between border-t border-border pt-4 font-mono text-[9px] uppercase tracking-[0.28em] text-foreground/45"><span>Design &amp; code by Jyatin</span><span>Scroll ↓</span></div>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-5">
                            <div className="mb-7 max-w-md md:ml-auto md:text-right"><p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-foreground/72">Building practical full-stack applications<br />for real users.</p><div className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.24em] text-foreground/55">Based in India</div></div>
                            <div className="font-black uppercase leading-[0.86] tracking-[-0.055em] text-[clamp(3.2rem,6.2vw,5.8rem)] text-foreground text-right">Jyatin<br />Kumar Singh</div>
                            <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.26em] text-foreground/55 text-right">2026 Portfolio / Selected work</div>
                            <div className="mt-7 flex flex-wrap justify-end gap-2"><a href="#projects" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2.5 text-[10px] font-mono uppercase tracking-[0.24em] text-foreground/70 transition-all hover:-translate-y-0.5 hover:bg-muted"><span>Selected work</span><ArrowDownRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></a><a href={RESUME_URL} download="Jyatin_Kumar_Singh_Resume.pdf" className="group inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-4 py-2.5 text-[10px] font-mono uppercase tracking-[0.24em] text-background transition-all hover:-translate-y-0.5 hover:bg-foreground/85"><span>Download CV</span><Download className="h-3.5 w-3.5" /></a></div>

                            <div className="mt-16 grid grid-cols-2 gap-4 text-left">
                                <div className="flex min-h-[140px] flex-col justify-between border border-border bg-muted/30 p-5 transition-colors duration-200 hover:bg-muted/50"><MapPin className="h-4 w-4 text-foreground/45" /><p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-foreground/55">Location<br /><span className="text-foreground/85">India</span></p></div>
                                <div className="flex min-h-[140px] flex-col justify-between border border-border bg-muted/30 p-5 transition-colors duration-200 hover:bg-muted/50"><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/45">Focus</p><p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-foreground/75">Products<br />Systems<br />AI / RAG</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
