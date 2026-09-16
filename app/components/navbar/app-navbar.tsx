"use client";

import Link from "next/link";
import { Github, Linkedin, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
    { name: "ABOUT", href: "/#about" },
    { name: "PROJECTS", href: "/#projects" },
    { name: "ACHIEVEMENTS", href: "/#achievements" },
    { name: "CONTACT", href: "/#contact" },
];

export default function AppNavbar() {
    const { resolvedTheme, setTheme } = useTheme();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [navHidden, setNavHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [themeReady, setThemeReady] = useState(false);

    useEffect(() => setThemeReady(true), []);

    useEffect(() => {
        let lastY = window.scrollY;
        const onScroll = () => {
            const currentY = window.scrollY;
            setScrolled(currentY > 24);
            if (!menuOpen) {
                if (currentY > lastY && currentY > 100) setNavHidden(true);
                if (currentY < lastY) setNavHidden(false);
            }
            lastY = currentY;
        };
        setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [menuOpen]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <nav className={`fixed top-0 z-50 w-full border-b border-border/0 px-5 py-4 transition-all duration-300 sm:px-8 lg:px-20 ${navHidden && !menuOpen ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"} ${scrolled ? "bg-background/80 backdrop-blur-xl" : "bg-transparent"}`}>
                <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-4">
                    <Link href="/" className="font-black uppercase tracking-[-0.04em] text-foreground" aria-label="Jyatin Kumar Singh home">
                        <span className="text-sm sm:text-base">Jyatin Kumar Singh</span>
                    </Link>

                    <div className="hidden items-center gap-5 md:flex">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 transition-colors hover:text-foreground">
                                {item.name}
                            </Link>
                        ))}
                        <a href="https://github.com/Jyatin" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-foreground/50 transition-colors hover:text-foreground"><Github className="h-4 w-4" /></a>
                        <a href="https://www.linkedin.com/in/jyatin-singh-88984831b/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-foreground/50 transition-colors hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
                    </div>

                    <div className="flex items-center gap-2">
                        <button type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:bg-muted hover:text-foreground" aria-label="Toggle theme">
                            {themeReady && resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>
                        <button type="button" onClick={() => setMenuOpen((value) => !value)} className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>
                            <span className={`h-px w-5 bg-foreground transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                            <span className={`h-px w-5 bg-foreground transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                            <span className={`h-px w-5 bg-foreground transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
                <div className="flex h-full flex-col items-center justify-center gap-2">
                    {navItems.map((item, index) => (
                        <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`py-3 text-3xl font-black uppercase tracking-tight text-foreground/45 transition-all duration-500 hover:text-foreground ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`} style={{ transitionDelay: `${index * 60}ms` }}>
                            {item.name}
                        </Link>
                    ))}
                    <a href="mailto:singhjyatin@gmail.com" onClick={() => setMenuOpen(false)} className={`mt-5 font-mono text-xs uppercase tracking-[0.25em] text-foreground/50 transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
                        LET&apos;S CONNECT
                    </a>
                </div>
            </div>
        </>
    );
}
