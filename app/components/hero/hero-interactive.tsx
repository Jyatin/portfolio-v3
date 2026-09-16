"use client";

import * as React from "react";
import Link from "next/link";
import { m, type Variants } from "framer-motion";
import { useHydrationSafeReducedMotion } from "@/app/hooks/use-hydration-safe-reduced-motion";
import { cn } from "@/lib/utils";

export const HERO_MOTION_ORIGIN: React.CSSProperties = { transformOrigin: "center" };
export type HeroEnterDrift = "left" | "right" | "center";

/**
 * Keep the hero content visible even if Framer Motion does not get a chance to
 * run its entrance animation (slow device, hydration interruption, disabled
 * motion, or a runtime error elsewhere). Motion should enhance the page, not
 * be responsible for making the page content visible.
 */
function driftItemVariants(reduceMotion: boolean, drift: HeroEnterDrift): Variants {
    const xHidden = drift === "left" ? 28 : drift === "right" ? -28 : 0;

    if (reduceMotion) {
        return {
            hidden: { opacity: 1, x: 0, y: 0 },
            visible: { opacity: 1, x: 0, y: 0 },
        };
    }

    return {
        // IMPORTANT: never hide hero content while waiting for animation.
        // The previous opacity: 0 caused the entire hero to appear blank when
        // the animation did not initialize correctly on the deployed page.
        hidden: { opacity: 1, x: xHidden, y: drift === "center" ? 10 : 0 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] },
        },
    };
}

export function HeroMotionRoot({ children, className }: { children: React.ReactNode; className?: string }): React.JSX.Element {
    const reduceMotion = useHydrationSafeReducedMotion();
    const containerVariants = React.useMemo<Variants>(() => ({
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.025 } },
    }), [reduceMotion]);

    return (
        <m.div
            className={cn(className, "transform-gpu")}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {children}
        </m.div>
    );
}

export function HeroEnterBlock({ children, className, drift = "center" }: { children: React.ReactNode; className?: string; drift?: HeroEnterDrift }): React.JSX.Element {
    const reduceMotion = useHydrationSafeReducedMotion();
    const variants = React.useMemo(() => driftItemVariants(!!reduceMotion, drift), [reduceMotion, drift]);

    return (
        <m.div
            className={cn(className, "transform-gpu")}
            variants={variants}
            style={HERO_MOTION_ORIGIN}
        >
            {children}
        </m.div>
    );
}

export function HeroEnterSplitRow({ className, left, right }: { className?: string; left: React.ReactNode; right: React.ReactNode }): React.JSX.Element {
    const reduceMotion = useHydrationSafeReducedMotion();
    const rowVariants = React.useMemo<Variants>(() => ({
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.018 } },
    }), [reduceMotion]);
    const leftVariants = React.useMemo(() => driftItemVariants(!!reduceMotion, "left"), [reduceMotion]);
    const rightVariants = React.useMemo(() => driftItemVariants(!!reduceMotion, "right"), [reduceMotion]);

    return (
        <m.div className={cn("grid grid-cols-[1fr_auto] items-start gap-4", className)} variants={rowVariants}>
            <m.div variants={leftVariants} style={HERO_MOTION_ORIGIN} className="min-w-0 transform-gpu">{left}</m.div>
            <m.div variants={rightVariants} style={HERO_MOTION_ORIGIN} className="shrink-0 transform-gpu">{right}</m.div>
        </m.div>
    );
}

export function HeroBackdrop(): React.JSX.Element {
    return (
        <div
            className="pointer-events-none absolute inset-0 z-0"
            aria-hidden
            style={{
                backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.075) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.075) 1px, transparent 1px)",
                backgroundSize: "85px 85px",
                maskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 82%, transparent 100%)",
            }}
        />
    );
}

const STACK_LINKS = [
    { label: "Next.js", href: "#skills" },
    { label: "TypeScript", href: "#skills" },
    { label: "UI Systems", href: "#skills" },
] as const;

export function HeroTechChips(): React.JSX.Element {
    return (
        <div className="flex flex-wrap gap-3" data-shoot-ui="1">
            {STACK_LINKS.map((item) => (
                <Link key={item.label} href={item.href} className={cn(
                    "inline-flex items-center rounded-full border border-slate-600/80 bg-slate-900/75",
                    "px-5 py-3 text-[10px] font-mono uppercase tracking-[0.24em] text-white/65 sm:px-6 sm:text-xs",
                    "transition-all duration-200 hover:border-slate-400 hover:bg-slate-800 hover:text-white",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                )}>{item.label}</Link>
            ))}
        </div>
    );
}

export function HeroAvailability(): React.JSX.Element {
    const reduceMotion = useHydrationSafeReducedMotion();
    return (
        <div data-shoot-ui="1" className="inline-flex items-center gap-2 rounded-full border border-slate-600/80 bg-slate-900/80 px-4 py-2">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
                {!reduceMotion ? <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/35" /> : null}
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/60 sm:text-[10px]">Open for work</span>
        </div>
    );
}
