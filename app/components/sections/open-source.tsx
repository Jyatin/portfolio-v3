"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Code2, GitPullRequest, Terminal } from "lucide-react";

const contributions = [
  {
    project: "OpenStory",
    category: "Storybook / MSW",
    status: "Merged",
    statusTone: "merged",
    title: "Migrated Storybook MSW setup to v3",
    description:
      "Migrated the Storybook mock-service-worker setup from msw-storybook-addon v2 to v3, replacing the removed initialize() flow with the v3 mswLoader approach and registering the addon correctly.",
    work:
      "Also fixed Windows/Vite path resolution in the Storybook server stub by converting the runtime path to a file URL, then verified Storybook startup, preview rendering, linting, formatting, dead-code checks, and typechecking.",
    learned:
      "Production dependency migration, platform-specific debugging, Storybook configuration, CI validation, and maintainer review in a real open-source workflow.",
    tech: ["TypeScript", "Storybook", "MSW", "Vite", "Testing", "Git"],
    href: "https://github.com/openstory-so/openstory/pull/1307",
    icon: CheckCircle2,
  },
  {
    project: "Shep",
    category: "Next.js / Dashboard",
    status: "Merged",
    statusTone: "merged",
    title: "Redesigned fleet status bar placement",
    description:
      "Fixed the Control Center fleet status bar by moving FleetControl out of the canvas overlay and into dedicated dashboard header chrome, preventing it from covering canvas nodes or competing with the canvas toolbar.",
    work:
      "Restored server-side fleet data loading with graceful fallback, kept the canvas in a separate flex region, removed the temporary mount-guard test, and added behavior-focused dashboard tests covering placement, fleet counts, triage interaction, and failed fleet-data loading.",
    learned:
      "Production UI architecture, server/client data flow, resilient rendering, focused integration testing, and maintainer-driven iteration in a TypeScript/Next.js codebase.",
    tech: ["TypeScript", "Next.js", "React", "Vitest", "Storybook", "Git"],
    href: "https://github.com/shep-ai/shep/pull/891",
    icon: CheckCircle2,
  },
  {
    project: "Speech Dispatcher",
    category: "Linux / Text-to-Speech",
    status: "Merged",
    statusTone: "merged",
    title: "Added Edge TTS generic output module",
    description:
      "Added an Edge TTS generic output module for Speech Dispatcher with multilingual voice mappings, dependency checks, and a pipe-based audio pipeline.",
    work:
      "Integrated edge-tts with mpg123 and the existing playback command, added module distribution entries, switched the shell execution path to bash for the pipeline, and documented Edge TTS support in the project README.",
    learned:
      "Linux audio architecture, CLI integration, dependency management, maintainer-driven iteration, and working safely inside an established systems project.",
    tech: ["C", "Bash", "Edge TTS", "Linux", "Audio", "Git"],
    href: "https://github.com/brailcom/speechd/pull/1110",
    icon: CheckCircle2,
  },
  {
    project: "OpenFeature JS SDK",
    category: "React / SDK",
    status: "Open",
    statusTone: "open",
    title: "Honor default values for missing feature flags",
    description:
      "Fixed the React FeatureFlag component so FLAG_NOT_FOUND does not incorrectly trigger the error fallback, allowing the normal evaluation path to honor the supplied defaultValue.",
    work:
      "Added regression coverage for a missing flag with defaultValue={true}; the pull request reports 7 test suites and 86 tests passing, plus git diff --check.",
    learned:
      "SDK semantics, edge-case debugging, localized production changes, and regression testing in an established TypeScript/React codebase.",
    tech: ["TypeScript", "React", "SDKs", "Feature Flags", "Jest", "GitHub"],
    href: "https://github.com/open-feature/js-sdk/pull/1451",
    icon: GitPullRequest,
  },
  {
    project: "OpenFeature JS SDK",
    category: "Specification / Testing",
    status: "Open",
    statusTone: "open",
    title: "Updated specification requirement references",
    description:
      "Updated outdated requirement labels in the server client test suite to match the revised OpenFeature specification numbering, without changing SDK behavior or test assertions.",
    work:
      "Updated the requirement references in packages/server/test/client.spec.ts and verified the focused server client test: 1 suite passed with 45 tests passing, alongside git diff --check.",
    learned:
      "Specification-driven development, test organization, focused verification, and making precise maintenance changes inside a mature SDK.",
    tech: ["TypeScript", "Jest", "Testing", "Specifications", "GitHub"],
    href: "https://github.com/open-feature/js-sdk/pull/1454",
    icon: Terminal,
  },
];

function StatusBadge({ status, tone }: { status: string; tone: string }) {
  const merged = tone === "merged";
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.18em] " +
        (merged
          ? "border-foreground/20 bg-foreground/5 text-foreground/65"
          : "border-foreground/15 bg-muted/50 text-foreground/50")
      }
    >
      <span className={"h-1.5 w-1.5 rounded-full " + (merged ? "bg-emerald-400" : "bg-amber-300")} />
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
              02 / Open Source
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-end">
            <h2 className="text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.84] tracking-tighter">
              Open
              <br />
              Source
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/50 sm:text-base">
              Real production codebases, real issues, real maintainer feedback. These contributions show how I work when the codebase is not mine and the solution has to fit an existing system.
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          {contributions.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.project + item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.18) }}
                className="group relative overflow-hidden rounded-sm border border-border bg-muted/20 p-5 transition-colors duration-300 hover:border-foreground/25 hover:bg-muted/35 sm:p-6 md:p-7"
              >
                <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-7 bg-border" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/45">{item.project}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/30">{item.category}</span>
                      <StatusBadge status={item.status} tone={item.statusTone} />
                    </div>

                    <div className="flex gap-4">
                      <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border bg-muted/50 sm:flex">
                        <Icon className="h-5 w-5 text-foreground/60" aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-xl font-black uppercase leading-tight tracking-tight sm:text-2xl md:text-[2rem]">{item.title}</h3>
                        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-foreground/60 md:text-base">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 border border-border px-3.5 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/65 transition-colors hover:border-foreground/35 hover:text-foreground"
                  >
                    View PR
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="mt-7 grid gap-6 border-t border-border pt-6 lg:grid-cols-2">
                  <div>
                    <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/35">
                      <Code2 className="h-3.5 w-3.5" />
                      What I worked on
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/55">{item.work}</p>
                  </div>
                  <div>
                    <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/35">Experience gained</div>
                    <p className="text-sm leading-relaxed text-foreground/55">{item.learned}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5">
                  {item.tech.map((tech) => (
                    <span key={tech} className="font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/40">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
