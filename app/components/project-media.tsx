"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/app/data/projects";

type ProjectMediaProps = {
    project: Project;
    priority?: boolean;
    sizes: string;
    className?: string;
};

// These legacy assets are SVG documents stored with a .jpg extension.
// Next/Image correctly rejects them as raster images, so load the trusted
// same-origin SVG text and render it inline instead.
const INLINE_SVG_PROJECTS = new Set(["jaldrishti", "cropcycle", "portfolio-v3"]);

export default function ProjectMedia({
    project,
    priority = false,
    sizes,
    className = "object-cover object-center",
}: ProjectMediaProps) {
    const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
    const shouldInline = INLINE_SVG_PROJECTS.has(project.slug);

    useEffect(() => {
        if (!shouldInline) return;

        let cancelled = false;
        fetch(project.image, { cache: "force-cache" })
            .then((response) => {
                if (!response.ok) throw new Error(`Failed to load ${project.image}`);
                return response.text();
            })
            .then((text) => {
                if (!cancelled && text.trimStart().startsWith("<svg")) {
                    setSvgMarkup(text);
                }
            })
            .catch(() => {
                if (!cancelled) setSvgMarkup(null);
            });

        return () => {
            cancelled = true;
        };
    }, [project.image, shouldInline]);

    if (shouldInline && svgMarkup) {
        return (
            <div
                className="h-full w-full overflow-hidden [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
                aria-label={project.title}
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />
        );
    }

    return (
        <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={sizes}
            quality={75}
            priority={priority}
            className={className}
            unoptimized={shouldInline}
        />
    );
}
