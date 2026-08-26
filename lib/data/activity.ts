import { Query } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    ACTIVITIES_TABLE_ID,
    APPWRITE_BUCKET_ID,
} from "@/lib/appwrite/server";
import { getImageUrl } from "../utils/utils";


/* ============================================================
   Activity Category
   ============================================================ */

export type ActivityCategory =
    | "sports"
    | "academic"
    | "cultural"
    | "social";

/* ============================================================
   Activity Type
   ============================================================ */

export type ActivityType =
    | "event"
    | "activity"
    | "achievement"
    | "competition";

/* ============================================================
   Participant Type
   ============================================================ */

export type ParticipantType =
    | "student"
    | "teacher"
    | "team"
    | "school";

/* ============================================================
   Activity Status
   ============================================================ */

export type ActivityStatus =
    | "draft"
    | "published";

/* ============================================================
   Activity
   ============================================================ */

export interface Activity {
    id: string;

    title: string;

    description: string;

    activityDate: string;

    status: ActivityStatus;

    publishedAt?: string;

    publishedBy?: string;

    participantName?: string;

    participantType?: ParticipantType;

    excerpt?: string;

    /*
     * Appwrite Storage image URL.
     *
     * Always contains either:
     * - Appwrite image URL
     * - default image
     */
    image: string | null;

    imageAlt?: string;

    /*
     * Appwrite Enum Array
     *
     * Example:
     * ["sports", "academic"]
     */
    category: ActivityCategory[];

    /*
     * Appwrite Enum
     *
     * Column name:
     * ActivityType
     */
    activityType: ActivityType;
}

/* ============================================================
   Default Image
   ============================================================ */

const DEFAULT_ACTIVITY_IMAGE =
    "/images/activity/default.jpg";

/* ============================================================
   Validate Activity Category
   ============================================================ */

function isActivityCategory(
    value: unknown
): value is ActivityCategory {
    return (
        value === "sports" ||
        value === "academic" ||
        value === "cultural" ||
        value === "social"
    );
}

/* ============================================================
   Validate Activity Type
   ============================================================ */

function isActivityType(
    value: unknown
): value is ActivityType {
    return (
        value === "event" ||
        value === "activity" ||
        value === "achievement" ||
        value === "competition"
    );
}

/* ============================================================
   Validate Participant Type
   ============================================================ */

function isParticipantType(
    value: unknown
): value is ParticipantType {
    return (
        value === "student" ||
        value === "teacher" ||
        value === "team" ||
        value === "school"
    );
}

/* ============================================================
   Map Appwrite Row
   ============================================================ */

function mapActivityRow(
    row: Record<string, unknown> & {
        $id: string;
    }
): Activity {
    /* ========================================================
       Title
    ======================================================== */

    const title = String(
        row.title ?? ""
    ).trim();

    /* ========================================================
       Category

       Appwrite:
       String
       Array: true
       Format: enum

       Example:
       ["sports", "academic"]
    ======================================================== */

    const category: ActivityCategory[] =
        Array.isArray(row.category)
            ? row.category.filter(
                isActivityCategory
            )
            : [];

    /* ========================================================
       Activity Type

       Appwrite column:
       ActivityType
    ======================================================== */

    const activityType: ActivityType =
        isActivityType(
            row.ActivityType
        )
            ? row.ActivityType
            : "activity";

    /* ========================================================
       Participant Type
    ======================================================== */

    const participantType =
        isParticipantType(
            row.participantType
        )
            ? row.participantType
            : undefined;

    /* ========================================================
       Image File ID
    ======================================================== */

    const imageFileId =
        row.image !== null &&
            row.image !== undefined &&
            String(row.image).trim()
            ? String(row.image).trim()
            : null;

    /* ========================================================
       Image URL
    ======================================================== */

    const image =
        getImageUrl(
            imageFileId,
            APPWRITE_BUCKET_ID
        ) ??
        null;

    /* ========================================================
       Return
    ======================================================== */

    return {
        id: row.$id,

        title,

        description: String(
            row.description ?? ""
        ).trim(),

        activityDate: String(
            row.activityDate ?? ""
        ),

        status:
            row.status ===
                "published"
                ? "published"
                : "draft",

        publishedAt:
            row.publishedAt
                ? String(
                    row.publishedAt
                )
                : undefined,

        publishedBy:
            row.publishedBy &&
                String(
                    row.publishedBy
                ).trim()
                ? String(
                    row.publishedBy
                ).trim()
                : undefined,

        participantName:
            row.participantName &&
                String(
                    row.participantName
                ).trim()
                ? String(
                    row.participantName
                ).trim()
                : undefined,

        participantType,

        excerpt:
            row.excerpt &&
                String(
                    row.excerpt
                ).trim()
                ? String(
                    row.excerpt
                ).trim()
                : undefined,

        image,

        imageAlt:
            imageFileId
                ? `${title} - PM SHRI GSSS Dhanau`
                : undefined,

        category,

        activityType,
    };
}

/* ============================================================
   Get All Published Activities
   ============================================================ */

export async function getActivities(): Promise<
    Activity[]
> {
    const response =
        await tablesDB.listRows({
            databaseId:
                DATABASE_ID,

            tableId:
                ACTIVITIES_TABLE_ID,

            queries: [
                Query.equal(
                    "status",
                    "published"
                ),

                Query.orderDesc(
                    "activityDate"
                ),
            ],
        });

    return response.rows.map(
        (row) =>
            mapActivityRow(
                row as Record<
                    string,
                    unknown
                > & {
                    $id: string;
                }
            )
    );
}

/* ============================================================
   Get Activity By ID
   ============================================================ */

export async function getActivityById(
    id: string
): Promise<Activity | null> {
    try {
        const row =
            await tablesDB.getRow({
                databaseId:
                    DATABASE_ID,

                tableId:
                    ACTIVITIES_TABLE_ID,

                rowId: id,
            });

        if (
            row.status !==
            "published"
        ) {
            return null;
        }

        return mapActivityRow(
            row as Record<
                string,
                unknown
            > & {
                $id: string;
            }
        );
    } catch (error) {
        console.error(
            "Failed to get activity:",
            error
        );

        return null;
    }
}