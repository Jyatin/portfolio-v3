"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CURSOR_SIZE = 10;
const HOVER_SIZE = 46;

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const activeRef = useRef(false);
    const position = useMotionValue(0);
    const positionY = useMotionValue(0);
    const springX = useSpring(position, { stiffness: 520, damping: 38, mass: 0.35 });
    const springY = useSpring(positionY, { stiffness: 520, damping: 38, mass: 0.35 });

    useEffect(() => {
        const media = window.matchMedia("(hover: hover) and (pointer: fine)");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (!media.matches || reduced.matches) return;

        const root = document.documentElement;
        const body = document.body;
        root.dataset.customCursor = "active";
        body.dataset.customCursor = "active";

        const setPosition = (x: number, y: number) => {
            position.set(x - CURSOR_SIZE / 2);
            positionY.set(y - CURSOR_SIZE / 2);
        };

        const updateHover = (target: EventTarget | null) => {
            const element = target instanceof Element ? target.closest("a, button, [role='button'], [data-project-card], .group\/card") : null;
            if (!element) {
                activeRef.current = false;
                if (cursorRef.current) cursorRef.current.dataset.state = "idle";
                if (labelRef.current) labelRef.current.textContent = "";
                return;
            }

            activeRef.current = true;
            const isProject = element.matches("[data-project-card], .group\\/card");
            const isNav = element.closest("nav") !== null;
            const label = element.getAttribute("data-cursor-label") || (isProject ? "VIEW" : isNav ? "→" : "");
            if (cursorRef.current) cursorRef.current.dataset.state = "hover";
            if (labelRef.current) labelRef.current.textContent = label;
        };

        const onMove = (event: MouseEvent) => {
            setPosition(event.clientX, event.clientY);
            updateHover(event.target);
        };
        const onLeave = () => {
            activeRef.current = false;
            if (cursorRef.current) cursorRef.current.dataset.state = "idle";
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseout", (event) => {
            if (!event.relatedTarget) onLeave();
        });

        const style = document.createElement("style");
        style.dataset.customCursor = "active";
        style.textContent = `
            [data-custom-cursor="active"] *, [data-custom-cursor="active"] { cursor: none !important; }
        `;
        document.head.appendChild(style);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.head.removeChild(style);
            delete root.dataset.customCursor;
            delete body.dataset.customCursor;
        };
    }, [position, positionY]);

    return (
        <motion.div
            ref={cursorRef}
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border border-white/80 bg-white text-black"
            style={{ x: springX, y: springY }}
            animate={{ width: activeRef.current ? HOVER_SIZE : CURSOR_SIZE, height: activeRef.current ? HOVER_SIZE : CURSOR_SIZE }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
            <span ref={labelRef} className="font-mono text-[8px] font-semibold tracking-[0.12em]" />
        </motion.div>
    );
}
