"use client";

import { useMemo, useState } from "react";

import type { Article } from "@/lib/data/article/types";


import ArticleTable from "./ArticleTable";
import ArticlesPagination from "./ArticlesPagination";
import ArticleFilters from "./ArticleFilters";

const ARTICLES_PER_PAGE = 5;

interface ArticleTableSectionProps {
    articles: Article[];
}

export default function ArticleTableSection({
    articles,
}: ArticleTableSectionProps) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [articleTag, setArticleTag] = useState("all");


    const filteredArticles = useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        return articles.filter((article) => {
            const matchesSearch =
                !searchValue ||
                article.title
                    .toLowerCase()
                    .includes(searchValue) ||
                article.slug
                    .toLowerCase()
                    .includes(searchValue) ||
                article.excerpt
                    ?.toLowerCase()
                    .includes(searchValue);

            const matchesCategory =
                category === "all" ||
                article.category === category;
            const matchesArticleTag =
                articleTag === "all" ||
                article.articleTags.includes(articleTag as Article["articleTags"][number]);

            const matchesStatus =
                status === "all" ||
                article.status === status;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesArticleTag &&
                matchesStatus
            );
        });
    }, [
        articles,
        search,
        category,
        status,
        articleTag
    ]);

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredArticles.length / ARTICLES_PER_PAGE
        )
    );

    const safeCurrentPage = Math.min(
        currentPage,
        totalPages
    );

    const paginatedArticles = useMemo(() => {
        const start =
            (safeCurrentPage - 1) * ARTICLES_PER_PAGE;

        return filteredArticles.slice(
            start,
            start + ARTICLES_PER_PAGE
        );
    }, [filteredArticles, safeCurrentPage]);

    function resetFilters() {
        setSearch("");
        setCategory("all");
        setStatus("all");
        setCurrentPage(1);
        setArticleTag("all");
    }

    function handleSearchChange(value: string) {
        setSearch(value);
        setCurrentPage(1);
    }

    function handleCategoryChange(value: string) {
        setCategory(value);
        setCurrentPage(1);
    }

    function handleStatusChange(value: string) {
        setStatus(value);
        setCurrentPage(1);
    }

    function handleArticleTagChange(value: string) {
        setArticleTag(value);
        setCurrentPage(1);


    }

    return (
        <section className="min-w-0 overflow-hidden rounded-[0.7rem] border border-admin bg-admin-card shadow-admin-card">
            <ArticleFilters
                search={search}
                category={category}
                status={status}
                articleTag={articleTag}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
                onStatusChange={handleStatusChange}
                onArticleTagChange={handleArticleTagChange}
                onReset={resetFilters}
            />

            <ArticleTable articles={paginatedArticles} />

            {totalPages > 1 && (
                <ArticlesPagination
                    currentPage={safeCurrentPage}
                    totalPages={totalPages}
                    totalArticles={filteredArticles.length}
                    articlesPerPage={ARTICLES_PER_PAGE}
                    onPageChange={setCurrentPage}
                />
            )}
        </section>
    );
}