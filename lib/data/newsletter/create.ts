import {
    DATABASE_ID,
    NEWSLETTERS_TABLE_ID,
    tablesDB,
} from "@/lib/appwrite/server";

import type {
    Newsletter,
    CreateNewsletterData,
} from "./types";

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
            row.coverImage != null
                ? String(row.coverImage)
                : null,

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
        },
    });

    return mapNewsletter(
        row as Record<string, unknown>
    );
}