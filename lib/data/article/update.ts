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

export interface UpdateArticleData {
    title?: string;
    slug?: string;
    excerpt?: string | null;
    content?: string | null;
    authorBy?: string | null;
    image?: string | null;
    featured?: boolean;
    status?: ArticleStatus;
    publishedAt?: string | null;
    publishedBy?: string | null;
    category?: ArticleCategory[];
    articleType?: ArticleType | null;
}

export async function updateArticle(
    id: string,
    data: UpdateArticleData
) {
    const updateData: Record<string, unknown> = {};

    if (data.title !== undefined) {
        updateData.title = data.title.trim();
    }

    if (data.slug !== undefined) {
        updateData.slug = data.slug.trim();
    }

    if (data.excerpt !== undefined) {
        updateData.excerpt = data.excerpt;
    }

    if (data.content !== undefined) {
        updateData.content = data.content;
    }

    if (data.authorBy !== undefined) {
        updateData.authorBy = data.authorBy;
    }

    if (data.image !== undefined) {
        updateData.image = data.image;
    }

    if (data.featured !== undefined) {
        updateData.featured = data.featured;
    }

    if (data.status !== undefined) {
        updateData.status = data.status;
    }

    if (data.publishedAt !== undefined) {
        updateData.publishedAt = data.publishedAt;
    }

    if (data.publishedBy !== undefined) {
        updateData.publishedBy = data.publishedBy;
    }

    if (data.category !== undefined) {
        updateData.category = data.category;
    }

    if (data.articleType !== undefined) {
        updateData.articleType = data.articleType;
    }

    return tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: ARTICLES_TABLE_ID,
        rowId: id,
        data: updateData,
    });
}