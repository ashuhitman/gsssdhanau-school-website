import { CalendarDays } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export interface AchievementCardProps {
    title: string;
    description: string;
    date: string;
    icon: LucideIcon;
    href?: string;
}

export function AchievementCard({
    title,
    description,
    date,
    icon: Icon,
    href = "/achievements",
}: AchievementCardProps) {
    const content = (
        <>
            {/* Icon */}
            <div className="flex size-[4.5rem] shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500 dark:bg-primary-950">
                <Icon
                    className="size-8"
                    strokeWidth={1.6}
                />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold leading-5 text-foreground transition-colors group-hover:text-primary-600">
                    {title}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {description}
                </p>

                <div className="mt-1.5 flex items-center gap-1.5 text-[0.625rem] text-muted-foreground">
                    <CalendarDays className="size-3 shrink-0" />

                    <span>{date}</span>
                </div>
            </div>
        </>
    );

    return (
        <Link
            href={href}
            className="group flex min-w-0 gap-4 border-b border-border py-4 first:pt-0 last:border-0 last:pb-0"
        >
            {content}
        </Link>
    );
}