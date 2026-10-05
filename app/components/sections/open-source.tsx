"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, CircleDot } from "lucide-react";

const contributions = [
  {
    date: "30 SEP 2026",
    project: "OpenDesign",
    status: "Open",
    title: "Initial devcontainer configuration",
    description: "Added the initial development-container setup so contributors can get a consistent local environment for the project.",
    tech: ["Dev Containers", "Docker", "VS Code", "Git"],
    href: "https://github.com/Jyatin/open-design/pull/1",
  },
  {
    date: "22 AUG 2026",
    project: "OpenFeature JS SDK",
    status: "Open",
    title: "Honor default values for missing flags",
    description: "Fixed the React FeatureFlag path so a missing flag with FLAG_NOT_FOUND can correctly fall back to the supplied defaultValue instead of rendering the error fallback.",
    tech: ["TypeScript", "React", "Jest", "OpenFeature"],
    href: "https://github.com/open-feature/js-sdk/pull/1451",
  },
  {
    date: "25 AUG 2026",
    project: "Speech Dispatcher",
    status: "Merged",
    title: "Add Edge TTS generic output module",
    description: "Added Edge TTS module configuration with en-US, hi-IN, bn-IN and gu-IN voices, and fixed the generic module shell requirement for pipefail.",
    tech: ["C", "Bash", "Edge TTS", "Linux", "WSL2"],
    href: "https://github.com/brailcom/speechd/pull/1110",
  },
  {
    date: "23 SEP 2026",
    project: "Shep AI",
    status: "Merged",
    title: "Redesign fleet status bar placement",
    description: "Moved FleetControl into the dashboard header so it no longer overlays the Control Center canvas, restored server-side fleet loading fallback, and added focused interaction tests.",
    tech: ["TypeScript", "React", "Next.js", "Storybook", "Testing"],
    href: "https://github.com/shep-ai/shep/pull/891",
  },
  {
    date: "25 AUG 2026",
    project: "OpenStory",
    status: "Merged",
    title: "Migrate Storybook MSW setup to v3",
    description: "Migrated the Storybook MSW configuration to the v3 API, replaced initialize() with mswLoader, registered the addon, and fixed Windows Vite path resolution.",
    tech: ["TypeScript", "Storybook", "MSW", "Vite", "Git"],
    href: "https://github.com/openstory-so/openstory/pull/1307",
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
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45 sm:text-xs">03 / Open Source</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-end">
            <div>
              <h2 className="text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.84] tracking-tighter">
                Open<br />Source
              </h2>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50 sm:text-xs">
                <span><strong className="text-foreground">500+</strong> GitHub contributions</span>
                <span><strong className="text-foreground">8+</strong> merged PRs</span>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/50 sm:text-base">
              Selected contributions — what I changed, where I changed it, and the stack behind the work.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-5 left-[11px] top-5 hidden w-px bg-border lg:block" aria-hidden />
          <div className="space-y-4">
            {contributions.map((item, index) => {
              const merged = item.status === "Merged";
              return (
                <motion.article
                  key={`${item.project}-${item.date}`}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative grid gap-4 border border-border bg-muted/15 p-5 transition-colors duration-300 hover:border-foreground/25 hover:bg-muted/30 lg:grid-cols-[120px_18px_minmax(0,1fr)_auto] lg:items-start lg:gap-5 lg:p-6"
                >
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/35 lg:pt-1">{item.date}</div>
                  <div className="hidden lg:flex lg:justify-center lg:pt-1">
                    {merged ? <CheckCircle2 className="h-4 w-4 text-foreground/55" /> : <CircleDot className="h-4 w-4 text-foreground/45" />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/45">{item.project}</span>
                      <StatusBadge status={item.status} />
                    </div>
                    <h3 className="mt-2 text-lg font-black uppercase leading-tight tracking-tight sm:text-xl">{item.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/55">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tech.map((tech) => (
                        <span key={tech} className="border border-border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/40">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <a href={item.href} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground/50 transition-colors hover:text-foreground lg:pt-1">
                    PR #{item.project === "OpenDesign" ? "1" : item.project === "OpenFeature JS SDK" ? "1451" : item.project === "Speech Dispatcher" ? "1110" : item.project === "Shep AI" ? "891" : "1307"}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/35">
          Other contributions: OpenStory, OpenFeature, Speech Dispatcher, MyString, Book Recommendation, First Contributions, and community projects.
        </div>
      </div>
    </section>
  );
}
