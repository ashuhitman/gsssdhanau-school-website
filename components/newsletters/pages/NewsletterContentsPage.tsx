import {
    BookOpen,
    Trophy,
    Sparkles,
} from "lucide-react";

import type { NewsletterWithContent } from "@/lib/data/newsletter/types";

/* ============================================================
   Props
============================================================ */

interface NewsletterContentsPageProps {
    newsletter: NewsletterWithContent;
    compact?: boolean;
}

/* ============================================================
   Newsletter Contents Page
============================================================ */

export function NewsletterContentsPage({
    newsletter,
    compact = false,
}: NewsletterContentsPageProps) {
    const {
        articles,
        activities,
    } = newsletter;

    const totalItems =
        articles.length +
        activities.length;

    return (
        <div
            className="
                relative
                mx-auto
                w-full
                min-w-0
                overflow-hidden
                rounded-[0.25rem]
                bg-[#eaf4ff]
                text-slate-900
                shadow-[0_0.5rem_1.25rem_rgba(0,0,0,0.14),0_0.15rem_0.35rem_rgba(0,0,0,0.08)]
            "
        >
            {/* ==================================================
                DECORATIVE BACKGROUND
            ================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-[4rem]
                    -top-[4rem]
                    size-[10rem]
                    rounded-full
                    border
                    border-blue-200/60
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-[2.5rem]
                    -top-[2.5rem]
                    size-[7rem]
                    rounded-full
                    border
                    border-amber-300/50
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-[5rem]
                    -left-[5rem]
                    size-[11rem]
                    rounded-full
                    bg-blue-200/30
                    blur-[1.5rem]
                "
            />

            {/* ==================================================
                PAGE
            ================================================== */}

            <div
                className={`
                    relative
                    z-10
                    flex
                    w-full
                    min-w-0
                    flex-col
                    aspect-[210/297]
                    h-auto

                    ${compact
                        ? "px-[1rem] py-[1.25rem] sm:px-[1.5rem] sm:py-[1.75rem]"
                        : "px-[1.25rem] py-[1.5rem] sm:px-[2rem] sm:py-[2.25rem]"
                    }
                `}
            >
                {/* ==================================================
                    HEADER
                ================================================== */}

                <header>
                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-[1rem]
                        "
                    >
                        <div className="min-w-0">
                            <p
                                className={`
                                    font-black
                                    uppercase
                                    tracking-[0.15em]
                                    text-amber-600
                                    sm:tracking-[0.2em]

                                    ${compact
                                        ? "text-[0.625rem]"
                                        : "text-[0.75rem]"
                                    }
                                `}
                            >
                                School Newsletter
                            </p>

                            <h1
                                className={`
                                    font-black
                                    leading-none
                                    tracking-tight
                                    text-blue-950

                                    ${compact
                                        ? "mt-[0.375rem] text-[1.75rem]"
                                        : "mt-[0.5rem] text-[2rem]"
                                    }

                                    sm:text-[2.5rem]
                                `}
                            >
                                Contents
                            </h1>
                        </div>

                        <div
                            className="
                                shrink-0
                                text-right
                            "
                        >
                            <Sparkles
                                className={`
                                    ml-auto
                                    text-amber-500

                                    ${compact
                                        ? "size-[1.25rem]"
                                        : "size-[1.5rem]"
                                    }
                                `}
                            />

                            <p
                                className={`
                                    mt-[0.375rem]
                                    font-bold
                                    text-slate-400

                                    ${compact
                                        ? "text-[0.625rem]"
                                        : "text-[0.75rem]"
                                    }
                                `}
                            >
                                {totalItems}{" "}
                                {totalItems === 1
                                    ? "story"
                                    : "stories"}
                            </p>
                        </div>
                    </div>

                    {/* Header Line */}

                    <div
                        className="
                            mt-[1.25rem]
                            flex
                            items-center
                            gap-[0.625rem]
                        "
                    >
                        <div
                            className="
                                h-[0.125rem]
                                min-w-0
                                flex-1
                                bg-blue-950
                            "
                        />

                        <div
                            className="
                                size-[0.5rem]
                                shrink-0
                                rotate-45
                                bg-amber-500
                            "
                        />

                        <div
                            className="
                                h-px
                                w-[3rem]
                                shrink-0
                                bg-slate-300
                            "
                        />
                    </div>
                </header>

                {/* ==================================================
                    CONTENT
                ================================================== */}

                <main
                    className={`
                        min-w-0

                        ${compact
                            ? "mt-[1.5rem]"
                            : "mt-[2rem]"
                        }
                    `}
                >
                    {/* ==================================================
                        ACTIVITIES
                    ================================================== */}

                    {activities.length > 0 && (
                        <section>
                            <SectionHeading
                                icon={
                                    <Trophy
                                        className={
                                            compact
                                                ? "size-[1rem]"
                                                : "size-[1.125rem]"
                                        }
                                    />
                                }
                                title="Activities"
                                count={activities.length}
                                compact={compact}
                            />

                            <div
                                className={`
                                    border-l-[0.125rem]
                                    border-amber-200

                                    ${compact
                                        ? "mt-[0.75rem] space-y-[0.75rem] pl-[0.875rem]"
                                        : "mt-[1rem] space-y-[1rem] pl-[1.125rem]"
                                    }
                                `}
                            >
                                {activities.map(
                                    (activity, index) => (
                                        <ContentItem
                                            key={`activity-${index}`}
                                            number={index + 1}
                                            title={activity.title}
                                            accent="amber"
                                            compact={compact}
                                        />
                                    ),
                                )}
                            </div>
                        </section>
                    )}

                    {/* ==================================================
                        ARTICLES
                    ================================================== */}

                    {articles.length > 0 && (
                        <section
                            className={
                                activities.length > 0
                                    ? compact
                                        ? "mt-[1.75rem]"
                                        : "mt-[2rem]"
                                    : ""
                            }
                        >
                            <SectionHeading
                                icon={
                                    <BookOpen
                                        className={
                                            compact
                                                ? "size-[1rem]"
                                                : "size-[1.125rem]"
                                        }
                                    />
                                }
                                title="Articles"
                                count={articles.length}
                                compact={compact}
                            />

                            <div
                                className={`
                                    border-l-[0.125rem]
                                    border-blue-200

                                    ${compact
                                        ? "mt-[0.75rem] space-y-[0.75rem] pl-[0.875rem]"
                                        : "mt-[1rem] space-y-[1rem] pl-[1.125rem]"
                                    }
                                `}
                            >
                                {articles.map(
                                    (article, index) => (
                                        <ContentItem
                                            key={`article-${index}`}
                                            number={
                                                activities.length +
                                                index +
                                                1
                                            }
                                            title={article.title}
                                            accent="blue"
                                            compact={compact}
                                        />
                                    ),
                                )}
                            </div>
                        </section>
                    )}

                    {/* ==================================================
                        EMPTY
                    ================================================== */}

                    {totalItems === 0 && (
                        <div
                            className="
                                flex
                                min-h-[12rem]
                                items-center
                                justify-center
                                text-center
                            "
                        >
                            <p
                                className="
                                    text-[0.875rem]
                                    text-slate-400
                                "
                            >
                                No stories in this issue.
                            </p>
                        </div>
                    )}
                </main>

                {/* ==================================================
                    FOOTER
                ================================================== */}

                <footer
                    className={`
                        mt-auto
                        flex
                        flex-wrap
                        items-center
                        justify-between
                        gap-[0.75rem]
                        border-t
                        border-slate-200

                        ${compact
                            ? "pt-[0.75rem]"
                            : "pt-[1rem]"
                        }
                    `}
                >
                    <span
                        className={`
                            min-w-0
                            font-bold
                            uppercase
                            tracking-[0.1em]
                            text-slate-400

                            ${compact
                                ? "text-[0.5rem]"
                                : "text-[0.625rem]"
                            }
                        `}
                    >
                        PM SHRI GSSS DHANAU
                    </span>

                    <span
                        className={`
                            shrink-0
                            font-semibold
                            text-amber-600

                            ${compact
                                ? "text-[0.5625rem]"
                                : "text-[0.6875rem]"
                            }
                        `}
                    >
                        Explore · Learn · Inspire
                    </span>
                </footer>
            </div>
        </div>
    );
}

/* ============================================================
   Section Heading
============================================================ */

interface SectionHeadingProps {
    icon: React.ReactNode;
    title: string;
    count: number;
    compact: boolean;
}

function SectionHeading({
    icon,
    title,
    count,
    compact,
}: SectionHeadingProps) {
    return (
        <div
            className="
                flex
                min-w-0
                items-center
                justify-between
                gap-[0.75rem]
            "
        >
            <div
                className="
                    flex
                    min-w-0
                    items-center
                    gap-[0.625rem]
                "
            >
                <div
                    className={`
                        flex
                        shrink-0
                        items-center
                        justify-center
                        rounded-[0.375rem]
                        bg-blue-950
                        text-white

                        ${compact
                            ? "size-[1.5rem]"
                            : "size-[1.75rem]"
                        }
                    `}
                >
                    {icon}
                </div>

                <h2
                    className={`
                        min-w-0
                        font-black
                        uppercase
                        tracking-[0.08em]
                        text-blue-950

                        ${compact
                            ? "text-[0.75rem]"
                            : "text-[0.875rem]"
                        }
                    `}
                >
                    {title}
                </h2>
            </div>

            <span
                className={`
                    shrink-0
                    rounded-full
                    bg-white
                    font-bold
                    text-slate-400
                    ring-1
                    ring-slate-200

                    ${compact
                        ? "px-[0.5rem] py-[0.125rem] text-[0.625rem]"
                        : "px-[0.625rem] py-[0.1875rem] text-[0.6875rem]"
                    }
                `}
            >
                {count}
            </span>
        </div>
    );
}

/* ============================================================
   Content Item
============================================================ */

interface ContentItemProps {
    number: number;
    title: string;
    accent: "blue" | "amber";
    compact: boolean;
}

function ContentItem({
    number,
    title,
    accent,
    compact,
}: ContentItemProps) {
    const numberColor =
        accent === "blue"
            ? "text-blue-900"
            : "text-amber-700";

    return (
        <div
            className="
                flex
                min-w-0
                items-start
                gap-[0.625rem]
            "
        >
            <span
                className={`
                    shrink-0
                    font-black
                    leading-none
                    ${numberColor}

                    ${compact
                        ? "w-[1.5rem] text-[0.6875rem]"
                        : "w-[1.75rem] text-[0.75rem]"
                    }
                `}
            >
                {String(number).padStart(2, "0")}
            </span>

            <div
                className="
                    min-w-0
                    flex-1
                "
            >
                <p
                    className={`
                        break-words
                        font-semibold
                        leading-[1.35]
                        text-slate-700

                        ${compact
                            ? "text-[0.6875rem]"
                            : "text-[0.8125rem]"
                        }
                    `}
                >
                    {title}
                </p>

                <div
                    className="
                        mt-[0.375rem]
                        border-b
                        border-dotted
                        border-slate-300
                    "
                />
            </div>
        </div>
    );
}