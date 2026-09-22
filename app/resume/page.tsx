import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

const RESUME_URL = "/GenCV12412494jyatinsingh%20(2).pdf";

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto w-full max-w-[1180px] px-5 pb-16 pt-28 sm:px-8 md:px-10">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        href="/"
                        className="inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55 transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Home
                    </Link>

                    <div className="flex flex-wrap gap-2">
                        <a
                            href={RESUME_URL}
                            download="Jyatin_Kumar_Singh_Resume.pdf"
                            className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-85"
                        >
                            <Download className="h-3.5 w-3.5" />
                            Download
                        </a>
                        <a
                            href={RESUME_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Open
                        </a>
                    </div>
                </div>

                <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40">03 / Resume</p>
                        <h1 className="mt-2 text-3xl font-black uppercase tracking-[-0.05em] sm:text-4xl">Curriculum Vitae</h1>
                    </div>
                    <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35 sm:block">
                        Updated 2026
                    </span>
                </div>

                <section className="overflow-hidden border border-border bg-white shadow-2xl shadow-black/10 dark:bg-neutral-950">
                    <iframe
                        src={`${RESUME_URL}#toolbar=1&navpanes=0&view=FitH`}
                        title="Jyatin Kumar Singh Resume"
                        className="h-[calc(100vh-190px)] min-h-[720px] w-full bg-white"
                    />
                </section>

                <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/35">
                    Full resume · View online or download the original PDF
                </p>
            </div>
        </main>
    );
}
