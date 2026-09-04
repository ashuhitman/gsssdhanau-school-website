import {
    Bell,
    CalendarDays,
    ClipboardList,
    Download,
    FileText,
    GraduationCap,
    Info,
    Megaphone,
    Users,
} from "lucide-react";

import { InfoCard } from "@/components/common/InfoCard";
import { NoticeList } from "@/components/Notice/NoticeList";

import PageHero from "@/components/common/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";

import { getPublishedNotices } from "@/lib/data/notice/get";
import { NOTICE_CATEGORY } from "@/lib/data/notice/constants";

/* ============================================================
   Metadata
============================================================ */

export const metadata = {
    title: "Notices",
};

/* ============================================================
   Notice Categories
============================================================ */

const noticeCategories = [
    "All Notices",
    NOTICE_CATEGORY.ACADEMIC,
    NOTICE_CATEGORY.EXAMINATION,
    NOTICE_CATEGORY.ADMISSION,
    NOTICE_CATEGORY.HOLIDAY,
    NOTICE_CATEGORY.GENERAL,
    NOTICE_CATEGORY.ANNOUNCEMENT,
] as const;

/* ============================================================
   Quick Links
============================================================ */

const quickLinks = [
    {
        title: "Academic Calendar",
        description: "Important academic dates",
        icon: CalendarDays,
        href: "/academics/calendar",
    },
    {
        title: "Time Table",
        description: "Class and subject schedules",
        icon: ClipboardList,
        href: "/academics/timetable",
    },
    {
        title: "Exam Schedule",
        description: "Upcoming examinations",
        icon: GraduationCap,
        href: "/academics/examinations",
    },
    {
        title: "Download Forms",
        description: "Useful school forms",
        icon: Download,
        href: "/downloads",
    },
    {
        title: "Results",
        description: "Examination results",
        icon: FileText,
        href: "/results",
    },
];

/* ============================================================
   Notices Page
============================================================ */

export default async function NoticesPage() {
    /* ========================================================
       Get Published Notices
    ======================================================== */

    const notices = await getPublishedNotices();

    /* ========================================================
       Category Counts
    ======================================================== */

    const categoryCards = [
        {
            title: "Academic",
            count: notices.filter(
                (notice) =>
                    notice.category ===
                    NOTICE_CATEGORY.ACADEMIC
            ).length,
            icon: GraduationCap,
        },
        {
            title: "Examination",
            count: notices.filter(
                (notice) =>
                    notice.category ===
                    NOTICE_CATEGORY.EXAMINATION
            ).length,
            icon: FileText,
        },
        {
            title: "Admission",
            count: notices.filter(
                (notice) =>
                    notice.category ===
                    NOTICE_CATEGORY.ADMISSION
            ).length,
            icon: Users,
        },
        {
            title: "Holiday",
            count: notices.filter(
                (notice) =>
                    notice.category ===
                    NOTICE_CATEGORY.HOLIDAY
            ).length,
            icon: CalendarDays,
        },
        {
            title: "General",
            count: notices.filter(
                (notice) =>
                    notice.category ===
                    NOTICE_CATEGORY.GENERAL
            ).length,
            icon: Megaphone,
        },
        {
            title: "Announcement",
            count: notices.filter(
                (notice) =>
                    notice.category ===
                    NOTICE_CATEGORY.ANNOUNCEMENT
            ).length,
            icon: Bell,
        },
    ];

    return (
        <PageLayout
            hero={
                <PageHero
                    breadcrumb={[
                        {
                            label: "Notices",
                        },
                    ]}
                    subheading="SCHOOL NOTICES"
                    title=""
                    highlight="Notices"
                    description="Stay updated with the latest announcements, circulars and important information from PM SHRI GSSS Dhanau."
                    image="/images/notice/hero.jpg"
                    imageAlt="PM SHRI GSSS Dhanau students participating in activities"
                />
            }
        >
            {/* ==================================================
                MAIN CONTENT
            ================================================== */}

            <section className="py-6 lg:py-8">
                <div className="mx-auto">
                    <div
                        className="
                            grid
                            gap-6
                            lg:grid-cols-[minmax(0,1fr)_300px]
                        "
                    >
                        {/* ==================================================
                            NOTICES
                        ================================================== */}

                        <NoticeList
                            notices={notices}
                            categories={noticeCategories}
                        />

                        {/* ==================================================
                            SIDEBAR
                        ================================================== */}

                        <aside className="space-y-5">
                            {/* ==================================================
                                QUICK LINKS
                            ================================================== */}

                            <div
                                className="
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-border
                                    bg-card
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        border-b
                                        border-border
                                        px-5
                                        py-4
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            size-9
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-primary-50
                                            text-primary-600
                                            dark:bg-primary-950
                                            dark:text-primary-400
                                        "
                                    >
                                        <Megaphone className="size-4" />
                                    </div>

                                    <div>
                                        <h2
                                            className="
                                                text-sm
                                                font-bold
                                                text-primary-800
                                                dark:text-primary-200
                                            "
                                        >
                                            Quick Links
                                        </h2>

                                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                                            Frequently used resources
                                        </p>
                                    </div>
                                </div>

                                <div className="p-2">
                                    {quickLinks.map((item) => (
                                        <InfoCard
                                            key={item.href}
                                            icon={item.icon}
                                            title={item.title}
                                            description={
                                                item.description
                                            }
                                            href={item.href}
                                            variant="circleIcon"
                                            className="
                                                rounded-lg
                                                px-3
                                                py-2.5
                                                hover:bg-primary-50
                                                dark:hover:bg-primary-950/40
                                            "
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* ==================================================
                                NOTICE CATEGORIES
                            ================================================== */}

                            <div
                                className="
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-border
                                    bg-card
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        border-b
                                        border-border
                                        px-5
                                        py-4
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            size-9
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-primary-50
                                            text-primary-600
                                            dark:bg-primary-950
                                            dark:text-primary-400
                                        "
                                    >
                                        <FileText className="size-4" />
                                    </div>

                                    <div>
                                        <h2
                                            className="
                                                text-sm
                                                font-bold
                                                text-primary-800
                                                dark:text-primary-200
                                            "
                                        >
                                            Notice Categories
                                        </h2>

                                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                                            Browse by type
                                        </p>
                                    </div>
                                </div>

                                <div className="p-3">
                                    {categoryCards.map((category) => {
                                        const Icon = category.icon;

                                        return (
                                            <div
                                                key={category.title}
                                                className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                    rounded-lg
                                                    px-3
                                                    py-2.5
                                                    transition-colors
                                                    hover:bg-primary-50
                                                    dark:hover:bg-primary-950/40
                                                "
                                            >
                                                <Icon
                                                    className="
                                                        size-4
                                                        shrink-0
                                                        text-primary-600
                                                        dark:text-primary-400
                                                    "
                                                />

                                                <span
                                                    className="
                                                        min-w-0
                                                        flex-1
                                                        text-xs
                                                        font-medium
                                                        text-foreground
                                                    "
                                                >
                                                    {category.title}
                                                </span>

                                                <span
                                                    className="
                                                        flex
                                                        size-6
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-primary-50
                                                        text-[10px]
                                                        font-bold
                                                        text-primary-700
                                                        dark:bg-primary-900
                                                        dark:text-primary-300
                                                    "
                                                >
                                                    {category.count}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ==================================================
                                IMPORTANT NOTE
                            ================================================== */}

                            <div
                                className="
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-primary-100
                                    bg-primary-50/70
                                    p-5
                                    dark:border-primary-900
                                    dark:bg-primary-950/30
                                "
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="
                                            flex
                                            size-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-primary-600
                                            text-white
                                        "
                                    >
                                        <Info className="size-4" />
                                    </div>

                                    <h2
                                        className="
                                            text-sm
                                            font-bold
                                            text-primary-800
                                            dark:text-primary-200
                                        "
                                    >
                                        Important Note
                                    </h2>
                                </div>

                                <p
                                    className="
                                        mt-3
                                        text-xs
                                        leading-5
                                        text-muted-foreground
                                    "
                                >
                                    Please check this page regularly
                                    for important updates and
                                    announcements. Students are advised
                                    to follow the instructions mentioned
                                    in each notice.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}