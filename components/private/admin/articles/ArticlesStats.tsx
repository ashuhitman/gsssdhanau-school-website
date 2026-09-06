import {
    CheckCircle2,
    FileText,
    Star,
    Clock3,
} from "lucide-react";

import StatCard from "@/components/private/ui/StatCard";

import { ARTICLE_STATUS } from "@/lib/data/article/constants";
import { Article } from "@/lib/data/article/types";


interface ArticlesStatsProps {
    articles: Article[];
}

export default function ArticlesStats({
    articles,
}: ArticlesStatsProps) {
    const total = articles.length;

    const published = articles.filter(
        (article) =>
            article.status === ARTICLE_STATUS.PUBLISHED
    ).length;

    const drafts = articles.filter(
        (article) =>
            article.status === ARTICLE_STATUS.DRAFT
    ).length;

    const featured = articles.filter(
        (article) => article.featured
    ).length;

    return (
        <section
            aria-label="Article statistics"
            className="grid grid-cols-2 gap-3 xl:grid-cols-4"
        >
            <StatCard
                label="Total Articles"
                value={total}
                icon={FileText}
                variant="blue"
            />

            <StatCard
                label="Published"
                value={published}
                icon={CheckCircle2}
                variant="green"
            />

            <StatCard
                label="Drafts"
                value={drafts}
                icon={Clock3}
                variant="orange"
            />

            <StatCard
                label="Featured"
                value={featured}
                icon={Star}
                variant="purple"
            />
        </section>
    );
}