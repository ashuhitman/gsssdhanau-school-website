import { Query } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    NOTICES_TABLE_ID,
} from "@/lib/appwrite/server";

import type { Notice } from "./types";
import type {
    NoticeCategory,
    NoticeStatus,
} from "./constants";

function mapNotice(
    row: Record<string, unknown>,
): Notice | null {
    const categoryValues = [
        "academic",
        "examination",
        "admission",
        "holiday",
        "general",
        "announcement",
    ] as const;

    const statusValues = [
        "draft",
        "published",
    ] as const;

    const category =
        typeof row.category === "string" &&
            categoryValues.includes(
                row.category as NoticeCategory,
            )
            ? (row.category as NoticeCategory)
            : null;

    const status =
        typeof row.status === "string" &&
            statusValues.includes(
                row.status as NoticeStatus,
            )
            ? (row.status as NoticeStatus)
            : null;

    if (!category || !status) {
        return null;
    }

    return {
        id: String(row.$id),
        createdAt: String(row.$createdAt),
        updatedAt: String(row.$updatedAt),

        title: String(row.title ?? ""),
        excerpt:
            typeof row.excerpt === "string"
                ? row.excerpt
                : null,

        description:
            typeof row.description === "string"
                ? row.description
                : null,

        noticeDate: String(row.noticeDate),

        category,
        attachment:
            typeof row.attachment === "string"
                ? row.attachment
                : null,

        status,

        publishedAt:
            typeof row.publishedAt === "string"
                ? row.publishedAt
                : null,

        publishedBy:
            typeof row.publishedBy === "string"
                ? row.publishedBy
                : null,
    };
}

export async function getAllNotices(): Promise<Notice[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: NOTICES_TABLE_ID,
            queries: [
                Query.orderDesc("noticeDate"),
            ],
        });

        return response.rows
            .map((row) =>
                mapNotice(
                    row as unknown as Record<
                        string,
                        unknown
                    >,
                ),
            )
            .filter(
                (
                    notice,
                ): notice is Notice =>
                    notice !== null,
            );
    } catch (error) {
        console.error(
            "Failed to get all notices:",
            error,
        );

        return [];
    }
}

export async function getPublishedNotices(): Promise<
    Notice[]
> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: NOTICES_TABLE_ID,
            queries: [
                Query.equal("status", ["published"]),
                Query.orderDesc("noticeDate"),
            ],
        });

        return response.rows
            .map((row) =>
                mapNotice(
                    row as unknown as Record<
                        string,
                        unknown
                    >,
                ),
            )
            .filter(
                (
                    notice,
                ): notice is Notice =>
                    notice !== null &&
                    notice.status === "published",
            );
    } catch (error) {
        console.error(
            "Failed to get published notices:",
            error,
        );

        return [];
    }
}

export async function getLatestNotices(
    limit = 4,
): Promise<Notice[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: NOTICES_TABLE_ID,
            queries: [
                Query.equal("status", ["published"]),
                Query.orderDesc("noticeDate"),
                Query.limit(limit),
            ],
        });

        return response.rows
            .map((row) =>
                mapNotice(
                    row as unknown as Record<
                        string,
                        unknown
                    >,
                ),
            )
            .filter(
                (
                    notice,
                ): notice is Notice =>
                    notice !== null &&
                    notice.status === "published",
            );
    } catch (error) {
        console.error(
            "Failed to get latest notices:",
            error,
        );

        return [];
    }
}

export async function getNoticeById(
    id: string,
): Promise<Notice | null> {
    try {
        const row = await tablesDB.getRow({
            databaseId: DATABASE_ID,
            tableId: NOTICES_TABLE_ID,
            rowId: id,
        });

        return mapNotice(
            row as unknown as Record<
                string,
                unknown
            >,
        );
    } catch (error) {
        console.error(
            `Failed to get notice ${id}:`,
            error,
        );

        return null;
    }
}