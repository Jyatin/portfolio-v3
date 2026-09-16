"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/app/hooks/useGSAP";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollSectionProps {
    children: React.ReactNode;
}

export default function ScrollSection({ children }: ScrollSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !contentRef.current) return;

        // Keep content visible at all times. The previous opacity: 0 start state
        // could leave the entire page invisible when ScrollTrigger failed to
        // initialize or calculate its trigger position during hydration.
        // The reveal animation now only adds a subtle vertical entrance.
        gsap.fromTo(
            contentRef.current,
            { y: 20 },
            {
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 86%",
                    toggleActions: "play none none none",
                    once: true,
                    fastScrollEnd: true,
                    invalidateOnRefresh: true,
                },
            },
        );
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            <div ref={contentRef} className="w-full min-h-0">
                {children}
            </div>
        </div>
    );
}
