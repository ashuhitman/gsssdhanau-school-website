import { Query } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    NOTICES_TABLE_ID,
} from "@/lib/appwrite/server";

/* ============================================================
   Notice Category
============================================================ */

export enum NoticeCategory {
    ACADEMIC = "academic",
    EXAMINATION = "examination",
    ADMISSION = "admission",
    HOLIDAY = "holiday",
    GENERAL = "general",
    ANNOUNCEMENT = "announcement",
}

/* ============================================================
   Notice Status
============================================================ */

export enum NoticeStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
}

/* ============================================================
   Notice
============================================================ */

export interface Notice {
    id: string;

    title: string;

    excerpt: string;

    description: string;

    noticeDate: string;

    category: NoticeCategory;

    attachment: string;

    status: NoticeStatus;

    publishedAt?: string;

    publishedBy?: string;
}

/* ============================================================
   Validate Notice Category
============================================================ */

function isNoticeCategory(
    value: unknown
): value is NoticeCategory {
    return Object.values(
        NoticeCategory
    ).includes(
        value as NoticeCategory
    );
}

/* ============================================================
   Map Appwrite Row
============================================================ */

function mapNoticeRow(
    row: Record<string, unknown> & {
        $id: string;
    }
): Notice {
    return {
        id: row.$id,

        title: String(
            row.title ?? ""
        ),

        excerpt: String(
            row.excerpt ?? ""
        ),

        description: String(
            row.description ?? ""
        ),

        noticeDate: String(
            row.noticeDate ?? ""
        ),

        category:
            isNoticeCategory(
                row.category
            )
                ? row.category
                : NoticeCategory.GENERAL,

        attachment: String(
            row.attachment ?? ""
        ),

        status:
            row.status ===
                NoticeStatus.PUBLISHED
                ? NoticeStatus.PUBLISHED
                : NoticeStatus.DRAFT,

        publishedAt:
            row.publishedAt
                ? String(
                    row.publishedAt
                )
                : undefined,

        publishedBy:
            row.publishedBy
                ? String(
                    row.publishedBy
                )
                : undefined,
    };
}

/* ============================================================
   Get All Published Notices
============================================================ */

export async function getNotices(): Promise<
    Notice[]
> {
    const response =
        await tablesDB.listRows({
            databaseId:
                DATABASE_ID,

            tableId:
                NOTICES_TABLE_ID,

            queries: [
                Query.equal(
                    "status",
                    NoticeStatus.PUBLISHED
                ),

                Query.orderDesc(
                    "noticeDate"
                ),
            ],
        });

    return response.rows.map(
        (row) =>
            mapNoticeRow(
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
   Get Notice By ID
============================================================ */

export async function getNoticeById(
    id: string
): Promise<Notice | null> {
    try {
        const row =
            await tablesDB.getRow({
                databaseId:
                    DATABASE_ID,

                tableId:
                    NOTICES_TABLE_ID,

                rowId: id,
            });

        if (
            row.status !==
            NoticeStatus.PUBLISHED
        ) {
            return null;
        }

        return mapNoticeRow(
            row as Record<
                string,
                unknown
            > & {
                $id: string;
            }
        );
    } catch (error) {
        console.error(
            "Failed to get notice:",
            error
        );

        return null;
    }
}