import { Archive } from "lucide-react";

import { NewsletterCard } from "./NewsletterCard";
import SectionHeading from "../common/SectionHeading";

/* ============================================================
   Types
============================================================ */

export interface PreviousIssue {
    id: string | null;
    month: number;
    year: number;
    volume: string;
    issue: number;
    coverImage: string;
    href: string;
    downloadHref: string | null;
}

interface PreviousIssuesProps {
    newsletters: PreviousIssue[];
    showViewAll?: boolean;
    viewAllHref?: string;
}

/* ============================================================
   Month Name
============================================================ */

function getMonthName(month: number) {
    return new Date(
        2000,
        month - 1,
        1
    ).toLocaleString("en-US", {
        month: "long",
    });
}

/* ============================================================
   Previous Issues
============================================================ */

export default function PreviousIssues({
    newsletters,
    showViewAll = true,
    viewAllHref = "/newsletters",
}: PreviousIssuesProps) {
    return (
        <section className="w-full">
            {/* ==================================================
                SECTION HEADER
            ================================================== */}

            <div
                className="
                    flex
                    items-end
                    justify-between
                    gap-4
                "
            >
                <SectionHeading
                    title="Previous Issues"
                    align="left"
                    icon={
                        <Archive
                            className="
                                size-[clamp(1.25rem,2.5vw,1.65rem)]
                                text-accent
                            "
                            strokeWidth={2}
                        />
                    }
                />

                {showViewAll && (
                    <a
                        href={viewAllHref}
                        className="
                            mb-[0.2rem]
                            flex
                            shrink-0
                            items-center
                            gap-[0.35rem]
                            text-[0.7rem]
                            font-semibold
                            text-primary
                            transition-colors
                            duration-200
                            hover:text-accent
                            sm:text-[0.8rem]
                        "
                    >
                        <span>View All Issues</span>

                        <span
                            aria-hidden="true"
                            className="
                                text-[1rem]
                                leading-none
                            "
                        >
                            →
                        </span>
                    </a>
                )}
            </div>

            {/* ==================================================
                PREVIOUS ISSUE CARDS
            ================================================== */}

            <div
                className="
                    mt-5
                    flex
                    w-full
                    flex-nowrap
                    gap-5
                    overflow-x-auto
                    overflow-y-hidden
                    pb-[0.5rem]
                    [scrollbar-width:none]
                    [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden
                "
            >
                {newsletters.map((newsletter) => {
                    const monthName = getMonthName(
                        newsletter.month
                    );

                    return (
                        <div
                            key={
                                newsletter.id ??
                                `${newsletter.year}-${newsletter.month}-${newsletter.issue}`
                            }
                            className="
                                w-[12rem]
                                shrink-0
                                sm:w-[13rem]
                            "
                        >
                            <NewsletterCard
                                title={`${monthName} ${newsletter.year}`}
                                issue={String(
                                    newsletter.issue
                                )}
                                date={`${monthName} ${newsletter.year}`}
                                coverImage={
                                    newsletter.coverImage
                                }
                                href={newsletter.href}

                                showInfo={true}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}