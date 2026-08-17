import {
    CalendarDays,
    FileText,
    Pin,
} from "lucide-react";
import Link from "next/link";

export interface NoticeCardProps {
    title: string;
    date: string;
    category?: string;
    href: string;
    pinned?: boolean;
}

export function NoticeCard({
    title,
    date,
    category,
    href,
    pinned = false,
}: NoticeCardProps) {
    return (
        <Link
            href={href}
            className="
                group
                flex
                min-w-0
                gap-3
                rounded-xl
                border
                border-border
                bg-background
                p-3
                transition-all
                duration-200
                hover:border-primary-200
                hover:bg-primary-50/50
                hover:shadow-sm
                dark:hover:border-primary-800
                dark:hover:bg-primary-950/50
            "
        >
            {/* Icon */}
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                <FileText
                    className="size-5"
                    strokeWidth={1.7}
                />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
                {/* Category */}
                <div className="flex min-w-0 items-center gap-1.5">
                    {pinned && (
                        <Pin
                            className="size-3 shrink-0 fill-primary-500 text-primary-500"
                        />
                    )}

                    {category && (
                        <span className="truncate text-[0.625rem] font-bold uppercase tracking-wide text-primary-600 dark:text-primary-400">
                            {category}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="mt-1 line-clamp-2 break-words text-sm font-bold leading-5 text-foreground transition-colors group-hover:text-primary-600">
                    {title}
                </h3>

                {/* Date */}
                <div className="mt-1.5 flex items-center gap-1.5 text-[0.625rem] text-muted-foreground">
                    <CalendarDays className="size-3 shrink-0" />

                    <span>{date}</span>
                </div>
            </div>
        </Link>
    );
}