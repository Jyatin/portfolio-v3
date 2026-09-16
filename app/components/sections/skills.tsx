"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "motion/react";
import '@/components/ScrollVelocity.css';

const techStackString = "JavaScript • TypeScript • React • Next.js • Node.js • Express.js • MongoDB • MySQL • HTML • CSS • Tailwind CSS • Java • C++ • DSA • Git • GitHub • Docker • AI • RAG • REST APIs • ";

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        const apply = () => setWidth(el.offsetWidth);
        apply();
        if (typeof ResizeObserver !== 'undefined') {
            const ro = new ResizeObserver(apply);
            ro.observe(el);
            return () => ro.disconnect();
        }
        window.addEventListener('resize', apply, { passive: true });
        return () => window.removeEventListener('resize', apply);
    }, [ref]);
    return width;
}

function VelocityText({ children, baseVelocity = 50, isMobile = false, paused = false }: { children: React.ReactNode; baseVelocity?: number; isMobile?: boolean; paused?: boolean }) {
    const baseX = useMotionValue(0);
    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);
    const wrap = (min: number, max: number, v: number) => {
        if (max === min) return 0;
        const range = max - min;
        return (((v - min) % range) + range) % range + min;
    };
    const x = useTransform(baseX, (v) => copyWidth === 0 ? '0px' : `${wrap(-copyWidth, 0, v)}px`);
    useAnimationFrame((_, delta) => {
        if (!paused && copyWidth !== 0) baseX.set(baseX.get() + baseVelocity * (delta / 1000));
    });
    const spans = [];
    const numCopies = isMobile ? 4 : 6;
    for (let i = 0; i < numCopies; i++) {
        spans.push(
            <span key={i} ref={i === 0 ? copyRef : null} className="shrink-0 whitespace-nowrap text-2xl font-black uppercase tracking-tighter text-foreground/20 italic transition-colors duration-300 hover:text-foreground/40 sm:text-3xl md:text-5xl lg:text-6xl">
                {children}
            </span>
        );
    }
    return (
        <div className="parallax w-full overflow-hidden">
            <motion.div className="scroller" style={{ x, display: 'flex', gap: 'clamp(1rem, 3vw, 3rem)', paddingLeft: 'clamp(0.75rem, 2vw, 1.5rem)', paddingRight: 'clamp(0.75rem, 2vw, 1.5rem)', willChange: 'transform', width: 'max-content' }}>
                {spans}
            </motion.div>
        </div>
    );
}

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [marqueeActive, setMarqueeActive] = useState(true);

    React.useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        const sync = () => setIsMobile(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    React.useEffect(() => {
        const el = sectionRef.current;
        if (!el || typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(([entry]) => setMarqueeActive(entry.isIntersecting), { rootMargin: '100px 0px', threshold: 0 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="skills-section relative overflow-hidden bg-background py-10 sm:py-14 md:py-18 lg:py-24">
            <div className="absolute inset-y-0 left-0 z-20 w-12 bg-linear-to-r from-background via-background/80 to-transparent pointer-events-none sm:w-20 md:w-28" />
            <div className="absolute inset-y-0 right-0 z-20 w-12 bg-linear-to-l from-background via-background/80 to-transparent pointer-events-none sm:w-20 md:w-28" />
            <div className="relative z-10 space-y-5 overflow-hidden sm:space-y-7 md:space-y-9">
                <VelocityText baseVelocity={isMobile ? 55 : 75} isMobile={isMobile} paused={!marqueeActive}>{techStackString}</VelocityText>
                <VelocityText baseVelocity={isMobile ? -55 : -75} isMobile={isMobile} paused={!marqueeActive}>{techStackString}</VelocityText>
            </div>
        </section>
    );
}
