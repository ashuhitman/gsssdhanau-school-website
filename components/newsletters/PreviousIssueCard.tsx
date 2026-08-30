import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

/* ============================================================
   Types
============================================================ */

export interface PreviousIssue {
    month: number;
    year: number;
    volume: string;
    issue: number;
    coverImage: string;
    href: string;
    downloadHref?: string | null;
}

interface PreviousIssueCardProps {
    issue: PreviousIssue;
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
   Previous Issue Card
============================================================ */

export default function PreviousIssueCard({
    issue,
}: PreviousIssueCardProps) {
    const monthName = getMonthName(issue.month);

    return (
        <article
            className="
                group
                w-[9rem]
                shrink-0
                overflow-hidden
                rounded-[0.6rem]
                bg-white
                shadow-[0_0.2rem_0.7rem_rgba(15,35,70,0.1)]
                transition-all
                duration-300
                hover:-translate-y-[0.15rem]
                hover:shadow-[0_0.45rem_1rem_rgba(15,35,70,0.16)]
                sm:w-[10rem]
            "
        >
            {/* ==================================================
                COVER
            ================================================== */}

            <Link
                href={issue.href}
                className="
                    relative
                    block
                    aspect-[3/4]
                    overflow-hidden
                    bg-slate-100
                "
            >
                <Image
                    src={issue.coverImage}
                    alt={`${monthName} ${issue.year} newsletter`}
                    fill
                    sizes="10rem"
                    className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-[1.03]
                    "
                />
            </Link>

            {/* ==================================================
                DETAILS
            ================================================== */}

            <div
                className="
                    px-[0.65rem]
                    pb-[0.65rem]
                    pt-[0.55rem]
                "
            >
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-2
                    "
                >
                    <div className="min-w-0">
                        {/* Month + Year */}

                        <p
                            className="
                                truncate
                                text-[0.7rem]
                                font-bold
                                uppercase
                                leading-tight
                                text-[#102d63]
                            "
                        >
                            {monthName} {issue.year}
                        </p>

                        {/* Volume + Issue */}

                        <p
                            className="
                                mt-[0.2rem]
                                text-[0.6rem]
                                leading-tight
                                text-slate-500
                            "
                        >
                            Vol {issue.volume} • Issue {issue.issue}
                        </p>
                    </div>

                    {/* ==================================================
                        DOWNLOAD
                    ================================================== */}

                    {issue.downloadHref && (
                        <a
                            href={issue.downloadHref}
                            download
                            aria-label={`Download ${monthName} ${issue.year} newsletter`}
                            className="
                                flex
                                size-[1.7rem]
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-slate-50
                                text-[#102d63]
                                transition-all
                                duration-200
                                hover:bg-[#0b4a9e]
                                hover:text-white
                            "
                        >
                            <Download className="size-[0.85rem]" />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}