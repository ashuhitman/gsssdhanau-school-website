"use client";

import { ARTICLE_CATEGORY, ARTICLE_STATUS, ARTICLE_TYPE } from "@/lib/data/article/constants";
import { Article } from "@/lib/data/article/types";

import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Eye,
    FileText,
    Pencil,
    RefreshCcw,
    Search,
    Trash2,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import ArticleDeleteButton from "./ArticleDeleteButton";



interface ArticlesPageClientProps {
    articles: Article[];
}

const ROWS_PER_PAGE = 8;

export default function ArticlesPageClient({
    articles,
}: ArticlesPageClientProps) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const [articleType, setArticleType] = useState("all");
    const [page, setPage] = useState(1);

    const filteredArticles = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return articles.filter((article) => {
            const matchesSearch =
                !normalizedSearch ||
                article.title.toLowerCase().includes(normalizedSearch) ||
                article.slug.toLowerCase().includes(normalizedSearch) ||
                article.excerpt
                    ?.toLowerCase()
                    .includes(normalizedSearch);

            const matchesCategory =
                category === "all" ||
                article.category.includes(
                    category as Article["category"][number]
                );

            const matchesStatus =
                status === "all" ||
                article.status === status;

            const matchesType =
                articleType === "all" ||
                article.articleType === articleType;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus &&
                matchesType
            );
        });
    }, [
        articles,
        search,
        category,
        status,
        articleType,
    ]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredArticles.length / ROWS_PER_PAGE)
    );

    const currentPage = Math.min(page, totalPages);

    const paginatedArticles = filteredArticles.slice(
        (currentPage - 1) * ROWS_PER_PAGE,
        currentPage * ROWS_PER_PAGE
    );

    function resetFilters() {
        setSearch("");
        setCategory("all");
        setStatus("all");
        setArticleType("all");
        setPage(1);
    }

    function handleSearchChange(value: string) {
        setSearch(value);
        setPage(1);
    }

    function handleFilterChange(
        setter: (value: string) => void,
        value: string
    ) {
        setter(value);
        setPage(1);
    }

    const start =
        filteredArticles.length === 0
            ? 0
            : (currentPage - 1) * ROWS_PER_PAGE + 1;

    const end = Math.min(
        currentPage * ROWS_PER_PAGE,
        filteredArticles.length
    );

    return (
        <section className="admin-card overflow-hidden rounded-[0.7rem]">
            {/* Filters */}
            <div className="border-b border-admin px-4 py-4 sm:px-5">
                <div className="grid gap-3 xl:grid-cols-[minmax(0,1.7fr)_minmax(10rem,0.8fr)_minmax(10rem,0.8fr)_minmax(10rem,0.8fr)_auto]">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-muted" />

                        <input
                            type="search"
                            value={search}
                            onChange={(event) =>
                                handleSearchChange(
                                    event.target.value
                                )
                            }
                            placeholder="Search articles by title..."
                            className="h-10 w-full rounded-[0.45rem] border border-admin bg-admin-card pl-9 pr-3 text-sm text-admin outline-none transition placeholder:text-admin-subtle focus:border-admin-primary"
                        />
                    </div>

                    <FilterSelect
                        value={category}
                        onChange={(value) =>
                            handleFilterChange(
                                setCategory,
                                value
                            )
                        }
                        options={[
                            {
                                value: "all",
                                label: "All Categories",
                            },
                            ...Object.values(ARTICLE_CATEGORY).map(
                                (value) => ({
                                    value,
                                    label: formatValue(value),
                                })
                            ),
                        ]}
                    />

                    <FilterSelect
                        value={status}
                        onChange={(value) =>
                            handleFilterChange(
                                setStatus,
                                value
                            )
                        }
                        options={[
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
                        ]}
                    />

                    <FilterSelect
                        value={articleType}
                        onChange={(value) =>
                            handleFilterChange(
                                setArticleType,
                                value
                            )
                        }
                        options={[
                            {
                                value: "all",
                                label: "All Types",
                            },
                            ...Object.values(ARTICLE_TYPE).map(
                                (value) => ({
                                    value,
                                    label: formatValue(value),
                                })
                            ),
                        ]}
                    />

                    <button
                        type="button"
                        onClick={resetFilters}
                        className="admin-button-soft flex h-10 items-center justify-center gap-2 rounded-[0.45rem] px-4 text-sm font-medium"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        <span>Reset</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="admin-table min-w-[70rem] w-full">
                    <thead>
                        <tr>
                            <th className="w-12">
                                <input
                                    type="checkbox"
                                    aria-label="Select all articles"
                                    className="h-4 w-4 rounded border-admin accent-admin-primary"
                                />
                            </th>

                            <th className="w-12">#</th>

                            <th className="w-24">
                                Image
                            </th>

                            <th>Title</th>

                            <th>Category</th>

                            <th>Author</th>

                            <th>Date</th>

                            <th>Status</th>

                            <th className="text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedArticles.map(
                            (article, index) => (
                                <ArticleRow
                                    key={article.id}
                                    article={article}
                                    index={
                                        (currentPage - 1) *
                                        ROWS_PER_PAGE +
                                        index +
                                        1
                                    }
                                />
                            )
                        )}
                    </tbody>
                </table>
            </div>

            {/* Empty */}
            {paginatedArticles.length === 0 && (
                <div className="flex min-h-[16rem] flex-col items-center justify-center px-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-admin-blue-soft">
                        <FileText className="h-6 w-6 text-admin-primary" />
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-admin-heading">
                        No articles found
                    </h3>

                    <p className="mt-1 max-w-md text-sm text-admin-muted">
                        Try changing your search or filters.
                    </p>
                </div>
            )}

            {/* Footer */}
            <div className="flex flex-col gap-4 border-t border-admin px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-sm text-admin-heading">
                    Showing{" "}
                    <span className="font-semibold">
                        {start}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold">
                        {end}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold">
                        {filteredArticles.length}
                    </span>{" "}
                    articles
                </p>

                <div className="flex items-center justify-between gap-4 lg:justify-end">
                    <div className="flex items-center gap-1">
                        <PaginationButton
                            disabled={currentPage === 1}
                            onClick={() =>
                                setPage((value) =>
                                    Math.max(1, value - 1)
                                )
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </PaginationButton>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        )
                            .slice(
                                Math.max(
                                    0,
                                    currentPage - 2
                                ),
                                Math.min(
                                    totalPages,
                                    currentPage + 1
                                )
                            )
                            .map((pageNumber) => (
                                <PaginationButton
                                    key={pageNumber}
                                    active={
                                        pageNumber ===
                                        currentPage
                                    }
                                    onClick={() =>
                                        setPage(pageNumber)
                                    }
                                >
                                    {pageNumber}
                                </PaginationButton>
                            ))}

                        <PaginationButton
                            disabled={
                                currentPage === totalPages
                            }
                            onClick={() =>
                                setPage((value) =>
                                    Math.min(
                                        totalPages,
                                        value + 1
                                    )
                                )
                            }
                        >
                            <ChevronRight className="h-4 w-4" />
                        </PaginationButton>
                    </div>

                    <div className="hidden items-center gap-2 text-sm text-admin-muted sm:flex">
                        Rows per page
                        <span className="rounded-[0.4rem] border border-admin bg-admin-card px-3 py-2 text-admin-heading">
                            {ROWS_PER_PAGE}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ArticleRow({
    article,
    index,
}: {
    article: Article;
    index: number;
}) {
    const articleDate =
        article.publishedAt ?? article.createdAt;

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    aria-label={`Select ${article.title}`}
                    className="h-4 w-4 rounded border-admin accent-admin-primary"
                />
            </td>

            <td className="font-medium text-admin-muted">
                {index}
            </td>

            <td>
                <div className="h-12 w-16 overflow-hidden rounded-[0.45rem] bg-admin-blue-soft">
                    {article.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={article.image}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <FileText className="h-5 w-5 text-admin-primary" />
                        </div>
                    )}
                </div>
            </td>

            <td>
                <div className="min-w-0">
                    <p className="max-w-[20rem] truncate font-semibold text-admin-heading">
                        {article.title}
                    </p>

                    <p className="mt-0.5 max-w-[20rem] truncate text-xs text-admin-muted">
                        {article.excerpt ||
                            "No excerpt available."}
                    </p>
                </div>
            </td>

            <td>
                <div className="flex max-w-[11rem] flex-wrap gap-1">
                    {article.category
                        .slice(0, 2)
                        .map((item) => (
                            <span
                                key={item}
                                className="rounded-[0.4rem] bg-admin-blue-soft px-2.5 py-1 text-xs font-medium text-admin-blue"
                            >
                                {formatValue(item)}
                            </span>
                        ))}
                </div>
            </td>

            <td className="text-sm text-admin">
                {article.authorBy || "Admin"}
            </td>

            <td className="whitespace-nowrap text-sm text-admin">
                {formatDate(articleDate)}
            </td>

            <td>
                <span
                    className={
                        article.status ===
                            ARTICLE_STATUS.PUBLISHED
                            ? "admin-status-success"
                            : "admin-status-warning"
                    }
                >
                    {formatValue(article.status)}
                </span>
            </td>

            <td>
                <div className="flex justify-end gap-2">
                    <Link
                        href={`/articles/${article.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${article.title}`}
                        className="admin-icon-button"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>

                    <Link
                        href={`/dashboard/admin/articles/${article.id}/edit`}
                        aria-label={`Edit ${article.title}`}
                        className="admin-icon-button"
                    >
                        <Pencil className="h-4 w-4" />
                    </Link>

                    <ArticleDeleteButton
                        articleId={article.id}
                        articleTitle={article.title}
                    />
                </div>
            </td>
        </tr>
    );
}

function FilterSelect({
    value,
    onChange,
    options,
}: {
    value: string;
    onChange: (value: string) => void;
    options: {
        value: string;
        label: string;
    }[];
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                className="h-10 w-full appearance-none rounded-[0.45rem] border border-admin bg-admin-card px-3 pr-9 text-sm text-admin-heading outline-none focus:border-admin-primary"
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

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-muted" />
        </div>
    );
}

function PaginationButton({
    children,
    active = false,
    disabled = false,
    onClick,
}: {
    children: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={[
                "flex h-9 min-w-9 items-center justify-center rounded-[0.4rem] border px-2 text-sm transition",
                active
                    ? "border-admin-primary bg-admin-primary text-white"
                    : "border-admin text-admin-heading hover:bg-admin-surface-hover",
                disabled
                    ? "cursor-not-allowed opacity-40"
                    : "",
            ].join(" ")}
        >
            {children}
        </button>
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

function formatDate(value: string) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(value));
}