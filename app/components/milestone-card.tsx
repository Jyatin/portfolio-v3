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
    iconClassName = "text-foreground",
    children,
}: MilestoneCardProps) {
    return (
        <article className="group relative rounded-sm border border-border bg-muted/20 p-5 transition-colors duration-300 hover:border-foreground/25 hover:bg-muted/40 sm:p-6 md:p-7">
            <div className="mb-5 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                <span>{year}</span>
                <span className="h-px flex-1 bg-border" />
                <span className="text-foreground/55">{category}</span>
            </div>

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-muted/50 transition-colors group-hover:border-foreground/25">
                <Icon className={`h-5 w-5 ${iconClassName}`} aria-hidden />
            </div>

            <h3 className="mb-3 text-lg font-black uppercase leading-tight tracking-tight text-foreground sm:text-xl md:text-2xl">
                {title}
            </h3>

            <p className="text-sm leading-relaxed text-foreground/65 md:text-base">
                {description}
            </p>

            {children}
        </article>
    );
}
