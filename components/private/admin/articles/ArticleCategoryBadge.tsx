import { ArticleCategory } from "@/lib/data/article/constants";


interface ArticleCategoryBadgeProps {
    category: ArticleCategory;
}

const categoryStyles: Record<
    ArticleCategory,
    {
        background: string;
        text: string;
    }
> = {
    story: {
        background: "bg-admin-stat-blue-soft",
        text: "text-admin-stat-blue",
    },
    opinion: {
        background: "bg-admin-stat-purple-soft",
        text: "text-admin-stat-purple",
    },
    experience: {
        background: "bg-admin-stat-green-soft",
        text: "text-admin-stat-green",
    },
    guide: {
        background: "bg-admin-stat-orange-soft",
        text: "text-admin-stat-orange",
    },
    reflection: {
        background: "bg-admin-stat-rose-soft",
        text: "text-admin-stat-rose",
    },
    achievement: {
        background: "bg-admin-stat-green-soft",
        text: "text-admin-stat-green",
    },
    report: {
        background: "bg-admin-blue-soft",
        text: "text-admin-blue",
    },
};

export default function ArticleCategoryBadge({
    category,
}: ArticleCategoryBadgeProps) {
    const styles = categoryStyles[category];

    return (
        <span
            className={`inline-flex max-w-full items-center rounded-[0.4rem] px-2 py-1 text-xs font-medium leading-none ${styles.background} ${styles.text}`}
        >
            <span className="truncate">{category}</span>
        </span>
    );
}