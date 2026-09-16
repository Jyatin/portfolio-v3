"use client";

import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";
import { useGSAP } from "@/app/hooks/useGSAP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const certifications = [
    "Oracle Java SE 21 Developer Professional (1Z0-830)",
    "ReactJS (Infosys Springboard)",
    "Database Management Systems Part-1 (Infosys Springboard)",
    "C++ with OOP (Cipher Schools)",
    "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
];

export default function Certifications() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".certification-item", {
            y: 24,
            opacity: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 78%",
            },
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            id="certifications"
            className="relative overflow-hidden bg-background py-16 text-foreground sm:py-20 lg:py-28"
        >
            <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-14 xl:px-18 2xl:pl-24 2xl:pr-24">
                <div className="mb-10 flex items-center gap-4 sm:mb-14 md:mb-16">
                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45 sm:text-xs">
                        06 / Certifications
                    </span>
                    <span className="h-px flex-1 bg-border" />
                </div>

                <div className="grid gap-px border border-border bg-border md:grid-cols-2">
                    {certifications.map((certification, index) => (
                        <article
                            key={certification}
                            className={`certification-item group flex min-h-28 items-start gap-4 bg-background p-5 transition-colors duration-300 hover:bg-muted/30 sm:p-7 ${index === certifications.length - 1 ? "md:col-span-2" : ""}`}
                        >
                            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-muted/20">
                                <Award className="h-4 w-4 text-foreground/50" aria-hidden />
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-foreground/30">
                                    {String(index + 1).padStart(2, "0")} / Credential
                                </p>
                                <h2 className="mt-2 text-base font-bold leading-snug tracking-tight sm:text-lg">
                                    {certification}
                                </h2>
                            </div>
                            <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-foreground/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
