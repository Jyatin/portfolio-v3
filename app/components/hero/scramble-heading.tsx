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

    // Spaces and line breaks remain stable so the heading never shifts while decoding.
    let characterIndex = 0;

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

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            setDisplayText(text);
            return;
        }

        const startedAt = performance.now();
        let frameId = 0;

        const tick = (now: number) => {
            const elapsed = now - startedAt;

            if (elapsed >= DURATION_MS) {
                setDisplayText(text);
                return;
            }

            setDisplayText(buildScrambledText(text, elapsed));
            frameId = window.setTimeout(() => {
                requestAnimationFrame(tick);
            }, FRAME_MS);
        };

        frameId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [text]);

    return (
        <h1 {...props} aria-label={text} className={cn(className)}>
            <span aria-hidden="true">{displayText}</span>
        </h1>
    );
}
