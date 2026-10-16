"use client";

import { BriefcaseBusiness, MapPin } from "lucide-react";
import MilestoneCard from "../milestone-card";

const experiences = [
    {
        title: "Software Development Engineer Intern",
        company: "KaHo Technologies",
        location: "Bengaluru, India · Remote",
        period: "Sep 2026 – Present",
        category: "SDE Intern",
        description:
            "Building and shipping customer-facing product features for the Parent App using Next.js, React, JavaScript, and TypeScript.",
        highlights: [
            "Built and shipped parent verification forms and real-time toast notification systems, contributing to 5+ production features and bug fixes.",
            "Cut form submission failure rate by 50% (20% to 10%) by redesigning client-side validation logic and implementing structured error handling across key user flows.",
            "Boosted image rendering performance by 60%+, achieving consistent sub-500ms load times and eliminating recurring stalling issues through optimized lazy-loading and caching strategies.",
        ],
        tech: ["Next.js", "React", "JavaScript", "TypeScript"],
        year: "2026",
        iconClassName: "text-cyan-300",
    },
    {
        title: "Software Engineering Trainee",
        company: "Tata Steel Ltd. — Prashikshan 2026",
        location: "Shavak Nanavati Technical Institute, Jamshedpur, India",
        period: "01 Jun 2026 – 13 Jul 2026",
        category: "Vocational Training",
        description:
            "Completed a vocational training programme in Software Engineering (Digital Solutions & Automation), developing and deploying a full-stack preventive maintenance management system.",
        highlights: [
            "Worked on the development and deployment of a full-stack preventive maintenance management system.",
            "Completed the Tata Steel Prashikshan 2026 vocational training programme through Shavak Nanavati Technical Institute.",
            "Focused on software engineering, digital solutions, and automation in an industrial learning environment.",
        ],
        tech: ["Software Engineering", "Full-Stack Development", "Digital Solutions", "Automation"],
        year: "2026",
        iconClassName: "text-amber-300",
    },
];

export default function Experience() {
    return (
        <section
            id="experience"
            className="relative overflow-hidden bg-background py-16 text-foreground sm:py-20 lg:py-28"
        >
            <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
                <div className="mb-10 flex items-center gap-4 sm:mb-14">
                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45 sm:text-xs">
                        02 / Experience
                    </span>
                    <span className="h-px flex-1 bg-border" />
                </div>

                <div className="space-y-8">
                    {experiences.map((experience) => (
                        <MilestoneCard
                            key={experience.company}
                            icon={BriefcaseBusiness}
                            year={experience.year}
                            category={experience.category}
                            title={`${experience.title} — ${experience.company}`}
                            description={experience.description}
                            iconClassName={experience.iconClassName}
                        >
                            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5">
                                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/45">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {experience.location}
                                </span>
                                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/45">
                                    {experience.period}
                                </span>
                            </div>

                            <div className="mt-7 grid gap-5 border-t border-border pt-7 md:grid-cols-3">
                                {experience.highlights.map((highlight, index) => (
                                    <div key={highlight} className="border-l border-border pl-4">
                                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/30">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <p className="mt-2 text-sm leading-relaxed text-foreground/55">
                                            {highlight}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-6">
                                {experience.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/40"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </MilestoneCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
