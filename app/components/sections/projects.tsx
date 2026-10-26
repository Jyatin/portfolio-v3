"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { createPortal } from "react-dom";

const emptySubscribe = () => () => {};
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type Project } from "@/app/data/projects";
import { releaseDocumentScroll } from "@/app/utils/release-document-scroll";
import {
    prefersHardNavigationToProjectDetail,
    projectDetailPath,
} from "@/app/utils/project-detail-navigation";
import { logPrefersHardNavContext, logProjectsScroll } from "@/app/utils/projects-scroll-debug";
import { useShootModeOn } from "@/app/utils/shoot-mode-store";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const DESKTOP_MQ = "(min-width: 1024px)";

function isValidExternalUrl(url?: string): boolean {
    if (!url) return false;
    const trimmed = url.trim();
    return trimmed.startsWith("http://") || trimmed.startsWith("https://");
}

function GithubIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function ExternalLinkIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
        </svg>
    );
}

function ArrowRightIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
    );
}

type DesktopLaptopShowcaseProps = {
    project: Project;
    activeIndex: number;
    totalCount: number;
    goToProject: (slug: string) => void;
    interactionsDisabled: boolean;
};

const DesktopLaptopShowcase = memo(function DesktopLaptopShowcase({
    project,
    activeIndex,
    totalCount,
    goToProject,
    interactionsDisabled,
}: DesktopLaptopShowcaseProps) {
    const hasLive = isValidExternalUrl(project.live);
    const hasGithub = isValidExternalUrl(project.github);

    return (
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-linear-to-b from-card/80 via-card/50 to-background/90 p-6 shadow-2xl backdrop-blur-md lg:p-8">
            {/* Corner tech accents */}
            <span
                className="pointer-events-none absolute left-3 top-3 z-30 h-3 w-3 border-l border-t border-primary/40"
                aria-hidden
            />
            <span
                className="pointer-events-none absolute right-3 top-3 z-30 h-3 w-3 border-r border-t border-primary/40"
                aria-hidden
            />
            <span
                className="pointer-events-none absolute bottom-3 left-3 z-30 h-3 w-3 border-l border-b border-primary/40"
                aria-hidden
            />
            <span
                className="pointer-events-none absolute bottom-3 right-3 z-30 h-3 w-3 border-r border-b border-primary/40"
                aria-hidden
            />

            {/* Subtle background glow */}
            <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06),transparent_70%)]"
                aria-hidden
            />

            {/* Top Bar inside showcase */}
            <div className="relative z-20 flex items-center justify-between border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                        {String(activeIndex + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-border" aria-hidden />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {project.year}
                    </span>
                    {project.isResearch ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-sky-300">
                            Research Project
                        </span>
                    ) : project.featured ? (
                        <span className="rounded-full border border-border bg-muted/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/60">
                            Primary Work
                        </span>
                    ) : null}
                </div>

                <div className="flex items-center gap-2">
                    {hasLive && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/90 transition-colors hover:border-foreground/40 hover:bg-muted"
                        >
                            <span>Live Demo</span>
                            <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                    )}
                    {hasGithub && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/90 transition-colors hover:border-foreground/40 hover:bg-muted"
                        >
                            <GithubIcon className="h-3 w-3" />
                            <span>Code</span>
                        </a>
                    )}
                </div>
            </div>

            {/* Central Laptop Mockup Container */}
            <div className="relative my-auto flex min-h-[300px] flex-1 items-center justify-center py-4">
                <button
                    type="button"
                    disabled={interactionsDisabled}
                    onClick={() => goToProject(project.slug)}
                    className="group/laptop relative w-full max-w-[940px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg"
                    title={`View case study for ${project.title}`}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.99 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="relative aspect-1376/768 w-full overflow-hidden rounded-lg drop-shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
                        >
                            <Image
                                src={project.image}
                                alt={`${project.title} on MacBook display`}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 65vw"
                                className="object-contain object-center transition-transform duration-500 ease-out group-hover/laptop:scale-[1.015]"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Subtle hover prompt */}
                    <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover/laptop:opacity-100">
                        <span className="rounded-full border border-white/20 bg-black/75 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/90 backdrop-blur-md">
                            Click to explore case study
                        </span>
                    </div>
                </button>
            </div>

            {/* Bottom active highlights & tech bar */}
            <div className="relative z-20 border-t border-border/60 pt-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-8">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full border border-border/80 bg-background/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/75"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-end lg:col-span-4">
                        <button
                            type="button"
                            disabled={interactionsDisabled}
                            onClick={() => goToProject(project.slug)}
                            className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-foreground"
                        >
                            <span>Read case study</span>
                            <ArrowRightIcon className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default function Projects() {
    const shootModeOn = useShootModeOn();
    const router = useRouter();
    const featured = useMemo(() => projects, []);
    const totalCount = featured.length;
    const sectionRef = useRef<HTMLElement>(null);
    const pinnedScrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const navTimeoutRef = useRef<number | null>(null);
    const lastScrubIndexRef = useRef(0);
    const scrubRafRef = useRef(0);
    const scrubQueuedIdxRef = useRef(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isNavigating, setIsNavigating] = useState(false);
    const [transitionKey, setTransitionKey] = useState(0);
    const portalReady = useSyncExternalStore(emptySubscribe, () => true, () => false);

    const activeProject = featured[activeIndex] ?? featured[0];

    const scrollToProject = useCallback(
        (index: number) => {
            if (shootModeOn) return;
            if (typeof window === "undefined") return;
            if (!window.matchMedia(DESKTOP_MQ).matches) return;

            const st = pinnedScrollTriggerRef.current;
            if (st) {
                const denom = Math.max(totalCount - 1, 1);
                const progress = index / denom;
                const targetScroll = st.start + (st.end - st.start) * progress;
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
            }
            lastScrubIndexRef.current = index;
            setActiveIndex(index);
        },
        [shootModeOn, totalCount],
    );

    const goToProject = useCallback(
        (slug: string) => {
            if (shootModeOn) return;
            if (isNavigating) return;

            const hard = prefersHardNavigationToProjectDetail();
            logProjectsScroll("home #projects goToProject click", {
                slug,
                hardNavigation: hard,
                targetPath: projectDetailPath(slug),
                ...logPrefersHardNavContext(),
            });

            if (hard) {
                window.location.assign(projectDetailPath(slug));
                return;
            }

            setIsNavigating(true);
            setTransitionKey((v) => v + 1);

            navTimeoutRef.current = window.setTimeout(() => {
                window.sessionStorage.setItem("route-transition-lock", "1");
                window.sessionStorage.setItem("project-transition-reveal", "1");
                router.push(projectDetailPath(slug));
            }, 550);
        },
        [isNavigating, router, shootModeOn],
    );

    useEffect(() => {
        return () => {
            if (navTimeoutRef.current !== null) {
                window.clearTimeout(navTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isNavigating) return;

        document.documentElement.classList.add("route-transition-lock");
        document.body.classList.add("route-transition-lock");
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        return () => {
            releaseDocumentScroll();
        };
    }, [isNavigating]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add(DESKTOP_MQ, () => {
                const pinScrollPx = () =>
                    Math.round(window.innerHeight * (1.6 + totalCount * 0.4));

                const st = ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    end: () => `+=${pinScrollPx()}`,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    fastScrollEnd: true,
                    onUpdate: (self) => {
                        const p = self.progress;
                        const idx =
                            totalCount <= 1
                                ? 0
                                : Math.min(
                                      Math.round(p * (totalCount - 1)),
                                      totalCount - 1,
                                  );
                        scrubQueuedIdxRef.current = idx;
                        if (scrubRafRef.current !== 0) return;
                        scrubRafRef.current = window.requestAnimationFrame(() => {
                            scrubRafRef.current = 0;
                            const i = scrubQueuedIdxRef.current;
                            if (i !== lastScrubIndexRef.current) {
                                lastScrubIndexRef.current = i;
                                setActiveIndex(i);
                            }
                        });
                    },
                });

                pinnedScrollTriggerRef.current = st;

                return () => {
                    pinnedScrollTriggerRef.current = null;
                    st.kill();
                };
            });
        }, sectionRef);

        return () => {
            if (scrubRafRef.current !== 0) {
                window.cancelAnimationFrame(scrubRafRef.current);
                scrubRafRef.current = 0;
            }
            pinnedScrollTriggerRef.current = null;
            ctx.revert();
        };
    }, [totalCount]);

    const transitionOverlay =
        portalReady && isNavigating
            ? createPortal(
                  <div
                      className="pointer-events-none fixed inset-0 z-9999 overflow-hidden"
                      data-project-transition-overlay
                      aria-hidden
                  >
                      <motion.div
                          key={transitionKey}
                          className="absolute inset-0 bg-[#0a0a0a]"
                          initial={{ y: "100%" }}
                          animate={{ y: ["100%", "0%", "0%"] }}
                          transition={{ duration: 1.15, times: [0, 0.24, 1], ease: "easeInOut" }}
                      />
                  </div>,
                  document.body,
              )
            : null;

    return (
        <>
            {transitionOverlay}
            <section
                ref={sectionRef}
                id="projects"
                data-shoot-scroll-interactive="1"
                className="projects-section scroll-mt-24 bg-background text-foreground"
                aria-label="Projects"
            >
                <div className="mx-auto w-full max-w-[1920px] px-5 py-12 sm:px-8 md:px-12 lg:h-screen lg:px-14 lg:py-8 xl:px-18">
                    {/* MOBILE LAYOUT (VERTICAL STACK) */}
                    <div className="lg:hidden">
                        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/50 sm:text-xs">
                            04 / Projects
                        </span>
                        <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter text-foreground sm:text-4xl md:text-5xl">
                            Featured Work
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/60 sm:text-base">
                            Production platforms, evidence systems, audio forensics, and research initiatives.
                        </p>

                        <div className="mt-10 flex flex-col gap-12 sm:gap-14">
                            {featured.map((project, index) => {
                                const hasLive = isValidExternalUrl(project.live);
                                const hasGithub = isValidExternalUrl(project.github);

                                return (
                                    <article
                                        key={project.slug}
                                        className="overflow-hidden rounded-xl border border-border/80 bg-card/60 p-5 shadow-sm sm:p-7"
                                    >
                                        {/* Mockup presentation */}
                                        <button
                                            type="button"
                                            disabled={shootModeOn}
                                            onClick={() => goToProject(project.slug)}
                                            className="group block w-full text-left outline-none"
                                        >
                                            <div className="relative aspect-1376/768 w-full overflow-hidden rounded-lg drop-shadow-md">
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    sizes="100vw"
                                                    priority={index === 0}
                                                    className="object-contain object-center transition-transform duration-300 group-hover:scale-[1.01]"
                                                />
                                            </div>

                                            <div className="mt-5 flex items-center justify-between">
                                                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                                                    {String(index + 1).padStart(2, "0")} / {String(totalCount).padStart(2, "0")}
                                                </span>
                                                {project.isResearch ? (
                                                    <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-sky-300">
                                                        Research Paper
                                                    </span>
                                                ) : (
                                                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                                        {project.year}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-3xl">
                                                {project.title}
                                            </h3>
                                            <p className="mt-1 font-mono text-xs uppercase leading-relaxed tracking-wider text-muted-foreground sm:text-sm">
                                                {project.subtitle}
                                            </p>

                                            {/* 3 bullet points */}
                                            <ul className="mt-5 space-y-2.5 border-t border-border/60 pt-4">
                                                {project.highlights.map((bullet) => (
                                                    <li
                                                        key={bullet}
                                                        className="relative pl-4 text-xs font-normal leading-relaxed text-foreground/75 sm:text-sm before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/70"
                                                    >
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Tech Stack */}
                                            <div className="mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                                                {project.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="rounded-full border border-border/70 bg-muted/60 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-foreground/80 sm:text-[10px]"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </button>

                                        {/* Action links */}
                                        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border/60 pt-4">
                                            {hasLive && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-background"
                                                >
                                                    <span>Live Demo</span>
                                                    <ExternalLinkIcon className="h-3 w-3" />
                                                </a>
                                            )}
                                            {hasGithub && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground"
                                                >
                                                    <GithubIcon className="h-3 w-3" />
                                                    <span>Code</span>
                                                </a>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => goToProject(project.slug)}
                                                className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                                            >
                                                <span>Case Study</span>
                                                <ArrowRightIcon className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        <div className="mt-12 border-t border-border pt-8 text-center sm:mt-14">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-3 bg-foreground px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-foreground/85"
                            >
                                View all projects archive
                            </Link>
                        </div>
                    </div>

                    {/* DESKTOP FULL-SCREEN GALLERY WITH REALISTIC LAPTOP SHOWCASE */}
                    <div className="hidden h-full flex-col justify-between lg:flex">
                        <div className="flex h-full min-h-0 gap-8 xl:gap-12">
                            {/* LEFT COLUMN: Section header + active project details + project switcher */}
                            <div className="flex w-[380px] shrink-0 flex-col h-full min-h-0 xl:w-[440px]">
                                <div className="shrink-0 mb-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/50">
                                            04 / Projects
                                        </span>
                                        <Link
                                            href="/projects"
                                            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            All ({totalCount}) →
                                        </Link>
                                    </div>
                                    <h2 className="mt-1 text-2xl font-black uppercase leading-[0.95] tracking-tighter text-foreground xl:text-3xl">
                                        Featured Work
                                    </h2>
                                </div>

                                {/* Active project detail card with scrollable boundary if height is constrained */}
                                <div className="flex-1 min-h-0 overflow-y-auto py-1 pr-1">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeProject.slug}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.25, ease: "easeOut" }}
                                            className="space-y-3"
                                        >
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                                                        {String(activeIndex + 1).padStart(2, "0")}
                                                    </span>
                                                    {activeProject.isResearch && (
                                                        <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-sky-300">
                                                            Research
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="mt-1 text-xl font-black uppercase leading-tight tracking-tight text-foreground xl:text-2xl">
                                                    {activeProject.title}
                                                </h3>
                                                <p className="mt-1 font-mono text-xs uppercase leading-snug tracking-wider text-muted-foreground">
                                                    {activeProject.subtitle}
                                                </p>
                                            </div>

                                            {/* Three strong bullet points */}
                                            <ul className="space-y-2 border-t border-border/70 pt-2.5">
                                                {activeProject.highlights.map((item) => (
                                                    <li
                                                        key={item}
                                                        className="relative pl-3.5 text-xs font-normal leading-relaxed text-foreground/80 xl:text-[13px] before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/70"
                                                    >
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Action buttons */}
                                            <div className="flex flex-wrap items-center gap-2 pt-2">
                                                {isValidExternalUrl(activeProject.live) && (
                                                    <a
                                                        href={activeProject.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-background transition-transform hover:scale-[1.02]"
                                                    >
                                                        <span>Live Demo</span>
                                                        <ExternalLinkIcon className="h-3 w-3" />
                                                    </a>
                                                )}
                                                {isValidExternalUrl(activeProject.github) && (
                                                    <a
                                                        href={activeProject.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-foreground/40 hover:bg-muted"
                                                    >
                                                        <GithubIcon className="h-3 w-3" />
                                                        <span>Code</span>
                                                    </a>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => goToProject(activeProject.slug)}
                                                    className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-transparent px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground"
                                                >
                                                    <span>Case Study</span>
                                                    <ArrowRightIcon className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Project Switcher thumbnails / pill buttons */}
                                <div className="mt-2 shrink-0 border-t border-border/60 pt-2">
                                    <div className="flex flex-col gap-0.5">
                                        {featured.map((p, index) => {
                                            const isActive = activeIndex === index;
                                            return (
                                                <button
                                                    key={p.slug}
                                                    type="button"
                                                    disabled={shootModeOn}
                                                    onClick={() => scrollToProject(index)}
                                                    className={`group flex items-center justify-between rounded px-2.5 py-1 text-left text-[11px] transition-colors ${
                                                        isActive
                                                            ? "bg-muted font-semibold text-foreground"
                                                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2 truncate">
                                                        <span className="font-mono text-[9px] uppercase tracking-wider text-primary/80">
                                                            {String(index + 1).padStart(2, "0")}
                                                        </span>
                                                        <span className="truncate">{p.title}</span>
                                                    </div>
                                                    {p.isResearch ? (
                                                        <span className="ml-2 shrink-0 font-mono text-[8px] uppercase tracking-wider text-sky-400">
                                                            Research
                                                        </span>
                                                    ) : (
                                                        <span className="ml-2 shrink-0 font-mono text-[9px] uppercase tracking-wider text-foreground/40">
                                                            {p.tech[0]}
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Realistic Central Laptop Mockup Showcase */}
                            <div className="min-h-0 flex-1">
                                <DesktopLaptopShowcase
                                    project={activeProject}
                                    activeIndex={activeIndex}
                                    totalCount={totalCount}
                                    goToProject={goToProject}
                                    interactionsDisabled={shootModeOn}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
