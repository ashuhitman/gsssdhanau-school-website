import {
    ARTICLES_TABLE_ID,
    DATABASE_ID,
    tablesDB,
} from "@/lib/appwrite/server";

import type {
    ArticleCategory,
    ArticleStatus,
    ArticleType,
} from "./constants";

export interface CreateArticleData {
    title: string;
    slug: string;
    excerpt?: string | null;
    content?: string | null;
    authorBy?: string | null;
    image?: string | null;
    featured?: boolean;
    status: ArticleStatus;
    publishedAt?: string | null;
    publishedBy?: string | null;
    category?: ArticleCategory[];
    articleType?: ArticleType | null;
}

export async function createArticle(
    data: CreateArticleData
) {
    return tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: ARTICLES_TABLE_ID,
        rowId: "unique()",
        data: {
            title: data.title.trim(),
            slug: data.slug.trim(),
            excerpt: data.excerpt ?? null,
            content: data.content ?? null,
            authorBy: data.authorBy ?? null,
            image: data.image ?? null,
            featured: data.featured ?? false,
            status: data.status,
            publishedAt: data.publishedAt ?? null,
            publishedBy: data.publishedBy ?? null,
            category: data.category ?? [],
            articleType: data.articleType ?? null,
        },
    });
}