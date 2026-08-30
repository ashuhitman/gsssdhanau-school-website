import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    Download,
} from "lucide-react";
import { NewsletterCover } from "./pages/NewsletterCover";


interface NewsletterCardProps {
    title: string;
    description?: string;
    issue: string;
    date: string;
    coverImage: string | null;
    href?: string;

    /**
     * Show the information below the newsletter cover.
     * Default: true
     */
    showInfo?: boolean;
}

export function NewsletterCard({
    title,
    description,
    issue,
    date,
    coverImage,
    href,
    showInfo = true,
}: NewsletterCardProps) {
    const card = (
        <article
            className="
                group
                relative
                z-0
                isolate
                min-w-0
                transition-[z-index]
                duration-0
                hover:z-50
            "
        >
            {/* =====================================================
                NEWSLETTER COVER
            ====================================================== */}

            <NewsletterCover
                title={title}
                issue={issue}
                date={date}
                coverImage={coverImage}
            />

            {/* =====================================================
                INFORMATION BELOW BOOK
            ====================================================== */}

            {showInfo && (
                <div
                    className="
                        mx-auto
                        mt-4
                        max-w-[15rem]
                        px-1
                    "
                >
                    {/* Date */}
                    <div
                        className="
                            flex
                            min-w-0
                            items-center
                            gap-1.5
                            text-[0.5625rem]
                            font-medium
                            text-muted
                            sm:text-[0.625rem]
                        "
                    >
                        <CalendarDays className="size-3 shrink-0" />

                        <span className="min-w-0 whitespace-normal break-normal">
                            {date}
                        </span>
                    </div>

                    {/* Title */}
                    <h3
                        className="
                            mt-1.5
                            whitespace-normal
                            break-normal
                            text-xs
                            font-bold
                            leading-5
                            text-heading
                            sm:text-sm
                        "
                    >
                        Newsletter - {title}
                    </h3>

                    {/* Accent */}
                    <div
                        className="
                            mt-1.5
                            h-0.5
                            w-7
                            bg-accent
                            transition-all
                            duration-300
                            group-hover:w-11
                        "
                    />

                    {/* Description */}
                    <p
                        className="
                            mt-2
                            line-clamp-2
                            whitespace-normal
                            break-normal
                            text-[0.625rem]
                            leading-4
                            text-muted
                            sm:text-xs
                        "
                    >
                        {description}
                    </p>

                    {/* Actions */}
                    {href && (
                        <div
                            className="
                                mt-3
                                flex
                                min-w-0
                                items-center
                                gap-3
                            "
                        >
                            <span
                                className="
                                    inline-flex
                                    min-w-0
                                    items-center
                                    gap-1
                                    text-[0.625rem]
                                    font-semibold
                                    text-primary
                                    sm:text-xs
                                "
                            >
                                <span className="whitespace-nowrap">
                                    Read Newsletter
                                </span>

                                <ArrowRight
                                    className="
                                        size-3
                                        shrink-0
                                        transition-transform
                                        duration-200
                                        group-hover:translate-x-1
                                    "
                                />
                            </span>

                            <span
                                className="
                                    ml-auto
                                    flex
                                    size-7
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-accent-soft
                                    text-accent
                                "
                            >
                                <Download className="size-3.5" />
                            </span>
                        </div>
                    )}
                </div>
            )}
        </article>
    );

    if (href) {
        return (
            <Link
                href={href}
                className="
                    block
                    h-full
                    min-w-0
                "
            >
                {card}
            </Link>
        );
    }

    return card;
}