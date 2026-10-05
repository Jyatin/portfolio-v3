"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, GitPullRequest, Radio } from "lucide-react";

const contributions = [
  {
    project: "OpenStory",
    category: "AI / Developer Tooling",
    status: "Merged",
    title: "Production contributions to OpenStory",
    description:
      "Contributed production fixes and improvements across the OpenStory codebase, including Storybook/MSW migration work and workflow experience improvements.",
    tech: ["TypeScript", "Storybook", "MSW", "Vite", "Git"],
    href: "https://github.com/openstory-so/openstory/pull/1307",
    icon: CheckCircle2,
  },
  {
    project: "Shep AI",
    category: "AI / Next.js",
    status: "Merged",
    title: "Fleet dashboard architecture & UX",
    description:
      "Improved the Control Center fleet status experience by moving fleet controls into dedicated dashboard chrome and adding focused interaction and data-loading tests.",
    tech: ["TypeScript", "Next.js", "React", "Vitest", "Git"],
    href: "https://github.com/shep-ai/shep/pull/891",
    icon: CheckCircle2,
  },
  {
    project: "OpenDesign",
    category: "Open Source / Design",
    status: "Active",
    title: "Currently contributing",
    description:
      "Actively working on OpenDesign alongside contributions to OpenStory and Shep AI, with a focus on practical product, frontend, and open-source engineering.",
    tech: ["TypeScript", "React", "UI/UX", "Open Source", "GitHub"],
    href: "https://github.com",
    icon: Radio,
  },
];

function StatusBadge({ status }: { status: string }) {
  const merged = status === "Merged";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-muted/40 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/55">
      <span className={`h-1.5 w-1.5 rounded-full ${merged ? "bg-emerald-400" : "bg-amber-300"}`} />
      {status}
    </span>
  );
}

export default function OpenSource() {
  return (
    <section id="open-source" className="relative overflow-hidden bg-background py-16 text-foreground sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
        <div className="mb-10 sm:mb-14">
          <div className="mb-4 flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45 sm:text-xs">
              03 / Open Source
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-end">
            <div>
              <h2 className="text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.84] tracking-tighter">
                Open
                <br />
                Source
              </h2>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50 sm:text-xs">
                <span><strong className="text-foreground">500+</strong> GitHub contributions</span>
                <span><strong className="text-foreground">8+</strong> merged PRs</span>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/50 sm:text-base">
              Building in real open-source codebases with maintainer review, production constraints, and ongoing contributions across AI, developer tooling, and frontend systems.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {contributions.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.project}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group flex min-h-[300px] flex-col rounded-sm border border-border bg-muted/20 p-5 transition-colors duration-300 hover:border-foreground/25 hover:bg-muted/35 sm:p-6"
              >
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-foreground/50" aria-hidden />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/50">{item.project}</span>
                  </div>
                  <StatusBadge status={item.status} />
                </div>

                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-foreground/30">{item.category}</span>
                <h3 className="mt-3 text-xl font-black uppercase leading-tight tracking-tight">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/55">{item.description}</p>

                <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 border-t border-border pt-4">
                  {item.tech.map((tech) => (
                    <span key={tech} className="font-mono text-[8px] uppercase tracking-[0.14em] text-foreground/35">
                      {tech}
                    </span>
                  ))}
                </div>

                {item.status === "Merged" && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex w-fit items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/55 transition-colors hover:text-foreground"
                  >
                    View merged PR
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </motion.article>
            );
          })}
        </div>

        <div className="mt-6 border-t border-border pt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/35">
          Also contributed to OpenFeature, Speech Dispatcher, MyString, Book Recommendation, First Contributions, and other community projects.
        </div>
      </div>
    </section>
  );
}
