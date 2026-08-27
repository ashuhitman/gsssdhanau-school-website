"use client";

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
    onPageChange: (
        page: number
    ) => void;
}

/* ============================================================
   Pagination
============================================================ */

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = getPages(
        currentPage,
        totalPages
    );

    return (
        <nav
            aria-label="Pagination"
            className="
                mt-8
                flex
                items-center
                justify-center
                gap-1.5
            "
        >
            {/* Previous */}

            <button
                type="button"
                onClick={() =>
                    onPageChange(
                        currentPage - 1
                    )
                }
                disabled={
                    currentPage === 1
                }
                aria-label="Previous page"
                className="
                    flex
                    size-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    text-slate-500
                    transition-colors
                    hover:bg-slate-50
                    disabled:pointer-events-none
                    disabled:opacity-30
                "
            >
                <ChevronLeft
                    className="
                        size-4
                    "
                />
            </button>

            {/* Pages */}

            {pages.map(
                (page, index) => {
                    if (
                        page ===
                        "ellipsis"
                    ) {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="
                                    flex
                                    size-8
                                    items-center
                                    justify-center
                                    text-xs
                                    text-slate-400
                                "
                            >
                                …
                            </span>
                        );
                    }

                    const active =
                        page ===
                        currentPage;

                    return (
                        <button
                            key={page}
                            type="button"
                            onClick={() =>
                                onPageChange(
                                    page
                                )
                            }
                            aria-current={
                                active
                                    ? "page"
                                    : undefined
                            }
                            className={`
                                flex
                                size-8
                                items-center
                                justify-center
                                rounded-lg
                                text-xs
                                font-bold
                                transition-colors
                                ${active
                                    ? `
                                            bg-blue-950
                                            text-white
                                        `
                                    : `
                                            border
                                            border-slate-200
                                            bg-white
                                            text-slate-500
                                            hover:bg-slate-50
                                        `
                                }
                            `}
                        >
                            {page}
                        </button>
                    );
                }
            )}

            {/* Next */}

            <button
                type="button"
                onClick={() =>
                    onPageChange(
                        currentPage + 1
                    )
                }
                disabled={
                    currentPage ===
                    totalPages
                }
                aria-label="Next page"
                className="
                    flex
                    size-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    text-slate-500
                    transition-colors
                    hover:bg-slate-50
                    disabled:pointer-events-none
                    disabled:opacity-30
                "
            >
                <ChevronRight
                    className="
                        size-4
                    "
                />
            </button>
        </nav>
    );
}

/* ============================================================
   Page Numbers
============================================================ */

function getPages(
    currentPage: number,
    totalPages: number
): (
    | number
    | "ellipsis"
)[] {
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
            "ellipsis",
            totalPages,
        ];
    }

    if (
        currentPage >=
        totalPages - 2
    ) {
        return [
            1,
            "ellipsis",
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    return [
        1,
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis",
        totalPages,
    ];
}