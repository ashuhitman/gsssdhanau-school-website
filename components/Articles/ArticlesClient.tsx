"use client";

import { useMemo, useState } from "react";

import ContentTopics from "@/components/content/ContentTopics";
import FeaturedContent from "@/components/content/FeaturedContent";
import ContentTimeline from "@/components/content/ContentTimeline";
import ContentQuoteCard from "@/components/content/ContentQuoteCard";
import ContentCTA from "@/components/content/ContentCTA";
import Pagination from "../content/Pagination";

import type { Article } from "@/lib/data/article/types";
import {
    ARTICLE_TAGS,
    type ArticleTag,
} from "@/lib/data/article/constants";

interface ArticlesClientProps {
    articles: Article[];
}

const ARTICLES_PER_PAGE = 4;

const TOPICS: {
    value: "all" | ArticleTag;
    label: string;
}[] = [
        {
            value: "all",
            label: "All Articles",
        },
        {
            value: ARTICLE_TAGS.ACADEMIC,
            label: "Academic",
        },
        {
            value: ARTICLE_TAGS.STUDENT_LIFE,
            label: "Student Life",
        },
        {
            value: ARTICLE_TAGS.SCHOOL_LIFE,
            label: "School Life",
        },
        {
            value: ARTICLE_TAGS.SPORTS,
            label: "Sports",
        },
        {
            value: ARTICLE_TAGS.EDUCATION,
            label: "Education",
        },
        {
            value: ARTICLE_TAGS.VALUES,
            label: "Values",
        },
        {
            value: ARTICLE_TAGS.INSPIRATION,
            label: "Inspiration",
        },
        {
            value: ARTICLE_TAGS.CREATIVITY,
            label: "Creativity",
        },
        {
            value: ARTICLE_TAGS.COMMUNITY,
            label: "Community",
        },
    ];

export default function ArticlesClient({
    articles,
}: ArticlesClientProps) {
    const [selectedTag, setSelectedTag] = useState<
        "all" | ArticleTag
    >("all");

    const [currentPage, setCurrentPage] = useState(1);

    const featuredArticle = articles[0] ?? null;

    const filteredArticles = useMemo(() => {
        if (selectedTag === "all") {
            return articles;
        }

        return articles.filter((article) =>
            article.articleTags?.includes(selectedTag)
        );
    }, [articles, selectedTag]);

    const filteredFeatured = useMemo(() => {
        if (!featuredArticle) {
            return null;
        }

        if (selectedTag === "all") {
            return featuredArticle;
        }

        return featuredArticle.articleTags?.includes(selectedTag)
            ? featuredArticle
            : null;
    }, [featuredArticle, selectedTag]);

    const latestArticles = useMemo(() => {
        if (!filteredFeatured) {
            return filteredArticles;
        }

        return filteredArticles.filter(
            (article) => article.id !== filteredFeatured.id
        );
    }, [filteredArticles, filteredFeatured]);

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
            (safeCurrentPage - 1) *
            ARTICLES_PER_PAGE;

        return latestArticles.slice(
            start,
            start + ARTICLES_PER_PAGE
        );
    }, [latestArticles, safeCurrentPage]);

    function handleCategoryChange(value: string) {
        setSelectedTag(
            value as "all" | ArticleTag
        );

        setCurrentPage(1);
    }

    function handlePageChange(page: number) {
        setCurrentPage(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div className="mt-8 space-y-8 sm:mt-10">
            <ContentTopics
                topics={TOPICS}
                activeTopic={selectedTag}
                onTopicChange={handleCategoryChange}
            />

            {filteredFeatured && (
                <FeaturedContent
                    href={`/articles/${filteredFeatured.slug}`}
                    image={filteredFeatured.image?.value}
                    imageAlt={filteredFeatured.title}
                    contentTags={
                        filteredFeatured.articleTags ??
                        undefined
                    }
                    category={
                        filteredFeatured.category ??
                        undefined
                    }
                    title={filteredFeatured.title}
                    description={
                        filteredFeatured.excerpt ??
                        undefined
                    }
                    publishedAt={
                        filteredFeatured.publishedAt ??
                        undefined
                    }
                    author={
                        filteredFeatured.authorBy ??
                        undefined
                    }
                />
            )}

            <div
                className="
                    grid
                    items-start
                    gap-8
                    lg:grid-cols-[minmax(0,1fr)_17.5rem]
                "
            >
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
                                image: article.image?.value ?? null,
                                imageAlt: article.title,
                                title: article.title,
                                category:
                                    article.category ??
                                    undefined,
                                contentTags:
                                    article.articleTags ??
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
                            selectedTag === "all"
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