"use client";

import {
    Search,
    SlidersHorizontal,
    X,
} from "lucide-react";

import {
    useMemo,
    useState,
} from "react";

import { NoticeCard } from "./NoticeCard";

import type { Notice } from "@/lib/data/notice/types";
import type { NoticeCategory } from "@/lib/data/notice/constants";

/* ============================================================
   Props
============================================================ */

interface NoticeListProps {
    notices: Notice[];

    categories: readonly (
        | "All Notices"
        | NoticeCategory
    )[];
}

/* ============================================================
   Constants
============================================================ */

const NOTICES_PER_PAGE = 5;

/* ============================================================
   Notice List
============================================================ */

export function NoticeList({
    notices,
    categories,
}: NoticeListProps) {
    const [search, setSearch] = useState("");

    const [category, setCategory] = useState<
        | "All Notices"
        | NoticeCategory
    >("All Notices");

    const [sort, setSort] = useState<
        "latest" | "oldest"
    >("latest");

    const [currentPage, setCurrentPage] =
        useState(1);

    /* ========================================================
       FILTER + SEARCH + SORT
    ======================================================== */

    const filteredNotices = useMemo(() => {
        const query = search
            .trim()
            .toLowerCase();

        const result = notices.filter((notice) => {
            const searchableDescription = (
                notice.excerpt ||
                notice.description ||
                ""
            ).toLowerCase();

            const matchesSearch =
                !query ||
                notice.title
                    .toLowerCase()
                    .includes(query) ||
                searchableDescription.includes(
                    query
                ) ||
                notice.category
                    .toLowerCase()
                    .includes(query);

            const matchesCategory =
                category === "All Notices" ||
                notice.category === category;

            return (
                matchesSearch &&
                matchesCategory
            );
        });

        return [...result].sort((a, b) => {
            const dateA = new Date(
                a.noticeDate
            ).getTime();

            const dateB = new Date(
                b.noticeDate
            ).getTime();

            return sort === "latest"
                ? dateB - dateA
                : dateA - dateB;
        });
    }, [
        notices,
        search,
        category,
        sort,
    ]);

    /* ========================================================
       PAGINATION
    ======================================================== */

    const totalNotices =
        filteredNotices.length;

    const totalPages = Math.max(
        1,
        Math.ceil(
            totalNotices /
            NOTICES_PER_PAGE
        )
    );

    const safeCurrentPage = Math.min(
        currentPage,
        totalPages
    );

    const startIndex =
        (safeCurrentPage - 1) *
        NOTICES_PER_PAGE;

    const endIndex = Math.min(
        startIndex + NOTICES_PER_PAGE,
        totalNotices
    );

    const paginatedNotices =
        filteredNotices.slice(
            startIndex,
            endIndex
        );

    /* ========================================================
       HANDLERS
    ======================================================== */

    const handleSearchChange = (
        value: string
    ) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (
        value:
            | "All Notices"
            | NoticeCategory
    ) => {
        setCategory(value);
        setCurrentPage(1);
    };

    const handleSortChange = (
        value:
            | "latest"
            | "oldest"
    ) => {
        setSort(value);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearch("");
        setCategory("All Notices");
        setSort("latest");
        setCurrentPage(1);
    };

    const hasFilters =
        search.trim() !== "" ||
        category !== "All Notices" ||
        sort !== "latest";

    /* ========================================================
       PAGINATION RANGE
    ======================================================== */

    const getPageNumbers = () => {
        if (totalPages <= 7) {
            return Array.from(
                {
                    length: totalPages,
                },
                (_, index) => index + 1
            );
        }

        const pages: (
            | number
            | "ellipsis"
        )[] = [];

        pages.push(1);

        if (safeCurrentPage > 3) {
            pages.push("ellipsis");
        }

        const start = Math.max(
            2,
            safeCurrentPage - 1
        );

        const end = Math.min(
            totalPages - 1,
            safeCurrentPage + 1
        );

        for (
            let page = start;
            page <= end;
            page++
        ) {
            pages.push(page);
        }

        if (
            safeCurrentPage <
            totalPages - 2
        ) {
            pages.push("ellipsis");
        }

        pages.push(totalPages);

        return pages;
    };

    /* ========================================================
       RENDER
    ======================================================== */

    return (
        <div className="min-w-0">
            {/* ==================================================
                SEARCH + FILTER BAR
            ================================================== */}

            <div
                className="
                    mb-5
                    rounded-xl
                    border
                    border-border
                    bg-card
                    p-3
                    shadow-sm
                    sm:p-4
                "
            >
                <div
                    className="
                        flex
                        flex-col
                        gap-3
                        lg:flex-row
                        lg:items-center
                    "
                >
                    {/* Search */}

                    <div className="relative min-w-0 flex-1">
                        <Search
                            className="
                                pointer-events-none
                                absolute
                                left-3
                                top-1/2
                                size-4
                                -translate-y-1/2
                                text-muted-foreground
                            "
                        />

                        <input
                            type="search"
                            value={search}
                            onChange={(event) =>
                                handleSearchChange(
                                    event.target.value
                                )
                            }
                            placeholder="Search notices..."
                            className="
                                h-10
                                w-full
                                rounded-lg
                                border
                                border-border
                                bg-background
                                pl-9
                                pr-9
                                text-xs
                                text-foreground
                                outline-none
                                placeholder:text-muted-foreground
                                focus:border-primary-500
                                focus:ring-1
                                focus:ring-primary-500/20
                            "
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() =>
                                    handleSearchChange("")
                                }
                                aria-label="Clear search"
                                className="
                                    absolute
                                    right-3
                                    top-1/2
                                    flex
                                    size-5
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-muted-foreground
                                    hover:bg-muted
                                    hover:text-foreground
                                "
                            >
                                <X className="size-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Filters */}

                    <div className="flex items-center gap-2">
                        <SlidersHorizontal
                            className="
                                hidden
                                size-4
                                shrink-0
                                text-muted-foreground
                                sm:block
                            "
                        />

                        {/* Category */}

                        <select
                            value={category}
                            onChange={(event) =>
                                handleCategoryChange(
                                    event.target
                                        .value as
                                    | "All Notices"
                                    | NoticeCategory
                                )
                            }
                            className="
                                h-10
                                min-w-0
                                flex-1
                                rounded-lg
                                border
                                border-border
                                bg-background
                                px-3
                                text-xs
                                text-foreground
                                outline-none
                                focus:border-primary-500
                                sm:w-[180px]
                                sm:flex-none
                            "
                        >
                            {categories.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item ===
                                        "All Notices"
                                        ? item
                                        : formatCategory(
                                            item
                                        )}
                                </option>
                            ))}
                        </select>

                        {/* Sort */}

                        <select
                            value={sort}
                            onChange={(event) =>
                                handleSortChange(
                                    event.target
                                        .value as
                                    | "latest"
                                    | "oldest"
                                )
                            }
                            className="
                                h-10
                                rounded-lg
                                border
                                border-border
                                bg-background
                                px-3
                                text-xs
                                text-foreground
                                outline-none
                                focus:border-primary-500
                            "
                        >
                            <option value="latest">
                                Latest First
                            </option>

                            <option value="oldest">
                                Oldest First
                            </option>
                        </select>
                    </div>
                </div>

                {/* Active Filters */}

                {hasFilters && (
                    <div
                        className="
                            mt-3
                            flex
                            flex-wrap
                            items-center
                            gap-2
                            border-t
                            border-border
                            pt-3
                        "
                    >
                        <span className="text-[11px] text-muted-foreground">
                            Filters:
                        </span>

                        {search && (
                            <span
                                className="
                                    max-w-full
                                    truncate
                                    rounded-full
                                    bg-primary-50
                                    px-2.5
                                    py-1
                                    text-[10px]
                                    font-medium
                                    text-primary-700
                                    dark:bg-primary-950
                                    dark:text-primary-300
                                "
                            >
                                Search: {search}
                            </span>
                        )}

                        {category !==
                            "All Notices" && (
                                <span
                                    className="
                                    rounded-full
                                    bg-primary-50
                                    px-2.5
                                    py-1
                                    text-[10px]
                                    font-medium
                                    text-primary-700
                                    dark:bg-primary-950
                                    dark:text-primary-300
                                "
                                >
                                    {formatCategory(
                                        category
                                    )}
                                </span>
                            )}

                        <button
                            type="button"
                            onClick={clearFilters}
                            className="
                                ml-auto
                                text-[10px]
                                font-semibold
                                text-primary-600
                                hover:underline
                                dark:text-primary-400
                            "
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>

            {/* ==================================================
                RESULT HEADER
            ================================================== */}

            <div
                className="
                    mb-4
                    flex
                    items-end
                    justify-between
                    gap-3
                "
            >
                <div>
                    <h2
                        className="
                            text-base
                            font-bold
                            text-primary-800
                            dark:text-primary-200
                            sm:text-lg
                        "
                    >
                        All Notices
                    </h2>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {totalNotices > 0
                            ? `Showing ${startIndex + 1
                            }–${endIndex} of ${totalNotices} notices`
                            : "No notices found"}
                    </p>
                </div>

                <span
                    className="
                        rounded-md
                        bg-primary-600
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        text-white
                    "
                >
                    {totalNotices}
                </span>
            </div>

            {/* ==================================================
                NOTICE CARDS
            ================================================== */}

            {paginatedNotices.length > 0 ? (
                <div className="space-y-3">
                    {paginatedNotices.map((notice) => {
                        const noticeDate =
                            new Date(
                                notice.noticeDate
                            );

                        return (
                            <NoticeCard
                                key={notice.id}
                                date={String(
                                    noticeDate.getDate()
                                ).padStart(2, "0")}
                                month={noticeDate.toLocaleDateString(
                                    "en-IN",
                                    {
                                        month: "short",
                                    }
                                )}
                                year={String(
                                    noticeDate.getFullYear()
                                )}
                                title={notice.title}
                                description={
                                    notice.excerpt ||
                                    notice.description ||
                                    ""
                                }
                                category={formatCategory(
                                    notice.category
                                )}
                                // href={`/notices/${notice.id}`}
                                attachment={
                                    notice.attachment
                                }
                                isNew={
                                    notice.publishedAt
                                        ? isNewNotice(
                                            notice.publishedAt
                                        )
                                        : false
                                }
                            />
                        );
                    })}
                </div>
            ) : (
                /* =================================================
                   NO RESULTS
                ================================================= */

                <div
                    className="
                        rounded-xl
                        border
                        border-dashed
                        border-border
                        bg-card
                        px-5
                        py-12
                        text-center
                    "
                >
                    <div
                        className="
                            mx-auto
                            flex
                            size-12
                            items-center
                            justify-center
                            rounded-full
                            bg-primary-50
                            text-primary-600
                            dark:bg-primary-950
                            dark:text-primary-400
                        "
                    >
                        <Search className="size-5" />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-foreground">
                        No notices found
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Try changing your search or
                        category filter.
                    </p>

                    <button
                        type="button"
                        onClick={clearFilters}
                        className="
                            mt-4
                            rounded-lg
                            bg-primary-600
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-white
                            hover:bg-primary-700
                        "
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {/* ==================================================
                PAGINATION
            ================================================== */}

            {totalPages > 1 && (
                <div
                    className="
                        mt-6
                        flex
                        flex-wrap
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    {/* Previous */}

                    <button
                        type="button"
                        disabled={
                            safeCurrentPage === 1
                        }
                        onClick={() =>
                            setCurrentPage((page) =>
                                Math.max(
                                    1,
                                    page - 1
                                )
                            )
                        }
                        aria-label="Previous page"
                        className="
                            flex
                            size-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-border
                            bg-background
                            text-sm
                            text-muted-foreground
                            transition-colors
                            hover:bg-primary-50
                            hover:text-primary-600
                            disabled:pointer-events-none
                            disabled:opacity-40
                        "
                    >
                        ‹
                    </button>

                    {/* Page Numbers */}

                    {getPageNumbers().map(
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
                                            size-9
                                            items-center
                                            justify-center
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >
                                        ...
                                    </span>
                                );
                            }

                            return (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() =>
                                        setCurrentPage(
                                            page
                                        )
                                    }
                                    aria-current={
                                        safeCurrentPage ===
                                            page
                                            ? "page"
                                            : undefined
                                    }
                                    className={`
                                        flex
                                        size-9
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-xs
                                        font-medium
                                        transition-colors
                                        ${safeCurrentPage ===
                                            page
                                            ? "bg-primary-600 text-white shadow-sm"
                                            : "border border-border bg-background text-foreground hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-950"
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
                        disabled={
                            safeCurrentPage ===
                            totalPages
                        }
                        onClick={() =>
                            setCurrentPage((page) =>
                                Math.min(
                                    totalPages,
                                    page + 1
                                )
                            )
                        }
                        aria-label="Next page"
                        className="
                            flex
                            size-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-border
                            bg-background
                            text-sm
                            text-muted-foreground
                            transition-colors
                            hover:bg-primary-50
                            hover:text-primary-600
                            disabled:pointer-events-none
                            disabled:opacity-40
                        "
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
}

/* ============================================================
   Format Category
============================================================ */

function formatCategory(
    category:
        | NoticeCategory
        | "All Notices"
): string {
    if (category === "All Notices") {
        return category;
    }

    return category
        .replace(/-/g, " ")
        .replace(
            /\b\w/g,
            (char) => char.toUpperCase()
        );
}

/* ============================================================
   New Notice
============================================================ */

function isNewNotice(
    publishedAt: string
): boolean {
    const published = new Date(
        publishedAt
    ).getTime();

    const now = Date.now();

    const sevenDays =
        7 *
        24 *
        60 *
        60 *
        1000;

    return now - published <= sevenDays;
}