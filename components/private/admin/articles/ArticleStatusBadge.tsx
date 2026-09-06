import {
    ARTICLE_STATUS,
    type ArticleStatus,
} from "@/lib/data/article/constants";

interface ArticleStatusBadgeProps {
    status: ArticleStatus;
}

export default function ArticleStatusBadge({
    status,
}: ArticleStatusBadgeProps) {
    const isPublished =
        status === ARTICLE_STATUS.PUBLISHED;

    return (
        <span
            className={[
                "inline-flex shrink-0 items-center justify-center",
                "sm:rounded-[0.45rem] sm:px-3 sm:py-1.5",
                "text-xs font-medium leading-none",
                isPublished
                    ? "bg-admin-stat-green-soft text-admin-success"
                    : "bg-admin-stat-orange-soft text-admin-warning",
            ].join(" ")}
        >
            {/* Mobile: status dot only */}
            <span
                aria-label={
                    isPublished ? "Published" : "Draft"
                }
                className={[
                    "h-2 w-2 shrink-0 rounded-full sm:hidden",
                    isPublished
                        ? "bg-admin-success"
                        : "bg-admin-warning",
                ].join(" ")}
            />

            {/* sm+: pill text */}
            <span className="hidden sm:inline">
                {isPublished ? "Published" : "Draft"}
            </span>
        </span>
    );
}