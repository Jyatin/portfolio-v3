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

            {/* 04 — BLOG */}
            <ScrollSection>
                <Blog />
            </ScrollSection>

            {/* 05 — ABOUT */}
            <ScrollSection>
                <Stats />
            </ScrollSection>

            {/* 06 — PROJECTS */}
            <ScrollSection>
                <Projects />
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

            <Footer />
            <LiveChatHost />
        </main>
    );
}
