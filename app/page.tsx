import Hero from "./components/hero/hero";
import dynamic from "next/dynamic";

import { ScrollProgress } from "@/components/ui/scroll-progress";
import ScrollSection from "./components/scroll-section";

const Marquee = dynamic(() => import("./components/sections/marquee"));
const Stats = dynamic(() => import("./components/sections/stats"));
const Projects = dynamic(() => import("./components/sections/projects"));
const Experience = dynamic(() => import("./components/sections/experience"));
const Certifications = dynamic(() => import("./components/sections/certifications"));
const Recognition = dynamic(() => import("./components/sections/recognition"));
const Achievements = dynamic(() => import("./components/sections/achievements"));
const Contact = dynamic(() => import("./components/sections/contact"));
const Footer = dynamic(() => import("./components/footer"));
const LiveChat = dynamic(() => import("./components/chat/live-chat"));

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

            {/* 03 — ABOUT */}
            <ScrollSection>
                <Stats />
            </ScrollSection>

            {/* 04 — PROJECTS */}
            <ScrollSection>
                <Projects />
            </ScrollSection>

            {/* 05 — RECOGNITION & MILESTONES */}
            <ScrollSection>
                <Recognition />
            </ScrollSection>

            {/* 06 — PROGRESS / PROOF OF WORK */}
            <ScrollSection>
                <Achievements />
                <Certifications />
            </ScrollSection>

            {/* 07 — CONTACT */}
            <ScrollSection>
                <Contact />
            </ScrollSection>

            <Footer />
            <LiveChat />
        </main>
    );
}
