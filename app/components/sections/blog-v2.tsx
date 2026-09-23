"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";

const posts = [
    {
        number: "01",
        type: "Technical Notes",
        title: "What I Learned Contributing to Production Open Source",
        excerpt: "Notes on reading unfamiliar codebases, debugging real issues, working with maintainers, and turning a small contribution into a better engineering workflow.",
        tags: ["Open Source", "Engineering", "GitHub"],
    },
    {
        number: "02",
        type: "AI / RAG",
        title: "Building RAG Systems Beyond the Demo",
        excerpt: "Practical notes from building document-aware applications: retrieval, embeddings, evaluation, failure modes, and the engineering decisions that matter after the prototype works.",
        tags: ["RAG", "AI", "Full Stack"],
    },
    {
        number: "03",
        type: "Web Engineering",
        title: "From React Projects to Production-Ready Applications",
        excerpt: "A running collection of lessons around React, Next.js, TypeScript, testing, performance, and the small engineering details that make applications easier to maintain.",
        tags: ["React", "Next.js", "TypeScript"],
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
                                <div className="flex items-center justify-between border-t border-border pt-4">
                                    <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/35"><Clock3 className="h-3.5 w-3.5" />Coming soon</span>
                                    <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/30">Read soon <ArrowUpRight className="h-3.5 w-3.5" /></span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
