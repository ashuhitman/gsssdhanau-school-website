"use client";

import { useMemo, useState } from "react";

import type { Article } from "@/lib/data/article/types";

import ArticleFilters from "./ArticleFilters";
import ArticleTable from "./ArticleTable";
import ArticlesPagination from "./ArticlesPagination";

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
    const [articleType, setArticleType] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

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
                article.category.includes(
                    category as Article["category"][number]
                );

            const matchesStatus =
                status === "all" ||
                article.status === status;

            const matchesArticleType =
                articleType === "all" ||
                article.articleType === articleType;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus &&
                matchesArticleType
            );
        });
    }, [
        articles,
        search,
        category,
        status,
        articleType,
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
        setArticleType("all");
        setCurrentPage(1);
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

    function handleArticleTypeChange(value: string) {
        setArticleType(value);
        setCurrentPage(1);
    }

    return (
        <section className="min-w-0 overflow-hidden rounded-[0.7rem] border border-admin bg-admin-card shadow-admin-card">
            <ArticleFilters
                search={search}
                category={category}
                status={status}
                articleType={articleType}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
                onStatusChange={handleStatusChange}
                onArticleTypeChange={
                    handleArticleTypeChange
                }
                onReset={resetFilters}
            />

            <ArticleTable articles={paginatedArticles} />

            {totalPages > ARTICLES_PER_PAGE && (<ArticlesPagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                totalArticles={filteredArticles.length}
                articlesPerPage={ARTICLES_PER_PAGE}
                onPageChange={setCurrentPage}
            />)}
        </section>
    );
}