import ImageInfoCard from "@/components/common/ImageInfoCard";

import type {
    Article,
} from "@/lib/data/article";

/* ============================================================
   Props
============================================================ */

interface RelatedContentSidebarProps {
    articles: Article[];
    title?: string;
    description?: string;
}

/* ============================================================
   Related Content Sidebar
============================================================ */

export default function RelatedContentSidebar({
    articles,
    title = "Related Articles",
    description = "Explore more stories from our school community.",
}: RelatedContentSidebarProps) {
    if (articles.length === 0) {
        return null;
    }

    return (
        <aside
            className="
                lg:sticky
                lg:top-6
            "
        >
            <div
                className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    shadow-sm
                "
            >
                {/* ==================================================
                    HEADING
                ================================================== */}

                <div
                    className="
                        mb-4
                    "
                >
                    <p
                        className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.18em]
                            text-amber-600
                        "
                    >
                        Keep Exploring
                    </p>

                    <h2
                        className="
                            mt-1
                            text-lg
                            font-black
                            tracking-tight
                            text-slate-950
                        "
                    >
                        {title}
                    </h2>

                    {description && (
                        <p
                            className="
                                mt-1.5
                                text-xs
                                leading-5
                                text-slate-500
                            "
                        >
                            {description}
                        </p>
                    )}
                </div>

                {/* ==================================================
                    RELATED ARTICLES
                ================================================== */}

                <div
                    className="
                        space-y-3
                    "
                >
                    {articles.map(
                        (article) => (
                            <ImageInfoCard
                                key={
                                    article.id
                                }
                                href={`/articles/${article.id}`}
                                image={
                                    article.image ??
                                    "/images/articles/default-card.jpeg"
                                }
                                imageAlt={
                                    article.imageAlt ??
                                    article.title
                                }
                                title={
                                    article.title
                                }
                                label={
                                    article.category?.[0]
                                }
                                date={
                                    article.publishedAt
                                }
                                compact
                            />
                        )
                    )}
                </div>
            </div>
        </aside>
    );
}