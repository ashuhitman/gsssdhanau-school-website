"use client";

import {
    Search,
    SlidersHorizontal,
    X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { NewsletterCard } from "./NewsletterCard";

export interface Newsletter {
    title: string;
    description: string;
    image: string;
    issue: string;
    date: string;
    href?: string;
}

interface NewsletterListProps {
    newsletters: Newsletter[];
}

const NEWSLETTERS_PER_PAGE = 6;

export function NewsletterList({
    newsletters,
}: NewsletterListProps) {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<
        "latest" | "oldest"
    >("latest");

    const [currentPage, setCurrentPage] =
        useState(1);

    const filteredNewsletters = useMemo(() => {
        const query = search
            .trim()
            .toLowerCase();

        const result = newsletters.filter(
            (newsletter) =>
                !query ||
                newsletter.title
                    .toLowerCase()
                    .includes(query) ||
                newsletter.description
                    .toLowerCase()
                    .includes(query) ||
                newsletter.issue
                    .toLowerCase()
                    .includes(query),
        );

        return [...result].sort((a, b) => {
            const dateA = new Date(
                a.date,
            ).getTime();

            const dateB = new Date(
                b.date,
            ).getTime();

            return sort === "latest"
                ? dateB - dateA
                : dateA - dateB;
        });
    }, [
        newsletters,
        search,
        sort,
    ]);

    const totalNewsletters =
        filteredNewsletters.length;

    const totalPages = Math.max(
        1,
        Math.ceil(
            totalNewsletters /
            NEWSLETTERS_PER_PAGE,
        ),
    );

    const safeCurrentPage = Math.min(
        currentPage,
        totalPages,
    );

    const startIndex =
        (safeCurrentPage - 1) *
        NEWSLETTERS_PER_PAGE;

    const endIndex = Math.min(
        startIndex +
        NEWSLETTERS_PER_PAGE,
        totalNewsletters,
    );

    const paginatedNewsletters =
        filteredNewsletters.slice(
            startIndex,
            endIndex,
        );

    const clearFilters = () => {
        setSearch("");
        setSort("latest");
        setCurrentPage(1);
    };

    const hasFilters =
        search.trim() !== "" ||
        sort !== "latest";

    return (
        <div className="min-w-0">
            {/* Search + sort */}
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
                        sm:flex-row
                        sm:items-center
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
                            onChange={(event) => {
                                setSearch(
                                    event.target.value,
                                );
                                setCurrentPage(1);
                            }}
                            placeholder="Search newsletters..."
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
                                outline-none
                                placeholder:text-muted-foreground
                                focus:border-primary-500
                            "
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setCurrentPage(1);
                                }}
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
                                "
                            >
                                <X className="size-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="hidden size-4 text-muted-foreground sm:block" />

                        <select
                            value={sort}
                            onChange={(event) => {
                                setSort(
                                    event.target
                                        .value as
                                    | "latest"
                                    | "oldest",
                                );
                                setCurrentPage(1);
                            }}
                            className="
                                h-10
                                rounded-lg
                                border
                                border-border
                                bg-background
                                px-3
                                text-xs
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

                {/* Active filters */}
                {hasFilters && (
                    <div
                        className="
                            mt-3
                            flex
                            items-center
                            gap-2
                            border-t
                            border-border
                            pt-3
                        "
                    >
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

                        <button
                            type="button"
                            onClick={clearFilters}
                            className="
                                ml-auto
                                text-[10px]
                                font-semibold
                                text-primary-600
                                hover:underline
                            "
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>

            {/* Result header */}
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
                        All Newsletters
                    </h2>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {totalNewsletters > 0
                            ? `Showing ${startIndex + 1
                            }–${endIndex} of ${totalNewsletters} newsletters`
                            : "No newsletters found"}
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
                    {totalNewsletters}
                </span>
            </div>

            {/* Cards */}
            {paginatedNewsletters.length >
                0 ? (
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-5
                        sm:grid-cols-2
                        xl:grid-cols-3
                    "
                >
                    {paginatedNewsletters.map(
                        (newsletter) => (
                            <NewsletterCard
                                key={`${newsletter.issue}-${newsletter.title}`}
                                title={
                                    newsletter.title
                                }
                                description={
                                    newsletter.description
                                }

                                issue={
                                    newsletter.issue
                                }
                                date={
                                    newsletter.date
                                }
                                href={
                                    newsletter.href
                                }
                            />
                        ),
                    )}
                </div>
            ) : (
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

                    <h3 className="mt-4 text-sm font-bold">
                        No newsletters found
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Try changing your search.
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
                        "
                    >
                        Clear Search
                    </button>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div
                    className="
                        mt-6
                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    <button
                        type="button"
                        disabled={
                            safeCurrentPage === 1
                        }
                        onClick={() =>
                            setCurrentPage(
                                (page) =>
                                    page - 1,
                            )
                        }
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
                            disabled:opacity-40
                        "
                    >
                        ‹
                    </button>

                    {Array.from(
                        {
                            length: totalPages,
                        },
                        (_, index) =>
                            index + 1,
                    ).map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() =>
                                setCurrentPage(
                                    page,
                                )
                            }
                            className={`
                                flex
                                size-9
                                items-center
                                justify-center
                                rounded-lg
                                text-xs
                                font-medium
                                ${safeCurrentPage ===
                                    page
                                    ? "bg-primary-600 text-white"
                                    : "border border-border bg-background hover:bg-primary-50"
                                }
                            `}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        type="button"
                        disabled={
                            safeCurrentPage ===
                            totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                (page) =>
                                    page + 1,
                            )
                        }
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