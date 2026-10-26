"use client";

import { Calendar, MapPin } from "lucide-react";

type Achievement = {
    title: string;
    description: string;
};

type ExperienceItem = {
    id: string;
    role: string;
    company: string;
    subtitle: string;
    location: string;
    period: string;
    achievements: Achievement[];
    tech: string[];
};

const experiences: readonly ExperienceItem[] = [
    {
        id: "kaho-technologies",
        role: "Software Development Engineer Intern",
        company: "KaHo Technologies",
        subtitle:
            "Building parent-facing product features for the Parent App, with a focus on photo discovery, verification workflows, and frontend reliability.",
        location: "Bengaluru, India · Remote",
        period: "September 2026 – Present",
        achievements: [
            {
                title: "Face Detection & Photo Clustering",
                description:
                    "Implemented a face-detection and photo-clustering feature that groups photos by person, helping parents quickly find photos of their child.",
            },
            {
                title: "Form Reliability",
                description:
                    "Reduced form submission failures by 50%, from 20% to 10%, by improving client-side validation and structured error handling across key user flows.",
            },
            {
                title: "Frontend Performance",
                description:
                    "Improved image-rendering performance by 60%+ and achieved sub-500 ms image load times through optimized lazy loading and caching strategies.",
            },
        ],
        tech: ["Next.js", "React", "JavaScript", "TypeScript"],
    },
    {
        id: "tata-steel",
        role: "Software Engineering Intern",
        company: "Tata Steel",
        subtitle:
            "Developed and deployed SteelCare PMMS, a full-stack preventive maintenance system for monitoring the health of terminal shop-floor computers.",
        location: "Jamshedpur, India",
        period: "June 2026 – July 2026",
        achievements: [
            {
                title: "Preventive Maintenance System",
                description:
                    "Built and deployed SteelCare PMMS using React.js and Spring Boot 3, delivering a full-stack preventive maintenance workflow for monitoring terminal shop-floor computers.",
            },
            {
                title: "Async Notification Engine",
                description:
                    "Reduced API response time from a 60-second timeout to under 50 ms by moving email notifications to asynchronous processing with Spring @Async.",
            },
            {
                title: "Authentication & Access Control",
                description:
                    "Implemented stateless JWT authentication and role-based access control (RBAC), with backend validation to prevent unauthorized privilege escalation.",
            },
            {
                title: "Deployment & Reporting",
                description:
                    "Deployed the React frontend and Spring Boot API with a cloud-hosted MySQL database, and implemented Excel-compatible CSV exports for maintenance reporting.",
            },
        ],
        tech: ["React.js", "Spring Boot 3", "Java", "MySQL", "JWT", "Netlify", "Render"],
    },
];

export default function Experience() {
    return (
        <section
            id="experience"
            className="relative overflow-hidden bg-background py-14 text-foreground sm:py-16 lg:py-20"
            aria-label="Work Experience"
        >
            <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
                {/* Section Header */}
                <div className="mb-8 sm:mb-10 md:mb-12">
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/50 sm:text-xs">
                            02 / Experience
                        </span>
                        <span className="h-px flex-1 bg-border" aria-hidden />
                    </div>
                    <div className="mt-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                        <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter text-foreground sm:text-4xl md:text-5xl">
                            Work Experience
                        </h2>
                        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                            Software development internships in production environments
                        </p>
                    </div>
                </div>

                {/* Compact Experience Cards Stack */}
                <div className="space-y-6 sm:space-y-8">
                    {experiences.map((exp) => (
                        <article
                            key={exp.id}
                            className="border border-border bg-muted/15 p-5 transition-colors duration-200 hover:border-border/80 hover:bg-muted/25 sm:p-7 md:p-8"
                        >
                            {/* Card Header: Role, Company, Period, Location */}
                            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start sm:gap-6">
                                <div className="min-w-0">
                                    <h3 className="text-xl font-black uppercase tracking-tight text-foreground sm:text-2xl">
                                        {exp.role}
                                    </h3>
                                    <p className="mt-0.5 font-mono text-sm font-semibold tracking-wide text-foreground/85 sm:text-base">
                                        {exp.company}
                                    </p>
                                </div>

                                <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:flex-col sm:items-end sm:text-xs">
                                    <span className="flex items-center gap-1.5 text-foreground/80">
                                        <Calendar className="h-3 w-3 text-muted-foreground" aria-hidden />
                                        {exp.period}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-foreground/60">
                                        <MapPin className="h-3 w-3 text-muted-foreground" aria-hidden />
                                        {exp.location}
                                    </span>
                                </div>
                            </div>

                            {/* Role Subtitle */}
                            <p className="mt-3 max-w-4xl text-xs leading-relaxed text-foreground/75 sm:text-sm">
                                {exp.subtitle}
                            </p>

                            {/* Vertically Stacked Achievement Bullet Points */}
                            <div className="mt-4 border-t border-border/60 pt-4">
                                <ul className="space-y-2 sm:space-y-2.5">
                                    {exp.achievements.map((ach) => (
                                        <li
                                            key={ach.title}
                                            className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/80 sm:text-[13px]"
                                        >
                                            <span
                                                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/50"
                                                aria-hidden
                                            />
                                            <span>
                                                <strong className="font-semibold text-foreground">
                                                    {ach.title}:
                                                </strong>{" "}
                                                {ach.description}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Technology Tags */}
                            <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-border/50 pt-3 sm:mt-5 sm:gap-2">
                                <span className="mr-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/45 sm:text-[10px]">
                                    Stack
                                </span>
                                {exp.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="border border-border/80 bg-background/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/75 transition-colors hover:border-foreground/30 hover:text-foreground sm:text-[11px]"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
