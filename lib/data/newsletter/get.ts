import { Query } from "node-appwrite";

import {
    DATABASE_ID,
    NEWSLETTERS_TABLE_ID,
    APPWRITE_BUCKET_ID,
    tablesDB,
} from "@/lib/appwrite/server";

import { getImageUrl } from "@/lib/utils/utils";

import type { Article } from "@/lib/data/article/types";
import type { Activity } from "@/lib/data/activity/types";

import type {
    Newsletter,
    NewsletterWithContent,
} from "./types";

/* ============================================================
   Mapper
============================================================ */

function mapNewsletter(
    row: Record<string, unknown>
): Newsletter {
    return {
        id: String(row.$id),
        createdAt: String(row.$createdAt),
        updatedAt: String(row.$updatedAt),

        title: String(row.title ?? ""),
        month: Number(row.month ?? 0),
        year: Number(row.year ?? 0),
        issue: Number(row.issue ?? 0),

        description:
            row.description != null
                ? String(row.description)
                : null,

        coverImage:
            getImageUrl(
                row.coverImage as string | null | undefined,
                APPWRITE_BUCKET_ID
            ) ?? "/images/newsletter/default-newsletter.jpeg",

        pdfUrl:
            row.pdfUrl != null
                ? String(row.pdfUrl)
                : null,

        status: row.status as Newsletter["status"],

        volume:
            row.volume != null
                ? String(row.volume)
                : null,

        publishedAt:
            row.publishedAt != null
                ? String(row.publishedAt)
                : null,

        slug: String(row.slug ?? ""),
    };
}

/* ============================================================
   Related Content Mappers
============================================================ */

function mapArticle(
    row: Record<string, unknown>
): Article {
    return row as unknown as Article;
}

function mapActivity(
    row: Record<string, unknown>
): Activity {
    return row as unknown as Activity;
}

/* ============================================================
   Get All
============================================================ */

export async function getAllNewsletters(): Promise<Newsletter[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTERS_TABLE_ID,
        queries: [
            Query.orderDesc("year"),
            Query.orderDesc("month"),
        ],
    });

    return response.rows.map((row) =>
        mapNewsletter(row as Record<string, unknown>)
    );
}

/* ============================================================
   Get Published
============================================================ */

export async function getPublishedNewsletters(): Promise<Newsletter[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTERS_TABLE_ID,
        queries: [
            Query.equal("status", "published"),
            Query.orderDesc("year"),
            Query.orderDesc("month"),
        ],
    });

    return response.rows.map((row) =>
        mapNewsletter(row as Record<string, unknown>)
    );
}

/* ============================================================
   Get Latest
============================================================ */

export async function getLatestNewsletter(): Promise<Newsletter | null> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTERS_TABLE_ID,
        queries: [
            Query.equal("status", "published"),
            Query.orderDesc("year"),
            Query.orderDesc("month"),
            Query.limit(1),
        ],
    });

    if (response.rows.length === 0) {
        return null;
    }

    return mapNewsletter(
        response.rows[0] as Record<string, unknown>
    );
}

/* ============================================================
   Get By ID
============================================================ */

export async function getNewsletterById(
    id: string,
    includeItems: true
): Promise<NewsletterWithContent | null>;

export async function getNewsletterById(
    id: string,
    includeItems?: false
): Promise<Newsletter | null>;

export async function getNewsletterById(
    id: string,
    includeItems = false
): Promise<Newsletter | NewsletterWithContent | null> {
    try {
        const queries = includeItems
            ? [
                Query.select([
                    "*",
                    "articles.*",
                    "activities.*",
                ]),
            ]
            : undefined;

        const row = await tablesDB.getRow({
            databaseId: DATABASE_ID,
            tableId: NEWSLETTERS_TABLE_ID,
            rowId: id,
            ...(queries ? { queries } : {}),
        });

        const newsletter = mapNewsletter(
            row as Record<string, unknown>
        );

        if (!includeItems) {
            return newsletter;
        }

        const data = row as Record<string, unknown>;

        const articles: Article[] = Array.isArray(
            data.articles
        )
            ? data.articles.map((article) =>
                mapArticle(
                    article as Record<string, unknown>
                )
            )
            : [];

        const activities: Activity[] = Array.isArray(
            data.activities
        )
            ? data.activities.map((activity) =>
                mapActivity(
                    activity as Record<string, unknown>
                )
            )
            : [];

        return {
            ...newsletter,
            articles,
            activities,
        };
    } catch {
        return null;
    }
}

/* ============================================================
   Get By Slug
============================================================ */

export async function getNewsletterBySlug(
    slug: string,
    includeItems: true
): Promise<NewsletterWithContent | null>;

export async function getNewsletterBySlug(
    slug: string,
    includeItems?: false
): Promise<Newsletter | null>;

export async function getNewsletterBySlug(
    slug: string,
    includeItems = false
): Promise<Newsletter | NewsletterWithContent | null> {
    try {
        const queries = [
            Query.equal("slug", slug),
            Query.limit(1),
            ...(includeItems
                ? [
                    Query.select([
                        "*",
                        "articles.*",
                        "activities.*",
                    ]),
                ]
                : []),
        ];

        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: NEWSLETTERS_TABLE_ID,
            queries,
        });

        if (response.rows.length === 0) {
            return null;
        }

        const row = response.rows[0] as Record<string, unknown>;

        const newsletter = mapNewsletter(row);

        if (!includeItems) {
            return newsletter;
        }

        const articles: Article[] = Array.isArray(
            row.articles
        )
            ? row.articles.map((article) =>
                mapArticle(
                    article as Record<string, unknown>
                )
            )
            : [];

        const activities: Activity[] = Array.isArray(
            row.activities
        )
            ? row.activities.map((activity) =>
                mapActivity(
                    activity as Record<string, unknown>
                )
            )
            : [];

        return {
            ...newsletter,
            articles,
            activities,
        };
    } catch {
        return null;
    }
}