import { Query } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    ARTICLES_TABLE_ID,
    APPWRITE_BUCKET_ID,
} from "@/lib/appwrite/server";

import { getImageUrl } from "../utils/utils";

/* ============================================================
   Article Category
============================================================ */

export type ArticleCategory =
    | "academic"
    | "student-life"
    | "school-life"
    | "sports"
    | "education"
    | "values"
    | "inspiration"
    | "creativity"
    | "community";

/* ============================================================
   Article Type
============================================================ */

export type ArticleType =
    | "story"
    | "opinion"
    | "experience"
    | "guide"
    | "reflection"
    | "achievement"
    | "report";

/* ============================================================
   Article Status
============================================================ */

export type ArticleStatus =
    | "draft"
    | "published";

/* ============================================================
   Article
============================================================ */

export interface Article {
    id: string;

    title: string;

    excerpt?: string;

    content: string;

    authorBy?: string;

    authorAt?: string;

    image: string | null;

    imageAlt?: string;

    /*
     * Appwrite:
     * Type: string
     * Format: enum
     * Array: true
     */
    category: ArticleCategory[];

    /*
     * Appwrite:
     * Type: string
     * Format: enum
     * Array: false
     */
    articleType: ArticleType;

    featured: boolean;

    status: ArticleStatus;

    publishedAt?: string;

    publishedBy?: string;
}

/* ============================================================
   Validate Article Category
============================================================ */

function isArticleCategory(
    value: unknown
): value is ArticleCategory {
    return (
        value === "academic" ||
        value === "student-life" ||
        value === "school-life" ||
        value === "sports" ||
        value === "education" ||
        value === "values" ||
        value === "inspiration" ||
        value === "creativity" ||
        value === "community"
    );
}

/* ============================================================
   Validate Article Type
============================================================ */

function isArticleType(
    value: unknown
): value is ArticleType {
    return (
        value === "story" ||
        value === "opinion" ||
        value === "experience" ||
        value === "guide" ||
        value === "reflection" ||
        value === "achievement" ||
        value === "report"
    );
}

/* ============================================================
   Map Appwrite Row
============================================================ */

function mapArticleRow(
    row: Record<string, unknown> & {
        $id: string;
    }
): Article {
    /* ========================================================
       Title
    ======================================================== */

    const title = String(
        row.title ?? ""
    ).trim();

    /* ========================================================
       Category
    ======================================================== */

    const category: ArticleCategory[] =
        Array.isArray(row.category)
            ? row.category.filter(
                isArticleCategory
            )
            : [];

    /* ========================================================
       Article Type
    ======================================================== */

    const articleType: ArticleType =
        isArticleType(
            row.articleType
        )
            ? row.articleType
            : "story";

    /* ========================================================
       Image File ID
    ======================================================== */

    const imageFileId =
        row.image !== null &&
            row.image !== undefined &&
            String(row.image).trim()
            ? String(row.image).trim()
            : null;

    /* ========================================================
       Image URL
    ======================================================== */

    const image =
        getImageUrl(
            imageFileId,
            APPWRITE_BUCKET_ID
        ) ?? null;

    /* ========================================================
       Return
    ======================================================== */

    return {
        id: row.$id,

        title,

        excerpt:
            row.excerpt &&
                String(
                    row.excerpt
                ).trim()
                ? String(
                    row.excerpt
                ).trim()
                : undefined,

        content: String(
            row.content ?? ""
        ).trim(),

        authorBy:
            row.authorBy &&
                String(
                    row.authorBy
                ).trim()
                ? String(
                    row.authorBy
                ).trim()
                : undefined,

        authorAt:
            row.authorAt
                ? String(
                    row.authorAt
                )
                : undefined,

        image,

        imageAlt:
            imageFileId
                ? `${title} - PM SHRI GSSS Dhanau`
                : undefined,

        category,

        articleType,

        featured:
            row.featured === true,

        status:
            row.status ===
                "published"
                ? "published"
                : "draft",

        publishedAt:
            row.publishedAt
                ? String(
                    row.publishedAt
                )
                : undefined,

        publishedBy:
            row.publishedBy &&
                String(
                    row.publishedBy
                ).trim()
                ? String(
                    row.publishedBy
                ).trim()
                : undefined,
    };
}

/* ============================================================
   Get All Published Articles
============================================================ */

export async function getArticles(): Promise<
    Article[]
> {
    const response =
        await tablesDB.listRows({
            databaseId:
                DATABASE_ID,

            tableId:
                ARTICLES_TABLE_ID,

            queries: [
                Query.equal(
                    "status",
                    "published"
                ),

                Query.orderDesc(
                    "publishedAt"
                ),
            ],
        });

    return response.rows.map(
        (row) =>
            mapArticleRow(
                row as Record<
                    string,
                    unknown
                > & {
                    $id: string;
                }
            )
    );
}

/* ============================================================
   Get Featured Article
============================================================ */

export async function getFeaturedArticle(): Promise<
    Article | null
> {
    try {
        const response =
            await tablesDB.listRows({
                databaseId:
                    DATABASE_ID,

                tableId:
                    ARTICLES_TABLE_ID,

                queries: [
                    Query.equal(
                        "status",
                        "published"
                    ),

                    Query.equal(
                        "featured",
                        true
                    ),

                    Query.orderDesc(
                        "publishedAt"
                    ),

                    Query.limit(1),
                ],
            });

        if (
            response.rows.length === 0
        ) {
            return null;
        }

        return mapArticleRow(
            response.rows[0] as Record<
                string,
                unknown
            > & {
                $id: string;
            }
        );
    } catch (error) {
        console.error(
            "Failed to get featured article:",
            error
        );

        return null;
    }
}

/* ============================================================
   Get Article By ID
============================================================ */

export async function getArticleById(
    id: string
): Promise<Article | null> {
    try {
        const row =
            await tablesDB.getRow({
                databaseId:
                    DATABASE_ID,

                tableId:
                    ARTICLES_TABLE_ID,

                rowId: id,
            });

        if (
            row.status !==
            "published"
        ) {
            return null;
        }

        return mapArticleRow(
            row as Record<
                string,
                unknown
            > & {
                $id: string;
            }
        );
    } catch (error) {
        console.error(
            "Failed to get article:",
            error
        );

        return null;
    }
}

/* ============================================================
   Get Related Articles
   Same Article Type
   Excludes Current Article
============================================================ */

export async function getRelatedArticles(
    articleType: ArticleType,
    currentArticleId: string,
    limit = 4
): Promise<Article[]> {
    try {
        const response =
            await tablesDB.listRows({
                databaseId:
                    DATABASE_ID,

                tableId:
                    ARTICLES_TABLE_ID,

                queries: [
                    Query.equal(
                        "status",
                        "published"
                    ),

                    Query.equal(
                        "articleType",
                        articleType
                    ),

                    Query.orderDesc(
                        "publishedAt"
                    ),

                    Query.limit(
                        limit + 1
                    ),
                ],
            });

        return response.rows
            .filter(
                (row) =>
                    row.$id !==
                    currentArticleId
            )
            .slice(0, limit)
            .map(
                (row) =>
                    mapArticleRow(
                        row as Record<
                            string,
                            unknown
                        > & {
                            $id: string;
                        }
                    )
            );
    } catch (error) {
        console.error(
            "Failed to get related articles:",
            error
        );

        return [];
    }
}