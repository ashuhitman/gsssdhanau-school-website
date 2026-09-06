import Link from "next/link";
import { Star } from "lucide-react";

import type { Article } from "@/lib/data/article/types";

import ArticleActions from "./ArticleActions";
import ArticleCategoryBadge from "./ArticleCategoryBadge";
import ArticleStatusBadge from "./ArticleStatusBadge";

interface ArticleTableRowProps {
    article: Article;
    index: number;
}

export default function ArticleTableRow({
    article,
    index,
}: ArticleTableRowProps) {
    const date =
        article.publishedAt ?? article.createdAt;

    return (
        <div
            className="
                group
                flex
                min-w-0
                items-center
                gap-1.5
                border-b
                border-admin
                px-2.5
                py-2.5
                transition-colors
                last:border-b-0
                hover:bg-admin-table-row-hover
                sm:gap-3
                sm:px-4
                sm:py-3.5
                lg:px-5
            "
        >
            {/* S.No. */}
            <div
                className="
                    flex
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    text-center
                    text-[0.6875rem]
                    font-medium
                    text-admin-muted
                    sm:w-7
                    sm:text-xs
                "
            >
                {index}
            </div>

            {/* Image */}
            <div className="w-12 shrink-0 sm:w-16">
                <div
                    className="
                        aspect-[4/3]
                        w-full
                        overflow-hidden
                        rounded-[0.4rem]
                        bg-admin-surface
                    "
                >
                    {article.image ? (
                        <img
                            src={article.image}
                            alt=""
                            className="
                                h-full
                                w-full
                                object-cover
                                transition-transform
                                duration-200
                                group-hover:scale-105
                            "
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-[0.625rem] text-admin-subtle">
                            —
                        </div>
                    )}
                </div>
            </div>

            {/* Title */}
            <div className="min-w-0 flex-[2]">
                <Link
                    href={`/articles/${article.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={article.title}
                    className="
                        block
                        min-w-0
                        break-words
                        text-[0.75rem]
                        font-semibold
                        leading-snug
                        text-admin-heading
                        transition-colors
                        hover:text-admin-primary
                        sm:text-[0.9375rem]
                    "
                >
                    {article.title}
                </Link>

                {/* Description — hidden on mobile */}
                {article.excerpt && (
                    <p
                        className="
                            mt-1
                            hidden
                            min-w-0
                            truncate
                            text-xs
                            leading-relaxed
                            text-admin-muted
                            sm:block
                        "
                        title={article.excerpt}
                    >
                        {article.excerpt}
                    </p>
                )}

                {/* Featured — hidden on mobile */}
                {article.featured && (
                    <div className="mt-1 hidden items-center gap-1 text-xs text-admin-stat-orange sm:flex">
                        <Star className="h-3 w-3 shrink-0 fill-current" />

                        <span>Featured</span>
                    </div>
                )}
            </div>

            {/* Category */}
            <div className="hidden min-w-0 flex-[1] lg:block">
                <div className="flex min-w-0 flex-wrap gap-1">
                    {article.category.length > 0 ? (
                        article.category
                            .slice(0, 2)
                            .map((category) => (
                                <ArticleCategoryBadge
                                    key={category}
                                    category={category}
                                />
                            ))
                    ) : (
                        <span className="text-xs text-admin-subtle">
                            —
                        </span>
                    )}
                </div>
            </div>

            {/* Author */}
            <div className="hidden min-w-0 flex-[1] xl:block justify-center">
                <span
                    className="break-words text-sm text-admin"
                    title={article.authorBy ?? undefined}
                >
                    {article.authorBy || "Admin"}
                </span>
            </div>

            {/* Date */}
            <div className="hidden min-w-0 flex-[1] xl:block text-center">
                <p className="whitespace-nowrap text-xs font-medium text-admin">
                    {formatDate(date)}
                </p>
            </div>

            {/* Status */}
            <div
                className="
                    w-5
                    shrink-0
                    sm:w-20
                    lg:w-24
                "
            >
                <ArticleStatusBadge
                    status={article.status}
                />
            </div>

            {/* Actions */}
            <div
                className="
                    w-4
                    shrink-0
                    sm:w-24
                "
            >
                <ArticleActions article={article} />
            </div>
        </div>
    );
}

function formatDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);
}