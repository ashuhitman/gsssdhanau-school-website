import Image from "next/image";
import Link from "next/link";

import {
    ArrowUpRight,
} from "lucide-react";

import {
    formatDate,
} from "@/lib/utils/utils";

/* ============================================================
   Props
============================================================ */

interface ImageInfoCardProps {
    href: string;

    image: string;

    imageAlt?: string;

    title: string;

    label?: string;

    description?: string;

    date?: string;

    info?: string;

    compact?: boolean;
}

/* ============================================================
   Image Info Card
============================================================ */

export default function ImageInfoCard({
    href,
    image,
    imageAlt,
    title,
    label,
    description,
    date,
    info,
    compact = false,
}: ImageInfoCardProps) {
    const imageSrc =
        image?.trim()
            ? image
            : "/images/activity/default-card.jpeg";

    return (
        <Link
            href={href}
            className={`
                group
                block
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-md
                ${compact
                    ? ""
                    : "h-full"
                }
            `}
        >
            <div
                className={`
                    flex
                    gap-3
                    ${compact
                        ? "p-2.5"
                        : "p-3"
                    }
                `}
            >
                {/* ==================================================
                    IMAGE
                ================================================== */}

                <div
                    className={`
                        relative
                        shrink-0
                        overflow-hidden
                        rounded-lg
                        bg-slate-100
                        ${compact
                            ? "size-[76px]"
                            : "size-28 sm:size-32"
                        }
                    `}
                >
                    <Image
                        src={imageSrc}
                        alt={
                            imageAlt ??
                            title
                        }
                        fill
                        sizes={
                            compact
                                ? "76px"
                                : "(max-width: 640px) 112px, 128px"
                        }
                        className="
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                        "
                    />
                </div>

                {/* ==================================================
                    CONTENT
                ================================================== */}

                <div
                    className="
                        min-w-0
                        flex-1
                    "
                >
                    {/* Label */}

                    {label && (
                        <p
                            className="
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-[0.14em]
                                text-amber-600
                            "
                        >
                            {label}
                        </p>
                    )}

                    {/* Title */}

                    <h3
                        className={`
                            font-bold
                            leading-snug
                            text-slate-900
                            transition-colors
                            group-hover:text-blue-950
                            ${compact
                                ? "mt-1 line-clamp-2 text-sm"
                                : "mt-1.5 line-clamp-2 text-base"
                            }
                        `}
                    >
                        {title}
                    </h3>

                    {/* Description */}

                    {!compact &&
                        description && (
                            <p
                                className="
                                    mt-1.5
                                    line-clamp-2
                                    text-xs
                                    leading-5
                                    text-slate-500
                                "
                            >
                                {
                                    description
                                }
                            </p>
                        )}

                    {/* ==================================================
                        INFO + DATE
                    ================================================== */}

                    {(info || date) && (
                        <div
                            className="
                                mt-2
                                flex
                                flex-wrap
                                items-center
                                gap-x-2
                                gap-y-1
                                text-[10px]
                                text-slate-400
                            "
                        >
                            {info && (
                                <span>
                                    {info}
                                </span>
                            )}

                            {info &&
                                date && (
                                    <span>
                                        •
                                    </span>
                                )}

                            {date && (
                                <time
                                    dateTime={
                                        date
                                    }
                                >
                                    {formatDate(
                                        date
                                    )}
                                </time>
                            )}
                        </div>
                    )}
                </div>

                {/* ==================================================
                    ARROW
                ================================================== */}

                <ArrowUpRight
                    className={`
                        shrink-0
                        text-slate-300
                        transition-all
                        duration-200
                        group-hover:translate-x-0.5
                        group-hover:text-amber-500
                        ${compact
                            ? "mt-1 size-3.5"
                            : "mt-1 size-4"
                        }
                    `}
                />
            </div>

            {/* ==================================================
                BOTTOM ACCENT
            ================================================== */}

            <div
                className="
                    h-0.5
                    w-full
                    bg-amber-400
                    opacity-60
                    transition-opacity
                    group-hover:opacity-100
                "
            />
        </Link>
    );
}