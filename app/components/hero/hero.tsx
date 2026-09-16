"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import {
    HeroAvailability,
    HeroBackdrop,
    HeroEnterBlock,
    HeroEnterSplitRow,
    HeroMotionRoot,
    HeroTechChips,
} from "./hero-interactive";

const PROFILE_PHOTO = "https://raw.githubusercontent.com/Jyatin/portfolio-v3/master/IMG_20260916_061704.jpg";

export default function Hero() {
    return (
        <LazyMotion features={domAnimation} strict>
            <section
                id="home"
                className="relative isolate min-h-[calc(100svh-var(--app-header-h,72px))] w-full overflow-hidden bg-black text-white"
                style={{ marginTop: "var(--app-header-h, 72px)" }}
            >
                <HeroBackdrop />

                <div className="relative z-10 mx-auto w-full max-w-[1400px] px-7 pb-24 pt-8 sm:px-10 md:px-12 lg:px-16">
                    <HeroMotionRoot className="flex flex-col">
                        <HeroEnterSplitRow
                            className="mb-10 grid grid-cols-[1fr_auto] items-start gap-4"
                            left={
                                <div className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.3em] text-white/55 sm:text-xs">
                                    <div>01 /</div>
                                    <div className="mt-5 max-w-[230px] whitespace-pre-line text-white/55">
                                        FROM INDIA{`\n`}WITH{`\n`}LOVE
                                    </div>
                                </div>
                            }
                            right={<HeroAvailability />}
                        />

                        <HeroEnterBlock drift="left">
                            <h1 className="max-w-[1050px] whitespace-pre-line text-[clamp(4.3rem,13vw,12rem)] font-black uppercase leading-[0.78] tracking-[-0.065em] text-white">
                                Full-Stack
                                <br />
                                Developer
                            </h1>
                        </HeroEnterBlock>

                        <HeroEnterBlock className="mt-9" drift="left">
                            <HeroTechChips />
                        </HeroEnterBlock>

                        <HeroEnterBlock className="mt-8" drift="left">
                            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-white/55 sm:text-xs">
                                DR &amp; ME
                            </div>
                            <div className="relative aspect-[1.78/1] w-full overflow-hidden border border-white/35 bg-neutral-900">
                                <img
                                    src={PROFILE_PHOTO}
                                    alt="Jyatin Kumar Singh"
                                    className="h-full w-full object-cover object-center"
                                    loading="eager"
                                    fetchPriority="high"
                                    referrerPolicy="no-referrer"
                                    onError={(event) => {
                                        event.currentTarget.onerror = null;
                                        event.currentTarget.src = "/jyatin-photo-v2.svg";
                                    }}
                                />
                                <div className="pointer-events-none absolute inset-4 border border-white/20" />
                                <div className="pointer-events-none absolute left-5 top-5 h-5 w-5 border-l border-t border-white/45" />
                                <div className="pointer-events-none absolute right-5 top-5 h-5 w-5 border-r border-t border-white/45" />
                                <div className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 border-b border-l border-white/45" />
                                <div className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 border-b border-r border-white/45" />
                            </div>
                        </HeroEnterBlock>

                        <HeroEnterBlock className="mt-8" drift="right">
                            <div className="mx-auto max-w-[760px] text-center font-mono uppercase">
                                <p className="text-[12px] leading-[1.9] tracking-[0.28em] text-white/65 sm:text-sm md:text-base">
                                    Building practical full-stack applications
                                    <br />
                                    for real users.
                                </p>
                                <p className="mt-5 text-[10px] leading-[1.9] tracking-[0.28em] text-white/45 sm:text-xs md:text-sm">
                                    Open for internships / software roles
                                    <br />
                                    Based in India
                                </p>
                            </div>
                        </HeroEnterBlock>

                        <HeroEnterBlock className="mt-12" drift="right">
                            <div className="flex justify-end">
                                <div className="max-w-[720px] text-right text-[clamp(4rem,12vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.07em] text-white">
                                    JYATIN KUMAR
                                    <br />
                                    SINGH
                                </div>
                            </div>
                        </HeroEnterBlock>
                    </HeroMotionRoot>
                </div>
            </section>
        </LazyMotion>
    );
}
