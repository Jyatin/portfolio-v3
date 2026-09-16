"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}*/+-_=~#$%";
const DURATION_MS = 720;
const LOCK_START_MS = 260;
const STAGGER_MS = 24;
const FRAME_MS = 32;

function randomGlyph(): string {
    return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

function buildScrambledText(text: string, elapsed: number): string {
    let output = "";
    let characterIndex = 0;

    // Spaces and line breaks remain stable so the heading never shifts while decoding.
    for (const character of text) {
        if (/\s/.test(character)) {
            output += character;
            continue;
        }

        const lockAt = LOCK_START_MS + characterIndex * STAGGER_MS;
        output += elapsed >= lockAt ? character : randomGlyph();
        characterIndex += 1;
    }

    return output;
}

interface ScrambleHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    text: string;
}

export default function ScrambleHeading({ text, className, ...props }: ScrambleHeadingProps): React.JSX.Element {
    const [displayText, setDisplayText] = React.useState(text);
    const startedRef = React.useRef(false);

    React.useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setDisplayText(text);
            return;
        }

        const startedAt = performance.now();
        let rafId: number | null = null;
        let timeoutId: number | null = null;
        let cancelled = false;

        const tick = (now: number) => {
            if (cancelled) return;

            const elapsed = now - startedAt;

            if (elapsed >= DURATION_MS) {
                setDisplayText(text);
                return;
            }

            setDisplayText(buildScrambledText(text, elapsed));
            timeoutId = window.setTimeout(() => {
                rafId = requestAnimationFrame(tick);
            }, FRAME_MS);
        };

        rafId = requestAnimationFrame(tick);

        return () => {
            cancelled = true;
            if (rafId !== null) cancelAnimationFrame(rafId);
            if (timeoutId !== null) window.clearTimeout(timeoutId);
        };
    }, [text]);

    return (
        <h1 {...props} aria-label={text} className={cn(className)}>
            <span aria-hidden="true">{displayText}</span>
        </h1>
    );
}
