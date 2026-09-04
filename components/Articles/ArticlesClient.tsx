"use client";

import { useMemo, useState } from "react";

import ContentTopics from "@/components/content/ContentTopics";
import FeaturedContent from "@/components/content/FeaturedContent";
import ContentTimeline from "@/components/content/ContentTimeline";
import ContentQuoteCard from "@/components/content/ContentQuoteCard";
import ContentCTA from "@/components/content/ContentCTA";
import Pagination from "../content/Pagination";

import type {
    Article,

} from "@/lib/data/article/types";

import { ARTICLE_CATEGORY, ArticleCategory } from "@/lib/data/article/constants";

/* ============================================================
   Props
============================================================ */

interface ArticlesClientProps {
    articles: Article[];
}

/* ============================================================
   Constants
============================================================ */

const ARTICLES_PER_PAGE = 4;

/* ============================================================
   Topics
============================================================ */

const TOPICS: {
    value: "all" | ArticleCategory;
    label: string;
}[] = [
        {
            value: "all",
            label: "All Articles",
        },
        {
            value: ARTICLE_CATEGORY.ACADEMIC,
            label: "Academic",
        },
        {
            value: ARTICLE_CATEGORY.STUDENT_LIFE,
            label: "Student Life",
        },
        {
            value: ARTICLE_CATEGORY.SCHOOL_LIFE,
            label: "School Life",
        },
        {
            value: ARTICLE_CATEGORY.SPORTS,
            label: "Sports",
        },
        {
            value: ARTICLE_CATEGORY.EDUCATION,
            label: "Education",
        },
        {
            value: ARTICLE_CATEGORY.VALUES,
            label: "Values",
        },
        {
            value: ARTICLE_CATEGORY.INSPIRATION,
            label: "Inspiration",
        },
        {
            value: ARTICLE_CATEGORY.CREATIVITY,
            label: "Creativity",
        },
        {
            value: ARTICLE_CATEGORY.COMMUNITY,
            label: "Community",
        },
    ];

/* ============================================================
   Articles Client
============================================================ */

export default function ArticlesClient({
    articles,
}: ArticlesClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<
        "all" | ArticleCategory
    >("all");

    const [currentPage, setCurrentPage] = useState(1);

    /* ========================================================
       Featured Article
    ======================================================== */

    const featuredArticle = articles[0] ?? null;

    /* ========================================================
       Filter
    ======================================================== */

    const filteredArticles = useMemo(() => {
        if (selectedCategory === "all") {
            return articles;
        }

        return articles.filter((article) =>
            article.category.includes(selectedCategory)
        );
    }, [articles, selectedCategory]);

    /* ========================================================
       Featured
    ======================================================== */

    const filteredFeatured = useMemo(() => {
        if (!featuredArticle) {
            return null;
        }

        if (selectedCategory === "all") {
            return featuredArticle;
        }

        return featuredArticle.category.includes(selectedCategory)
            ? featuredArticle
            : null;
    }, [featuredArticle, selectedCategory]);

    /* ========================================================
       Latest
    ======================================================== */

    const latestArticles = useMemo(() => {
        if (!filteredFeatured) {
            return filteredArticles;
        }

        return filteredArticles.filter(
            (article) => article.id !== filteredFeatured.id
        );
    }, [filteredArticles, filteredFeatured]);

    /* ========================================================
       Pagination
    ======================================================== */

    const totalPages = Math.max(
        1,
        Math.ceil(
            latestArticles.length / ARTICLES_PER_PAGE
        )
    );

    const safeCurrentPage = Math.min(
        currentPage,
        totalPages
    );

    const paginatedArticles = useMemo(() => {
        const start =
            (safeCurrentPage - 1) * ARTICLES_PER_PAGE;

        return latestArticles.slice(
            start,
            start + ARTICLES_PER_PAGE
        );
    }, [latestArticles, safeCurrentPage]);

    /* ========================================================
       Category Change
    ======================================================== */

    function handleCategoryChange(value: string) {
        setSelectedCategory(
            value as "all" | ArticleCategory
        );

        setCurrentPage(1);
    }

    /* ========================================================
       Page Change
    ======================================================== */

    function handlePageChange(page: number) {
        setCurrentPage(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div className="mt-8 space-y-8 sm:mt-10">
            {/* ==================================================
                Explore Topics
            ================================================== */}

            <ContentTopics
                topics={TOPICS}
                activeTopic={selectedCategory}
                onTopicChange={handleCategoryChange}
            />

            {/* ==================================================
                Featured Article
            ================================================== */}

            {filteredFeatured && (
                <FeaturedContent
                    href={`/articles/${filteredFeatured.slug}`}
                    image={filteredFeatured.image}
                    imageAlt={filteredFeatured.title}
                    category={filteredFeatured.category[0]}
                    articleType={
                        filteredFeatured.articleType ?? undefined
                    }
                    title={filteredFeatured.title}
                    description={filteredFeatured.excerpt ?? undefined}
                    publishedAt={filteredFeatured.publishedAt ?? undefined}
                    author={filteredFeatured.authorBy ?? undefined}
                />
            )}

            {/* ==================================================
                Latest + Sidebar
            ================================================== */}

            <div
                className="
                    grid
                    items-start
                    gap-8
                    lg:grid-cols-[minmax(0,1fr)_17.5rem]
                "
            >
                {/* ==================================================
                    Latest Articles
                ================================================== */}

                <section>
                    <div className="mb-5">
                        <p
                            className="
                                text-[0.5625rem]
                                font-black
                                uppercase
                                tracking-[0.2em]
                                text-accent
                            "
                        >
                            Fresh Perspectives
                        </p>

                        <h2
                            className="
                                mt-1
                                text-2xl
                                font-black
                                tracking-tight
                                text-heading
                            "
                        >
                            Latest Articles
                        </h2>
                    </div>

                    <ContentTimeline
                        items={paginatedArticles.map(
                            (article) => ({
                                id: article.id,
                                href: `/articles/${article.slug}`,
                                image: article.image,
                                imageAlt: article.title,
                                title: article.title,
                                category:
                                    article.category[0],
                                articleType:
                                    article.articleType ??
                                    undefined,
                                excerpt:
                                    article.excerpt ??
                                    undefined,
                                publishedAt:
                                    article.publishedAt ??
                                    undefined,
                                author:
                                    article.authorBy ??
                                    undefined,
                            })
                        )}
                        emptyMessage={
                            selectedCategory === "all"
                                ? "No articles have been published yet."
                                : "No articles found for this topic."
                        }
                    />

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={safeCurrentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </section>

                {/* ==================================================
                    Sidebar
                ================================================== */}

                <aside className="space-y-6">
                    <ContentQuoteCard
                        quote="Good articles don't just inform, they inspire."
                        author="School Principal"
                        role="PM SHRI GSSS Dhanau"
                    />

                    <ContentCTA
                        href="/articles/submit"
                        eyebrow="Share Your Voice"
                        title="Have an idea worth sharing?"
                        description="Share your experiences, ideas and perspectives with our school community."
                        buttonLabel="Submit an Article"
                    />
                </aside>
            </div>
        </div>
    );
}