import { ID } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    NOTICES_TABLE_ID,
} from "@/lib/appwrite/server";

import type {
    NoticeCategory,
    NoticeStatus,
} from "./constants";

export interface CreateNoticeData {
    title: string;
    excerpt?: string | null;
    description?: string | null;
    noticeDate: string;
    category: NoticeCategory;
    attachment?: string | null;
    status?: NoticeStatus;
    publishedAt?: string | null;
    publishedBy?: string | null;
}

export async function createNotice(
    data: CreateNoticeData,
) {
    const status = data.status ?? "draft";

    return tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: NOTICES_TABLE_ID,
        rowId: ID.unique(),
        data: {
            title: data.title,
            excerpt: data.excerpt ?? null,
            description: data.description ?? null,
            noticeDate: data.noticeDate,
            category: data.category,
            attachment: data.attachment ?? null,
            status,
            publishedAt:
                status === "published"
                    ? data.publishedAt ??
                    new Date().toISOString()
                    : null,
            publishedBy:
                status === "published"
                    ? data.publishedBy ?? null
                    : null,
        },
    });
}