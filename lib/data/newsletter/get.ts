import { Query } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTERS_TABLE_ID,
} from "@/lib/appwrite/server";

import type { Newsletter } from "./types";

function mapNewsletter(
    row: Record<string, unknown>,
): Newsletter {
    return {
        id: row.$id as string,
        createdAt: row.$createdAt as string,
        updatedAt: row.$updatedAt as string,

        title: row.title as string,
        month: row.month as number,
        year: row.year as number,
        issue: row.issue as number,
        description: row.description as string | null,
        coverImage: row.coverImage as string | null,
        pdfUrl: row.pdfUrl as string | null,
        status: row.status as Newsletter["status"],
        volume: row.volume as string | null,
        publishedAt: row.publishedAt as string | null,
        slug: row.slug as string,
    };
}

export async function getNewsletters(): Promise<Newsletter[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTERS_TABLE_ID,
        queries: [
            Query.orderDesc("year"),
            Query.orderDesc("month"),
        ],
    });

    return response.rows.map((row) =>
        mapNewsletter(row as unknown as Record<string, unknown>),
    );
}

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
        mapNewsletter(row as unknown as Record<string, unknown>),
    );
}

export async function getNewsletterById(
    id: string,
): Promise<Newsletter | null> {
    try {
        const row = await tablesDB.getRow({
            databaseId: DATABASE_ID,
            tableId: NEWSLETTERS_TABLE_ID,
            rowId: id,
        });

        return mapNewsletter(
            row as unknown as Record<string, unknown>,
        );
    } catch {
        return null;
    }
}

export async function getNewsletterBySlug(
    slug: string,
): Promise<Newsletter | null> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTERS_TABLE_ID,
        queries: [
            Query.equal("slug", slug),
            Query.limit(1),
        ],
    });

    const row = response.rows[0];

    return row
        ? mapNewsletter(
            row as unknown as Record<string, unknown>,
        )
        : null;
}

export async function getNewsletterByMonthYear(
    month: number,
    year: number,
): Promise<Newsletter | null> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTERS_TABLE_ID,
        queries: [
            Query.equal("month", month),
            Query.equal("year", year),
            Query.limit(1),
        ],
    });

    const row = response.rows[0];

    return row
        ? mapNewsletter(
            row as unknown as Record<string, unknown>,
        )
        : null;
}