import Image from "next/image";
import Link from "next/link";

import {
    ArrowUpRight,
    CalendarDays,
    Clock3,
    UserRound,
} from "lucide-react";

import { formatDate } from "@/lib/utils/utils";

/* ============================================================
   Props
============================================================ */

interface FeaturedContentProps {
    href: string;
    image: string | null;
    imageAlt?: string;

    category?: string;
    articleType?: string;

    title: string;
    description?: string;

    publishedAt?: string;
    author?: string;
}

/* ============================================================
   Featured Content
============================================================ */

export default function FeaturedContent({
    href,
    image,
    imageAlt,
    category,
    articleType,
    title,
    description,
    publishedAt,
    author,
}: FeaturedContentProps) {
    const imageSrc =
        image?.trim()
            ? image
            : "/images/articles/default-featured.jpeg";

    return (
        <article
            className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
            "
        >
            <div
                className="
                    grid
                    lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)]
                "
            >
                {/* ==================================================
                    Image
                ================================================== */}

                <Link
                    href={href}
                    className="
                        group
                        relative
                        block
                        min-h-[260px]
                        overflow-hidden
                        bg-slate-100
                        sm:min-h-[340px]
                        lg:min-h-[390px]
                    "
                >
                    <Image
                        src={imageSrc}
                        alt={
                            imageAlt ??
                            title
                        }
                        fill
                        sizes="
                            (max-width: 1023px) 100vw,
                            45vw
                        "
                        className="
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                        "
                    />

                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-slate-950/40
                            via-transparent
                            to-transparent
                        "
                    />

                    {/* Featured */}

                    <div
                        className="
                            absolute
                            left-4
                            top-4
                            rounded-full
                            bg-white
                            px-3
                            py-1.5
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.16em]
                            text-blue-950
                            shadow-sm
                        "
                    >
                        Featured
                    </div>
                </Link>

                {/* ==================================================
                    Content
                ================================================== */}

                <div
                    className="
                        flex
                        flex-col
                        justify-center
                        p-6
                        sm:p-8
                        lg:p-10
                    "
                >
                    {/* Type / Category */}

                    {(articleType ||
                        category) && (
                            <div
                                className="
                                flex
                                flex-wrap
                                items-center
                                gap-2
                            "
                            >
                                {articleType && (
                                    <span
                                        className="
                                        rounded-full
                                        bg-blue-50
                                        px-2.5
                                        py-1
                                        text-[9px]
                                        font-black
                                        uppercase
                                        tracking-[0.12em]
                                        text-blue-950
                                    "
                                    >
                                        {formatLabel(
                                            articleType
                                        )}
                                    </span>
                                )}

                                {category && (
                                    <span
                                        className="
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-[0.12em]
                                        text-amber-600
                                    "
                                    >
                                        {formatLabel(
                                            category
                                        )}
                                    </span>
                                )}
                            </div>
                        )}

                    {/* Title */}

                    <Link
                        href={href}
                        className="
                            group/title
                        "
                    >
                        <h2
                            className="
                                mt-3
                                max-w-xl
                                text-2xl
                                font-black
                                leading-tight
                                tracking-tight
                                text-slate-950
                                transition-colors
                                group-hover/title:text-blue-950
                                sm:text-3xl
                                lg:text-4xl
                            "
                        >
                            {title}
                        </h2>
                    </Link>

                    {/* Description */}

                    {description && (
                        <p
                            className="
                                mt-4
                                max-w-xl
                                text-sm
                                leading-6
                                text-slate-500
                                sm:text-[15px]
                            "
                        >
                            {description}
                        </p>
                    )}

                    {/* Metadata */}

                    {(publishedAt ||
                        author) && (
                            <div
                                className="
                                mt-5
                                flex
                                flex-wrap
                                items-center
                                gap-x-4
                                gap-y-2
                                text-xs
                                text-slate-400
                            "
                            >
                                {publishedAt && (
                                    <span
                                        className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                    "
                                    >
                                        <CalendarDays
                                            className="
                                            size-3.5
                                        "
                                        />

                                        <time
                                            dateTime={
                                                publishedAt
                                            }
                                        >
                                            {formatDate(
                                                publishedAt
                                            )}
                                        </time>
                                    </span>
                                )}

                                {author && (
                                    <span
                                        className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                    "
                                    >
                                        <UserRound
                                            className="
                                            size-3.5
                                        "
                                        />

                                        <span>
                                            {author}
                                        </span>
                                    </span>
                                )}

                                <span
                                    className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                "
                                >
                                    <Clock3
                                        className="
                                        size-3.5
                                    "
                                    />

                                    <span>
                                        Read
                                    </span>
                                </span>
                            </div>
                        )}

                    {/* Read More */}

                    <Link
                        href={href}
                        className="
                            group/read
                            mt-7
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            rounded-lg
                            bg-blue-950
                            px-4
                            py-2.5
                            text-xs
                            font-bold
                            text-white
                            transition-colors
                            hover:bg-blue-900
                        "
                    >
                        Read full article

                        <ArrowUpRight
                            className="
                                size-3.5
                                transition-transform
                                group-hover/read:-translate-y-0.5
                                group-hover/read:translate-x-0.5
                            "
                        />
                    </Link>
                </div>
            </div>

            {/* Bottom accent */}

            <div
                aria-hidden="true"
                className="
                    h-1
                    bg-amber-400
                "
            />
        </article>
    );
}

/* ============================================================
   Format Label
============================================================ */

function formatLabel(
    value: string
): string {
    return value
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) =>
            char.toUpperCase()
        );
}