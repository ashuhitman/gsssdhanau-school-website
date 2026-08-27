import Link from "next/link";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

/* ============================================================
   Props
============================================================ */

interface PaginationProps {
    currentPage: number;

    totalPages: number;

    basePath: string;

    searchParams?: Record<
        string,
        string | undefined
    >;
}

/* ============================================================
   Pagination
============================================================ */

export default function Pagination({
    currentPage,
    totalPages,
    basePath,
    searchParams = {},
}: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const createHref = (
        page: number
    ) => {
        const params =
            new URLSearchParams();

        Object.entries(
            searchParams
        ).forEach(
            ([key, value]) => {
                if (
                    value !==
                    undefined &&
                    value !== ""
                ) {
                    params.set(
                        key,
                        value
                    );
                }
            }
        );

        params.set(
            "page",
            String(page)
        );

        return `${basePath}?${params.toString()}`;
    };

    const pages = getPages(
        currentPage,
        totalPages
    );

    return (
        <nav
            aria-label="Pagination"
            className="
                mt-7
                flex
                items-center
                justify-center
                gap-1.5
            "
        >
            {/* Previous */}

            <Link
                href={createHref(
                    currentPage - 1
                )}
                aria-disabled={
                    currentPage === 1
                }
                className={`
                    flex
                    size-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    text-slate-500
                    transition-colors
                    ${currentPage === 1
                        ? "pointer-events-none opacity-40"
                        : "hover:bg-slate-50 hover:text-slate-950"
                    }
                `}
            >
                <ChevronLeft
                    className="
                        size-4
                    "
                />
            </Link>

            {/* Pages */}

            {pages.map(
                (page, index) => {
                    if (
                        page === "..."
                    ) {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="
                                    flex
                                    size-9
                                    items-center
                                    justify-center
                                    text-xs
                                    text-slate-400
                                "
                            >
                                ...
                            </span>
                        );
                    }

                    const isActive =
                        page ===
                        currentPage;

                    return (
                        <Link
                            key={page}
                            href={createHref(
                                page
                            )}
                            aria-current={
                                isActive
                                    ? "page"
                                    : undefined
                            }
                            className={`
                                flex
                                size-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                text-xs
                                font-semibold
                                transition-colors
                                ${isActive
                                    ? "border-blue-950 bg-blue-950 text-white"
                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                                }
                            `}
                        >
                            {page}
                        </Link>
                    );
                }
            )}

            {/* Next */}

            <Link
                href={createHref(
                    currentPage + 1
                )}
                aria-disabled={
                    currentPage ===
                    totalPages
                }
                className={`
                    flex
                    size-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    text-slate-500
                    transition-colors
                    ${currentPage ===
                        totalPages
                        ? "pointer-events-none opacity-40"
                        : "hover:bg-slate-50 hover:text-slate-950"
                    }
                `}
            >
                <ChevronRight
                    className="
                        size-4
                    "
                />
            </Link>
        </nav>
    );
}

/* ============================================================
   Page Numbers
============================================================ */

function getPages(
    currentPage: number,
    totalPages: number
): Array<number | "..."> {
    if (totalPages <= 7) {
        return Array.from(
            {
                length: totalPages,
            },
            (_, index) =>
                index + 1
        );
    }

    if (currentPage <= 3) {
        return [
            1,
            2,
            3,
            4,
            "...",
            totalPages,
        ];
    }

    if (
        currentPage >=
        totalPages - 2
    ) {
        return [
            1,
            "...",
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
    ];
}