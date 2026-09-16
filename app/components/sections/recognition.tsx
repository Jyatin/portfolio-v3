"use client";

import {
    BriefcaseBusiness,
    Code2,
    Flame,
    GitPullRequest,
} from "lucide-react";
import MilestoneCard from "../milestone-card";

const milestones = [
    {
        icon: Code2,
        year: "2026",
        category: "Problem Solving",
        title: "200+ LeetCode Problems",
        description:
            "Consistent DSA practice with Java as primary language for interview prep",
        iconClassName: "text-yellow-300",
    },
    {
        icon: Flame,
        year: "2026",
        category: "Consistency",
        title: "100-Day Streak",
        description:
            "Maintained a 100-day LeetCode practice streak building consistency in algorithms and data structures",
        iconClassName: "text-orange-300",
    },
    {
        icon: GitPullRequest,
        year: "2026",
        category: "Open Source",
        title: "5 Merged Open-Source PRs",
        description:
            "Contributed fixes and improvements across 120+ GitHub contributions, learning from real production codebases",
        iconClassName: "text-purple-300",
    },
    {
        icon: BriefcaseBusiness,
        year: "2026",
        category: "Software Engineering",
        title: "SDE Intern at KaHo Technologies",
        description:
            "Shipped 5+ production features for a customer-facing app, cutting form failure rates by 50%",
        iconClassName: "text-cyan-300",
    },
];

export default function Recognition() {
    return (
        <section
            id="recognition"
            className="relative overflow-hidden bg-background py-16 text-foreground sm:py-20 lg:py-28"
        >
            <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
                <div className="mb-10 sm:mb-14">
                    <div className="mb-3 flex items-center gap-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45 sm:text-xs">
                            05 / Recognition
                        </span>
                        <span className="h-px flex-1 bg-border" />
                    </div>

                    <h2 className="text-[clamp(2.8rem,7vw,7rem)] font-black uppercase leading-[0.85] tracking-tighter">
                        Recognition
                        <br />
                        &amp; Milestones
                    </h2>

                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/45 sm:text-base">
                        A focused record of problem solving, consistency, open-source contribution, and production engineering.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {milestones.map((milestone) => (
                        <MilestoneCard key={milestone.title} {...milestone} />
                    ))}
                </div>
            </div>
        </section>
    );
}
