import Link from "next/link";

import {
    ArrowRight,
    FileText,
} from "lucide-react";

import { getLatestNotices } from "@/lib/data/notice/get";

export async function Notices() {
    const notices = await getLatestNotices(4);

    return (
        <section className="home-grid-card">
            {/* Header */}

            <div className="flex items-center justify-between gap-3">
                <h2
                    className="
                        font-serif
                        text-[1.15rem]
                        font-bold
                        text-heading
                    "
                >
                    Notices
                </h2>

                <Link
                    href="/notices"
                    className="
                        text-[0.68rem]
                        font-medium
                        text-primary
                        hover:underline
                    "
                >
                    View All →
                </Link>
            </div>

            {/* Notice list */}

            <div className="mt-4 divide-y divide-border">
                {notices.length > 0 ? (
                    notices.map((notice) => (
                        <Link
                            key={notice.id}
                            href={`/notices/${notice.id}`}
                            className="
                                group
                                flex
                                items-center
                                gap-3
                                py-3
                            "
                        >
                            <div
                                className="
                                    flex
                                    size-[2.1rem]
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    icon-bg-primary
                                "
                            >
                                <FileText
                                    className="
                                        size-[1rem]
                                        icon-primary
                                    "
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3
                                    className="
                                        truncate
                                        text-[0.72rem]
                                        font-semibold
                                        text-heading
                                        group-hover:text-primary
                                    "
                                >
                                    {notice.title}
                                </h3>

                                <p
                                    className="
                                        mt-0.5
                                        text-[0.6rem]
                                        text-muted
                                    "
                                >
                                    {formatNoticeDate(
                                        notice.noticeDate
                                    )}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p
                        className="
                            py-8
                            text-center
                            text-[0.7rem]
                            text-muted
                        "
                    >
                        No notices available.
                    </p>
                )}
            </div>

            {/* Footer */}

            <Link
                href="/notices"
                className="
                    mt-auto
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-default
                    py-2
                    text-[0.68rem]
                    font-semibold
                    text-primary
                    transition-colors
                    hover:bg-primary-soft
                "
            >
                All Notices

                <ArrowRight
                    className="size-[0.8rem]"
                    strokeWidth={2}
                />
            </Link>
        </section>
    );
}

function formatNoticeDate(
    date: string
): string {
    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}