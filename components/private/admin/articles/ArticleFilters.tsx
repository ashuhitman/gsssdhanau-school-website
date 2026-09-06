"use client";

import {
    ChevronDown,
    Filter,
    RefreshCcw,
    Search,
    X,
} from "lucide-react";
import { useState } from "react";

import {
    ARTICLE_CATEGORY,
    ARTICLE_STATUS,
    ARTICLE_TYPE,
} from "@/lib/data/article/constants";

interface ArticleFiltersProps {
    search: string;
    category: string;
    status: string;
    articleType: string;
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onArticleTypeChange: (value: string) => void;
    onReset: () => void;
}

interface FilterOption {
    value: string;
    label: string;
}

export default function ArticleFilters({
    search,
    category,
    status,
    articleType,
    onSearchChange,
    onCategoryChange,
    onStatusChange,
    onArticleTypeChange,
    onReset,
}: ArticleFiltersProps) {
    const [mobileFiltersOpen, setMobileFiltersOpen] =
        useState(false);

    const categoryOptions: FilterOption[] = [
        {
            value: "all",
            label: "All Categories",
        },
        ...Object.values(ARTICLE_CATEGORY).map((value) => ({
            value,
            label: formatValue(value),
        })),
    ];

    const statusOptions: FilterOption[] = [
        {
            value: "all",
            label: "All Statuses",
        },
        {
            value: ARTICLE_STATUS.PUBLISHED,
            label: "Published",
        },
        {
            value: ARTICLE_STATUS.DRAFT,
            label: "Draft",
        },
    ];

    const articleTypeOptions: FilterOption[] = [
        {
            value: "all",
            label: "All Types",
        },
        ...Object.values(ARTICLE_TYPE).map((value) => ({
            value,
            label: formatValue(value),
        })),
    ];

    const hasActiveFilters =
        category !== "all" ||
        status !== "all" ||
        articleType !== "all";

    return (
        <div className="border-b border-admin">
            {/* Mobile */}
            <div className="flex items-center gap-2 p-3 sm:hidden">
                <div className="relative min-w-0 flex-1">
                    <Search
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-muted"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) =>
                            onSearchChange(event.target.value)
                        }
                        placeholder="Search articles..."
                        className="
                            h-10
                            w-full
                            min-w-0
                            rounded-[0.45rem]
                            border
                            border-admin
                            bg-admin-card
                            pl-9
                            pr-3
                            text-sm
                            text-admin-heading
                            outline-none
                            placeholder:text-admin-subtle
                            focus:border-admin-primary
                        "
                    />
                </div>

                <button
                    type="button"
                    onClick={() =>
                        setMobileFiltersOpen(
                            (open) => !open
                        )
                    }
                    aria-label="Open article filters"
                    aria-expanded={mobileFiltersOpen}
                    className={[
                        "relative flex h-10 w-10 shrink-0 items-center justify-center",
                        "rounded-[0.45rem] border border-admin",
                        "bg-admin-card text-admin-muted",
                        "transition-colors hover:bg-admin-surface-hover",
                        mobileFiltersOpen
                            ? "text-admin-primary"
                            : "",
                    ].join(" ")}
                >
                    {mobileFiltersOpen ? (
                        <X className="h-4 w-4" />
                    ) : (
                        <Filter className="h-4 w-4" />
                    )}

                    {hasActiveFilters && !mobileFiltersOpen && (
                        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-admin-primary" />
                    )}
                </button>
            </div>

            {/* Mobile filter panel */}
            {mobileFiltersOpen && (
                <div className="flex flex-col gap-2.5 border-t border-admin bg-admin-surface p-3 sm:hidden">
                    <FilterSelect
                        value={category}
                        options={categoryOptions}
                        onChange={onCategoryChange}
                    />

                    <FilterSelect
                        value={status}
                        options={statusOptions}
                        onChange={onStatusChange}
                    />

                    <FilterSelect
                        value={articleType}
                        options={articleTypeOptions}
                        onChange={onArticleTypeChange}
                    />

                    <button
                        type="button"
                        onClick={() => {
                            onReset();
                            setMobileFiltersOpen(false);
                        }}
                        className="
                            admin-button-soft
                            flex
                            min-h-10
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-[0.45rem]
                            px-4
                            py-2
                            text-sm
                            font-medium
                        "
                    >
                        <RefreshCcw className="h-4 w-4 shrink-0" />
                        Reset Filters
                    </button>
                </div>
            )}

            {/* sm and above */}
            <div
                className="
                    hidden
                    flex-wrap
                    items-center
                    gap-2
                    p-3
                    sm:flex
                    lg:gap-3
                    lg:p-4
                "
            >
                {/* Search */}
                <div className="relative min-w-0 flex-1 basis-[15rem]">
                    <Search
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-muted"
                    />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) =>
                            onSearchChange(event.target.value)
                        }
                        placeholder="Search articles by title..."
                        className="
                            h-10
                            w-full
                            min-w-0
                            rounded-[0.45rem]
                            border
                            border-admin
                            bg-admin-card
                            pl-9
                            pr-3
                            text-sm
                            text-admin-heading
                            outline-none
                            placeholder:text-admin-subtle
                            focus:border-admin-primary
                        "
                    />
                </div>

                {/* Category */}
                <FilterSelect
                    value={category}
                    options={categoryOptions}
                    onChange={onCategoryChange}
                />

                {/* Status */}
                <FilterSelect
                    value={status}
                    options={statusOptions}
                    onChange={onStatusChange}
                />

                {/* Type */}
                <FilterSelect
                    value={articleType}
                    options={articleTypeOptions}
                    onChange={onArticleTypeChange}
                />

                {/* Reset */}
                <button
                    type="button"
                    onClick={onReset}
                    className="
                        admin-button-soft
                        flex
                        min-h-10
                        shrink-0
                        items-center
                        justify-center
                        gap-2
                        rounded-[0.45rem]
                        px-4
                        py-2
                        text-sm
                        font-medium
                    "
                >
                    <RefreshCcw className="h-4 w-4 shrink-0" />
                    <span>Reset</span>
                </button>
            </div>
        </div>
    );
}

function FilterSelect({
    value,
    options,
    onChange,
}: {
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
}) {
    return (
        <div className="relative min-w-0 flex-1 basis-[9rem] sm:max-w-[13rem]">
            <select
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                className="
                    h-10
                    w-full
                    min-w-0
                    appearance-none
                    rounded-[0.45rem]
                    border
                    border-admin
                    bg-admin-card
                    px-3
                    pr-9
                    text-sm
                    text-admin-heading
                    outline-none
                    focus:border-admin-primary
                "
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            <ChevronDown
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-admin-muted
                "
            />
        </div>
    );
}

function formatValue(value: string) {
    return value
        .split("-")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");
}