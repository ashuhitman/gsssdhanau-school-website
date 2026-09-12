import "server-only";

import { Query } from "node-appwrite";

import {
    DATABASE_ID,
    ACTIVITIES_TABLE_ID,
    APPWRITE_BUCKET_ID,
    tablesDB,
} from "@/lib/appwrite/server";

import { getImageUrl } from "@/lib/utils/utils";

import {
    ACTIVITY_CATEGORY,
    ACTIVITY_IMAGE_TYPE,
    ACTIVITY_STATUS,
    ACTIVITY_TAGS,
    PARTICIPANT_TYPE,
} from "./constants";

import type {
    Activity,
    ActivityImage,
} from "./types";

/**
 * Maps the Appwrite activity image fields to the
 * application's combined ActivityImage object.
 *
 * Appwrite database schema:
 *
 * image:
 * - Appwrite image => file ID
 * - External URL   => complete image URL
 *
 * imageType:
 * - "appwrite"
 * - "url"
 *
 * Application model:
 *
 * Appwrite:
 * {
 *     value: "usable Appwrite image URL",
 *     type: "appwrite",
 *     fileId: "Appwrite file ID"
 * }
 *
 * External URL:
 * {
 *     value: "https://example.com/image.jpg",
 *     type: "url",
 *     fileId: null
 * }
 */
function mapActivityImage(
    image: unknown,
    imageType: unknown
): ActivityImage | null {
    const cleanImage =
        typeof image === "string"
            ? image.trim()
            : "";

    /*
     * No image.
     */
    if (!cleanImage) {
        return null;
    }

    /*
     * Appwrite image.
     *
     * In Appwrite:
     * image = file ID
     * imageType = "appwrite"
     *
     * Convert the file ID into the actual usable
     * Appwrite image URL.
     */
    if (
        imageType === ACTIVITY_IMAGE_TYPE.APPWRITE
    ) {
        return {
            value:
                getImageUrl(
                    cleanImage,
                    APPWRITE_BUCKET_ID
                ) ?? "/images/activities/default-card.jpeg",

            type: ACTIVITY_IMAGE_TYPE.APPWRITE,

            fileId: cleanImage,
        };
    }

    /*
     * External image URL.
     *
     * In Appwrite:
     * image = complete URL
     * imageType = "url"
     *
     * The value is already a usable image URL,
     * so do not pass it through getImageUrl().
     */
    if (
        imageType === ACTIVITY_IMAGE_TYPE.URL
    ) {
        return {
            value: cleanImage,

            type: ACTIVITY_IMAGE_TYPE.URL,

            fileId: null,
        };
    }

    /*
     * Unknown image type.
     */
    return null;
}

/**
 * Maps an Appwrite activity row to the
 * application's Activity model.
 */
function mapActivity(
    row: Record<string, unknown>
): Activity {
    const activityTags = Array.isArray(
        row.activityTags
    )
        ? row.activityTags.filter(
            (tag): tag is string =>
                typeof tag === "string"
        )
        : [];

    return {
        id: String(row.$id),

        createdAt: String(
            row.$createdAt
        ),

        updatedAt: String(
            row.$updatedAt
        ),

        title: String(
            row.title ?? ""
        ),

        slug: String(
            row.slug ?? ""
        ),

        description:
            typeof row.description === "string"
                ? row.description
                : null,

        activityDate:
            typeof row.activityDate === "string"
                ? row.activityDate
                : "",

        status:
            row.status as Activity["status"],

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
            typeof row.participantType === "string"
                ? (row.participantType as Activity["participantType"])
                : null,

        excerpt:
            typeof row.excerpt === "string"
                ? row.excerpt
                : null,

        /*
         * Appwrite stores image and imageType
         * separately, but the application receives
         * one combined image object.
         */
        image: mapActivityImage(
            row.image,
            row.imageType
        ),

        category:
            typeof row.category === "string"
                ? (row.category as Activity["category"])
                : ACTIVITY_CATEGORY.ACTIVITY,

        activityTags:
            activityTags as Activity["activityTags"],
    };
}

/**
 * Get all activities.
 */
export async function getAllActivities(): Promise<
    Activity[]
> {
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ACTIVITIES_TABLE_ID,
            queries: [
                Query.orderDesc(
                    "activityDate"
                ),
            ],
        });

    return response.rows.map((row) =>
        mapActivity(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}

/**
 * Get all published activities.
 */
export async function getPublishedActivities(): Promise<
    Activity[]
> {
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ACTIVITIES_TABLE_ID,
            queries: [
                Query.equal("status", [
                    ACTIVITY_STATUS.PUBLISHED,
                ]),

                Query.orderDesc(
                    "activityDate"
                ),
            ],
        });

    return response.rows.map((row) =>
        mapActivity(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}

/**
 * Get latest published activities.
 */
export async function getLatestActivities(
    limit = 4
): Promise<Activity[]> {
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ACTIVITIES_TABLE_ID,
            queries: [
                Query.equal("status", [
                    ACTIVITY_STATUS.PUBLISHED,
                ]),

                Query.orderDesc(
                    "activityDate"
                ),

                Query.limit(limit),
            ],
        });

    return response.rows.map((row) =>
        mapActivity(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}

/**
 * Get activity by ID.
 */
export async function getActivityById(
    id: string
): Promise<Activity | null> {
    try {
        const response =
            await tablesDB.getRow({
                databaseId: DATABASE_ID,
                tableId: ACTIVITIES_TABLE_ID,
                rowId: id,
            });

        return mapActivity(
            response as unknown as Record<
                string,
                unknown
            >
        );
    } catch {
        return null;
    }
}

/**
 * Get activity by slug.
 */
export async function getActivityBySlug(
    slug: string
): Promise<Activity | null> {
    const cleanSlug = slug.trim();

    if (!cleanSlug) {
        return null;
    }

    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ACTIVITIES_TABLE_ID,
            queries: [
                Query.equal("slug", [
                    cleanSlug,
                ]),

                Query.limit(1),
            ],
        });

    const row = response.rows[0];

    if (!row) {
        return null;
    }

    return mapActivity(
        row as unknown as Record<
            string,
            unknown
        >
    );
}

/**
 * Get published activities by category.
 */
export async function getActivitiesByCategory(
    category: Activity["category"],
    limit = 20
): Promise<Activity[]> {
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ACTIVITIES_TABLE_ID,
            queries: [
                Query.equal("status", [
                    ACTIVITY_STATUS.PUBLISHED,
                ]),

                Query.equal("category", [
                    category,
                ]),

                Query.orderDesc(
                    "activityDate"
                ),

                Query.limit(limit),
            ],
        });

    return response.rows.map((row) =>
        mapActivity(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}

/**
 * Get published activities by tag.
 */
export async function getActivitiesByTag(
    tag: Activity["activityTags"][number],
    limit = 20
): Promise<Activity[]> {
    console.log("response", tag)
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ACTIVITIES_TABLE_ID,
            queries: [
                Query.equal("status", [
                    ACTIVITY_STATUS.PUBLISHED,
                ]),

                Query.contains(
                    "activityTags",
                    [tag]
                ),

                Query.orderDesc(
                    "activityDate"
                ),

                Query.limit(limit),
            ],
        });


    return response.rows.map((row) =>
        mapActivity(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}

/**
 * Get related published activities.
 *
 * Related activities are matched using
 * activity tags.
 */
export async function getRelatedActivities(
    activityTags: Activity["activityTags"],
    excludeId: string,
    limit = 4
): Promise<Activity[]> {
    if (activityTags.length === 0) {
        return [];
    }

    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: ACTIVITIES_TABLE_ID,
            queries: [
                Query.equal("status", [
                    ACTIVITY_STATUS.PUBLISHED,
                ]),

                Query.notEqual(
                    "$id",
                    excludeId
                ),

                Query.contains(
                    "activityTags",
                    activityTags
                ),

                Query.orderDesc(
                    "activityDate"
                ),

                Query.limit(limit),
            ],
        });

    return response.rows.map((row) =>
        mapActivity(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}