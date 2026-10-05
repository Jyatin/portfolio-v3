"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const contributions = [
  {
    date: "30 SEP 2026",
    project: "OpenDesign",
    status: "Open",
    title: "Devcontainer setup",
    description: "Added the initial development-container setup for a consistent contributor environment.",
    tech: ["Dev Containers", "Docker", "VS Code"],
    href: "https://github.com/Jyatin/open-design/pull/1",
    pr: "#1",
  },
  {
    date: "22 AUG 2026",
    project: "OpenFeature JS SDK",
    status: "Open",
    title: "Default values for missing flags",
    description: "Fixed React FeatureFlag fallback behavior for missing flags with FLAG_NOT_FOUND.",
    tech: ["TypeScript", "React", "Jest"],
    href: "https://github.com/open-feature/js-sdk/pull/1451",
    pr: "#1451",
  },
  {
    date: "25 AUG 2026",
    project: "Speech Dispatcher",
    status: "Merged",
    title: "Edge TTS output module",
    description: "Added Edge TTS voices and fixed the generic module shell requirement for pipefail.",
    tech: ["C", "Bash", "Linux"],
    href: "https://github.com/brailcom/speechd/pull/1110",
    pr: "#1110",
  },
  {
    date: "23 SEP 2026",
    project: "Shep AI",
    status: "Merged",
    title: "Fleet status bar placement",
    description: "Moved FleetControl into the dashboard header and added focused interaction tests.",
    tech: ["TypeScript", "React", "Next.js"],
    href: "https://github.com/shep-ai/shep/pull/891",
    pr: "#891",
  },
  {
    date: "25 AUG 2026",
    project: "OpenStory",
    status: "Merged",
    title: "Storybook MSW v3 migration",
    description: "Migrated Storybook MSW setup to v3 and fixed Windows Vite path resolution.",
    tech: ["TypeScript", "Storybook", "MSW"],
    href: "https://github.com/openstory-so/openstory/pull/1307",
    pr: "#1307",
  },
];

export default function OpenSource() {
  return (
    <section id="open-source" className="relative overflow-hidden bg-background py-12 text-foreground sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
        <div className="mb-8 sm:mb-10">
          <div className="mb-3 flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45 sm:text-xs">03 / Open Source</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="text-[clamp(2.8rem,6vw,6rem)] font-black uppercase leading-[0.84] tracking-tighter">Open Source</h2>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/45 sm:text-[10px]">
                <span><strong className="text-foreground">500+</strong> GitHub contributions</span>
                <span><strong className="text-foreground">8+</strong> merged PRs</span>
              </div>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-foreground/45 sm:text-sm">
              Selected contributions, with the change and stack at a glance.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {contributions.map((item, index) => (
            <motion.a
              key={`${item.project}-${item.date}`}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="group flex min-h-[190px] flex-col border border-border bg-muted/10 p-4 transition-colors duration-300 hover:border-foreground/25 hover:bg-muted/25 sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-foreground/35">{item.date}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.15em] text-foreground/50">
                  <span className={`h-1.5 w-1.5 rounded-full ${item.status === "Merged" ? "bg-emerald-400" : "bg-amber-300"}`} />
                  {item.status}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-foreground/45">{item.project}</span>
                <span className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/30 transition-colors group-hover:text-foreground/70">
                  PR {item.pr} <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>

              <h3 className="mt-2 text-base font-black uppercase leading-tight tracking-tight sm:text-lg">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-foreground/50">{item.description}</p>

              <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                {item.tech.map((tech) => (
                  <span key={tech} className="border border-border px-1.5 py-1 font-mono text-[7px] uppercase tracking-[0.1em] text-foreground/35">{tech}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-4 border-t border-border pt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/30 sm:text-[9px]">
          OpenStory · OpenFeature · Speech Dispatcher · Shep AI · OpenDesign
        </div>
      </div>
    </section>
  );
}
