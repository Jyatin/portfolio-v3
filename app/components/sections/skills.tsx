"use client";

import React from "react";

const skillGroups = [
    {
        title: "Frontend",
        skills: [
            ["JavaScript", "javascript"],
            ["TypeScript", "typescript"],
            ["React", "react"],
            ["Next.js", "nextdotjs"],
            ["Tailwind CSS", "tailwindcss"],
        ],
    },
    {
        title: "Backend",
        skills: [
            ["Node.js", "nodedotjs"],
            ["Express.js", "express"],
            ["Laravel", "laravel"],
            ["PHP", "php"],
            ["REST APIs", "fastapi"],
        ],
    },
    {
        title: "Database",
        skills: [
            ["MongoDB", "mongodb"],
            ["MySQL", "mysql"],
            ["PostgreSQL", "postgresql"],
            ["Redis", "redis"],
        ],
    },
];

const iconUrl = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

function SkillItem({ name, icon }: { name: string; icon: string }) {
    return (
        <div className="group flex items-center gap-3 rounded-sm py-2 pr-4 transition-transform duration-300 hover:-translate-y-0.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border bg-foreground/[0.025] p-2.5">
                <img
                    src={iconUrl(icon)}
                    alt=""
                    width={28}
                    height={28}
                    loading="lazy"
                    decoding="async"
                    className="h-7 w-7 object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55 transition-colors duration-300 group-hover:text-foreground sm:text-xs">
                {name}
            </span>
        </div>
    );
}

export default function Skills() {
    return (
        <section
            id="skills"
            aria-label="Technical skills"
            className="relative overflow-hidden bg-background py-16 text-foreground sm:py-20 md:py-24 lg:py-28"
        >
            <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-14 xl:px-18 2xl:max-w-none 2xl:pl-24 2xl:pr-24">
                <div className="mb-12 flex items-center gap-4 sm:mb-14 md:mb-16">
                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45 sm:text-xs">
                        Skills
                    </span>
                    <span className="h-px flex-1 bg-border" />
                </div>

                <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
                    {skillGroups.map((group) => (
                        <div key={group.title}>
                            <h2 className="text-3xl font-black uppercase leading-none tracking-tighter text-foreground/80 sm:text-4xl lg:text-5xl">
                                {group.title}
                            </h2>
                            <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1">
                                {group.skills.map(([name, icon]) => (
                                    <SkillItem key={name} name={name} icon={icon} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-14 border-t border-border pt-8 sm:mt-16">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30 sm:text-xs">
                        C++ · Java · Python · Git · GitHub · Docker · AI · RAG · DSA
                    </p>
                </div>
            </div>
        </section>
    );
}
