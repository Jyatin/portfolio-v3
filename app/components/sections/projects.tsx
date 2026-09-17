"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
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

const FEATURED_COUNT = 4;
const DESKTOP_MQ = "(min-width: 1024px)";

function categoryLabel(project: Project): string {
    const primary = project.tech[0] ?? "Build";
    const secondary = project.tech[1] ?? project.year;
    return `[${primary.toUpperCase()}] — [${secondary.toUpperCase()}]`;
}

function projectTagsLine(project: Project): string {
    const tags = project.tech.slice(0, 3).map((t) => `[${t.toUpperCase()}]`);
    if (tags.length === 0) {
        return `[${project.year}]`;
    }
    return tags.join(" — ");
}

type DesktopGalleryProps = {
    viewportRef: RefObject<HTMLDivElement | null>;
    trackRef: RefObject<HTMLDivElement | null>;
    featured: readonly Project[];
    activeIndex: number;
    viewportShell: string;
    goToProject: (slug: string) => void;
    interactionsDisabled: boolean;
};

const ProjectsDesktopGallery = memo(function ProjectsDesktopGallery({
    viewportRef,
    trackRef,
    featured,
    activeIndex,
    viewportShell,
    goToProject,
    interactionsDisabled,
}: DesktopGalleryProps) {
    const project = featured[activeIndex] ?? featured[0];
    const slug = project?.slug ?? "";
    const sourceTitle = project?.title ?? "";
    const [typedTitle, setTypedTitle] = useState(sourceTitle);

    useEffect(() => {
        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            setTypedTitle(sourceTitle);
            return;
        }

        if (!sourceTitle) {
            setTypedTitle("");
            return;
        }

        setTypedTitle("");
        let i = 0;
        const intervalId = window.setInterval(() => {
            i += 1;
            setTypedTitle(sourceTitle.slice(0, i));
            if (i >= sourceTitle.length) {
                window.clearInterval(intervalId);
            }
        }, 28);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [sourceTitle]);

    return (
        <div
            className={`group/shell relative flex w-full flex-col overflow-hidden p-3 sm:p-4 ${viewportShell}`}
        >
            <span
                className="pointer-events-none absolute left-4 top-4 z-30 h-3 w-3 border-l border-t border-foreground/25 opacity-60 transition-opacity duration-300 group-hover/shell:opacity-100 sm:left-5 sm:top-5"
                aria-hidden
            />
            <span
                className="pointer-events-none absolute right-4 top-4 z-30 h-3 w-3 border-r border-t border-foreground/25 opacity-60 transition-opacity duration-300 group-hover/shell:opacity-100 sm:right-5 sm:top-5"
                aria-hidden
            />
            <span
                className="pointer-events-none absolute bottom-4 left-4 z-30 h-3 w-3 border-l border-b border-foreground/25 opacity-60 transition-opacity duration-300 group-hover/shell:opacity-100 sm:bottom-5 sm:left-5"
                aria-hidden
            />
            <span
                className="pointer-events-none absolute bottom-4 right-4 z-30 h-3 w-3 border-r border-b border-foreground/25 opacity-60 transition-opacity duration-300 group-hover/shell:opacity-100 sm:right-5 sm:bottom-5"
                aria-hidden
            />

            <div ref={viewportRef} className="relative min-h-0 w-full flex-1 overflow-hidden">
                <div
                    ref={trackRef}
                    className="absolute inset-0 flex flex-col gap-5 will-change-transform sm:gap-6 lg:gap-8"
                >
                    {featured.map((p, index) => (
                        <div
                            key={p.slug}
                            className="group/card h-full min-h-0 shrink-0 overflow-hidden rounded-sm border border-border bg-background shadow-sm transition-shadow duration-300 group-hover/shell:shadow-[0_28px_60px_-34px_rgb(0_0_0/.2)]"
                        >
                            <button
                                type="button"
                                disabled={interactionsDisabled}
                                onClick={() => goToProject(p.slug)}
                                className="flex h-full min-h-0 w-full cursor-pointer flex-col text-left outline-none ring-foreground/40 focus-visible:ring-2 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <div className="relative min-h-0 h-full flex-1 overflow-hidden bg-muted">
                                    <div className="relative h-full w-full origin-center transition-transform duration-550 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover/card:scale-[1.03] motion-reduce:group-hover/card:scale-100">
                                        <Image
                                            src={p.image}
                                            alt={p.title}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 65vw"
                                            className="object-contain object-center"
                                            priority={index === 0}
                                            unoptimized={p.slug === "jaldrishti"}
                                        />
                                    </div>
                                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/5" />
                                </div>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between">
                    <div className="bg-linear-to-b from-black/75 via-black/35 to-transparent px-4 pb-16 pt-4 sm:px-5 sm:pb-20 sm:pt-5">
                        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/55 sm:text-[10px]">
                            {String(activeIndex + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                        </p>
                        <h3
                            className="mt-3 min-h-[2.6em] max-w-[95%] font-black uppercase leading-[0.95] tracking-tight text-white text-[clamp(1.15rem,2.1vw,1.85rem)] wrap-break-word sm:min-h-[2.4em] lg:max-w-[90%]"
                            aria-live="polite"
                        >
                            {typedTitle}
                        </h3>
                        <div className="mt-2 min-h-5 max-w-full">
                            <p
                                key={`${slug}-cat`}
                                className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-white/65 sm:text-[10px] sm:tracking-[0.2em] wrap-break-word"
                            >
                                {categoryLabel(project)}
                            </p>
                        </div>
                        <div key={`${slug}-tech`} className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                            {project.tech.slice(0, 4).map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-white/85 sm:text-[9px]"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-linear-to-t from-black/80 via-black/45 to-transparent px-4 pb-3 pt-14 sm:px-5 sm:pb-4 sm:pt-16">
                        <ul className="mb-4 space-y-1.5">
                            {project.highlights.slice(0, 3).map((highlight) => (
                                <li
                                    key={highlight}
                                    className="pl-3 font-mono text-[8px] leading-relaxed tracking-[0.08em] text-white/70 before:absolute before:-ml-3 before:mt-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-white/60 sm:text-[9px]"
                                >
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-1.5 sm:gap-2">
                            {featured.map((p, i) => (
                                <div
                                    key={p.slug}
                                    className="h-0.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/20"
                                    title={p.title}
                                >
                                    <div
                                        className="h-full origin-left rounded-full bg-white transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                                        style={{
                                            transform: `scaleX(${i === activeIndex ? 1 : i < activeIndex ? 1 : 0.2})`,
                                            opacity: i === activeIndex ? 1 : i < activeIndex ? 0.55 : 0.35,
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="sr-only">
                            Project {activeIndex + 1} of {featured.length}. {project.title}.
                        </p>
                        <p className="mt-2 text-center font-mono text-[8px] uppercase tracking-[0.28em] text-white/50 sm:text-[9px]">
                            Scroll to scrub · Click a project to open
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});
