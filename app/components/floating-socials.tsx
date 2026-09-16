"use client";

import { useState, useEffect } from "react";

export default function FloatingSocials() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let raf = 0;
        const apply = () => {
            raf = 0;
            setVisible(window.scrollY > 300);
        };
        const onScroll = () => {
            if (raf === 0) raf = window.requestAnimationFrame(apply);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        apply();
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (raf !== 0) window.cancelAnimationFrame(raf);
        };
    }, []);

    const socials = [
        { name: "GitHub", href: "https://github.com/Jyatin", label: "GH" },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/jyatin-singh-88984831b/", label: "in" },
        { name: "LeetCode", href: "https://leetcode.com/u/Jyatin_singh/", label: "LC" },
        { name: "Email", href: "mailto:singhjyatin@gmail.com", label: "@" },
    ];

    return (
        <div className={`fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 xl:flex flex-col gap-3 transition-all duration-500 ${visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-8 opacity-0"}`}>
            {socials.map((social) => (
                <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    aria-label={social.name}
                    title={social.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/80 font-mono text-[9px] font-bold tracking-wider text-foreground/55 backdrop-blur transition-all duration-300 hover:border-foreground/40 hover:bg-muted hover:text-foreground"
                >
                    {social.label}
                </a>
            ))}
        </div>
    );
}
