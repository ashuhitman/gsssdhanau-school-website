import "server-only";

import { Query } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    ACTIVITIES_TABLE_ID,
    APPWRITE_BUCKET_ID,
} from "@/lib/appwrite/server";

import { getImageUrl } from "@/lib/utils/utils";

import {
    ACTIVITY_CATEGORY,
    ACTIVITY_STATUS,
    ACTIVITY_TYPE,
    PARTICIPANT_TYPE,
} from "./constants";

import type { Activity } from "./types";

/* ============================================================
   Mapper
============================================================ */

function mapActivity(row: Record<string, unknown>): Activity {
    const activityType = row.activityType as Activity["activityType"];
    const status = row.status as Activity["status"];
    const participantType =
        row.participantType as Activity["participantType"];

    const category = Array.isArray(row.category)
        ? (row.category as Activity["category"])
        : [];

    if (
        !Object.values(ACTIVITY_TYPE).includes(
            activityType
        )
    ) {
        throw new Error(
            `Invalid activity type: ${String(
                activityType
            )}`
        );
    }

    if (
        !Object.values(ACTIVITY_STATUS).includes(status)
    ) {
        throw new Error(
            `Invalid activity status: ${String(status)}`
        );
    }

    if (
        participantType !== null &&
        participantType !== undefined &&
        !Object.values(PARTICIPANT_TYPE).includes(
            participantType
        )
    ) {
        throw new Error(
            `Invalid participant type: ${String(
                participantType
            )}`
        );
    }

    const validCategories = category.filter((item) =>
        Object.values(ACTIVITY_CATEGORY).includes(item)
    );

    return {
        id: String(row.$id),
        createdAt: String(row.$createdAt),
        updatedAt: String(row.$updatedAt),

        title: String(row.title ?? ""),
        slug: String(row.slug ?? ""),

        description:
            typeof row.description === "string"
                ? row.description
                : null,

        activityDate: String(
            row.activityDate ?? ""
        ),

        status,

        publishedAt:
            typeof row.publishedAt === "string"
                ? row.publishedAt
                : null,

        publishedBy:
            typeof row.publishedBy === "string"
                ? row.publishedBy
                : null,

        participantName:
            typeof row.participantName === "string"
                ? row.participantName
                : null,

        participantType:
            participantType ?? null,

        excerpt:
            typeof row.excerpt === "string"
                ? row.excerpt
                : null,

        image: getImageUrl(
            typeof row.image === "string"
                ? row.image
                : null,
            APPWRITE_BUCKET_ID
        ),

        activityType,

        category: validCategories,
    };
}

/* ============================================================
   Get All Activities
============================================================ */

export async function getAllActivities(): Promise<Activity[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ACTIVITIES_TABLE_ID,
        queries: [
            Query.orderDesc("activityDate"),
        ],
    });

    return response.rows.map((row) =>
        mapActivity(row as unknown as Record<string, unknown>)
    );
}

/* ============================================================
   Get Published Activities
============================================================ */

export async function getPublishedActivities(): Promise<Activity[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ACTIVITIES_TABLE_ID,
        queries: [
            Query.equal("status", [
                ACTIVITY_STATUS.PUBLISHED,
            ]),
            Query.orderDesc("activityDate"),
        ],
    });

    return response.rows.map((row) =>
        mapActivity(row as unknown as Record<string, unknown>)
    );
}

/* ============================================================
   Get Latest Activities
============================================================ */

export async function getLatestActivities(
    limit = 4
): Promise<Activity[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ACTIVITIES_TABLE_ID,
        queries: [
            Query.equal("status", [
                ACTIVITY_STATUS.PUBLISHED,
            ]),
            Query.orderDesc("activityDate"),
            Query.limit(limit),
        ],
    });

    return response.rows.map((row) =>
        mapActivity(row as unknown as Record<string, unknown>)
    );
}

/* ============================================================
   Get Activity By ID
============================================================ */

export async function getActivityById(
    id: string
): Promise<Activity | null> {
    try {
        const response = await tablesDB.getRow({
            databaseId: DATABASE_ID,
            tableId: ACTIVITIES_TABLE_ID,
            rowId: id,
        });

        return mapActivity(
            response as unknown as Record<string, unknown>
        );
    } catch {
        return null;
    }
}

/* ============================================================
   Get Activity By Slug
============================================================ */

export async function getActivityBySlug(
    slug: string
): Promise<Activity | null> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ACTIVITIES_TABLE_ID,
        queries: [
            Query.equal("slug", [slug]),
            Query.limit(1),
        ],
    });

    const row = response.rows[0];

    if (!row) {
        return null;
    }

    return mapActivity(
        row as unknown as Record<string, unknown>
    );
}

/* ============================================================
   Get Related Activities
============================================================ */

export async function getRelatedActivities(
    activityType: Activity["activityType"],
    excludeId: string,
    limit = 4
): Promise<Activity[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: ACTIVITIES_TABLE_ID,
        queries: [
            Query.equal("status", [
                ACTIVITY_STATUS.PUBLISHED,
            ]),
            Query.equal("activityType", [
                activityType,
            ]),
            Query.notEqual("$id", excludeId),
            Query.orderDesc("activityDate"),
            Query.limit(limit),
        ],
    });

    return response.rows.map((row) =>
        mapActivity(
            row as unknown as Record<string, unknown>
        )
    );
}