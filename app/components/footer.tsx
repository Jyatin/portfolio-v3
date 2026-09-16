"use client";

import { useGSAP } from "@/app/hooks/useGSAP";
import { gsap } from "gsap";
import { Mail, Github, Linkedin, ArrowUp } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const LINKEDIN_URL = "https://www.linkedin.com/in/jyatinsingh/";

const socialLinks = [
    { name: "Email", icon: Mail, url: "mailto:singhjyatin@gmail.com" },
    { name: "GitHub", icon: Github, url: "https://github.com/Jyatin" },
    { name: "LinkedIn", icon: Linkedin, url: LINKEDIN_URL },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    const containerRef = useGSAP(() => {
        gsap.from(".footer-content", {
            scrollTrigger: { trigger: ".footer-content", start: "top 95%" },
            y: 25,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
        });
    }, []);

    return (
        <footer ref={containerRef} className="relative w-full overflow-hidden border-t border-border bg-background pt-16 pb-8 sm:pt-20">
            <div className="mx-auto max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
                <div className="footer-content flex flex-col gap-12">
                    <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <span className="mb-5 block font-mono text-xs uppercase tracking-[0.3em] text-foreground/40">Navigation</span>
                            <nav className="flex flex-col gap-2">
                                {["About", "Work", "Experience", "Skills", "Certifications", "Achievements", "Contact"].map((item) => (
                                    <a key={item} href={`#${item.toLowerCase()}`} className="w-fit text-lg font-bold uppercase tracking-wide text-foreground/55 transition-colors hover:text-foreground">
                                        {item}
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <button type="button" onClick={scrollToTop} className="group flex w-fit flex-col items-center gap-2 text-foreground/40 hover:text-foreground">
                            <span className="rounded-full border border-border p-3 transition-colors group-hover:bg-muted"><ArrowUp className="h-5 w-5" /></span>
                            <span className="font-mono text-[9px] uppercase tracking-widest">Back to top</span>
                        </button>
                    </div>

                    <div className="footer-content border-y border-border py-10">
                        <h1 className="text-center text-[clamp(3rem,11vw,12rem)] font-black uppercase leading-none tracking-tighter text-foreground/5">Jyatin Kumar Singh</h1>
                    </div>

                    <div className="footer-content flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
                        <div className="text-center sm:text-left">
                            <p className="font-mono text-[9px] uppercase tracking-wider text-foreground/40">© {currentYear} Jyatin Kumar Singh</p>
                            <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-foreground/25">Full-Stack Developer • DSA • AI/RAG</p>
                        </div>
                        <div className="flex gap-3">
                            {socialLinks.map((link) => (
                                <a key={link.name} href={link.url} target={link.name === "Email" ? undefined : "_blank"} rel={link.name === "Email" ? undefined : "noreferrer"} className="rounded-full border border-border bg-muted/20 p-2 transition-colors hover:bg-muted" aria-label={link.name}>
                                    <link.icon className="h-4 w-4 text-foreground/50" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
