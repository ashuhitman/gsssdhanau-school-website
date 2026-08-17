import {
    Bell,
    CalendarDays,
    ClipboardList,
    Download,
    FileText,
    GraduationCap,
    Info,
    Megaphone,
    Trophy,
} from "lucide-react";


import { InfoCard } from "@/components/ui/InfoCard";
import { PublicHero } from "@/components/public/PublicHero";
import { NoticeList } from "@/components/Notice/NoticeList";

const notices = [
    {
        date: "16",
        month: "May",
        year: "2025",
        title: "Summer Vacation Schedule",
        description:
            "This is to inform all students and staff that the summer vacation will commence from 20th May 2025 to 30th June 2025.",
        category: "General Notice",
        href: "/notices/summer-vacation-schedule.pdf",
        isNew: true,
    },
    {
        date: "14",
        month: "May",
        year: "2025",
        title: "Unit Test Result Declaration",
        description:
            "Unit test results for Classes 6 to 12 have been declared. Students can collect their marksheets from the class teacher.",
        category: "Academic",
        href: "/notices/unit-test-result.pdf",
    },
    {
        date: "12",
        month: "May",
        year: "2025",
        title: "International Yoga Day Celebration",
        description:
            "The school will celebrate International Yoga Day on 21st June 2025. All students are required to participate.",
        category: "Event",
        href: "/notices/yoga-day.pdf",
    },
    {
        date: "08",
        month: "May",
        year: "2025",
        title: "Fee Submission Reminder",
        description:
            "This is a gentle reminder to all students to submit the pending tuition fees for the current session.",
        category: "General Notice",
        href: "/notices/fee-reminder.pdf",
    },
    {
        date: "05",
        month: "May",
        year: "2025",
        title: "New Academic Session 2025–26",
        description:
            "The new academic session 2025–26 will begin from 1st July 2025. Details regarding admission and timetable will be shared soon.",
        category: "Circular",
        href: "/notices/new-session.pdf",
    },
    {
        date: "02",
        month: "May",
        year: "2025",
        title: "Inter-House Sports Competition",
        description:
            "Inter-House Sports Competition will be held from 10th to 12th July 2025. All houses must prepare and participate.",
        category: "Sports",
        href: "/notices/sports-competition.pdf",
    },
];

const noticeCategories = [
    "All Notices",
    "General Notice",
    "Academic",
    "Event",
    "Circular",
    "Sports",
];

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

const categoryCards = [
    {
        title: "General Notice",
        count: 5,
        icon: Megaphone,
    },
    {
        title: "Academic",
        count: 3,
        icon: GraduationCap,
    },
    {
        title: "Event",
        count: 2,
        icon: CalendarDays,
    },
    {
        title: "Circular",
        count: 1,
        icon: FileText,
    },
    {
        title: "Sports",
        count: 1,
        icon: Trophy,
    },
];

export default function NoticesPage() {
    return (
        <>
            {/* =========================================================
                HERO
            ========================================================= */}
            <PublicHero
                eyebrow="School Notices"
                title="Notices"
                description="Stay updated with the latest announcements, circulars and important information from PM SHRI GSSS Dhanau."
                image="/images/notice/cover1.jpg"
                imageAlt="PM SHRI GSSS Dhanau school building"
                breadcrumbs={[
                    {
                        label: "Home",
                        href: "/",
                    },
                    {
                        label: "Notices",
                    },
                ]}
            />

            {/* =========================================================
                MAIN CONTENT
            ========================================================= */}
            <section className="px-4 py-6 sm:px-6 lg:py-8 2xl:px-8">
                <div className="mx-auto max-w-[90rem]">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
                        {/* =================================================
                            LEFT — SEARCH + NOTICES
                        ================================================= */}
                        <NoticeList
                            notices={notices}
                            categories={noticeCategories}
                        />

                        {/* =================================================
                            RIGHT SIDEBAR
                        ================================================= */}
                        <aside className="space-y-5">
                            {/* Quick Links */}
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
                                            description={item.description}
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

                            {/* Notice Categories */}
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

                            {/* Important Note */}
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
        </>
    );
}