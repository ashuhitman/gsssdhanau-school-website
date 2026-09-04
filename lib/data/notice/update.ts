import {
    tablesDB,
    DATABASE_ID,
    NOTICES_TABLE_ID,
} from "@/lib/appwrite/server";

import type {
    NoticeCategory,
    NoticeStatus,
} from "./constants";

export interface UpdateNoticeData {
    title?: string;
    excerpt?: string | null;
    description?: string | null;
    noticeDate?: string;
    category?: NoticeCategory;
    attachment?: string | null;
    status?: NoticeStatus;
    publishedAt?: string | null;
    publishedBy?: string | null;
}

export async function updateNotice(
    id: string,
    data: UpdateNoticeData,
) {
    return tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: NOTICES_TABLE_ID,
        rowId: id,
        data,
    });
}

export async function publishNotice(
    id: string,
    publishedBy?: string | null,
) {
    return tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: NOTICES_TABLE_ID,
        rowId: id,
        data: {
            status: "published",
            publishedAt: new Date().toISOString(),
            publishedBy: publishedBy ?? null,
        },
    });
}

export async function unpublishNotice(
    id: string,
) {
    return tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: NOTICES_TABLE_ID,
        rowId: id,
        data: {
            status: "draft",
            publishedAt: null,
            publishedBy: null,
        },
    });
}