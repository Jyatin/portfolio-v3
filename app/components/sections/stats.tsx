"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Skill = {
    name: string;
    icon: string;
    invertInDark?: boolean;
};

type SkillCategory = {
    label: string;
    skills: readonly Skill[];
};

const skillCategories: readonly SkillCategory[] = [
    {
        label: "Frontend",
        skills: [
            { name: "JavaScript", icon: "/images/frontend/JavaScript.svg" },
            { name: "TypeScript", icon: "/images/frontend/TypeScript.svg" },
            { name: "React", icon: "/images/frontend/React.svg" },
            { name: "Next.js", icon: "/images/frontend/Next.js.svg", invertInDark: true },
            { name: "Tailwind CSS", icon: "/images/frontend/Tailwind CSS.svg" },
            { name: "HTML5", icon: "https://cdn.simpleicons.org/html5" },
            { name: "CSS3", icon: "https://cdn.simpleicons.org/css" },
        ],
    },
    {
        label: "Backend",
        skills: [
            { name: "Node.js", icon: "/images/backend/Node.js.svg" },
            { name: "Express.js", icon: "https://cdn.simpleicons.org/express", invertInDark: true },
            { name: "REST APIs", icon: "https://cdn.simpleicons.org/postman" },
        ],
    },
    {
        label: "Database",
        skills: [
            { name: "MongoDB", icon: "/images/database/MongoDB.svg" },
            { name: "MySQL", icon: "/images/database/MySQL.svg" },
            { name: "PostgreSQL", icon: "/images/database/PostgresSQL.svg" },
        ],
    },
    {
        label: "Tools",
        skills: [
            { name: "Git", icon: "/images/tools/Git.svg" },
            { name: "GitHub", icon: "https://cdn.simpleicons.org/github", invertInDark: true },
            { name: "Docker", icon: "/images/tools/Docker.svg" },
            { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        ],
    },
];

const metrics = [
    ["200+", "LeetCode"],
    ["100", "Day Streak"],
    ["150+", "GFG / Codeforces"],
    ["5", "Merged PRs"],
];

export default function Stats() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const root = sectionRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            gsap.from(".stats-reveal", {
                scrollTrigger: { trigger: root, start: "top 80%", once: true },
                opacity: 0,
                y: 24,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
            });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative min-w-0 overflow-hidden bg-background py-16 text-foreground sm:py-20 lg:py-28"
        >
            <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
                <div className="flex min-w-0 flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16 xl:gap-20">
                    {/* Left Panel: Section header, Display title, and Authentic Copy */}
                    <div className="w-full min-w-0 max-w-full space-y-5 lg:w-[42%] xl:w-5/12">
                        <div className="stats-reveal flex min-w-0 items-center gap-3">
                            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45 sm:text-xs">
                                03 / About
                            </span>
                            <div className="h-px min-w-0 flex-1 bg-border" />
                        </div>

                        <h2 className="stats-reveal text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.92] tracking-tighter text-foreground">
                            About
                        </h2>

                        <p className="stats-reveal text-base leading-relaxed text-foreground/75 sm:text-lg">
                            I'm Jyatin Kumar Singh, a B.Tech Computer Science student at Lovely Professional University, graduating in 2028. I build full-stack applications, practise DSA, explore AI/RAG systems, and contribute to open source.
                        </p>

                        <p className="stats-reveal text-sm leading-relaxed text-foreground/55 sm:text-base">
                            My main stack is JavaScript/TypeScript, React, Node.js, Express.js and MongoDB, with C++ and Java for problem solving. I enjoy taking an idea from a rough concept to a working product.
                        </p>

                        <p className="stats-reveal text-sm leading-relaxed text-foreground/45 sm:text-base">
                            Passionate about clean code, problem-solving, and collaboration, with a focus on delivering high-performance, user-centered applications.
                        </p>

                        {/* Metrics Grid */}
                        <div className="stats-reveal grid grid-cols-2 gap-px border border-border bg-border pt-4 sm:grid-cols-4">
                            {metrics.map(([value, label]) => (
                                <div key={label} className="bg-background p-4 sm:p-5">
                                    <div className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                                        {value}
                                    </div>
                                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/45">
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Categorized Editorial Skills Grid */}
                    <div className="w-full min-w-0 max-w-full lg:w-[58%] xl:w-7/12 lg:self-center">
                        <div className="grid gap-8 sm:gap-10 md:gap-12">
                            {skillCategories.map((cat) => (
                                <div
                                    key={cat.label}
                                    className="stats-reveal grid min-w-0 grid-cols-1 items-start gap-4 min-[480px]:grid-cols-12 sm:items-center sm:gap-6"
                                >
                                    <div className="min-w-0 min-[480px]:col-span-12 sm:col-span-4">
                                        <div className="text-xl font-black uppercase leading-[1.05] tracking-tight text-foreground/45 min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] xl:text-[2.6rem]">
                                            {cat.label}
                                        </div>
                                    </div>

                                    <div className="min-w-0 min-[480px]:col-span-12 sm:col-span-8">
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:gap-x-4 sm:gap-y-3">
                                            {cat.skills.map((skill) => (
                                                <div
                                                    key={skill.name}
                                                    className="flex min-w-0 max-w-full items-center gap-2 pr-1 sm:pr-2"
                                                    title={skill.name}
                                                >
                                                    <img
                                                        src={skill.icon}
                                                        alt={skill.name}
                                                        loading="lazy"
                                                        width={36}
                                                        height={36}
                                                        className={`h-6 w-6 sm:h-7 sm:w-7 object-contain shrink-0 ${skill.invertInDark ? "dark:invert" : ""}`}
                                                    />
                                                    <span className="font-mono text-[10px] uppercase leading-snug tracking-wide text-foreground/70 sm:text-xs whitespace-nowrap">
                                                        {skill.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="stats-reveal mt-12 border-t border-border pt-6">
                            <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-foreground/40 sm:text-[10px]">
                                Java · C++ · Python · AI · RAG · DSA · Open Source
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

