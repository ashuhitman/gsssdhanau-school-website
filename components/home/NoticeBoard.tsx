import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { NoticeCard, type NoticeCardProps } from "../ui/NoticeCard";

const notices: NoticeCardProps[] = [
    {
        title: "Admission Schedule for Academic Session 2025–26",
        date: "15 May 2025",
        category: "Admission",
        href: "/notices/admission-schedule",
        pinned: true,
    },
    {
        title: "School Reopening and Class Timetable",
        date: "12 May 2025",
        category: "General",
        href: "/notices/school-reopening",
    },
    {
        title: "Important Notice for Class 10 & 12 Students",
        date: "08 May 2025",
        category: "Examination",
        href: "/notices/board-students",
    },
    {
        title: "Parent-Teacher Meeting",
        date: "05 May 2025",
        category: "School",
        href: "/notices/parent-teacher-meeting",
    },
];

export function NoticeBoard() {
    return (
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            {/* Header */}
            <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-400">
                        Important Updates
                    </p>

                    <h2 className="mt-1 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                        Notice Board
                    </h2>
                </div>

                <Link
                    href="/notices"
                    className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400"
                >
                    View All

                    <ArrowRight className="size-3.5" />
                </Link>
            </div>

            {/* Notice cards */}
            <div className="mt-5 grid gap-3">
                {notices.map((notice) => (
                    <NoticeCard
                        key={notice.href}
                        {...notice}
                    />
                ))}
            </div>
        </section>
    );
}