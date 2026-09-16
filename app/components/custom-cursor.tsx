"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const DOT_SIZE = 10;
const HOVER_SIZE = 46;

export default function CustomCursor() {
    const [hovering, setHovering] = useState(false);
    const [label, setLabel] = useState("");
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 520, damping: 38, mass: 0.35 });
    const springY = useSpring(y, { stiffness: 520, damping: 38, mass: 0.35 });

    useEffect(() => {
        const hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
        const reducedMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (!hoverMedia.matches || reducedMedia.matches) return;

        const cursorStyle = document.createElement("style");
        cursorStyle.textContent = `html[data-custom-cursor="active"], html[data-custom-cursor="active"] * { cursor: none !important; }`;
        document.head.appendChild(cursorStyle);
        document.documentElement.dataset.customCursor = "active";

        const onMove = (event: MouseEvent) => {
            x.set(event.clientX - DOT_SIZE / 2);
            y.set(event.clientY - DOT_SIZE / 2);

            const target = event.target instanceof Element
                ? event.target.closest("a, button, [role='button'], [data-project-card], .group\\/card")
                : null;

            if (!target) {
                setHovering(false);
                setLabel("");
                return;
            }

            const isProject = target.matches("[data-project-card], .group\\/card");
            const isNav = target.closest("nav") !== null;
            setHovering(true);
            setLabel(target.getAttribute("data-cursor-label") || (isProject ? "VIEW" : isNav ? "→" : ""));
        };

        const onLeave = () => {
            setHovering(false);
            setLabel("");
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseleave", onLeave);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
            delete document.documentElement.dataset.customCursor;
            cursorStyle.remove();
        };
    }, [x, y]);

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border border-white/80 bg-white text-black"
            style={{ x: springX, y: springY }}
            animate={{ width: hovering ? HOVER_SIZE : DOT_SIZE, height: hovering ? HOVER_SIZE : DOT_SIZE }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
            <span className="font-mono text-[8px] font-semibold tracking-[0.12em]">{label}</span>
        </motion.div>
    );
}
