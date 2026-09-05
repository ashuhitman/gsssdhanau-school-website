import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTERS_TABLE_ID,
} from "@/lib/appwrite/server";

import type {
    Newsletter,
    UpdateNewsletterData,
} from "./types";

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


// const newsletter = await updateNewsletter("newsletter-id", {
//     title: "School Newsletter – September 2026",
//     month: 9,
//     year: 2026,
//     issue: 3,

//     description:
//         "Highlights, achievements and activities from September 2026.",

//     coverImage: "newsletter-cover-file-id",
//     pdfUrl: "https://example.com/newsletter-september-2026.pdf",

//     status: "published",
//     volume: "Vol. 1",
//     publishedAt: "2026-09-30T10:00:00.000Z",

//     slug: "september-2026",

//     incharge: "faculty-id-123",
//     digitalCoordinator: "faculty-id-456",

//     newsletterMembers: [
//         "member-id-1",
//         "member-id-2",
//         "member-id-3",
//     ],

//     articles: [
//         "article-id-1",
//         "article-id-2",
//     ],

//     activities: [
//         "activity-id-1",
//         "activity-id-2",
//     ],
// });