"use client";

import Link from "next/link";
import { FileText, Github, MessageCircle, Moon, Sun, UsersRound, X, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navItems = [
    { name: "ABOUT", href: "/#about" },
    { name: "OPEN SOURCE", href: "/#open-source" },
    { name: "BLOG", href: "/#blog" },
    { name: "PROJECTS", href: "/#projects" },
    { name: "ACHIEVEMENTS", href: "/#achievements" },
    { name: "CONTACT", href: "/#contact" },
];

const chatGptPrompt = encodeURIComponent(
    "Tell me about Jyatin Kumar Singh based on his portfolio, including his projects, experience, open-source contributions, skills, research, and engineering interests."
);

export default function AppNavbar() {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [navHidden, setNavHidden] = useState(false);
    const [themeReady, setThemeReady] = useState(false);

    useEffect(() => setThemeReady(true), []);
    useEffect(() => {
        let lastY = window.scrollY;
        const onScroll = () => {
            const currentY = window.scrollY;
            if (!menuOpen) {
                if (currentY > lastY && currentY > 100) setNavHidden(true);
                if (currentY < lastY) setNavHidden(false);
            }
            lastY = currentY;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [menuOpen]);
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const toggleTheme = () => setTheme((theme ?? resolvedTheme) === "dark" ? "light" : "dark");

    return (
        <>
            <nav className={`fixed top-0 z-50 w-full border-b border-border/70 bg-background/85 px-5 py-3.5 text-foreground backdrop-blur-md transition-transform duration-300 sm:px-7 ${navHidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}>
                <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3">
                    <Link href="/" className="shrink-0 text-base font-bold tracking-[-0.04em] text-foreground/70 sm:text-lg" aria-label="Jyatin Kumar Singh home">Jyatin</Link>
                    <div className="hidden items-center gap-0.5 lg:flex">
                        {navItems.map((item) => <Link key={item.href} href={item.href} className="px-2 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground/55 transition-colors hover:text-foreground xl:px-2.5 xl:text-[10px]">{item.name}</Link>)}
                        <Link href="/resume" className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-foreground/20 bg-foreground px-3 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-80" aria-label="View resume"><FileText className="h-3.5 w-3.5" />RESUME</Link>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <a href={`https://chatgpt.com/?q=${chatGptPrompt}`} target="_blank" rel="noopener noreferrer" className="inline-flex whitespace-nowrap rounded-full bg-black px-2.5 py-2 font-mono text-[8px] font-semibold tracking-tight text-white transition-opacity hover:opacity-80 sm:px-3 sm:text-[9px]" aria-label="Talk to ChatGPT about me">Talk to ChatGPT about me</a>
                        <a href="https://claude.ai/new" target="_blank" rel="noopener noreferrer" className="inline-flex whitespace-nowrap rounded-full bg-black px-2.5 py-2 font-mono text-[8px] font-semibold tracking-tight text-white transition-opacity hover:opacity-80 sm:px-3 sm:text-[9px]" aria-label="Talk to Claude about me">Talk to Claude about me</a>
                        <div className="hidden items-center gap-2 text-foreground/55 xl:flex"><UsersRound className="h-5 w-5" /><span className="font-mono text-xs">1</span></div>
                        <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("toggle-portfolio-chat"))} className="relative inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-foreground/80 transition-colors hover:border-foreground/30 hover:bg-muted" aria-label="Open chat"><MessageCircle className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /><span className="hidden min-[420px]:inline text-[10px] font-semibold uppercase tracking-wide sm:text-xs">Messages</span></button>
                        <a href="https://github.com/Jyatin" target="_blank" rel="noreferrer" aria-label="GitHub" className="hidden h-9 items-center justify-center rounded-lg border border-border px-2.5 text-foreground/75 transition-colors hover:border-foreground/30 hover:bg-muted sm:flex"><Github className="h-4 w-4" /></a>
                        <button type="button" onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-foreground/65 transition-colors hover:border-foreground/40 hover:text-foreground sm:h-10 sm:w-10" aria-label={themeReady && resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>{themeReady && resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
                        <button type="button" onClick={() => setMenuOpen((value) => !value)} className="flex h-9 w-9 items-center justify-center text-foreground/85 md:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}</button>
                    </div>
                </div>
            </nav>
            <div className={`fixed inset-0 z-40 bg-background/95 text-foreground backdrop-blur-xl transition-opacity duration-300 md:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
                <div className="flex h-full flex-col items-center justify-center gap-2">
                    {navItems.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`py-3 text-3xl font-black uppercase tracking-tight text-foreground/55 transition-all duration-500 hover:text-foreground ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`} style={{ transitionDelay: `${index * 60}ms` }}>{item.name}</Link>)}
                    <Link href="/resume" onClick={() => setMenuOpen(false)} className={`mt-2 inline-flex items-center gap-2 py-3 text-3xl font-black uppercase tracking-tight text-foreground transition-all duration-500 hover:text-foreground ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`} style={{ transitionDelay: `${navItems.length * 60}ms` }}><FileText className="h-7 w-7" />RESUME</Link>
                    <div className={`mt-5 flex flex-col items-center gap-3 transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
                        <a href={`https://chatgpt.com/?q=${chatGptPrompt}`} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="rounded-full bg-black px-4 py-2.5 font-mono text-[10px] font-semibold text-white">Talk to ChatGPT about me</a>
                        <a href="https://claude.ai/new" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="rounded-full bg-black px-4 py-2.5 font-mono text-[10px] font-semibold text-white">Talk to Claude about me</a>
                    </div>
                    <a href="mailto:singhjyatin@gmail.com" onClick={() => setMenuOpen(false)} className={`mt-5 font-mono text-xs uppercase tracking-[0.25em] text-foreground/55 transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>LET&apos;S CONNECT</a>
                </div>
            </div>
        </>
    );
}
