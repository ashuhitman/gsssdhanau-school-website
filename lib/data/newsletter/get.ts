import { Query } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTERS_TABLE_ID,
    APPWRITE_BUCKET_ID,
} from "@/lib/appwrite/server";

import { getImageUrl } from "@/lib/utils/utils";

import type { Article } from "@/lib/data/article/types";
import type { Activity } from "@/lib/data/activity/types";
import type { Faculty } from "@/lib/data/faculty/types";
import type { NewsletterMember } from "../clubMember/types";

import type {
    Newsletter,
    NewsletterWithContent,
} from "./types";

/* ============================================================
   Newsletter Relationships
============================================================ */

const NEWSLETTER_RELATIONS = [
    "incharge.*",
    "digitalCoordinator.*",
    "newsletterMembers.*",
    "articles.*",
    "activities.*",
];

/* ============================================================
   Faculty Mapper
   ------------------------------------------------------------
   Relationship rows returned by Appwrite still contain:

   $id
   $createdAt
   $updatedAt

   Convert them to the Faculty data-layer shape.
============================================================ */

function mapFaculty(
    value: unknown
): Faculty | null {
    if (
        !value ||
        typeof value !== "object"
    ) {
        return null;
    }

    const row =
        value as Record<string, unknown>;

    const subjects = Array.isArray(row.subjects)
        ? row.subjects.filter(
            (item): item is string =>
                typeof item === "string"
        )
        : [];

    const qualifications = Array.isArray(
        row.qualifications
    )
        ? row.qualifications.filter(
            (item): item is string =>
                typeof item === "string"
        )
        : [];

    return {
        id: String(row.$id),

        createdAt: String(row.$createdAt),

        updatedAt: String(row.$updatedAt),

        employeeId:
            typeof row.employeeId === "string"
                ? row.employeeId
                : null,

        name: String(row.name ?? ""),

        gender:
            row.gender as Faculty["gender"],

        designation:
            String(row.designation ?? ""),

        subjects,

        qualifications,

        profileImage:
            typeof row.profileImage === "string" &&
                row.profileImage.trim()
                ? getImageUrl(
                    row.profileImage,
                    APPWRITE_BUCKET_ID
                )
                : null,

        bio:
            typeof row.bio === "string"
                ? row.bio
                : null,

        displayOrder:
            Number(row.displayOrder ?? 0),

        email:
            typeof row.email === "string"
                ? row.email
                : null,

        phone:
            typeof row.phone === "string"
                ? row.phone
                : null,

        firstJoiningDate:
            typeof row.firstJoiningDate ===
                "string"
                ? row.firstJoiningDate
                : null,

        currentPostJoiningDate:
            typeof row.currentPostJoiningDate ===
                "string"
                ? row.currentPostJoiningDate
                : null,

        currentSchoolJoiningDate:
            typeof row.currentSchoolJoiningDate ===
                "string"
                ? row.currentSchoolJoiningDate
                : null,

        status:
            row.status as Faculty["status"],

        message:
            typeof row.message === "string"
                ? row.message
                : null,

        prefix:
            typeof row.prefix === "string"
                ? row.prefix
                : null,

        category:
            row.category as Faculty["category"],
    };
}

/* ============================================================
   Article Mapper
============================================================ */

function mapArticle(
    value: unknown
): Article | null {
    if (
        !value ||
        typeof value !== "object"
    ) {
        return null;
    }

    const row =
        value as Record<string, unknown>;

    const categories = Array.isArray(
        row.category
    )
        ? row.category
        : [];

    return {
        id: String(row.$id),

        createdAt: String(row.$createdAt),

        updatedAt: String(row.$updatedAt),

        title: String(row.title ?? ""),

        slug: String(row.slug ?? ""),

        excerpt:
            typeof row.excerpt === "string"
                ? row.excerpt
                : null,

        content:
            typeof row.content === "string"
                ? row.content
                : null,

        authorBy:
            typeof row.authorBy === "string"
                ? row.authorBy
                : null,

        image:
            typeof row.image === "string" &&
                row.image.trim()
                ? getImageUrl(
                    row.image,
                    APPWRITE_BUCKET_ID
                )
                : "/images/articles/default-card.jpeg",

        featured:
            Boolean(row.featured),

        status:
            row.status as Article["status"],

        publishedAt:
            typeof row.publishedAt === "string"
                ? row.publishedAt
                : null,

        publishedBy:
            typeof row.publishedBy === "string"
                ? row.publishedBy
                : null,

        category:
            categories as Article["category"],

        articleType:
            typeof row.articleType === "string"
                ? (row.articleType as Article["articleType"])
                : null,
    };
}

/* ============================================================
   Activity Mapper
============================================================ */

function mapActivity(
    value: unknown
): Activity | null {
    if (
        !value ||
        typeof value !== "object"
    ) {
        return null;
    }

    const row =
        value as Record<string, unknown>;

    const activityType =
        row.activityType as Activity["activityType"];

    const status =
        row.status as Activity["status"];

    const participantType =
        row.participantType as Activity["participantType"];

    const category = Array.isArray(row.category)
        ? (row.category as Activity["category"])
        : [];

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

        activityDate:
            String(row.activityDate ?? ""),

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

        image:
            typeof row.image === "string" &&
                row.image.trim()
                ? getImageUrl(
                    row.image,
                    APPWRITE_BUCKET_ID
                )
                : null,

        activityType,

        category,
    };
}

/* ============================================================
   Newsletter Member Mapper

   Uses the NewsletterMember type from:

   ../clubMember/types
============================================================ */

function mapNewsletterMember(
    value: unknown
): NewsletterMember | null {
    if (
        !value ||
        typeof value !== "object"
    ) {
        return null;
    }

    const row =
        value as Record<string, unknown>;

    return {
        id: String(row.$id),

        createdAt: String(row.$createdAt),

        updatedAt: String(row.$updatedAt),

        name:
            typeof row.name === "string"
                ? row.name
                : null,

        role:
            typeof row.role === "string"
                ? row.role
                : null,

        image:
            typeof row.image === "string" &&
                row.image.trim()
                ? getImageUrl(
                    row.image,
                    APPWRITE_BUCKET_ID
                )
                : null,

        sortOrder:
            Number(row.sortOrder ?? 0),

        class:
            typeof row.class === "number"
                ? row.class
                : row.class !== null &&
                    row.class !== undefined
                    ? Number(row.class)
                    : null,

        section:
            typeof row.section === "string"
                ? row.section
                : null,
    };
}

/* ============================================================
   Newsletter Mapper
============================================================ */

function mapNewsletter(
    row: Record<string, unknown>
): Newsletter {
    return {
        id: String(row.$id),

        createdAt: String(row.$createdAt),

        updatedAt: String(row.$updatedAt),

        title: String(row.title ?? ""),

        month: Number(row.month ?? 1),

        year: Number(row.year ?? 0),

        issue: Number(row.issue ?? 0),

        description:
            typeof row.description === "string"
                ? row.description
                : null,

        coverImage:
            getImageUrl(
                typeof row.coverImage === "string"
                    ? row.coverImage
                    : null,
                APPWRITE_BUCKET_ID
            ) ??
            "/images/newsletter/default-newsletter.jpeg",

        pdfUrl:
            typeof row.pdfUrl === "string"
                ? row.pdfUrl
                : null,

        status:
            row.status as Newsletter["status"],

        volume:
            typeof row.volume === "string"
                ? row.volume
                : null,

        publishedAt:
            typeof row.publishedAt === "string"
                ? row.publishedAt
                : null,

        slug: String(row.slug ?? ""),
    };
}

/* ============================================================
   Newsletter With Content Mapper
============================================================ */

function mapNewsletterWithContent(
    row: Record<string, unknown>
): NewsletterWithContent {
    const incharge =
        mapFaculty(row.incharge);

    const digitalCoordinator =
        mapFaculty(
            row.digitalCoordinator
        );

    const newsletterMembers =
        Array.isArray(row.newsletterMembers)
            ? row.newsletterMembers
                .map(mapNewsletterMember)
                .filter(
                    (
                        item
                    ): item is NewsletterMember =>
                        item !== null
                )
            : [];

    const articles =
        Array.isArray(row.articles)
            ? row.articles
                .map(mapArticle)
                .filter(
                    (
                        item
                    ): item is Article =>
                        item !== null
                )
            : [];

    const activities =
        Array.isArray(row.activities)
            ? row.activities
                .map(mapActivity)
                .filter(
                    (
                        item
                    ): item is Activity =>
                        item !== null
                )
            : [];

    return {
        ...mapNewsletter(row),

        incharge,

        digitalCoordinator,

        newsletterMembers,

        articles,

        activities,
    };
}

/* ============================================================
   Get All Newsletters
============================================================ */

export async function getNewsletters(): Promise<Newsletter[]> {
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: NEWSLETTERS_TABLE_ID,

            queries: [
                Query.orderDesc("year"),
                Query.orderDesc("month"),
                Query.orderDesc("issue"),
            ],
        });

    return response.rows.map((row) =>
        mapNewsletter(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}

/* ============================================================
   Get Published Newsletters

   - Lightweight
   - No relationships
   - Used for archive
============================================================ */

export async function getPublishedNewsletters(): Promise<Newsletter[]> {
    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: NEWSLETTERS_TABLE_ID,

            queries: [
                Query.equal("status", [
                    "published",
                ]),

                Query.orderDesc("year"),

                Query.orderDesc("month"),

                Query.orderDesc("issue"),
            ],
        });

    return response.rows.map((row) =>
        mapNewsletter(
            row as unknown as Record<
                string,
                unknown
            >
        )
    );
}

/* ============================================================
   Get Newsletter By ID

   - Full newsletter
   - Includes all relationships
============================================================ */

export async function getNewsletterById(
    id: string
): Promise<NewsletterWithContent | null> {
    try {
        const row =
            await tablesDB.getRow({
                databaseId: DATABASE_ID,
                tableId: NEWSLETTERS_TABLE_ID,
                rowId: id,

                queries: [
                    Query.select([
                        "*",
                        ...NEWSLETTER_RELATIONS,
                    ]),
                ],
            });

        return mapNewsletterWithContent(
            row as unknown as Record<
                string,
                unknown
            >
        );
    } catch (error) {
        console.error(
            "Failed to get newsletter by ID:",
            error
        );

        return null;
    }
}

/* ============================================================
   Get Newsletter By Slug

   - Full newsletter
   - Includes all relationships
============================================================ */

export async function getNewsletterBySlug(
    slug: string
): Promise<NewsletterWithContent | null> {
    const cleanSlug = slug.trim();

    if (!cleanSlug) {
        return null;
    }

    try {
        const response =
            await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: NEWSLETTERS_TABLE_ID,

                queries: [
                    Query.equal("slug", [
                        cleanSlug,
                    ]),

                    Query.limit(1),

                    Query.select([
                        "*",
                        ...NEWSLETTER_RELATIONS,
                    ]),
                ],
            });

        const row =
            response.rows[0];

        if (!row) {
            return null;
        }

        return mapNewsletterWithContent(
            row as unknown as Record<
                string,
                unknown
            >
        );
    } catch (error) {
        console.error(
            "Failed to get newsletter by slug:",
            error
        );

        return null;
    }
}

/* ============================================================
   Get Latest Published Newsletter
============================================================ */

export function getLatestPublishedNewsletter(
    withContent: true
): Promise<NewsletterWithContent | null>;

export function getLatestPublishedNewsletter(
    withContent?: false
): Promise<Newsletter | null>;

export async function getLatestPublishedNewsletter(
    withContent = false
): Promise<
    Newsletter |
    NewsletterWithContent |
    null
> {
    const queries = [
        Query.equal("status", [
            "published",
        ]),

        Query.orderDesc("year"),

        Query.orderDesc("month"),

        Query.orderDesc("issue"),

        Query.limit(1),
    ];

    if (withContent) {
        queries.push(
            Query.select([
                "*",
                "incharge.*",
                "digitalCoordinator.*",
                "newsletterMembers.*",
                "articles.*",
                "activities.*",
            ])
        );
    }

    const response =
        await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: NEWSLETTERS_TABLE_ID,
            queries,
        });

    const row =
        response.rows[0];

    if (!row) {
        return null;
    }

    const mappedRow =
        row as unknown as Record<
            string,
            unknown
        >;

    return withContent
        ? mapNewsletterWithContent(
            mappedRow
        )
        : mapNewsletter(mappedRow);
}