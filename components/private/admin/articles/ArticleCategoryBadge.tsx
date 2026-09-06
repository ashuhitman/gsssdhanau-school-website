import { ArticleCategory } from "@/lib/data/article/constants";


interface ArticleCategoryBadgeProps {
    category: ArticleCategory;
}

export default function ArticleCategoryBadge({
    category,
}: ArticleCategoryBadgeProps) {
    return (
        <span className="inline-flex max-w-full items-center rounded-[0.4rem] bg-admin-blue-soft px-2 py-1 text-xs font-medium leading-none text-admin-blue">
            <span className="truncate">
                {formatCategory(category)}
            </span>
        </span>
    );
}

function formatCategory(category: ArticleCategory) {
    return category
        .split("-")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");
}