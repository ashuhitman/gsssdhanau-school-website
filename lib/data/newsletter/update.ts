import {
    DATABASE_ID,
    NEWSLETTERS_TABLE_ID,
    tablesDB,
} from "@/lib/appwrite/server";

import type {
    Newsletter,
    UpdateNewsletterData,
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

export async function updateNewsletter(
    id: string,
    data: UpdateNewsletterData
): Promise<Newsletter> {
    const row = await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTERS_TABLE_ID,
        rowId: id,
        data,
    });

    return mapNewsletter(
        row as Record<string, unknown>
    );
}


// await updateNewsletter("newsletter-id", {
//     title: "September School Newsletter",
//     month: 9,
//     year: 2026,
//     issue: 6,
//     description: "September edition of the school newsletter.",
//     coverImage: "cover-file-id",
//     pdfUrl: "https://example.com/newsletter.pdf",
//     status: "published",
//     volume: "III",
//     publishedAt: new Date().toISOString(),
//     slug: "september-2026",
//     articles: [
//         "article-id-1",
//         "article-id-2",
//     ],
//     activities: [
//         "activity-id-1",
//         "activity-id-2",
//     ],
// });