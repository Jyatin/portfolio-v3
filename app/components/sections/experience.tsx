"use client";

import { useRef } from "react";
import { Briefcase, MapPin, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@/app/hooks/useGSAP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const experience = {
    title: "Software Development Engineer Intern",
    company: "KaHo Technologies",
    location: "Bengaluru, India · Remote",
    period: "Sep 2026 – Present",
    description:
        "Building and shipping customer-facing product features for the Parent App using Next.js, React, JavaScript, and TypeScript.",
    highlights: [
        "Built and shipped parent verification forms and real-time toast notification systems, contributing to 5+ production features and bug fixes.",
        "Cut form submission failure rate by 50% (20% to 10%) by redesigning client-side validation logic and implementing structured error handling across key user flows.",
        "Boosted image rendering performance by 60%+, achieving consistent sub-500ms load times and eliminating recurring stalling issues through optimized lazy-loading and caching strategies.",
    ],
    tech: ["Next.js", "React", "JavaScript", "TypeScript"],
};

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLElement>(".experience-anim", sectionRef.current);
        gsap.from(items, {
            y: 35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 78%",
            },
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative overflow-hidden bg-background py-16 text-foreground sm:py-20 lg:py-28"
        >
            <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-14 xl:px-18 2xl:pl-24 2xl:pr-24">
                <div className="mb-10 flex items-center gap-4 sm:mb-14 md:mb-16">
                    <span className="experience-anim font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45 sm:text-xs">
                        04 / Experience
                    </span>
                    <span className="h-px flex-1 bg-border" />
                </div>

                <article className="experience-anim border border-border bg-muted/20 p-6 sm:p-8 md:p-10 lg:p-12">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
                        <div className="max-w-2xl">
                            <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45 sm:text-xs">
                                <span className="flex items-center gap-2 text-foreground/70">
                                    <Briefcase className="h-4 w-4" aria-hidden />
                                    {experience.company}
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" aria-hidden />
                                    {experience.location}
                                </span>
                            </div>

                            <h2 className="text-[clamp(2rem,5vw,4.75rem)] font-black uppercase leading-[0.92] tracking-tighter">
                                {experience.title}
                            </h2>

                            <p className="mt-5 text-sm leading-relaxed text-foreground/55 sm:text-base">
                                {experience.description}
                            </p>
                        </div>

                        <div className="shrink-0 lg:text-right">
                            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45 sm:text-xs">
                                {experience.period}
                            </p>
                            <ArrowUpRight className="mt-6 hidden h-7 w-7 text-foreground/30 lg:ml-auto lg:block" aria-hidden />
                        </div>
                    </div>

                    <div className="mt-10 grid gap-4 border-t border-border pt-8 md:grid-cols-3 md:gap-6">
                        {experience.highlights.map((highlight, index) => (
                            <div key={highlight} className="experience-anim border-l border-border pl-4 sm:pl-5">
                                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/30">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <p className="mt-3 text-sm leading-relaxed text-foreground/60 sm:text-[15px]">
                                    {highlight}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-7">
                        {experience.tech.map((tech) => (
                            <span
                                key={tech}
                                className="experience-anim border border-border bg-background px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/50 sm:text-[10px]"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </article>
            </div>
        </section>
    );
}
