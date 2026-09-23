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
const AssistantLinks = dynamic(() => import("./components/sections/assistant-links"));
const Footer = dynamic(() => import("./components/footer"));

export default function Home() {
    return (
        <main className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
            <ScrollProgress />

            <ScrollSection>
                <Hero />
                <div className="-mt-8 sm:-mt-10 md:-mt-14 lg:mt-0">
                    <Marquee />
                </div>
            </ScrollSection>

            <ScrollSection><Experience /></ScrollSection>
            <ScrollSection><OpenSource /></ScrollSection>
            <ScrollSection><Stats /></ScrollSection>
            <ScrollSection><Projects /></ScrollSection>
            <ScrollSection><Blog /></ScrollSection>
            <ScrollSection><Recognition /></ScrollSection>
            <ScrollSection><Achievements /><Certifications /></ScrollSection>
            <ScrollSection><Contact /></ScrollSection>

            <AssistantLinks />
            <Footer />
            <LiveChatHost />
        </main>
    );
}
