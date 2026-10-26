"use client";

import { useGSAP } from "@/app/hooks/useGSAP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Linkedin, ArrowUp, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const LINKEDIN_URL = "https://www.linkedin.com/in/jyatinsingh/";

const socialLinks = [
    { name: "Email", icon: Mail, url: "mailto:singhjyatin@gmail.com" },
    { name: "GitHub", icon: Github, url: "https://github.com/Jyatin" },
    { name: "LinkedIn", icon: Linkedin, url: LINKEDIN_URL },
];

const navigation = [
    ["About", "about"],
    ["Work", "projects"],
    ["Experience", "experience"],
    ["Skills", "skills"],
    ["Certifications", "certifications"],
    ["Achievements", "achievements"],
    ["Contact", "contact"],
] as const;

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
            <div className="pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden="true" style={{ backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
            <div className="relative mx-auto max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
                <div className="footer-content flex flex-col gap-12">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div>
                            <div className="mb-5 flex items-center gap-3"><span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">Navigation</span><span className="h-px w-12 bg-border" /></div>
                            <nav className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-4 lg:flex lg:flex-wrap lg:gap-x-7 lg:gap-y-3">
                                {navigation.map(([label, href], index) => (
                                    <a key={label} href={`#${href}`} className="group flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-foreground/55 transition-all hover:translate-x-1 hover:text-foreground sm:text-base">
                                        <span className="mr-1 font-mono text-[8px] text-foreground/25">{String(index + 1).padStart(2, "0")}</span>{label}<ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-70" />
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <button type="button" onClick={scrollToTop} className="group flex w-fit items-center gap-3 text-foreground/45 transition-colors hover:text-foreground lg:justify-self-end">
                            <span className="rounded-full border border-border bg-muted/30 p-3 transition-all group-hover:-translate-y-1 group-hover:bg-muted"><ArrowUp className="h-5 w-5" /></span>
                            <span className="text-left"><span className="block font-mono text-[9px] uppercase tracking-widest">Back to top</span><span className="mt-0.5 block font-mono text-[8px] uppercase tracking-widest text-foreground/25">Return to 01</span></span>
                        </button>
                    </div>

                    <div className="footer-content relative overflow-hidden border-y border-border py-10 sm:py-14">
                        <div className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-foreground/40" /><div className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-foreground/40" /><div className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-foreground/40" /><div className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-foreground/40" />
                        <div className="mb-4 flex items-center justify-center gap-3 font-mono text-[8px] uppercase tracking-[0.35em] text-foreground/25"><span>End of page</span><span className="h-px w-8 bg-border" /><span>JKS / {currentYear}</span></div>
                        <h1 className="text-center text-[clamp(3rem,11vw,12rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-foreground/[0.055] transition-colors duration-500 hover:text-foreground/[0.09]">Jyatin Kumar Singh</h1>
                    </div>

                    <div className="footer-content flex flex-col-reverse items-center justify-between gap-6 border-b border-border pb-7 sm:flex-row">
                        <div className="text-center sm:text-left">
                            <p className="font-mono text-[9px] uppercase tracking-wider text-foreground/40">© {currentYear} Jyatin Kumar Singh</p>
                            <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-foreground/25">Full-Stack Developer • DSA • AI/RAG</p>
                        </div>
                        <div className="flex gap-2">
                            {socialLinks.map((link) => (
                                <a key={link.name} href={link.url} target={link.name === "Email" ? undefined : "_blank"} rel={link.name === "Email" ? undefined : "noreferrer"} className="group flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-2 transition-all hover:-translate-y-0.5 hover:bg-muted" aria-label={link.name}>
                                    <link.icon className="h-3.5 w-3.5 text-foreground/50 transition-colors group-hover:text-foreground" />
                                    <span className="font-mono text-[8px] uppercase tracking-widest text-foreground/40 group-hover:text-foreground/70">{link.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
