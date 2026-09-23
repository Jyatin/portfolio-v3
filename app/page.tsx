import Hero from "./components/hero/hero";
import dynamic from "next/dynamic";

import { ScrollProgress } from "@/components/ui/scroll-progress";
import ScrollSection from "./components/scroll-section";
import LiveChatHost from "./components/chat/live-chat-host";

const Marquee = dynamic(() => import("./components/sections/marquee"));
const Stats = dynamic(() => import("./components/sections/stats"));
const Projects = dynamic(() => import("./components/sections/projects"));
const Experience = dynamic(() => import("./components/sections/experience"));
const OpenSource = dynamic(() => import("./components/sections/open-source"));
const Blog = dynamic(() => import("./components/sections/blog-v2"));
const Certifications = dynamic(() => import("./components/sections/certifications"));
const Recognition = dynamic(() => import("./components/sections/recognition"));
const Achievements = dynamic(() => import("./components/sections/achievements"));
const Contact = dynamic(() => import("./components/sections/contact"));
const Footer = dynamic(() => import("./components/footer"));

export default function Home() {
    return (
        <main className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
            <ScrollProgress />

            {/* 01 — HERO + existing marquee */}
            <ScrollSection>
                <Hero />
                <div className="-mt-8 sm:-mt-10 md:-mt-14 lg:mt-0">
                    <Marquee />
                </div>
            </ScrollSection>

            {/* 02 — EXPERIENCE */}
            <ScrollSection>
                <Experience />
            </ScrollSection>

            {/* 03 — OPEN SOURCE */}
            <ScrollSection>
                <OpenSource />
            </ScrollSection>

            {/* 04 — ABOUT */}
            <ScrollSection>
                <Stats />
            </ScrollSection>

            {/* 05 — PROJECTS */}
            <ScrollSection>
                <Projects />
            </ScrollSection>

            {/* 06 — NOTES / WRITING */}
            <ScrollSection>
                <Blog />
            </ScrollSection>

            {/* 07 — RECOGNITION & MILESTONES */}
            <ScrollSection>
                <Recognition />
            </ScrollSection>

            {/* 08–09 — PROGRESS / PROOF OF WORK */}
            <ScrollSection>
                <Achievements />
                <Certifications />
            </ScrollSection>

            {/* 10 — CONTACT */}
            <ScrollSection>
                <Contact />
            </ScrollSection>

            {/* ASSISTANT LINKS — kept outside the footer so they are always visible */}
            <section className="border-t border-border bg-background px-5 py-14 sm:px-8 sm:py-16 md:px-12 lg:px-20 xl:px-24">
                <div className="mx-auto max-w-[1920px]">
                    <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45">
                        Or ask an assistant
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="https://chatgpt.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-3 rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground/70 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/40 hover:text-foreground"
                        >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border font-mono text-[10px] font-semibold">◉</span>
                            <span>talk to chatgpt about me</span>
                            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                        </a>
                        <a
                            href="https://claude.ai/"
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-3 rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground/70 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/40 hover:text-foreground"
                        >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border font-mono text-[10px] font-semibold">IA</span>
                            <span>talk to claude about me</span>
                            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
            <LiveChatHost />
        </main>
    );
}
