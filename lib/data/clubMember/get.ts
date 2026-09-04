import { Query } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTER_MEMBERS_TABLE_ID,
    APPWRITE_BUCKET_ID,
} from "@/lib/appwrite/server";

import { getImageUrl } from "@/lib/utils/utils";

import type { NewsletterClubMember } from "./types";

import type { NewsletterMemberType } from "./constants";

/* ============================================================
   Mapper
============================================================ */

function mapClubMember(
    row: Record<string, unknown>,
): NewsletterClubMember | null {
    const memberType =
        row.memberType === "teacher"
            ? "teacher"
            : row.memberType === "student"
                ? "student"
                : null;

    if (!memberType) {
        return null;
    }

    /*
     * facultyId is a one-to-one relationship.
     *
     * For teachers:
     * facultyId contains the related faculty record.
     *
     * For students:
     * facultyId is null.
     */
    const faculty =
        row.facultyId &&
            typeof row.facultyId === "object"
            ? (row.facultyId as Record<string, unknown>)
            : null;

    const facultyId =
        faculty?.$id
            ? String(faculty.$id)
            : null;

    const facultyName =
        faculty?.name
            ? String(faculty.name).trim()
            : null;

    const facultyProfileImage =
        faculty?.profileImage
            ? String(faculty.profileImage).trim()
            : null;

    const facultyDesignation =
        faculty?.designation
            ? String(faculty.designation).trim()
            : null;

    const memberName =
        row.name
            ? String(row.name).trim()
            : null;

    const memberImage =
        row.image
            ? String(row.image).trim()
            : null;

    const role =
        row.role
            ? String(row.role).trim()
            : null;

    const section =
        row.section
            ? String(row.section).trim()
            : null;

    return {
        id: row.$id as string,
        createdAt: row.$createdAt as string,
        updatedAt: row.$updatedAt as string,

        /*
         * Teacher name comes from faculties.
         * Student name comes from newsletterClubMembers.
         */
        name:
            memberType === "teacher"
                ? facultyName
                : memberName,

        role,

        memberType:
            memberType as NewsletterMemberType,

        /*
         * Faculty profileImage is a Storage file ID,
         * so convert it to the actual image URL.
         *
         * Student image is also treated as a Storage
         * file ID and converted to its URL.
         */
        image:
            memberType === "teacher"
                ? getImageUrl(
                    facultyProfileImage,
                    APPWRITE_BUCKET_ID,
                )
                : getImageUrl(
                    memberImage,
                    APPWRITE_BUCKET_ID,
                ),

        sortOrder:
            row.sortOrder as number,

        facultyId:
            memberType === "teacher"
                ? facultyId
                : null,

        /*
         * Only faculty members have designation.
         */
        designation:
            memberType === "teacher"
                ? facultyDesignation
                : null,

        /*
         * Only students use class and section.
         */
        class:
            memberType === "student" &&
                typeof row.class === "number"
                ? row.class
                : null,

        section:
            memberType === "student"
                ? section
                : null,
    };
}

/* ============================================================
   Get All Club Members
============================================================ */

export async function getAllClubMembers(): Promise<
    NewsletterClubMember[]
> {
    try {
        const response =
            await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId:
                    NEWSLETTER_MEMBERS_TABLE_ID,
                queries: [
                    Query.select([
                        "*",
                        "facultyId.*",
                    ]),
                    Query.orderAsc(
                        "sortOrder",
                    ),
                ],
            });

        return response.rows
            .map((row) =>
                mapClubMember(
                    row as unknown as Record<
                        string,
                        unknown
                    >,
                ),
            )
            .filter(
                (
                    member,
                ): member is NewsletterClubMember =>
                    member !== null,
            );
    } catch (error) {
        console.error(
            "Failed to get all club members:",
            error,
        );

        return [];
    }
}

/* ============================================================
   Get Club Member By ID
============================================================ */

export async function getClubMemberById(
    id: string,
): Promise<NewsletterClubMember | null> {
    try {
        const row =
            await tablesDB.getRow({
                databaseId: DATABASE_ID,
                tableId:
                    NEWSLETTER_MEMBERS_TABLE_ID,
                rowId: id,
                queries: [
                    Query.select([
                        "*",
                        "facultyId.*",
                    ]),
                ],
            });

        return mapClubMember(
            row as unknown as Record<
                string,
                unknown
            >,
        );
    } catch (error) {
        console.error(
            `Failed to get club member ${id}:`,
            error,
        );

        return null;
    }
}