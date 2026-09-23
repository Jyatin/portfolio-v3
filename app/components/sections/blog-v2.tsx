"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";

const posts = [
    {
        number: "01",
        type: "Technical Notes",
        title: "Event-Driven Music Recommendation Systems",
        excerpt: "A technical case study on building a recommendation platform around Kafka, stream processing, batch ML, and a learn-to-rank feedback loop — exploring how real-time events and offline learning can work together at scale.",
        tags: ["Kafka", "Recommender Systems", "System Design"],
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7506870801317634048/",
        interactiveHref: "https://lnkd.in/d6j6HcFR",
        paperHref: "https://github.com/Jyatin/Event-Driven-Music-Recommendation-Systems/blob/main/Event-Driven%20Music%20Recommendation%20Systems%20-%20IEEE%20Format.pdf",
    },
    {
        number: "02",
        type: "Open Source",
        title: "How Open Source Introduced Me to a Whole New World of Engineering",
        excerpt: "A personal reflection on moving beyond coursework and learning what engineering looks like inside real open-source projects — from reading unfamiliar codebases and debugging issues to reviews, collaboration, and getting changes merged.",
        tags: ["Open Source", "Engineering", "GitHub"],
        mediumHref: "https://medium.com/@singhjyatin/how-open-source-introduced-me-to-a-whole-new-world-of-engineering-664e2ccdf97a?post",
    },
    {
        number: "03",
        type: "AI / RAG",
        title: "Building RAG Systems Beyond the Demo",
        excerpt: "Practical notes from building document-aware applications: retrieval, embeddings, evaluation, failure modes, and the engineering decisions that matter after the prototype works.",
        tags: ["RAG", "AI", "Full Stack"],
    },
];

export default function Blog() {
    return (
        <section id="blog" className="relative overflow-hidden bg-background py-16 text-foreground sm:py-20 lg:py-28">
            <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
                <div className="mb-10 sm:mb-14">
                    <div className="mb-4 flex items-center gap-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45 sm:text-xs">04 / Blog</span>
                        <span className="h-px flex-1 bg-border" />
                    </div>
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-end">
                        <h2 className="text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.84] tracking-tighter">Notes &amp;<br />Writing</h2>
                        <p className="max-w-xl text-sm leading-relaxed text-foreground/50 sm:text-base">A place for technical notes, engineering lessons, and things I learn while building and contributing to software.</p>
                    </div>
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                    {posts.map((post, index) => (
                        <motion.article key={post.number} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5, delay: index * 0.07 }} className="group flex min-h-[330px] flex-col justify-between border border-border bg-muted/20 p-5 transition-colors duration-300 hover:border-foreground/25 hover:bg-muted/35 sm:p-6">
                            <div>
                                <div className="mb-8 flex items-center justify-between">
                                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/35">{post.number} / {post.type}</span>
                                    <BookOpen className="h-4 w-4 text-foreground/35 transition-transform duration-300 group-hover:-rotate-6 group-hover:text-foreground/60" />
                                </div>
                                <h3 className="text-xl font-black uppercase leading-[0.95] tracking-tight sm:text-2xl">{post.title}</h3>
                                <p className="mt-4 text-sm leading-relaxed text-foreground/55">{post.excerpt}</p>
                            </div>
                            <div className="mt-8">
                                <div className="mb-5 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full border border-border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-foreground/45">{tag}</span>)}</div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4">
                                    {post.href && <a href={post.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/55 hover:text-foreground">LinkedIn <ArrowUpRight className="h-3.5 w-3.5" /></a>}
                                    {post.interactiveHref && <a href={post.interactiveHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/55 hover:text-foreground">Interactive <ArrowUpRight className="h-3.5 w-3.5" /></a>}
                                    {post.paperHref && <a href={post.paperHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/55 hover:text-foreground">IEEE PDF <ArrowUpRight className="h-3.5 w-3.5" /></a>}
                                    {post.mediumHref && <a href={post.mediumHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/55 hover:text-foreground">Medium <ArrowUpRight className="h-3.5 w-3.5" /></a>}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
