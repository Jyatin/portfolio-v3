import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type MilestoneCardProps = {
    icon: LucideIcon;
    year: string;
    category: string;
    title: string;
    description: string;
    iconClassName?: string;
    children?: ReactNode;
};

export default function MilestoneCard({
    icon: Icon,
    year,
    category,
    title,
    description,
    iconClassName = "text-blue-300",
    children,
}: MilestoneCardProps) {
    return (
        <article className="group border border-border bg-muted/[0.12] p-5 transition-colors duration-300 hover:bg-muted/30 sm:p-6">
            <div className="mb-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">
                <span>{year}</span>
                <span className="h-px flex-1 bg-border" />
                <span>{category}</span>
            </div>

            <div className="mb-6 flex h-11 w-11 items-center justify-center border border-border bg-blue-500/10">
                <Icon className={`h-5 w-5 ${iconClassName}`} aria-hidden />
            </div>

            <h3 className="text-xl font-black uppercase leading-tight tracking-tight">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-foreground/55">
                {description}
            </p>

            {children}
        </article>
    );
}
