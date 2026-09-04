import { ID, Query } from "node-appwrite";

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
   Slug
============================================================ */

function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

async function createUniqueSlug(
    title: string,
): Promise<string> {
    const baseSlug =
        slugify(title) || "activity";

    let slug = baseSlug;
    let counter = 2;

    while (true) {
        const response =
            await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: ACTIVITIES_TABLE_ID,
                queries: [
                    Query.equal("slug", [slug]),
                    Query.limit(1),
                ],
            });

        if (response.rows.length === 0) {
            return slug;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
    }
}

/* ============================================================
   Create Data
============================================================ */

export interface CreateActivityData {
    title: string;
    description?: string | null;
    activityDate: string;

    status?: ActivityStatus;

    publishedAt?: string | null;
    publishedBy?: string | null;

    participantName?: string | null;
    participantType?: ParticipantType | null;

    excerpt?: string | null;
    image?: string | null;

    activityType: ActivityType;
    category?: ActivityCategory[];
}

/* ============================================================
   Create Activity
============================================================ */

export async function createActivity(
    data: CreateActivityData,
) {
    const status =
        data.status ?? "draft";

    const slug =
        await createUniqueSlug(
            data.title,
        );

    return tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: ACTIVITIES_TABLE_ID,
        rowId: ID.unique(),

        data: {
            title: data.title,
            slug,

            description:
                data.description ?? null,

            activityDate:
                data.activityDate,

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

            participantName:
                data.participantName ?? null,

            participantType:
                data.participantType ?? null,

            excerpt:
                data.excerpt ?? "",

            image:
                data.image ?? null,

            activityType:
                data.activityType,

            category:
                data.category ?? [],
        },
    });
}