import {
    BookOpen,
    CalendarDays,
    Download,
    FileText,
} from "lucide-react";

import { NewsletterCard } from "./NewsletterCard";

interface NewsletterLatestIssueProps {
    title: string;
    description: string;
    issue: string;
    date: string;
    pages: string;
    size: string;
    href?: string;
    downloadHref?: string;
}

export default function NewsletterLatestIssue({
    title,
    description,
    issue,
    date,
    pages,
    size,
    href,
    downloadHref,
}: NewsletterLatestIssueProps) {
    return (
        <article
            className="
                w-full
                rounded-2xl
                border
                border-default
                bg-card
                shadow-school-card
            "
        >
            <div
                className="
                    grid
                    w-full
                    grid-cols-1

                    lg:grid-cols-[22rem_minmax(0,1fr)]

                    xl:grid-cols-[24rem_minmax(0,1fr)]
                "
            >
                {/* =====================================================
                    NEWSLETTER CARD
                ====================================================== */}

                <div
                    className="
                        flex
                        min-h-[28rem]
                        w-full
                        items-center
                        justify-center
                        bg-surface
                        p-8

                        sm:min-h-[30rem]

                        lg:min-h-[32rem]
                        lg:p-10
                    "
                >
                    <div
                        className="
                            relative
                            z-10
                            w-[15rem]
                            max-w-full
                            shrink-0
                        "
                    >
                        <NewsletterCard
                            title={title}
                            description={description}
                            issue={issue}
                            date={date}
                            href={href}
                            showInfo={false}
                        />
                    </div>
                </div>

                {/* =====================================================
                    LATEST ISSUE INFORMATION
                ====================================================== */}

                <div
                    className="
                        flex
                        min-w-0
                        flex-col
                        justify-center
                        p-6

                        sm:p-8

                        lg:p-10

                        xl:p-12
                    "
                >
                    {/* Badge */}

                    <div>
                        <span
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-md
                                bg-primary-soft
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-primary
                            "
                        >
                            <BookOpen
                                size={14}
                                className="shrink-0"
                            />

                            Latest Issue
                        </span>
                    </div>

                    {/* Title */}

                    <h2
                        className="
                            mt-4
                            text-[clamp(1.5rem,3vw,2rem)]
                            font-bold
                            leading-tight
                            text-heading
                        "
                    >
                        {title}
                    </h2>

                    {/* Description */}

                    <p
                        className="
                            mt-3
                            max-w-[42rem]
                            text-sm
                            leading-6
                            text-muted

                            sm:text-base
                        "
                    >
                        {description}
                    </p>

                    {/* =================================================
                        META INFORMATION
                    ================================================== */}

                    <div
                        className="
                            mt-6
                            flex
                            flex-wrap
                            items-center
                            gap-x-6
                            gap-y-3
                        "
                    >
                        {/* Date */}

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-body
                            "
                        >
                            <CalendarDays
                                size={17}
                                className="shrink-0 text-primary"
                            />

                            <span>{date}</span>
                        </div>

                        {/* Pages */}

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-body
                            "
                        >
                            <FileText
                                size={17}
                                className="shrink-0 text-primary"
                            />

                            <span>{pages}</span>
                        </div>

                        {/* File Size */}

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-body
                            "
                        >
                            <Download
                                size={17}
                                className="shrink-0 text-primary"
                            />

                            <span>{size}</span>
                        </div>
                    </div>

                    {/* =================================================
                        ACTIONS
                    ================================================== */}

                    <div
                        className="
                            mt-7
                            flex
                            flex-col
                            gap-3

                            sm:flex-row
                        "
                    >
                        {/* Read */}

                        {href && (
                            <a
                                href={href}
                                className="
                                    inline-flex
                                    min-h-11
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-lg
                                    border
                                    border-primary
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-primary
                                    transition-colors

                                    hover:bg-primary-soft
                                "
                            >
                                <BookOpen
                                    size={17}
                                    className="shrink-0"
                                />

                                Read Now
                            </a>
                        )}

                        {/* Download */}

                        {downloadHref && (
                            <a
                                href={downloadHref}
                                download
                                className="
                                    inline-flex
                                    min-h-11
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-lg
                                    bg-primary
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-school-button
                                    transition-colors

                                    hover:bg-primary-hover
                                "
                            >
                                <Download
                                    size={17}
                                    className="shrink-0"
                                />

                                Download PDF
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}