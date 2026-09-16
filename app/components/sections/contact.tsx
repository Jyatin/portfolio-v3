"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@/app/hooks/useGSAP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, ArrowUpRight, Copy, Check, Code2, Download } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const LINKEDIN_URL = "https://www.linkedin.com/in/jyatinsingh/";

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const emailRef = useRef<HTMLAnchorElement>(null);
    const email = "singhjyatin@gmail.com";

    const socialLinks = [
        { name: "GitHub", icon: Github, url: "https://github.com/Jyatin" },
        { name: "LinkedIn", icon: Linkedin, url: LINKEDIN_URL },
    ];

    const copyEmail = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${email}`;
        }
    };

    const containerRef = useGSAP(() => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: "top 70%" } });
        tl.from(".contact-header-text", { y: 80, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power4.out" })
          .from(".contact-content", { y: 25, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }, "-=0.4")
          .from(".email-card", { scale: 0.96, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.35");
    }, []);

    return (
        <section ref={containerRef} id="contact" className="contact-section relative w-full overflow-hidden bg-background py-24 sm:py-28 lg:py-36">
            <div className="mx-auto max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
                <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
                    <div className="space-y-10">
                        <div className="space-y-2 overflow-hidden">
                            <span className="contact-header-text block font-mono text-xs uppercase tracking-[0.3em] text-foreground/45">08 / Contact</span>
                            <h2 className="contact-header-text text-[clamp(3.5rem,9vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter">Let's Build</h2>
                            <h2 className="contact-header-text text-[clamp(3.5rem,9vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter text-foreground/25">Something.</h2>
                        </div>
                        <div className="max-w-xl space-y-6">
                            <p className="contact-content text-lg leading-relaxed text-foreground/65 sm:text-xl">
                                I'm open to internships, software roles, open-source collaboration, and interesting projects where I can build, learn, and contribute.
                            </p>
                            <div className="contact-content flex flex-wrap gap-3">
                                {socialLinks.map((link) => (
                                    <a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted/20 transition-all duration-300 hover:bg-foreground" aria-label={link.name}>
                                        <link.icon className="h-5 w-5 text-foreground/60 transition-colors group-hover:text-background" />
                                    </a>
                                ))}
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="inline-flex h-12 items-center gap-2 border border-border bg-foreground px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80"
                                >
                                    <Download className="h-4 w-4" aria-hidden />
                                    Download Resume
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:pt-12">
                        <a ref={emailRef} href={`mailto:${email}`} className="email-card group block w-full border-t border-border pt-8 transition-colors duration-500 hover:border-foreground/50">
                            <div className="flex min-h-[300px] flex-col justify-between sm:min-h-[360px]">
                                <div className="flex items-start justify-between">
                                    <Code2 className="h-8 w-8 text-foreground/45" />
                                    <ArrowUpRight className="h-8 w-8 text-foreground/35 transition-transform duration-300 group-hover:rotate-45 group-hover:text-foreground" />
                                </div>
                                <div>
                                    <span className="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">Email</span>
                                    <h3 className="break-all text-[clamp(1.8rem,4vw,3.5rem)] font-black uppercase leading-[0.9] tracking-tight">{email}</h3>
                                    <button onClick={copyEmail} className="mt-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-foreground/50 hover:text-foreground">
                                        {copied ? <><Check className="h-4 w-4" /><span>Email copied</span></> : <><Copy className="h-4 w-4" /><span>Copy address</span></>}
                                    </button>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
