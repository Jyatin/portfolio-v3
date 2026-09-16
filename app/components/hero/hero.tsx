"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import {
    HeroAvailability,
    HeroBackdrop,
    HeroEnterBlock,
    HeroEnterSplitRow,
    HeroExploreLink,
    HeroMotionRoot,
    HeroTechChips,
} from "./hero-interactive";

export default function Hero() {
    return (
        <LazyMotion features={domAnimation} strict>
            <section
                data-shoot-target="1"
                data-shoot-granularity="char"
                className="relative isolate w-full overflow-hidden bg-background contain-layout pb-12 min-h-[calc(100svh-var(--app-header-h,88px))] sm:pb-16 lg:pb-8 xl:flex xl:min-h-[calc(100svh-var(--app-header-h,88px))] xl:flex-col xl:justify-center"
                style={{ marginTop: "var(--app-header-h, 88px)" }}
            >
                <HeroBackdrop />
                <div className="relative z-10 mx-auto h-full min-h-0 w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
                    <HeroMotionRoot className="flex min-h-[calc(100svh-var(--app-header-h,88px)-48px)] flex-col justify-center gap-10 py-12 sm:gap-14 sm:py-16 lg:gap-16">
                        <HeroEnterSplitRow
                            left={
                                <div className="font-mono uppercase tracking-[0.28em] text-[10px] text-foreground/60 sm:text-xs">
                                    <div>01 / PROFILE</div>
                                    <div className="mt-3 text-foreground/40 tracking-[0.22em]">
                                        B.Tech CSE (AIML)
                                        <br />
                                        Lovely Professional University
                                        <br />
                                        Class of 2028
                                    </div>
                                </div>
                            }
                            right={<HeroAvailability />}
                        />

                        <HeroEnterBlock drift="left">
                            <div className="max-w-6xl">
                                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45 sm:text-xs">
                                    Jyatin Kumar Singh
                                </p>
                                <h1
                                    data-shoot-target="1"
                                    data-shoot-granularity="char"
                                    className="max-w-6xl text-foreground font-black uppercase leading-[0.82] tracking-[-0.055em] text-[clamp(3.8rem,10vw,10rem)]"
                                >
                                    Full-Stack
                                    <br />
                                    Developer
                                </h1>
                            </div>
                        </HeroEnterBlock>

                        <HeroEnterBlock drift="left">
                            <HeroTechChips />
                        </HeroEnterBlock>

                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
                            <HeroEnterBlock className="lg:col-span-7" drift="left">
                                <div className="relative min-h-[220px] overflow-hidden border border-border bg-muted/20 p-6 sm:min-h-[280px] sm:p-8 lg:min-h-[340px]">
                                    <img
                                        src="/jyatin-photo-v2.svg"
                                        alt="Jyatin Kumar Singh in the mountains"
                                        className="absolute inset-0 h-full w-full object-cover opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-background/55" />
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(127,127,127,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(127,127,127,.12)_1px,transparent_1px)] bg-[size:42px_42px]" />
                                    <div className="relative flex h-full flex-col justify-between">
                                        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/55">CURRENT FOCUS</div>
                                        <div>
                                            <div className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight text-foreground">
                                                AI / RAG
                                            </div>
                                            <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/60 sm:text-sm">
                                                Intelligent applications • Open source • DSA
                                            </div>
                                        </div>
                                        <div className="flex items-end justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/55 sm:text-[10px]">
                                            <span>BUILD / BREAK / DEBUG</span>
                                            <span>2026</span>
                                        </div>
                                    </div>
                                </div>
                            </HeroEnterBlock>

                            <HeroEnterBlock className="flex flex-col justify-between lg:col-span-5" drift="right">
                                <div className="max-w-md lg:ml-auto lg:text-right">
                                    <p className="text-[11px] font-mono uppercase leading-relaxed tracking-[0.22em] text-foreground/65 sm:text-sm">
                                        I build practical full-stack products, solve problems with data structures and algorithms, and explore AI systems that turn ideas into working software.
                                    </p>
                                    <p className="mt-5 text-[10px] font-mono uppercase leading-relaxed tracking-[0.2em] text-foreground/40 sm:text-xs">
                                        Based in India
                                        <br />
                                        Open to internships &amp; software roles
                                    </p>
                                </div>

                                <div className="mt-10 flex justify-start lg:justify-end">
                                    <HeroExploreLink />
                                </div>
                            </HeroEnterBlock>
                        </div>

                        <HeroEnterBlock drift="right">
                            <div className="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-foreground/40 sm:text-[10px]">
                                    Full-Stack • DSA • AI/RAG • Open Source
                                </div>
                                <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-foreground/35 sm:text-[10px]">
                                    Design &amp; code by Jyatin
                                </div>
                            </div>
                        </HeroEnterBlock>
                    </HeroMotionRoot>
                </div>
            </section>
        </LazyMotion>
    );
}
