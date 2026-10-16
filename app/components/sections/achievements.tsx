"use client";

import { useGSAP } from "@/app/hooks/useGSAP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, BriefcaseBusiness, GitPullRequest, MessageCircle, Trophy } from "lucide-react";
import { useRef } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const proofItems = [
    {
        icon: BriefcaseBusiness,
        title: "Software Development Engineer Intern — KaHo Technologies",
        description:
            "Currently building and shipping customer-facing features for the Parent App using Next.js, React, JavaScript, and TypeScript. Work includes parent verification flows, structured error handling, and image-loading improvements.",
        year: "2026 · Present",
        category: "Internship",
    },
    {
        icon: BriefcaseBusiness,
        title: "Software Engineering Trainee — Tata Steel",
        description:
            "Completed the Prashikshan 2026 programme at Shavak Nanavati Technical Institute, Jamshedpur, contributing to the development and deployment of a full-stack preventive maintenance management system focused on digital solutions and automation.",
        year: "2026",
        category: "Industry Experience",
    },
    {
        icon: GitPullRequest,
        title: "Open-Source Contributions",
        description:
            "Contribute to real-world codebases including InfiScal, OpenStory, OpenDesign, and other open-source projects. Work spans code improvements, bug fixes, feature development, tests, and collaboration through pull requests and code review.",
        year: "2026",
        category: "Engineering in Public",
    },
    {
        icon: Trophy,
        title: "Hackathons, Debate & Communication",
        description:
            "Earned 2nd place at the TRINETRA 20-hour hackathon and 6th place at DevStorm 2026. Also participated in Clash of Minds group discussion and extempore speaking, receiving a Badge of Appreciation.",
        year: "2025–2026",
        category: "Competitions",
    },
    {
        icon: BookOpen,
        title: "Research & B-SMART 2030 International Semifinalist",
        description:
            "Writing research on JalDrishti 2030, an IoT–AI digital twin for predictive water-stress and intervention planning in Bengaluru. Reached the semifinal stage of the international SMART CITY 2030 student and young researcher competition, featuring participants from countries around the world.",
        year: "2026",
        category: "Research & International Recognition",
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
            proofItems.forEach((_, i) => {
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
                    <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45">07 / Proof of Work</span>
                    <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-5xl lg:text-7xl">Proof of Work</h2>
                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/50 sm:text-base">
                        A record of industry experience, open-source engineering, competition results, and research in progress.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {proofItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <article key={item.title} className={`achievement-card achievement-card-${index} group border border-border bg-muted/20 p-5 transition-colors duration-300 hover:bg-muted/50 md:p-6`}>
                                <div className="mb-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">
                                    <span>{item.year}</span><div className="h-px flex-1 bg-border" /><span>{item.category}</span>
                                </div>
                                <Icon className="mb-6 h-7 w-7 text-foreground/60" />
                                <h3 className="mb-3 text-xl font-black uppercase leading-tight tracking-tight">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-foreground/55">{item.description}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
