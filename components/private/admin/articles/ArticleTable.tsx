import type { Article } from "@/lib/data/article/types";

import ArticleTableRow from "./ArticleTableRow";

interface ArticleTableProps {
    articles: Article[];
}

export default function ArticleTable({
    articles,
}: ArticleTableProps) {
    if (articles.length === 0) {
        return (
            <div className="flex min-h-[14rem] items-center justify-center px-6 py-12 text-center">
                <p className="text-sm text-admin-muted">
                    No articles found.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full min-w-0">
            {/* Header */}
            <div
                className="
                    flex
                    items-center
                    gap-1.5
                    border-b
                    border-admin
                    bg-admin-table-header
                    px-2.5
                    py-2.5
                    sm:gap-3
                    sm:px-4
                    sm:py-3
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
                        font-semibold
                        text-admin-heading
                        sm:w-7
                        sm:text-xs
                    "
                >
                    #
                </div>

                {/* Image */}
                <div
                    className="
                        flex
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        text-center
                        text-[0.6875rem]
                        font-semibold
                        text-admin-heading
                        sm:w-16
                        sm:text-xs
                    "
                >
                    Image
                </div>

                {/* Title */}
                <div
                    className="
                        min-w-0
                        flex-[2]
                        text-center
                        text-[0.6875rem]
                        font-semibold
                        text-admin-heading
                        sm:text-xs
                    "
                >
                    Title
                </div>

                {/* Category */}
                <div
                    className="
                        hidden
                        min-w-0
                        flex-[1]
                        items-center
                        justify-center
                        text-center
                        text-xs
                        font-semibold
                        text-admin-heading
                        lg:flex
                    "
                >
                    Category
                </div>

                {/* Author */}
                <div
                    className="
                        hidden
                        min-w-0
                        flex-[1]
                        items-center
                        justify-center
                        text-center
                        text-xs
                        font-semibold
                        text-admin-heading
                        xl:flex
                    "
                >
                    Author
                </div>

                {/* Date */}
                <div
                    className="
                        hidden
                        min-w-0
                        flex-[1]
                        items-center
                        justify-center
                        text-center
                        text-xs
                        font-semibold
                        text-admin-heading
                        xl:flex
                    "
                >
                    Date
                </div>

                {/* Status */}
                <div
                    className="
                        flex
                        w-5
                        shrink-0
                        items-center
                        justify-center
                        text-center
                        sm:text-left
                        text-[0.6875rem]
                        font-semibold
                        text-admin-heading
                        sm:w-20
                        sm:text-xs
                        lg:w-24
                    "
                >
                    <span className=" sm:inline">
                        Status
                    </span>
                </div>

                {/* Actions */}
                <div
                    className="
                        flex
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        text-center
                        text-xs
                        font-semibold
                        text-admin-heading
                        sm:w-24
                    "
                >
                    <span className="hidden sm:inline">
                        Actions
                    </span>
                </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-admin">
                {articles.map((article, index) => (
                    <ArticleTableRow
                        key={article.id}
                        article={article}
                        index={index + 1}
                    />
                ))}
            </div>
        </div>
    );
}