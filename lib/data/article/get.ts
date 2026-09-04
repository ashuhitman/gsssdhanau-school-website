import { Query } from "node-appwrite";

import {
    DATABASE_ID,
    ARTICLES_TABLE_ID,
    APPWRITE_BUCKET_ID,
    tablesDB,
} from "@/lib/appwrite/server";

import { getImageUrl } from "@/lib/utils/utils";

import { ARTICLE_STATUS } from "./constants";
import type { Article } from "./types";

function mapArticle(
    row: Record<string, unknown>
): Article {
    const categories = Array.isArray(row.category)
        ? row.category
        : [];

    return {
        id: String(row.$id),
        createdAt: String(row.$createdAt),
        updatedAt: String(row.$updatedAt),

        title: String(row.title ?? ""),
        slug: String(row.slug ?? ""),

        excerpt:
            typeof row.excerpt === "string"
                ? row.excerpt
                : null,

        content:
            typeof row.content === "string"
                ? row.content
                : null,

        authorBy:
            typeof row.authorBy === "string"
                ? row.authorBy
                : null,

        image:
            typeof row.image === "string" &&
                row.image.trim()
                ? getImageUrl(
                    row.image,
                    APPWRITE_BUCKET_ID
                )
                : "/images/articles/default-card.jpeg",

        featured: Boolean(row.featured),

        status: row.status as Article["status"],

        publishedAt:
            typeof row.publishedAt === "string"
                ? row.publishedAt
                : null,

        publishedBy:
            typeof row.publishedBy === "string"
                ? row.publishedBy
                : null,

        category: categories as Article["category"],

        articleType:
            typeof row.articleType === "string"
                ? (row.articleType as Article["articleType"])
                : null,
    };
}

/**
 * Get all articles.
 */
export async function getAllArticles(): Promise<Article[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ARTICLES_TABLE_ID,
        queries: [
            Query.orderDesc("$createdAt"),
        ],
    });

    return response.rows.map((row) =>
        mapArticle(
            row as unknown as Record<string, unknown>
        )
    );
}

/**
 * Get all published articles.
 */
export async function getPublishedArticles(): Promise<Article[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ARTICLES_TABLE_ID,
        queries: [
            Query.equal("status", [
                ARTICLE_STATUS.PUBLISHED,
            ]),
            Query.orderDesc("publishedAt"),
        ],
    });

    return response.rows.map((row) =>
        mapArticle(
            row as unknown as Record<string, unknown>
        )
    );
}

/**
 * Get latest published articles.
 */
export async function getLatestArticles(
    limit = 4
): Promise<Article[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ARTICLES_TABLE_ID,
        queries: [
            Query.equal("status", [
                ARTICLE_STATUS.PUBLISHED,
            ]),
            Query.orderDesc("publishedAt"),
            Query.limit(limit),
        ],
    });

    return response.rows.map((row) =>
        mapArticle(
            row as unknown as Record<string, unknown>
        )
    );
}

/**
 * Get latest published article.
 */
export async function getLatestArticle(): Promise<Article | null> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ARTICLES_TABLE_ID,
        queries: [
            Query.equal("status", [
                ARTICLE_STATUS.PUBLISHED,
            ]),
            Query.orderDesc("publishedAt"),
            Query.limit(1),
        ],
    });

    const row = response.rows[0];

    if (!row) {
        return null;
    }

    return mapArticle(
        row as unknown as Record<string, unknown>
    );
}

/**
 * Get featured published articles.
 */
export async function getFeaturedArticles(
    limit = 4
): Promise<Article[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ARTICLES_TABLE_ID,
        queries: [
            Query.equal("status", [
                ARTICLE_STATUS.PUBLISHED,
            ]),
            Query.equal("featured", [true]),
            Query.orderDesc("publishedAt"),
            Query.limit(limit),
        ],
    });

    return response.rows.map((row) =>
        mapArticle(
            row as unknown as Record<string, unknown>
        )
    );
}

/**
 * Get article by ID.
 */
export async function getArticleById(
    id: string
): Promise<Article | null> {
    try {
        const response = await tablesDB.getRow({
            databaseId: DATABASE_ID,
            tableId: ARTICLES_TABLE_ID,
            rowId: id,
        });

        return mapArticle(
            response as unknown as Record<string, unknown>
        );
    } catch {
        return null;
    }
}

/**
 * Get article by slug.
 */
export async function getArticleBySlug(
    slug: string
): Promise<Article | null> {
    const cleanSlug = slug.trim();

    if (!cleanSlug) {
        return null;
    }

    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ARTICLES_TABLE_ID,
        queries: [
            Query.equal("slug", [cleanSlug]),
            Query.limit(1),
        ],
    });

    const row = response.rows[0];

    if (!row) {
        return null;
    }

    return mapArticle(
        row as unknown as Record<string, unknown>
    );
}

/**
 * Get published articles by category.
 */
export async function getArticlesByCategory(
    category: Article["category"][number],
    limit = 20
): Promise<Article[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ARTICLES_TABLE_ID,
        queries: [
            Query.equal("status", [
                ARTICLE_STATUS.PUBLISHED,
            ]),
            Query.contains("category", [category]),
            Query.orderDesc("publishedAt"),
            Query.limit(limit),
        ],
    });

    return response.rows.map((row) =>
        mapArticle(
            row as unknown as Record<string, unknown>
        )
    );
}

/**
 * Get related published articles.
 */
export async function getRelatedArticles(
    categories: Article["category"],
    excludeId: string,
    limit = 4
): Promise<Article[]> {
    if (categories.length === 0) {
        return [];
    }

    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ARTICLES_TABLE_ID,
        queries: [
            Query.equal("status", [
                ARTICLE_STATUS.PUBLISHED,
            ]),
            Query.notEqual("$id", excludeId),
            Query.contains("category", categories),
            Query.orderDesc("publishedAt"),
            Query.limit(limit),
        ],
    });

    return response.rows.map((row) =>
        mapArticle(
            row as unknown as Record<string, unknown>
        )
    );
}