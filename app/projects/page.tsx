"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/app/data/projects";
import { releaseDocumentScroll } from "@/app/utils/release-document-scroll";
import {
    prefersHardNavigationToProjectDetail,
    projectDetailPath,
} from "@/app/utils/project-detail-navigation";
import {
    logPrefersHardNavContext,
    logProjectsScroll,
} from "@/app/utils/projects-scroll-debug";

function isValidExternalUrl(url?: string): boolean {
    if (!url) return false;
    const trimmed = url.trim();
    return trimmed.startsWith("http://") || trimmed.startsWith("https://");
}

type ProjectGridCardProps = {
    project: Project;
    index: number;
    onSelect: (slug: string) => void;
};

const ProjectGridCard = memo(function ProjectGridCard({
    project,
    index,
    onSelect,
}: ProjectGridCardProps) {
    const hasLive = isValidExternalUrl(project.live);
    const hasGithub = isValidExternalUrl(project.github);

    return (
        <article
            className="flex flex-col justify-between min-w-0 w-full overflow-hidden rounded-xl border border-border/80 bg-card/60 p-5 shadow-sm transition-all duration-300 hover:border-foreground/30 hover:shadow-md sm:p-6"
        >
            <div>
                <button
                    type="button"
                    onClick={() => onSelect(project.slug)}
                    className="group w-full cursor-pointer text-left outline-none"
                >
                    <div className="relative isolate aspect-1376/768 w-full overflow-hidden rounded-lg border border-border/70 bg-muted/30">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            quality={85}
                            className="object-contain object-center transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
                            priority={index === 0}
                        />
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                        </span>
                        {project.isResearch ? (
                            <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-sky-300">
                                Research Paper
                            </span>
                        ) : project.featured ? (
                            <span className="rounded-full border border-border bg-muted/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-foreground/60">
                                Featured
                            </span>
                        ) : (
                            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                {project.year}
                            </span>
                        )}
                    </div>
                    <h2 className="mt-2 text-xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-2xl">
                        {project.title}
                    </h2>
                    <p className="mt-1 font-mono text-xs uppercase leading-relaxed tracking-wider text-muted-foreground">
                        {project.subtitle}
                    </p>

                    <ul className="mt-4 space-y-2 border-t border-border/60 pt-3">
                        {project.highlights.map((highlight) => (
                            <li
                                key={highlight}
                                className="relative pl-3.5 text-xs font-normal leading-relaxed text-foreground/75 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-primary/70"
                            >
                                {highlight}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                className="rounded-full border border-border/70 bg-muted/50 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/80"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
                <div className="flex items-center gap-2">
                    {hasLive && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-background hover:bg-foreground/85"
                        >
                            Live Demo
                        </a>
                    )}
                    {hasGithub && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground hover:bg-muted"
                        >
                            GitHub
                        </a>
                    )}
                </div>
                <button
                    type="button"
                    onClick={() => onSelect(project.slug)}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
                >
                    Case Study →
                </button>
            </div>
        </article>
    );
});

export default function ProjectsPage() {
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);
    const [transitionKey, setTransitionKey] = useState(0);
    const navTimeoutRef = useRef<number | null>(null);

    const navigateToProject = useCallback(
        (slug: string) => {
            if (isNavigating) return;

            const hard = prefersHardNavigationToProjectDetail();
            logProjectsScroll("/projects card click", {
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
            setTransitionKey((value) => value + 1);

            navTimeoutRef.current = window.setTimeout(() => {
                window.sessionStorage.setItem("route-transition-lock", "1");
                window.sessionStorage.setItem("project-transition-reveal", "1");
                router.push(projectDetailPath(slug));
            }, 550);
        },
        [isNavigating, router],
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

    return (
        <main className="min-h-screen w-full overflow-x-hidden border-t border-border bg-background text-foreground">
            {isNavigating && (
                <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden">
                    <motion.div
                        key={transitionKey}
                        className="absolute inset-0 bg-[#0a0a0a]"
                        initial={{ y: "100%" }}
                        animate={{
                            y: ["100%", "0%", "0%"],
                        }}
                        transition={{
                            duration: 1.15,
                            times: [0, 0.24, 1],
                            ease: "easeInOut",
                        }}
                    />
                </div>
            )}

            <section
                className="projects-page-section mx-auto max-w-[1920px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 lg:py-24 xl:px-24"
                aria-label="All projects"
            >
                <header className="mb-10 max-w-2xl md:mb-14 lg:mb-16">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45 sm:text-[11px]">
                            Portfolio
                        </span>
                        <span className="hidden h-px w-8 bg-border sm:block" aria-hidden />
                        <Link
                            href="/"
                            className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/40 transition-colors hover:text-foreground/70 sm:text-[11px]"
                        >
                            Back to home
                        </Link>
                    </div>
                    <h1 className="mt-4 text-3xl font-black uppercase leading-[0.95] tracking-tighter text-foreground sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
                        All Projects
                    </h1>
                    <p className="mt-5 text-sm leading-relaxed text-foreground/55 sm:text-base md:text-lg">
                        Full list of work, built with the same focus on reliable systems, machine learning, and product craft. Open any card for the full case study.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:gap-x-10 lg:gap-y-14 xl:grid-cols-3">
                    {projects.map((project, index) => (
                        <ProjectGridCard
                            key={project.slug}
                            project={project}
                            index={index}
                            onSelect={navigateToProject}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
