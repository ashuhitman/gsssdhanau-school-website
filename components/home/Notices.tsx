import Link from "next/link";
import {
    ArrowRight,
    Bell,
    CalendarDays,
} from "lucide-react";

export interface NoticeItem {
    id: string;
    title: string;
    date: string;
    category?: string;
    href: string;
    isNew?: boolean;
}

interface NoticesProps {
    items?: NoticeItem[];
    title?: string;
    description?: string;
    href?: string;
}

const sampleNotices: NoticeItem[] = [
    {
        id: "1",
        title: "Half-Yearly Examination Schedule",
        date: "18 Aug 2026",
        category: "Examination",
        href: "/notices/half-yearly-examination-schedule",
        isNew: true,
    },
    {
        id: "2",
        title: "School Holiday Notice",
        date: "16 Aug 2026",
        category: "Holiday",
        href: "/notices/school-holiday",
        isNew: true,
    },
    {
        id: "3",
        title: "Scholarship Form Submission",
        date: "14 Aug 2026",
        category: "Academic",
        href: "/notices/scholarship-form",
    },
    {
        id: "4",
        title: "Parent Teacher Meeting",
        date: "10 Aug 2026",
        category: "General",
        href: "/notices/parent-teacher-meeting",
    },
];

export function Notices({
    items = sampleNotices,
    title = "Notices",
    description = "Important school information",
    href = "/notices",
}: NoticesProps) {
    return (
        <section
            className="
                flex
                h-full
                min-w-0
                flex-col
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
            <div className="mb-5">
                <div className="mb-2 flex items-center gap-2">
                    <span
                        className="
                            flex
                            size-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-primary-100
                            text-primary-600
                            dark:bg-primary-900/50
                            dark:text-primary-400
                        "
                    >
                        <Bell className="size-4" />
                    </span>

                    <h2 className="text-lg font-bold text-foreground sm:text-xl">
                        {title}
                    </h2>
                </div>

                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {/* Notice list */}
            <div className="flex-1 divide-y divide-border">
                {items.slice(0, 4).map((notice) => (
                    <Link
                        key={notice.id}
                        href={notice.href}
                        className="
                            group
                            block
                            py-4
                            first:pt-0
                            last:pb-0
                        "
                    >
                        <div className="flex gap-3">
                            {/* Date */}
                            <div
                                className="
                                    flex
                                    size-11
                                    shrink-0
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-primary-50
                                    text-primary-700
                                    dark:bg-primary-950
                                    dark:text-primary-300
                                "
                            >
                                <CalendarDays className="mb-0.5 size-3.5" />

                                <span className="text-[0.6rem] font-semibold uppercase">
                                    {notice.date
                                        .split(" ")
                                        .slice(0, 2)
                                        .join(" ")}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                                <div className="mb-1 flex flex-wrap items-center gap-2">
                                    {notice.category && (
                                        <span
                                            className="
                                                text-[0.65rem]
                                                font-semibold
                                                uppercase
                                                tracking-wide
                                                text-primary-600
                                            "
                                        >
                                            {notice.category}
                                        </span>
                                    )}

                                    {notice.isNew && (
                                        <span
                                            className="
                                                rounded-full
                                                bg-primary-100
                                                px-2
                                                py-0.5
                                                text-[0.6rem]
                                                font-bold
                                                uppercase
                                                text-primary-700
                                                dark:bg-primary-900/50
                                                dark:text-primary-300
                                            "
                                        >
                                            New
                                        </span>
                                    )}
                                </div>

                                <h3
                                    className="
                                        line-clamp-2
                                        text-sm
                                        font-semibold
                                        leading-5
                                        text-foreground
                                        transition
                                        group-hover:text-primary-600
                                    "
                                >
                                    {notice.title}
                                </h3>
                            </div>

                            <ArrowRight
                                className="
                                    mt-1
                                    size-4
                                    shrink-0
                                    text-muted-foreground
                                    transition
                                    group-hover:translate-x-1
                                    group-hover:text-primary-600
                                "
                            />
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All */}
            <div
                className="
                    mt-5
                    flex
                    justify-center
                    border-t
                    border-border
                    pt-4
                "
            >
                <Link
                    href={href}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-border
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-primary-600
                        transition
                        hover:border-primary-300
                        hover:bg-primary-50
                        dark:hover:border-primary-700
                        dark:hover:bg-primary-950
                    "
                >
                    View all notices
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        </section>
    );
}