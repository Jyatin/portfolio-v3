"use client";

interface ScrollSectionProps {
    children: React.ReactNode;
}

/**
 * Layout-only section wrapper.
 *
 * Keep section visibility independent from GSAP/ScrollTrigger. A visual
 * entrance animation should never be able to hide or block the page when a
 * client-side animation runtime fails or hydration is interrupted.
 */
export default function ScrollSection({ children }: ScrollSectionProps) {
    return <div className="relative w-full">{children}</div>;
}
