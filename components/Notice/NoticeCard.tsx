import {
    CalendarDays,
    Download,
    Eye,
    Tag,
    type LucideIcon,
} from "lucide-react";

import Link from "next/link";

/* ============================================================
   Props
============================================================ */

interface NoticeCardProps {
    date: string;
    month: string;
    year: string;
    title: string;
    description: string;
    category: string;
    icon?: LucideIcon;
    attachment?: string | null;
    href?: string;
    isNew?: boolean;
}

/* ============================================================
   Notice Card
============================================================ */

export function NoticeCard({
    date,
    month,
    year,
    title,
    description,
    category,
    attachment,
    href,
    isNew = false,
}: NoticeCardProps) {
    return (
        <article
            className="
                group
                flex
                min-w-0
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-card
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-primary-200
                hover:shadow-md
                dark:hover:border-primary-800
            "
        >
            {/* ==================================================
                DATE
            ================================================== */}

            <div
                className="
                    flex
                    w-[72px]
                    shrink-0
                    flex-col
                    items-center
                    justify-center
                    border-r
                    border-border
                    bg-primary-50
                    px-2
                    py-3
                    text-center
                    dark:bg-primary-950/40
                "
            >
                <span
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-primary-600
                        dark:text-primary-400
                    "
                >
                    {month}
                </span>

                <span
                    className="
                        mt-0.5
                        text-2xl
                        font-black
                        leading-7
                        text-primary-800
                        dark:text-primary-200
                    "
                >
                    {date}
                </span>

                <span
                    className="
                        text-[10px]
                        font-medium
                        text-muted-foreground
                    "
                >
                    {year}
                </span>
            </div>

            {/* ==================================================
                CONTENT
            ================================================== */}

            <div
                className="
                    flex
                    min-w-0
                    flex-1
                    flex-col
                    px-4
                    py-4
                    sm:px-5
                "
            >
                {/* Category + New */}

                <div
                    className="
                        flex
                        min-w-0
                        items-start
                        justify-between
                        gap-3
                    "
                >
                    <span
                        className="
                            inline-flex
                            w-fit
                            items-center
                            rounded-full
                            bg-primary-50
                            px-2.5
                            py-1
                            text-[10px]
                            font-semibold
                            text-primary-700
                            dark:bg-primary-950
                            dark:text-primary-300
                        "
                    >
                        {category}
                    </span>

                    {isNew && (
                        <span
                            className="
                                shrink-0
                                rounded-full
                                bg-red-50
                                px-2
                                py-1
                                text-[10px]
                                font-bold
                                text-red-600
                                dark:bg-red-950/30
                                dark:text-red-400
                            "
                        >
                            New
                        </span>
                    )}
                </div>

                {/* Title */}

                <h3
                    className="
                        mt-2
                        text-sm
                        font-bold
                        leading-5
                        text-primary-800
                        dark:text-primary-200
                        sm:text-base
                    "
                >
                    {title}
                </h3>

                {/* Description */}

                {description && (
                    <p
                        className="
                            mt-1.5
                            line-clamp-2
                            text-xs
                            leading-5
                            text-muted-foreground
                            sm:text-sm
                        "
                    >
                        {description}
                    </p>
                )}

                {/* ==================================================
                    META
                ================================================== */}

                <div
                    className="
                        mt-auto
                        flex
                        flex-wrap
                        items-center
                        gap-x-4
                        gap-y-2
                        pt-3
                    "
                >
                    <span
                        className="
                            inline-flex
                            items-center
                            gap-1.5
                            text-[10px]
                            text-muted-foreground
                            sm:text-xs
                        "
                    >
                        <CalendarDays className="size-3.5" />

                        Posted on {month}{" "}
                        {date}, {year}
                    </span>

                    <span
                        className="
                            inline-flex
                            items-center
                            gap-1.5
                            text-[10px]
                            text-muted-foreground
                            sm:text-xs
                        "
                    >
                        <Tag className="size-3.5" />

                        {category}
                    </span>
                </div>
            </div>

            {/* ==================================================
                ACTIONS
            ================================================== */}

            <div
                className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                    px-3
                "
            >
                {/* ==================================================
                    VIEW PDF
                ================================================== */}

                {attachment && (
                    <a
                        href={attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View PDF for ${title}`}
                        title="View PDF"
                        className="
                            flex
                            size-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-border
                            bg-background
                            text-muted-foreground
                            transition-colors
                            hover:border-primary-300
                            hover:bg-primary-50
                            hover:text-primary-600
                            dark:hover:bg-primary-950
                        "
                    >
                        <Eye className="size-4" />
                    </a>
                )}

                {/* ==================================================
                    DOWNLOAD PDF
                ================================================== */}

                {/* {attachment && (
                    <a
                        href={`/api/notices/download?url=${encodeURIComponent(
                            attachment
                        )}`}
                        aria-label={`Download PDF for ${title}`}
                        title="Download PDF"
                        className="
                            flex
                            size-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-border
                            bg-background
                            text-muted-foreground
                            transition-colors
                            hover:border-primary-300
                            hover:bg-primary-50
                            hover:text-primary-600
                            dark:hover:bg-primary-950
                        "
                    >
                        <Download className="size-4" />
                    </a>
                )} */}

                {/* ==================================================
                    NOTICE DETAILS
                ================================================== */}

                {href && (
                    <Link
                        href={href}
                        aria-label={`View notice details for ${title}`}
                        title="View notice details"
                        className="
                            flex
                            size-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-border
                            bg-background
                            text-muted-foreground
                            transition-colors
                            hover:border-primary-300
                            hover:bg-primary-50
                            hover:text-primary-600
                            dark:hover:bg-primary-950
                        "
                    >
                        <Eye className="size-4" />
                    </Link>
                )}
            </div>
        </article>
    );
}