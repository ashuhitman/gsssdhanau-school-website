import ImageInfoCard from "@/components/common/ImageInfoCard";
import { Article } from "@/lib/data/article/types";



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
                    border-default
                    bg-card
                    p-4
                    shadow-school-card
                "
            >
                {/* ==================================================
                    HEADING
                ================================================== */}

                <div className="mb-4">
                    <p
                        className="
                            text-[0.5625rem]
                            font-black
                            uppercase
                            tracking-[0.18em]
                            text-accent
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
                            text-heading
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
                                text-muted
                            "
                        >
                            {description}
                        </p>
                    )}
                </div>

                {/* ==================================================
                    RELATED ARTICLES
                ================================================== */}

                <div className="space-y-3">
                    {articles.map((article) => (
                        <ImageInfoCard
                            key={article.id}
                            href={`/articles/${article.slug}`}
                            image={
                                article.image ??
                                "/images/articles/default-card.jpeg"
                            }
                            imageAlt={article.title}
                            title={article.title}
                            label={article.category?.[0]}
                            date={article.publishedAt ?? undefined}
                            compact
                        />
                    ))}
                </div>
            </div>
        </aside>
    );
}