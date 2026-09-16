"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const techStacks = [
    { label: "Frontend", items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
    { label: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
    { label: "Database", items: ["MongoDB", "MySQL", "SQL"] },
    { label: "Tools", items: ["Git", "GitHub", "Docker", "VS Code"] },
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
        <section ref={sectionRef} id="about" className="relative min-w-0 overflow-hidden bg-background py-16 text-foreground sm:py-20 lg:py-28">
            <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <div className="stats-reveal mb-4 flex items-center gap-3">
                            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45">02 / About</span>
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
                                    <div className="text-3xl font-black tracking-tight sm:text-4xl">{value}</div>
                                    <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/45">{label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 space-y-7">
                            {techStacks.map((group) => (
                                <div key={group.label} className="stats-reveal grid gap-3 sm:grid-cols-4 sm:items-start sm:gap-6">
                                    <div className="text-2xl font-black uppercase leading-none tracking-tight text-foreground/35 sm:col-span-1 sm:text-3xl">{group.label}</div>
                                    <div className="flex flex-wrap gap-2 sm:col-span-3">
                                        {group.items.map((item) => (
                                            <span key={item} className="rounded-full border border-border bg-muted/30 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/65 sm:text-[10px]">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
