import ContentDetails from "@/components/content/ContentDetails";

import type { Article } from "@/lib/data/article/types";

/* ============================================================
   Props
============================================================ */

interface NewsletterArticlePageProps {
    article: Article;
}

/* ============================================================
   Newsletter Article Page
============================================================ */

export function NewsletterArticlePage({
    article,
}: NewsletterArticlePageProps) {
    return (
        <div
            className="
                relative
                mx-auto
                flex
                w-full
                flex-col
                rounded-[0.25rem]
                bg-white
                shadow-[0_0.5rem_1.25rem_rgba(0,0,0,0.14),0_0.15rem_0.35rem_rgba(0,0,0,0.08)]
            "
        >
            <div className="flex-1">
                <ContentDetails
                    title={article.title}
                    image={article.image}
                    imageAlt={article.title}
                    contentType={article.articleType ?? undefined}
                    category={article.category}
                    excerpt={article.excerpt ?? undefined}
                    content={article.content}
                    publishedAt={
                        article.publishedAt ?? undefined
                    }
                    publishedBy={
                        article.authorBy ?? undefined
                    }
                    footerLabel="Article"
                    fallbackImage="/images/articles/default-card.jpeg"
                />
            </div>
        </div>
    );
}