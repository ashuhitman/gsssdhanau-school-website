import { Query } from "node-appwrite";

import {
    DATABASE_ID,
    ARTICLES_TABLE_ID,
    APPWRITE_BUCKET_ID,
    tablesDB,
} from "@/lib/appwrite/server";

import { getImageUrl } from "@/lib/utils/utils";

import {
    ARTICLE_IMAGE_TYPE,
    ARTICLE_STATUS,
} from "./constants";

import type {
    Article,
    ArticleImage,
} from "./types";

/**
 * Maps the Appwrite article image fields to the
 * application's combined ArticleImage object.
 *
 * Appwrite database schema:
 *
 * image:
 * - Appwrite image => file ID
 * - External URL   => complete image URL
 *
 * imageType:
 * - "appwrite"
 * - "url"
 *
 * Application model:
 *
 * Appwrite:
 * {
 *     value: "usable Appwrite image URL",
 *     type: "appwrite",
 *     fileId: "Appwrite file ID"
 * }
 *
 * External URL:
 * {
 *     value: "https://example.com/image.jpg",
 *     type: "url",
 *     fileId: null
 * }
 */
function mapArticleImage(
    image: unknown,
    imageType: unknown
): ArticleImage | null {
    const cleanImage =
        typeof image === "string"
            ? image.trim()
            : "";

    /*
     * No image.
     */
    if (!cleanImage) {
        return null;
    }

    /*
     * Appwrite image.
     *
     * In Appwrite:
     * image = file ID
     * imageType = "appwrite"
     *
     * Convert the file ID into the actual usable
     * Appwrite image URL.
     */
    if (
        imageType === ARTICLE_IMAGE_TYPE.APPWRITE
    ) {
        return {
            value:
                getImageUrl(
                    cleanImage,
                    APPWRITE_BUCKET_ID
                ) ??
                "/images/articles/default-card.jpeg",

            type: ARTICLE_IMAGE_TYPE.APPWRITE,

            fileId: cleanImage,
        };
    }

    /*
     * External image URL.
     *
     * In Appwrite:
     * image = complete URL
     * imageType = "url"
     *
     * The value is already a usable image URL,
     * so do not pass it through getImageUrl().
     */
    if (
        imageType === ARTICLE_IMAGE_TYPE.URL
    ) {
        return {
            value: cleanImage,

            type: ARTICLE_IMAGE_TYPE.URL,

            fileId: null,
        };
    }

    /*
     * Unknown image type.
     */
    return null;
}

/**
 * Maps an Appwrite article row to the application's
 * Article model.
 */
function mapArticle(
    row: Record<string, unknown>
): Article {
    const articleTags = Array.isArray(
        row.articleTags
    )
        ? row.articleTags.filter(
            (tag): tag is string =>
                typeof tag === "string"
        )
        : [];

    return {
        id: String(row.$id),

        createdAt: String(
            row.$createdAt
        ),

        updatedAt: String(
            row.$updatedAt
        ),

        title: String(
            row.title ?? ""
        ),

        slug: String(
            row.slug ?? ""
        ),

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

        /*
         * Appwrite stores image and imageType
         * separately, but the application receives
         * one combined image object.
         */
        image: mapArticleImage(
            row.image,
            row.imageType
        ),

        featured:
            Boolean(row.featured),

        status:
            row.status as Article["status"],

        publishedAt:
            typeof row.publishedAt === "string"
                ? row.publishedAt
                : null,

        publishedBy:
            typeof row.publishedBy === "string"
                ? row.publishedBy
                : null,

        category:
            typeof row.category === "string"
                ? (row.category as Article["category"])
                : null,

        articleTags:
            articleTags as Article["articleTags"],
    };
}

/**
 * Get all articles.
 */
export async function getAllArticles(): Promise<
    Article[]
> {
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ARTICLES_TABLE_ID,
            queries: [
                Query.orderDesc(
                    "$createdAt"
                ),
            ],
        });

    return response.rows.map((row) =>
        mapArticle(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}

/**
 * Get all published articles.
 */
export async function getPublishedArticles(): Promise<
    Article[]
> {
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ARTICLES_TABLE_ID,
            queries: [
                Query.equal("status", [
                    ARTICLE_STATUS.PUBLISHED,
                ]),

                Query.orderDesc(
                    "publishedAt"
                ),
            ],
        });

    return response.rows.map((row) =>
        mapArticle(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}

/**
 * Get latest published articles.
 */
export async function getLatestArticles(
    limit = 4
): Promise<Article[]> {
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ARTICLES_TABLE_ID,
            queries: [
                Query.equal("status", [
                    ARTICLE_STATUS.PUBLISHED,
                ]),

                Query.orderDesc(
                    "publishedAt"
                ),

                Query.limit(limit),
            ],
        });

    return response.rows.map((row) =>
        mapArticle(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}

/**
 * Get latest published article.
 */
export async function getLatestArticle(): Promise<
    Article | null
> {
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ARTICLES_TABLE_ID,
            queries: [
                Query.equal("status", [
                    ARTICLE_STATUS.PUBLISHED,
                ]),

                Query.orderDesc(
                    "publishedAt"
                ),

                Query.limit(1),
            ],
        });

    const row = response.rows[0];

    if (!row) {
        return null;
    }

    return mapArticle(
        row as unknown as Record<
            string,
            unknown
        >
    );
}

/**
 * Get featured published articles.
 */
export async function getFeaturedArticles(
    limit = 4
): Promise<Article[]> {
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ARTICLES_TABLE_ID,
            queries: [
                Query.equal("status", [
                    ARTICLE_STATUS.PUBLISHED,
                ]),

                Query.equal("featured", [
                    true,
                ]),

                Query.orderDesc(
                    "publishedAt"
                ),

                Query.limit(limit),
            ],
        });

    return response.rows.map((row) =>
        mapArticle(
            row as unknown as Record<
                string,
                unknown
            >
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
        const response =
            await tablesDB.getRow({
                databaseId: DATABASE_ID,
                tableId: ARTICLES_TABLE_ID,
                rowId: id,
            });

        return mapArticle(
            response as unknown as Record<
                string,
                unknown
            >
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

    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ARTICLES_TABLE_ID,
            queries: [
                Query.equal("slug", [
                    cleanSlug,
                ]),

                Query.limit(1),
            ],
        });

    const row = response.rows[0];

    if (!row) {
        return null;
    }

    return mapArticle(
        row as unknown as Record<
            string,
            unknown
        >
    );
}

/**
 * Get published articles by category.
 */
export async function getArticlesByCategory(
    category: NonNullable<
        Article["category"]
    >,
    limit = 20
): Promise<Article[]> {
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ARTICLES_TABLE_ID,
            queries: [
                Query.equal("status", [
                    ARTICLE_STATUS.PUBLISHED,
                ]),

                Query.equal("category", [
                    category,
                ]),

                Query.orderDesc(
                    "publishedAt"
                ),

                Query.limit(limit),
            ],
        });

    return response.rows.map((row) =>
        mapArticle(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}

/**
 * Get published articles by tag.
 */
export async function getArticlesByTag(
    tag: Article["articleTags"][number],
    limit = 20
): Promise<Article[]> {
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ARTICLES_TABLE_ID,
            queries: [
                Query.equal("status", [
                    ARTICLE_STATUS.PUBLISHED,
                ]),

                Query.contains(
                    "articleTags",
                    [tag]
                ),

                Query.orderDesc(
                    "publishedAt"
                ),

                Query.limit(limit),
            ],
        });

    return response.rows.map((row) =>
        mapArticle(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}

/**
 * Get related published articles.
 *
 * Related articles are matched using
 * article tags.
 */
export async function getRelatedArticles(
    articleTags: Article["articleTags"],
    excludeId: string,
    limit = 4
): Promise<Article[]> {
    if (articleTags.length === 0) {
        return [];
    }

    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ARTICLES_TABLE_ID,
            queries: [
                Query.equal("status", [
                    ARTICLE_STATUS.PUBLISHED,
                ]),

                Query.notEqual(
                    "$id",
                    excludeId
                ),

                Query.contains(
                    "articleTags",
                    articleTags
                ),

                Query.orderDesc(
                    "publishedAt"
                ),

                Query.limit(limit),
            ],
        });

    return response.rows.map((row) =>
        mapArticle(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}