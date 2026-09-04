import {
    tablesDB,
    DATABASE_ID,
    ACTIVITIES_TABLE_ID,
} from "@/lib/appwrite/server";

import type {
    ActivityCategory,
    ActivityStatus,
    ActivityType,
    ParticipantType,
} from "./constants";

/* ============================================================
   Update Data
============================================================ */

export interface UpdateActivityData {
    title?: string;
    slug?: string;

    description?: string | null;
    activityDate?: string;

    status?: ActivityStatus;

    publishedAt?: string | null;
    publishedBy?: string | null;

    participantName?: string | null;
    participantType?: ParticipantType | null;

    excerpt?: string | null;
    image?: string | null;

    activityType?: ActivityType;
    category?: ActivityCategory[];
}

/* ============================================================
   Update Activity
============================================================ */

export async function updateActivity(
    id: string,
    data: UpdateActivityData,
) {
    return tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: ACTIVITIES_TABLE_ID,
        rowId: id,
        data,
    });
}

/* ============================================================
   Publish Activity
============================================================ */

export async function publishActivity(
    id: string,
    publishedBy?: string | null,
) {
    return tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: ACTIVITIES_TABLE_ID,
        rowId: id,
        data: {
            status: "published",
            publishedAt:
                new Date().toISOString(),
            publishedBy:
                publishedBy ?? null,
        },
    });
}

/* ============================================================
   Unpublish Activity
============================================================ */

export async function unpublishActivity(
    id: string,
) {
    return tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: ACTIVITIES_TABLE_ID,
        rowId: id,
        data: {
            status: "draft",
            publishedAt: null,
            publishedBy: null,
        },
    });
}