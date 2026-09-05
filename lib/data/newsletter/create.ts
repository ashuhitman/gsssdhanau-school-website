import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTERS_TABLE_ID,
} from "@/lib/appwrite/server";

import type {
    CreateNewsletterData,
    Newsletter,
} from "./types";

export async function createNewsletter(
    data: CreateNewsletterData
): Promise<Newsletter> {
    const row = await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTERS_TABLE_ID,
        rowId: "unique()",
        data: {
            title: data.title,
            month: data.month,
            year: data.year,
            issue: data.issue,

            description: data.description ?? null,
            coverImage: data.coverImage ?? null,
            pdfUrl: data.pdfUrl ?? null,

            status: data.status,
            volume: data.volume ?? null,
            publishedAt: data.publishedAt ?? null,
            slug: data.slug,

            incharge: data.incharge ?? null,
            digitalCoordinator: data.digitalCoordinator ?? null,

            newsletterMembers: data.newsletterMembers ?? [],
            articles: data.articles ?? [],
            activities: data.activities ?? [],
        },
    });

    return {
        id: row.$id,
        createdAt: row.$createdAt,
        updatedAt: row.$updatedAt,

        title: String(row.title),
        month: Number(row.month),
        year: Number(row.year),
        issue: Number(row.issue),

        description:
            typeof row.description === "string"
                ? row.description
                : null,

        coverImage:
            typeof row.coverImage === "string"
                ? row.coverImage
                : null,

        pdfUrl:
            typeof row.pdfUrl === "string"
                ? row.pdfUrl
                : null,

        status: row.status as Newsletter["status"],

        volume:
            typeof row.volume === "string"
                ? row.volume
                : null,

        publishedAt:
            typeof row.publishedAt === "string"
                ? row.publishedAt
                : null,

        slug: String(row.slug),
    };
}