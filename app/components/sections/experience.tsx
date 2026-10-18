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
        title: "Software Engineering Intern",
        company: "Tata Steel",
        location: "Jamshedpur, India",
        period: "Jun 2026 – Jul 2026",
        category: "Software Engineering Internship",
        description:
            "Developed and deployed SteelCare PMMS, a full-stack Preventive Maintenance Management System for health monitoring of terminal shopfloor computers.",
        highlights: [
            "Built and deployed SteelCare PMMS using React.js and Spring Boot 3, delivering a full-stack preventive maintenance workflow for terminal shopfloor computers.",
            "Engineered an asynchronous HTML email notification engine using Spring @Async threads and SMTP over Port 465 SSL, reducing API response latency by 99%—from a 60-second timeout to under 50 ms.",
            "Implemented stateless JWT authentication and role-based access control (RBAC), adding backend validation to prevent unauthorized privilege escalation.",
            "Deployed the React frontend on Netlify and Spring Boot API on Render, integrated a cloud-hosted Aiven MySQL database, and built an Excel-compliant CSV export using UTF-8 BOM serialization to prevent metadata formatting conflicts.",
        ],
        tech: ["React.js", "Vite", "Tailwind CSS", "Spring Boot 3", "Spring Security", "JWT", "Hibernate JPA", "Java 17", "MySQL"],
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

                            <div className="mt-7 grid gap-5 border-t border-border pt-7 md:grid-cols-2 xl:grid-cols-4">
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
