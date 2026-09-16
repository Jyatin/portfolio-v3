"use client";

import { useEffect } from "react";

const MAX_TILT = 9;
const RETURN_MS = 240;
const SELECTOR = '[class*="group/card"]';

function canTilt(): boolean {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ProjectTiltRuntime() {
    useEffect(() => {
        if (!canTilt()) return;

        const cleanups = new Map<Element, () => void>();
        let observer: MutationObserver | null = null;

        const attach = (card: HTMLElement) => {
            if (cleanups.has(card)) return;

            card.style.transformStyle = "preserve-3d";
            card.style.transformOrigin = "center center";
            card.style.transition = `transform ${RETURN_MS}ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow ${RETURN_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
            card.style.willChange = "transform";
            card.style.perspective = "1200px";

            const orbs = Array.from(card.querySelectorAll<HTMLElement>(
                '[data-project-orb], .project-orb, [class*="orb"]',
            ));

            const onEnter = () => {
                card.style.transition = "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1)";
            };

            let raf = 0;
            let targetX = 0;
            let targetY = 0;

            const render = () => {
                raf = 0;
                card.style.transform = `perspective(1200px) rotateX(${targetX}deg) rotateY(${targetY}deg)`;
                const orbX = `${-targetY * 0.9}px`;
                const orbY = `${targetX * 0.9}px`;
                orbs.forEach((orb) => {
                    orb.style.transform = `translate3d(${orbX}, ${orbY}, 0)`;
                });
            };

            const onMove = (event: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                if (!rect.width || !rect.height) return;
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                targetY = (x - 0.5) * MAX_TILT * 2;
                targetX = (0.5 - y) * MAX_TILT * 2;
                if (!raf) raf = window.requestAnimationFrame(render);
            };

            const onLeave = () => {
                if (raf) {
                    window.cancelAnimationFrame(raf);
                    raf = 0;
                }
                targetX = 0;
                targetY = 0;
                card.style.transition = `transform ${RETURN_MS}ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow ${RETURN_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
                card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
                orbs.forEach((orb) => {
                    orb.style.transition = `transform ${RETURN_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
                    orb.style.transform = "translate3d(0, 0, 0)";
                });
            };

            card.addEventListener("mouseenter", onEnter, { passive: true });
            card.addEventListener("mousemove", onMove, { passive: true });
            card.addEventListener("mouseleave", onLeave, { passive: true });

            cleanups.set(card, () => {
                if (raf) window.cancelAnimationFrame(raf);
                card.removeEventListener("mouseenter", onEnter);
                card.removeEventListener("mousemove", onMove);
                card.removeEventListener("mouseleave", onLeave);
                card.style.removeProperty("transform");
                card.style.removeProperty("transform-style");
                card.style.removeProperty("transform-origin");
                card.style.removeProperty("transition");
                card.style.removeProperty("will-change");
                card.style.removeProperty("perspective");
            });
        };

        const scan = () => {
            document.querySelectorAll<HTMLElement>(SELECTOR).forEach(attach);
        };

        scan();
        observer = new MutationObserver(scan);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer?.disconnect();
            cleanups.forEach((cleanup) => cleanup());
            cleanups.clear();
        };
    }, []);

    return null;
}
