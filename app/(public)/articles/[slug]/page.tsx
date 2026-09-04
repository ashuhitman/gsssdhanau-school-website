import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";



import ContentDetails from "@/components/content/ContentDetails";
import RelatedContentSidebar from "@/components/Articles/RelatedSidebar";
import { getArticleBySlug, getPublishedArticles, getRelatedArticles } from "@/lib/data/article/get";

/* ============================================================
   Page Props
============================================================ */

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

/* ============================================================
   Static Params
============================================================ */

export async function generateStaticParams() {
    const articles = await getPublishedArticles();

    return articles.map((article) => ({
        slug: article.slug,
    }));
}

/* ============================================================
   Article Page
============================================================ */

export default async function ArticlePage({
    params,
}: ArticlePageProps) {
    const { slug } = await params;

    /* ========================================================
       Decode Slug
    ======================================================== */

    const decodedSlug = decodeURIComponent(slug);

    /* ========================================================
       Article
    ======================================================== */

    const article =
        await getArticleBySlug(decodedSlug);

    if (!article) {
        notFound();
    }

    /* ========================================================
       Related Articles
    ======================================================== */

    const relatedArticles =
        await getRelatedArticles(
            article.category,
            article.id,
            3
        );

    return (
        <div
            className="
                min-h-screen
                bg-slate-50
            "
        >
            <div
                className="
                    mx-auto
                    max-w-6xl
                    px-4
                    py-7
                    sm:px-6
                    sm:py-9
                    lg:px-8
                "
            >
                {/* ==================================================
                    Back
                ================================================== */}

                <Link
                    href="/articles"
                    className="
                        group
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-slate-500
                        transition-colors
                        hover:text-slate-950
                    "
                >
                    <span
                        className="
                            flex
                            size-7
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            transition-colors
                            group-hover:bg-slate-100
                        "
                    >
                        <ArrowLeft className="size-3.5" />
                    </span>

                    All articles
                </Link>

                {/* ==================================================
                    Main Content + Sidebar
                ================================================== */}

                <div
                    className="
                        mt-5
                        grid
                        items-start
                        gap-6
                        lg:grid-cols-[minmax(0,1fr)_18.75rem]
                        xl:grid-cols-[minmax(0,1fr)_20rem]
                    "
                >
                    {/* ==================================================
                        Article
                    ================================================== */}

                    <article
                        className="
                            overflow-hidden
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                        "
                    >
                        <ContentDetails
                            title={article.title}
                            image={article.image}
                            imageAlt={article.title}
                            contentType={
                                article.articleType ??
                                undefined
                            }
                            category={article.category}
                            excerpt={article.excerpt ?? undefined}
                            content={article.content}
                            publishedAt={
                                article.publishedAt ??
                                undefined
                            }
                            publishedBy={
                                article.authorBy ??
                                undefined
                            }
                            footerLabel="Article"
                            fallbackImage="/images/articles/default-card.jpeg"
                        />
                    </article>

                    {/* ==================================================
                        Related Articles
                    ================================================== */}

                    <RelatedContentSidebar
                        articles={relatedArticles}
                    />
                </div>
            </div>
        </div>
    );
}