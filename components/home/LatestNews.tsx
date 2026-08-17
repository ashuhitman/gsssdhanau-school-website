import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    ChevronRight,
} from "lucide-react";

export interface NewsActivityItem {
    id: string;
    title: string;
    description?: string;
    date: string;
    href: string;
    category?: string;
}

interface LatestNewsProps {
    items?: NewsActivityItem[];
    title?: string;
    href?: string;
}

const sampleItems: NewsActivityItem[] = [
    {
        id: "1",
        title: "Independence Day Celebration",
        description:
            "Students participated in cultural performances and activities.",
        date: "15 Aug 2026",
        category: "Event",
        href: "/news/independence-day-celebration",
    },
    {
        id: "2",
        title: "Inter-School Science Competition",
        description:
            "Students presented innovative science projects.",
        date: "12 Aug 2026",
        category: "Academic",
        href: "/news/inter-school-science-competition",
    },
    {
        id: "3",
        title: "Tree Plantation Activity",
        description:
            "Students participated in an environmental awareness activity.",
        date: "08 Aug 2026",
        category: "Activity",
        href: "/news/tree-plantation-activity",
    },
    {
        id: "4",
        title: "Inter-School Quiz Competition",
        description:
            "Students represented the school in an inter-school quiz.",
        date: "05 Aug 2026",
        category: "Event",
        href: "/news/inter-school-quiz",
    },
];

export function LatestNews({
    items = sampleItems,
    title = "Latest News & Activities",
    href = "/news",
}: LatestNewsProps) {
    return (
        <section
            className="
                min-w-0
                rounded-2xl
                border
                border-border
                bg-card
                p-5
                shadow-sm
                sm:p-6
            "
        >
            {/* Heading */}
            <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                    <p
                        className="
                            mb-1
                            text-[clamp(0.625rem,0.7vw,0.75rem)]
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-primary-600
                        "
                    >
                        School Updates
                    </p>

                    <h2
                        className="
                            text-[clamp(1.35rem,2vw,1.75rem)]
                            font-bold
                            tracking-tight
                            text-foreground
                        "
                    >
                        {title}
                    </h2>
                </div>
            </div>

            {/* Vertical list */}
            <div className="divide-y divide-border">
                {items.slice(0, 4).map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className="
                            group
                            flex
                            items-center
                            gap-4
                            py-4
                            first:pt-2
                            last:pb-2
                        "
                    >
                        {/* Date */}
                        <div
                            className="
                                flex
                                size-[3.5rem]
                                shrink-0
                                flex-col
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary-50
                                text-primary-700
                                dark:bg-primary-950
                                dark:text-primary-300
                            "
                        >
                            <CalendarDays className="size-4" />

                            <span className="mt-0.5 text-[0.6rem] font-semibold">
                                {item.date
                                    .split(" ")
                                    .slice(0, 2)
                                    .join(" ")}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                            {item.category && (
                                <p
                                    className="
                                        mb-1
                                        text-[0.65rem]
                                        font-semibold
                                        uppercase
                                        tracking-wide
                                        text-primary-600
                                    "
                                >
                                    {item.category}
                                </p>
                            )}

                            <h3
                                className="
                                    line-clamp-1
                                    text-sm
                                    font-semibold
                                    text-foreground
                                    transition
                                    group-hover:text-primary-600
                                    sm:text-base
                                "
                            >
                                {item.title}
                            </h3>

                            {item.description && (
                                <p
                                    className="
                                        mt-1
                                        line-clamp-1
                                        text-xs
                                        text-muted-foreground
                                    "
                                >
                                    {item.description}
                                </p>
                            )}
                        </div>

                        <ChevronRight
                            className="
                                size-4
                                shrink-0
                                text-muted-foreground
                                transition
                                group-hover:translate-x-1
                                group-hover:text-primary-600
                            "
                        />
                    </Link>
                ))}
            </div>

            {/* View all */}
            <div className="mt-4 border-t border-border pt-4">
                <Link
                    href={href}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-primary-600
                        transition
                        hover:text-primary-700
                    "
                >
                    View all news & activities
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        </section>
    );
}