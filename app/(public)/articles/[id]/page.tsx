import { notFound } from "next/navigation";

import {
    ArrowLeft,
} from "lucide-react";

import Link from "next/link";

import {
    getArticleById,
    getArticles,
} from "@/lib/data/article";

import ContentDetails from "@/components/content/ContentDetails";
import RelatedContentSidebar from "@/components/Articles/RelatedSidebar";



/* ============================================================
   Page Props
============================================================ */

interface ArticlePageProps {
    params: Promise<{
        id: string;
    }>;
}

/* ============================================================
   Static Params
============================================================ */

export async function generateStaticParams() {
    const articles = await getArticles();

    return articles.map((article) => ({
        id: article.id,
    }));
}

/* ============================================================
   Article Page
============================================================ */

export default async function ArticlePage({
    params,
}: ArticlePageProps) {
    const { id } = await params;

    /* ========================================================
       Article
    ======================================================== */

    const article =
        await getArticleById(id);

    if (!article) {
        notFound();
    }

    /* ========================================================
       Related Articles
    ======================================================== */

    const allArticles =
        await getArticles();

    const relatedArticles =
        allArticles
            .filter(
                (item) =>
                    item.id !==
                    article.id &&
                    item.category.some(
                        (category) =>
                            article.category.includes(
                                category
                            )
                    )
            )
            .slice(0, 3);

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
                        <ArrowLeft
                            className="
                                size-3.5
                            "
                        />
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
                        lg:grid-cols-[minmax(0,1fr)_300px]
                        xl:grid-cols-[minmax(0,1fr)_320px]
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
                            title={
                                article.title
                            }
                            image={
                                article.image
                            }
                            imageAlt={
                                article.imageAlt
                            }
                            contentType={
                                article.articleType
                            }
                            category={
                                article.category
                            }
                            excerpt={
                                article.excerpt
                            }
                            content={
                                article.content
                            }
                            publishedAt={
                                article.publishedAt
                            }
                            publishedBy={
                                article.authorBy
                            }
                            footerLabel="Article"
                            fallbackImage="/images/articles/default-card.jpeg"
                        />
                    </article>

                    {/* ==================================================
                        Related Articles
                    ================================================== */}

                    <RelatedContentSidebar
                        articles={
                            relatedArticles
                        }
                    />
                </div>
            </div>
        </div>
    );
}