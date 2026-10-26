"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Download,
    ExternalLink,
    Printer,
    Copy,
    Check,
    FileText,
    Eye,
    Briefcase,
    Code2,
    GraduationCap,
    Award,
    Mail,
    Github,
    Linkedin,
    MapPin,
    Calendar,
    ChevronRight,
} from "lucide-react";

const RESUME_URL = "/jyatin_resume%20(11).pdf";
const EMAIL = "singhjyatin@gmail.com";
const GITHUB_URL = "https://github.com/Jyatin";
const LINKEDIN_URL = "https://www.linkedin.com/in/jyatinsingh/";

const EXPERIENCES = [
    {
        role: "Software Development Engineer Intern",
        company: "KaHo Technologies",
        period: "September 2026 – Present",
        location: "Bengaluru, India · Remote",
        summary:
            "Architecting and shipping parent-facing features for the Parent App, focused on automated photo discovery, client-side validation, and image rendering performance.",
        points: [
            "Implemented an automated face-detection and photo-clustering pipeline grouping event photos by person, significantly reducing parent search time for child photos.",
            "Cut form submission failure rates by 50% (from 20% to 10%) by redesigning input verification pipelines and handling edge-case validation gracefully.",
            "Optimized frontend image rendering by 60%+, maintaining sub-500 ms load times via intelligent caching, progressive loading, and responsive asset sizing.",
        ],
        tech: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
    },
    {
        role: "Software Engineering Intern",
        company: "Tata Steel",
        period: "June 2026 – July 2026",
        location: "Jamshedpur, India",
        summary:
            "Engineered and deployed SteelCare PMMS, a full-stack preventive maintenance monitoring system tracking health metrics across plant shop-floor terminal machines.",
        points: [
            "Built a multi-tier preventive maintenance architecture using React and Spring Boot 3, modernizing machine inspection and downtime diagnostics.",
            "Eliminated 60-second gateway request timeouts by offloading email notifications to an asynchronous background worker queue with Spring @Async (sub-50 ms response).",
            "Implemented stateless JWT authorization with role-based access control (RBAC) and strict server-side permission validation.",
            "Automated scheduled machine inspection reports with Excel/CSV data exports; deployed production services across Render and Netlify with cloud MySQL.",
        ],
        tech: ["React.js", "Spring Boot 3", "Java", "MySQL", "JWT", "Render", "Netlify"],
    },
];

const PROJECTS = [
    {
        name: "KiranaWala",
        tagline: "Hyperlocal Smart Grocery Platform",
        summary:
            "Full-stack MERN application connecting neighborhood grocery stores with localized order management, automated cart checkout, and demand forecasting.",
        tech: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS"],
        link: "/projects/kiranawala",
    },
    {
        name: "AskPDF",
        tagline: "RAG-Powered Document Q&A Engine",
        summary:
            "Asynchronous 5-stage document intelligence pipeline utilizing Redis BRPOP workers, 768-dimensional embeddings, and vector similarity gating (>0.7 threshold).",
        tech: ["Node.js", "Redis", "Gemini API", "Vector Search", "TypeScript"],
        link: "/projects/askpdf",
    },
    {
        name: "JalDrishti 2030",
        tagline: "IoT-AI Water Infrastructure Digital Twin",
        summary:
            "Research-grade simulation platform for urban water distribution networks in Bengaluru, integrating EPANET/WNTR physical models and NSGA-II multi-objective optimization.",
        tech: ["Next.js", "TypeScript", "Python", "EPANET", "WNTR"],
        link: "https://github.com/Jyatin/Repository-name-JalDrishti-2030",
    },
    {
        name: "VOXSHIELD",
        tagline: "Real-Time Voice Deepfake Detection",
        summary:
            "Audio forensic platform built on the E4 multi-scale raw-waveform CNN model with a high-throughput FastAPI inference microservice.",
        tech: ["FastAPI", "Next.js", "TypeScript", "Python", "E4 CNN"],
        link: "https://github.com/Jyatin",
    },
];

const SKILL_CATEGORIES = [
    {
        name: "Languages",
        skills: ["TypeScript", "JavaScript", "Java (SE 21)", "C++", "Python", "SQL"],
    },
    {
        name: "Frontend",
        skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML5 & CSS3"],
    },
    {
        name: "Backend & Systems",
        skills: ["Node.js", "Express.js", "Spring Boot 3", "FastAPI", "RESTful APIs"],
    },
    {
        name: "Databases & Cloud",
        skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Docker", "Git", "Linux"],
    },
];

const HONORS = [
    {
        title: "Oracle Certified Professional: Java SE 21 Developer",
        issuer: "Oracle (1Z0-830)",
        year: "2025",
    },
    {
        title: "Oracle Cloud Infrastructure AI Foundations Associate",
        issuer: "Oracle",
        year: "2025",
    },
    {
        title: "Competitive Problem Solving & Algorithms",
        issuer: "200+ LeetCode problems solved · 100-Day Streak",
        year: "2025 – 2026",
    },
    {
        title: "Open-Source Contributions & Community",
        issuer: "8+ merged PRs across open repositories · 500+ GitHub contributions",
        year: "2025 – 2026",
    },
    {
        title: "6th Place Finalist — DevStorm 2026 Hackathon",
        issuer: "DevStorm",
        year: "2026",
    },
];

export default function ResumePage() {
    const [activeTab, setActiveTab] = useState<"interactive" | "pdf">("interactive");
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2200);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <main className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
            {/* Top Bar / Navigation */}
            <div className="print:hidden border-b border-border/60 bg-background/95 backdrop-blur-md sticky top-0 z-40">
                <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6 md:px-8">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                        <span>Portfolio</span>
                    </Link>

                    {/* View Switcher Tabs */}
                    <div className="flex items-center rounded-full border border-border bg-muted/30 p-1">
                        <button
                            type="button"
                            onClick={() => setActiveTab("interactive")}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-[0.15em] transition-all ${
                                activeTab === "interactive"
                                    ? "bg-foreground text-background font-semibold shadow-sm"
                                    : "text-foreground/60 hover:text-foreground"
                            }`}
                        >
                            <FileText className="h-3 w-3" />
                            <span>Resume</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("pdf")}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-[0.15em] transition-all ${
                                activeTab === "pdf"
                                    ? "bg-foreground text-background font-semibold shadow-sm"
                                    : "text-foreground/60 hover:text-foreground"
                            }`}
                        >
                            <Eye className="h-3 w-3" />
                            <span>PDF Viewer</span>
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/75 transition-colors hover:border-foreground/40 hover:text-foreground"
                            title="Print Resume (Clean paper layout)"
                        >
                            <Printer className="h-3 w-3" />
                            <span>Print</span>
                        </button>
                        <a
                            href={RESUME_URL}
                            download="Jyatin_Kumar_Singh_Resume.pdf"
                            className="inline-flex items-center gap-1.5 rounded-full border border-foreground bg-foreground px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-85"
                        >
                            <Download className="h-3 w-3" />
                            <span>Download PDF</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 md:px-8 print:p-0 print:max-w-none">
                {activeTab === "interactive" ? (
                    <article className="border border-border/80 bg-card/20 p-6 sm:p-10 md:p-12 shadow-sm rounded-lg print:border-none print:p-0 print:shadow-none print:bg-transparent">
                        {/* Resume Header */}
                        <header className="border-b border-border/80 pb-8 print:border-neutral-300">
                            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                                <div>
                                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                                        <span>Curriculum Vitae</span>
                                        <span>·</span>
                                        <span className="inline-flex items-center gap-1.5 text-foreground/70">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Available for SDE Roles & Internships
                                        </span>
                                    </div>
                                    <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground print:text-neutral-900">
                                        Jyatin Kumar Singh
                                    </h1>
                                    <p className="mt-1.5 text-sm sm:text-base font-medium text-foreground/75 print:text-neutral-700">
                                        Software Development Engineer · Full-Stack & Distributed Systems
                                    </p>
                                </div>

                                <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs font-mono text-foreground/65 print:text-neutral-600">
                                    <div className="inline-flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5 text-foreground/40" />
                                        <span>India · Open to Relocate</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleCopyEmail}
                                        className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground text-left"
                                    >
                                        <Mail className="h-3.5 w-3.5 text-foreground/40" />
                                        <span>{EMAIL}</span>
                                        {copiedEmail ? (
                                            <Check className="h-3 w-3 text-emerald-500" />
                                        ) : (
                                            <Copy className="h-3 w-3 text-foreground/30 hover:text-foreground" />
                                        )}
                                    </button>
                                    <div className="flex items-center gap-3 pt-1">
                                        <a
                                            href={GITHUB_URL}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                                        >
                                            <Github className="h-3.5 w-3.5 text-foreground/50" />
                                            <span>github.com/Jyatin</span>
                                        </a>
                                        <span>·</span>
                                        <a
                                            href={LINKEDIN_URL}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                                        >
                                            <Linkedin className="h-3.5 w-3.5 text-foreground/50" />
                                            <span>LinkedIn</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Brief Executive Summary */}
                            <p className="mt-6 text-sm leading-relaxed text-foreground/75 sm:text-base print:text-neutral-800">
                                Full-stack software engineer with production experience building customer-facing
                                applications, asynchronous processing pipelines, and data-driven systems. Focused on
                                clean architecture, measurable latency reduction, resilient validation workflows, and
                                performance optimization across React, Next.js, Node.js, and Spring Boot.
                            </p>
                        </header>

                        {/* Experience Section */}
                        <section className="mt-10 border-b border-border/80 pb-10 print:border-neutral-300">
                            <div className="flex items-center gap-2 mb-6">
                                <Briefcase className="h-4 w-4 text-foreground/50" />
                                <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-foreground/50">
                                    01 / Work Experience
                                </h2>
                            </div>

                            <div className="space-y-8">
                                {EXPERIENCES.map((exp) => (
                                    <div key={exp.company} className="group">
                                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                                            <div>
                                                <h3 className="text-lg font-bold tracking-tight text-foreground print:text-neutral-900">
                                                    {exp.role}
                                                </h3>
                                                <p className="text-sm font-medium text-foreground/85">
                                                    {exp.company}
                                                </p>
                                            </div>
                                            <div className="text-left sm:text-right font-mono text-[11px] text-foreground/55">
                                                <div className="flex items-center gap-1 sm:justify-end">
                                                    <Calendar className="h-3 w-3 text-foreground/40" />
                                                    <span>{exp.period}</span>
                                                </div>
                                                <span className="text-[10px] text-foreground/40">{exp.location}</span>
                                            </div>
                                        </div>

                                        <p className="mt-2 text-xs text-foreground/65 sm:text-sm italic">
                                            {exp.summary}
                                        </p>

                                        <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-foreground/80 print:text-neutral-800">
                                            {exp.points.map((pt, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5">
                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/35 print:bg-neutral-600" />
                                                    <span className="leading-relaxed">{pt}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-3 flex flex-wrap gap-1.5">
                                            {exp.tech.map((t) => (
                                                <span
                                                    key={t}
                                                    className="rounded border border-border/70 bg-muted/40 px-2 py-0.5 font-mono text-[10px] text-foreground/70 print:border-neutral-300 print:bg-neutral-100"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Projects Section */}
                        <section className="mt-10 border-b border-border/80 pb-10 print:border-neutral-300">
                            <div className="flex items-center gap-2 mb-6">
                                <Code2 className="h-4 w-4 text-foreground/50" />
                                <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-foreground/50">
                                    02 / Selected Projects
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {PROJECTS.map((proj) => (
                                    <div
                                        key={proj.name}
                                        className="rounded-md border border-border/70 bg-card/30 p-4 transition-colors hover:border-foreground/30 print:border-neutral-300 print:bg-transparent"
                                    >
                                        <div className="flex items-baseline justify-between gap-2">
                                            <h3 className="font-bold text-base text-foreground tracking-tight print:text-neutral-900">
                                                {proj.name}
                                            </h3>
                                            {proj.link.startsWith("http") ? (
                                                <a
                                                    href={proj.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="font-mono text-[10px] uppercase text-foreground/50 hover:text-foreground inline-flex items-center gap-0.5 print:hidden"
                                                >
                                                    <span>Repo</span>
                                                    <ExternalLink className="h-2.5 w-2.5" />
                                                </a>
                                            ) : (
                                                <Link
                                                    href={proj.link}
                                                    className="font-mono text-[10px] uppercase text-foreground/50 hover:text-foreground inline-flex items-center gap-0.5 print:hidden"
                                                >
                                                    <span>Details</span>
                                                    <ChevronRight className="h-3 w-3" />
                                                </Link>
                                            )}
                                        </div>
                                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/55">
                                            {proj.tagline}
                                        </p>
                                        <p className="mt-2 text-xs leading-relaxed text-foreground/75 print:text-neutral-800">
                                            {proj.summary}
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-1">
                                            {proj.tech.map((t) => (
                                                <span
                                                    key={t}
                                                    className="rounded border border-border/60 bg-muted/30 px-1.5 py-0.5 font-mono text-[9px] text-foreground/65"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Technical Skills Matrix */}
                        <section className="mt-10 border-b border-border/80 pb-10 print:border-neutral-300">
                            <div className="flex items-center gap-2 mb-6">
                                <Code2 className="h-4 w-4 text-foreground/50" />
                                <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-foreground/50">
                                    03 / Technical Skills
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {SKILL_CATEGORIES.map((cat) => (
                                    <div
                                        key={cat.name}
                                        className="rounded border border-border/60 bg-card/20 p-3.5 print:border-neutral-300 print:bg-transparent"
                                    >
                                        <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-foreground/80 mb-2">
                                            {cat.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5">
                                            {cat.skills.map((s) => (
                                                <span
                                                    key={s}
                                                    className="rounded bg-muted/40 px-2 py-0.5 text-xs text-foreground/75 print:bg-neutral-100 print:text-neutral-800"
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education & Credentials */}
                        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <GraduationCap className="h-4 w-4 text-foreground/50" />
                                    <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-foreground/50">
                                        04 / Education
                                    </h2>
                                </div>
                                <div className="rounded border border-border/60 bg-card/20 p-4 print:border-neutral-300 print:bg-transparent">
                                    <h3 className="font-bold text-base text-foreground print:text-neutral-900">
                                        Bachelor of Technology in Computer Science & Engineering
                                    </h3>
                                    <p className="text-sm text-foreground/75 mt-0.5">
                                        Lovely Professional University
                                    </p>
                                    <p className="mt-2 font-mono text-[11px] text-foreground/55">
                                        Expected Graduation: 2028 · Punjab, India
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Award className="h-4 w-4 text-foreground/50" />
                                    <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-foreground/50">
                                        05 / Certifications & Proof of Work
                                    </h2>
                                </div>
                                <div className="rounded border border-border/60 bg-card/20 p-4 print:border-neutral-300 print:bg-transparent">
                                    <ul className="space-y-2.5 text-xs text-foreground/80 print:text-neutral-800">
                                        {HONORS.map((h, i) => (
                                            <li key={i} className="flex items-start justify-between gap-2">
                                                <div>
                                                    <span className="font-medium text-foreground">{h.title}</span>
                                                    <span className="block text-[11px] text-foreground/55">{h.issuer}</span>
                                                </div>
                                                <span className="font-mono text-[10px] text-foreground/45 shrink-0">
                                                    {h.year}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Footer Note */}
                        <footer className="mt-12 pt-6 border-t border-border/60 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40 print:hidden">
                            Verified portfolio data · Last updated 2026 · Jyatin Kumar Singh
                        </footer>
                    </article>
                ) : (
                    /* PDF Document Mode */
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-border bg-card/40 p-4">
                            <div>
                                <h2 className="font-bold text-base text-foreground">Original PDF Document</h2>
                                <p className="text-xs text-foreground/60 mt-0.5">
                                    Direct view of Jyatin_Kumar_Singh_Resume.pdf. If your browser does not render embedded PDFs, use the buttons on the right.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <a
                                    href={RESUME_URL}
                                    download="Jyatin_Kumar_Singh_Resume.pdf"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-foreground bg-foreground px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-background transition-opacity hover:opacity-85"
                                >
                                    <Download className="h-3 w-3" />
                                    <span>Download</span>
                                </a>
                                <a
                                    href={RESUME_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/75 transition-colors hover:border-foreground hover:text-foreground"
                                >
                                    <ExternalLink className="h-3 w-3" />
                                    <span>Open Tab</span>
                                </a>
                            </div>
                        </div>

                        {/* Mobile Fallback Tip */}
                        <div className="block sm:hidden rounded border border-border/70 bg-muted/20 p-3 text-xs text-foreground/70">
                            Mobile browsers often struggle with embedded PDF iframes. Switch to the{" "}
                            <button
                                type="button"
                                onClick={() => setActiveTab("interactive")}
                                className="underline font-semibold text-foreground"
                            >
                                Resume
                            </button>{" "}
                            tab for the best experience.
                        </div>

                        <section className="overflow-hidden rounded-lg border border-border bg-white shadow-lg dark:bg-neutral-950">
                            <iframe
                                src={`${RESUME_URL}#toolbar=1&navpanes=0&view=FitH`}
                                title="Jyatin Kumar Singh Resume PDF"
                                loading="lazy"
                                className="h-[calc(100vh-230px)] min-h-[720px] w-full bg-white"
                            />
                        </section>
                    </div>
                )}
            </div>
        </main>
    );
}
