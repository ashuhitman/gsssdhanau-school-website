import ContentTimelineCard from "./ContentTimelineCard";

/* ============================================================
   Types
============================================================ */

export interface ContentTimelineItem {
    id: string;
    href: string;
    image: string | null;
    imageAlt?: string;
    title: string;
    category?: string;
    articleType?: string;
    excerpt?: string;
    publishedAt?: string;
    author?: string;
}

interface ContentTimelineProps {
    items: ContentTimelineItem[];
    emptyMessage?: string;
}

/* ============================================================
   Content Timeline
============================================================ */

export default function ContentTimeline({
    items,
    emptyMessage = "No articles available.",
}: ContentTimelineProps) {
    if (items.length === 0) {
        return (
            <div
                className="
                    rounded-xl
                    border
                    border-dashed
                    border-slate-200
                    bg-white
                    px-6
                    py-10
                    text-center
                    text-sm
                    text-slate-400
                "
            >
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="relative">
            {/* ==================================================
                Vertical Timeline Line
                Desktop only
            ================================================== */}

            <div
                aria-hidden="true"
                className="
                    absolute
                    bottom-0
                    left-[5px]
                    top-0
                    hidden
                    w-px
                    bg-slate-200
                    sm:left-[6px]
                    sm:block
                "
            />

            {/* ==================================================
                Timeline Items
            ================================================== */}

            <div
                className="
                    space-y-6
                    sm:space-y-7
                "
            >
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="
                            relative
                            grid
                            grid-cols-1
                            sm:grid-cols-[90px_minmax(0,1fr)]
                            sm:items-center
                            sm:gap-4
                        "
                    >
                        {/* ==================================================
                            Timeline Dot
                            Desktop only
                        ================================================== */}

                        <span
                            aria-hidden="true"
                            className="
                                absolute
                                left-[6px]
                                top-1/2
                                z-20
                                hidden
                                size-2.5
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                border-2
                                border-white
                                bg-amber-400
                                ring-1
                                ring-slate-200
                                sm:block
                            "
                        />

                        {/* ==================================================
                            Date
                            Desktop only
                        ================================================== */}

                        <div
                            className="
                                hidden
                                text-center
                                sm:block
                            "
                        >
                            {item.publishedAt ? (
                                <time
                                    dateTime={
                                        item.publishedAt
                                    }
                                    className="
                                        block
                                        leading-none
                                    "
                                >
                                    {/* Day */}

                                    <span
                                        className="
                                            block
                                            text-2xl
                                            font-black
                                            tracking-tight
                                            text-slate-900
                                        "
                                    >
                                        {getDay(
                                            item.publishedAt
                                        )}
                                    </span>

                                    {/* Month */}

                                    <span
                                        className="
                                            mt-1
                                            block
                                            text-[9px]
                                            font-black
                                            uppercase
                                            tracking-[0.14em]
                                            text-amber-600
                                        "
                                    >
                                        {getMonth(
                                            item.publishedAt
                                        )}
                                    </span>

                                    {/* Year */}

                                    <span
                                        className="
                                            mt-0.5
                                            block
                                            text-[9px]
                                            font-medium
                                            tracking-wide
                                            text-slate-400
                                        "
                                    >
                                        {getYear(
                                            item.publishedAt
                                        )}
                                    </span>
                                </time>
                            ) : (
                                <span
                                    className="
                                        text-xs
                                        text-slate-300
                                    "
                                >
                                    —
                                </span>
                            )}
                        </div>

                        {/* ==================================================
                            Article Card
                        ================================================== */}

                        <div
                            className="
                                min-w-0
                                sm:col-start-2
                            "
                        >
                            <ContentTimelineCard
                                href={
                                    item.href
                                }
                                image={
                                    item.image
                                }
                                imageAlt={
                                    item.imageAlt
                                }
                                title={
                                    item.title
                                }
                                category={
                                    item.category
                                }
                                articleType={
                                    item.articleType
                                }
                                excerpt={
                                    item.excerpt
                                }
                                author={
                                    item.author
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ============================================================
   Date Helpers
============================================================ */

function getDay(date: string) {
    return new Date(
        date
    ).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
        }
    );
}

function getMonth(date: string) {
    return new Date(
        date
    ).toLocaleDateString(
        "en-IN",
        {
            month: "short",
        }
    );
}

function getYear(date: string) {
    return new Date(
        date
    ).toLocaleDateString(
        "en-IN",
        {
            year: "numeric",
        }
    );
}