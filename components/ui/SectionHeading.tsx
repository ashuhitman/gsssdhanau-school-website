import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    href?: string;
    linkLabel?: string;
}

export function SectionHeading({
    eyebrow,
    title,
    description,
    href,
    linkLabel = "View All",
}: SectionHeadingProps) {
    return (
        <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
                {eyebrow && (
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-400">
                        {eyebrow}
                    </p>
                )}

                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                    {title}
                </h2>

                {description && (
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {href && (
                <Link
                    href={href}
                    className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400"
                >
                    {linkLabel}

                    <ArrowRight className="size-3.5" />
                </Link>
            )}
        </div>
    );
}