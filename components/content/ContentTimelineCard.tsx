import Image from "next/image";
import Link from "next/link";

import {
    ArrowUpRight,
    UserRound,
} from "lucide-react";

/* ============================================================
   Props
============================================================ */

interface ContentTimelineCardProps {
    href: string;

    image: string | null;

    imageAlt?: string;

    title: string;

    category?: string;

    articleType?: string;

    excerpt?: string;

    author?: string;
}

/* ============================================================
   Content Timeline Card
============================================================ */

export default function ContentTimelineCard({
    href,
    image,
    imageAlt,
    title,
    category,
    articleType,
    excerpt,
    author,
}: ContentTimelineCardProps) {
    const imageSrc =
        image?.trim()
            ? image
            : "/images/articles/default-card.jpeg";

    return (
        <article
            className="
                group
                min-w-0
            "
        >
            <Link
                href={href}
                className="
                    flex
                    min-w-0
                    gap-3
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    p-2.5
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-slate-300
                    hover:shadow-md
                    sm:gap-4
                    sm:p-3
                "
            >
                {/* ==================================================
                    Image
                ================================================== */}

                <div
                    className="
                        relative
                        size-20
                        shrink-0
                        overflow-hidden
                        rounded-lg
                        bg-slate-100
                        sm:size-24
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
                            (max-width: 640px) 80px,
                            96px
                        "
                        className="
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                        "
                    />
                </div>

                {/* ==================================================
                    Content
                ================================================== */}

                <div
                    className="
                        min-w-0
                        flex-1
                        py-0.5
                    "
                >
                    {/* Category / Article Type */}

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
                                        text-[8px]
                                        font-black
                                        uppercase
                                        tracking-[0.14em]
                                        text-blue-950
                                    "
                                    >
                                        {formatLabel(
                                            articleType
                                        )}
                                    </span>
                                )}

                                {articleType &&
                                    category && (
                                        <span
                                            className="
                                            text-slate-300
                                        "
                                        >
                                            •
                                        </span>
                                    )}

                                {category && (
                                    <span
                                        className="
                                        text-[8px]
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

                    <h3
                        className="
                            mt-1
                            line-clamp-2
                            text-sm
                            font-bold
                            leading-snug
                            text-slate-900
                            transition-colors
                            group-hover:text-blue-950
                            sm:text-base
                        "
                    >
                        {title}
                    </h3>

                    {/* Excerpt */}

                    {excerpt && (
                        <p
                            className="
                                mt-1.5
                                line-clamp-2
                                text-xs
                                leading-5
                                text-slate-500
                            "
                        >
                            {excerpt}
                        </p>
                    )}

                    {/* Author */}

                    {author && (
                        <div
                            className="
                                mt-2
                                flex
                                items-center
                                gap-1
                                text-[10px]
                                text-slate-400
                            "
                        >
                            <UserRound
                                className="
                                    size-3
                                "
                            />

                            <span>
                                {author}
                            </span>
                        </div>
                    )}
                </div>

                {/* ==================================================
                    Arrow
                ================================================== */}

                <ArrowUpRight
                    className="
                        mt-1
                        size-4
                        shrink-0
                        text-slate-300
                        transition-all
                        duration-200
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                        group-hover:text-amber-500
                    "
                />
            </Link>
        </article>
    );
}

/* ============================================================
   Format Label
============================================================ */

function formatLabel(
    value: string
) {
    return value
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) =>
            char.toUpperCase()
        );
}