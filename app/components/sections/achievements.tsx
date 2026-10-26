"use client";

import { useGSAP } from "@/app/hooks/useGSAP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type ProofItem = {
    category: string;
    period: string;
    title: string;
    organization: string;
    description: string;
    highlight: string;
};

const proofItems: readonly ProofItem[] = [
    {
        category: "Internship",
        period: "2026 – Present",
        title: "Software Development Engineer Intern",
        organization: "KaHo Technologies",
        description:
            "Building parent-facing features for the Parent App using Next.js and TypeScript.",
        highlight: "50% fewer form submission failures · 60%+ faster image loading",
    },
    {
        category: "Industry Experience",
        period: "2026",
        title: "Software Engineering Intern",
        organization: "Tata Steel",
        description:
            "Built SteelCare PMMS, a preventive maintenance system for shopfloor computer health monitoring using React and Spring Boot.",
        highlight:
            "JWT authentication · Asynchronous email alerts · API response time reduced from 60s to < 50 ms",
    },
    {
        category: "Engineering in Public",
        period: "2025 – 2026",
        title: "Open-Source Contributions",
        organization: "Public Repositories",
        description:
            "Contributed code improvements, bug fixes, features, and tests across Infisical, OpenStory, Speech Dispatcher, and other projects.",
        highlight: "8 merged PRs",
    },
    {
        category: "Competitions",
        period: "2025 – 2026",
        title: "Hackathons & Competitions",
        organization: "TRINETRA & DevStorm",
        description:
            "Secured 2nd place at the TRINETRA 20-hour hackathon and 6th place at DevStorm 2026.",
        highlight: "Clash of Minds — Badge of Appreciation",
    },
    {
        category: "Research",
        period: "2026",
        title: "JalDrishti 2030",
        organization: "IoT–AI Digital Twin",
        description:
            "Researching an IoT–AI digital twin for predictive water-stress analysis and intervention planning in Bengaluru.",
        highlight: "B-SMART 2030 International Semifinalist",
    },
];

export default function Achievements() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        gsap.from(".achievements-header", {
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
            y: 20,
            opacity: 0,
            duration: 0.55,
            ease: "power2.out",
        });

        gsap.from(".achievement-card", {
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            id="achievements"
            className="achievements-section relative overflow-hidden bg-background py-14 sm:py-16 lg:py-24"
            aria-label="Proof of Work"
        >
            <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
                {/* Section Header */}
                <div className="achievements-header mb-8 sm:mb-10 md:mb-12">
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45 sm:text-xs">
                            07 / Proof of Work
                        </span>
                        <span className="h-px flex-1 bg-border/70" aria-hidden />
                    </div>
                    <div className="mt-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                                Proof of Work
                            </h2>
                            <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-foreground/50">
                                A verified record of production engineering, open-source work, competitions, and research.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5 Cards in a Responsive Grid */}
                <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {proofItems.map((item, index) => (
                        <article
                            key={item.title}
                            className={`achievement-card achievement-card-${index} group flex flex-col justify-between rounded-lg border border-border/70 bg-card/25 p-5 md:p-6 transition-all duration-200 hover:border-border hover:bg-card/45 motion-safe:hover:-translate-y-1`}
                        >
                            {/* Card Content Top */}
                            <div>
                                {/* Category & Date */}
                                <div className="mb-3 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                                    <span className="truncate">{item.category}</span>
                                    <span className="shrink-0">{item.period}</span>
                                </div>

                                {/* Title & Organization */}
                                <div className="mb-2.5">
                                    <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                                        {item.title}
                                    </h3>
                                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/55">
                                        {item.organization}
                                    </p>
                                </div>

                                {/* Concise Description */}
                                <p className="text-xs sm:text-sm leading-relaxed text-foreground/65">
                                    {item.description}
                                </p>
                            </div>

                            {/* Key Highlight / Outcome */}
                            <div className="mt-4 border-t border-border/50 pt-3">
                                <div className="flex items-start gap-2">
                                    <span
                                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/35 transition-colors group-hover:bg-foreground/60"
                                        aria-hidden
                                    />
                                    <p className="font-mono text-[11px] leading-snug text-foreground/80">
                                        {item.highlight}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
