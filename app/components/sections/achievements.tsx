"use client";

import { useGSAP } from "@/app/hooks/useGSAP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Code2, GitPullRequest, Trophy, Zap, MessageCircle } from "lucide-react";
import { useRef } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const achievements = [
    {
        icon: Code2,
        title: "200+ LeetCode Problems",
        description: "Consistent DSA practice focused on problem solving, with Java as a primary language for interview preparation.",
        year: "2026",
        category: "Problem Solving",
    },
    {
        icon: Zap,
        title: "100-Day Streak",
        description: "Maintained a 100-day LeetCode practice streak while building consistency in algorithms and data structures.",
        year: "2026",
        category: "Consistency",
    },
    {
        icon: GitPullRequest,
        title: "5 Merged Open-Source PRs",
        description: "Contributed fixes and improvements to open-source projects while learning from real production codebases.",
        year: "2026",
        category: "Open Source",
    },
    {
        icon: Trophy,
        title: "120+ GitHub Contributions",
        description: "Built and maintained projects across full-stack development, AI/RAG exploration, and developer tooling.",
        year: "2026",
        category: "Building",
    },
    {
        icon: BookOpen,
        title: "Authored & Submitted Research Paper",
        description: "Authored and submitted a research paper on an IoT–AI digital twin for predictive water-stress and intervention planning in Bengaluru.",
        year: "2026",
        category: "Research & AI",
    },
    {
        icon: Trophy,
        title: "DevStorm 2026 Hackathon",
        description: "Actively participated in DevStorm 2026, a 36-hour hackathon organized by SPIRIT under the Division of Youth Affairs and Student Welfare Wing, LPU.",
        year: "2026",
        category: "Hackathon · 28 Aug",
    },
    {
        icon: MessageCircle,
        title: "Clash of Minds — Badge of Appreciation",
        description: "Successfully participated in the competitive Group Discussion and Extempore Speaking event organized by CPE and Mittal School of Business at LPU.",
        year: "2026",
        category: "Communication · 20 Aug",
    },
];

export default function Achievements() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const isDesktop = window.innerWidth >= 1024;
        if (isDesktop) {
            gsap.from(".achievements-header", {
                y: 40,
                opacity: 0,
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 55%", scrub: 1 },
            });
            achievements.forEach((_, i) => {
                gsap.from(`.achievement-card-${i}`, {
                    scrollTrigger: { trigger: `.achievement-card-${i}`, start: "top 85%", end: "top 55%", scrub: 1 },
                    x: 60,
                    opacity: 0,
                    ease: "power2.out",
                });
            });
        } else {
            gsap.from(".achievement-card", {
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
                opacity: 0,
                y: 24,
                duration: 0.55,
                stagger: 0.1,
            });
        }
    }, []);

    return (
        <section ref={sectionRef} id="achievements" className="achievements-section relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28">
            <div className="mx-auto max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
                <div className="achievements-header mb-10 md:mb-14">
                    <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45">07 / Progress</span>
                    <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-5xl lg:text-7xl">Proof of Work</h2>
                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/50 sm:text-base">
                        A snapshot of the habits, research, hackathons, communication, and work that shape my development journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                            <article key={achievement.title} className={`achievement-card achievement-card-${index} group border border-border bg-muted/20 p-5 transition-colors duration-300 hover:bg-muted/50 md:p-6`}>
                                <div className="mb-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">
                                    <span>{achievement.year}</span><div className="h-px flex-1 bg-border" /><span>{achievement.category}</span>
                                </div>
                                <Icon className="mb-6 h-7 w-7 text-foreground/60" />
                                <h3 className="mb-3 text-xl font-black uppercase leading-tight tracking-tight">{achievement.title}</h3>
                                <p className="text-sm leading-relaxed text-foreground/55">{achievement.description}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
