"use client";

import Pagination from "@/components/private/ui/Pagination";

interface ArticlesPaginationProps {
    currentPage: number;
    totalPages: number;
    totalArticles: number;
    articlesPerPage: number;
    onPageChange: (page: number) => void;
}

export default function ArticlesPagination({
    currentPage,
    totalPages,
    totalArticles,
    articlesPerPage,
    onPageChange,
}: ArticlesPaginationProps) {
    return (
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalArticles}
            itemsPerPage={articlesPerPage}
            onPageChange={onPageChange}
        />
    );
}