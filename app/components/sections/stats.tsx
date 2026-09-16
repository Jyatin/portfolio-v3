"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const techStacks = [
    {
        label: "Frontend",
        items: [
            ["JavaScript", "javascript"],
            ["TypeScript", "typescript"],
            ["React", "react"],
            ["Next.js", "nextdotjs"],
            ["HTML", "html5"],
            ["CSS", "css"],
            ["Tailwind CSS", "tailwindcss"],
        ],
    },
    {
        label: "Backend",
        items: [
            ["Node.js", "nodedotjs"],
            ["Express.js", "express"],
            ["REST APIs", "rest"],
        ],
    },
    {
        label: "Database",
        items: [
            ["MongoDB", "mongodb"],
            ["MySQL", "mysql"],
            ["SQL", "postgresql"],
        ],
    },
    {
        label: "Tools",
        items: [
            ["Git", "git"],
            ["GitHub", "github"],
            ["Docker", "docker"],
            ["VS Code", "visualstudiocode"],
        ],
    },
] as const;

const metrics = [
    ["200+", "LeetCode"],
    ["100", "Day Streak"],
    ["150+", "GFG / Codeforces"],
    ["5", "Merged PRs"],
];

function SkillItem({ name, icon }: { name: string; icon: string }) {
    return (
        <div className="group flex items-center gap-3 py-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-muted/10">
                <img
                    src={`https://cdn.simpleicons.org/${icon}`}
                    alt=""
                    width={24}
                    height={24}
                    loading="lazy"
                    className="h-6 w-6 object-contain transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/55 transition-colors group-hover:text-foreground sm:text-[11px]">
                {name}
            </span>
        </div>
    );
}

export default function Stats() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const root = sectionRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            gsap.from(".stats-reveal", {
                scrollTrigger: { trigger: root, start: "top 78%", once: true },
                opacity: 0,
                y: 28,
                duration: 0.55,
                stagger: 0.06,
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
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <div className="stats-reveal mb-4 flex items-center gap-3">
                            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45 sm:text-xs">
                                03 / About
                            </span>
                            <div className="h-px flex-1 bg-border" />
                        </div>

                        <h2 className="stats-reveal text-[clamp(2.7rem,7vw,6.5rem)] font-black uppercase leading-[0.88] tracking-tighter">
                            Code.
                            <br />
                            Solve.
                            <br />
                            Build.
                        </h2>

                        <p className="stats-reveal mt-7 max-w-xl text-base leading-relaxed text-foreground/65 sm:text-lg">
                            I'm Jyatin Kumar Singh, a B.Tech Computer Science student at Lovely Professional University, graduating in 2028. I build full-stack applications, practise DSA, explore AI/RAG systems, and contribute to open source.
                        </p>

                        <p className="stats-reveal mt-4 max-w-xl text-sm leading-relaxed text-foreground/45 sm:text-base">
                            My main stack is JavaScript/TypeScript, React, Node.js, Express.js and MongoDB, with C++ and Java for problem solving. I enjoy taking an idea from a rough concept to a working product.
                        </p>
                    </div>

                    <div className="lg:col-span-7 lg:pt-10">
                        <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
                            {metrics.map(([value, label]) => (
                                <div key={label} className="stats-reveal bg-background p-5 sm:p-6">
                                    <div className="text-3xl font-black tracking-tight sm:text-4xl">
                                        {value}
                                    </div>
                                    <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/45">
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 grid gap-10 sm:grid-cols-2">
                            {techStacks.map((group) => (
                                <div key={group.label} className="stats-reveal">
                                    <h3 className="mb-5 text-xl font-black uppercase tracking-tight text-foreground/80 sm:text-2xl">
                                        {group.label}
                                    </h3>

                                    <div className="grid grid-cols-1 gap-1">
                                        {group.items.map(([name, icon]) => (
                                            <SkillItem key={name} name={name} icon={icon} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="stats-reveal mt-10 border-t border-border pt-7">
                            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/30 sm:text-[10px]">
                                Java · C++ · Python · AI · RAG · DSA
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
