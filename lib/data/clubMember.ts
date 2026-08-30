import { Query } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTER_MEMBERS_TABLE_ID,
} from "@/lib/appwrite/server";

import { getFacultyById } from "./faculty";

/* ============================================================
   TYPES
============================================================ */

export type NewsletterClubMember = {
    id: string;
    name: string;
    role: string;
    memberType: "student" | "teacher";
    className?: string;
    image: string | null;
    sortOrder: number;
};

/* ============================================================
   APPWRITE ROW
============================================================ */

type NewsletterClubMemberRow = {
    $id: string;

    name?: unknown;
    role?: unknown;
    memberType?: unknown;
    className?: unknown;
    image?: unknown;
    sortOrder?: unknown;
    facultyId?: unknown;
};

/* ============================================================
   MAP MEMBER
============================================================ */

async function mapClubMember(
    rawRow: unknown
): Promise<NewsletterClubMember | null> {
    const row =
        rawRow as NewsletterClubMemberRow;

    const memberType =
        row.memberType === "teacher"
            ? "teacher"
            : "student";

    const role =
        String(row.role ?? "").trim();

    const sortOrder =
        Number(row.sortOrder ?? 0);

    /* ========================================================
       TEACHER
    ======================================================== */

    if (memberType === "teacher") {
        const facultyId =
            row.facultyId
                ? String(
                    row.facultyId
                ).trim()
                : "";

        if (!facultyId) {
            return null;
        }

        const faculty =
            await getFacultyById(
                facultyId
            );

        if (!faculty) {
            return null;
        }

        return {
            id: row.$id,

            name: faculty.name,

            role,

            memberType: "teacher",

            image: faculty.image,

            sortOrder,
        };
    }

    /* ========================================================
       STUDENT
    ======================================================== */

    const name =
        String(row.name ?? "").trim();

    if (!name) {
        return null;
    }

    return {
        id: row.$id,

        name,

        role,

        memberType: "student",

        className:
            row.className &&
                String(row.className).trim()
                ? String(
                    row.className
                ).trim()
                : undefined,

        image:
            row.image &&
                String(row.image).trim()
                ? String(
                    row.image
                ).trim()
                : null,

        sortOrder,
    };
}

/* ============================================================
   GET ALL CLUB MEMBERS
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
                    Query.orderAsc(
                        "sortOrder"
                    ),
                ],
            });

        const members =
            await Promise.all(
                response.rows.map(
                    (row) =>
                        mapClubMember(row)
                )
            );

        return members.filter(
            (
                member
            ): member is NewsletterClubMember =>
                member !== null
        );
    } catch (error) {
        console.error(
            "Failed to get all club members:",
            error
        );

        return [];
    }
}

/* ============================================================
   GET CLUB MEMBER BY ID
============================================================ */

export async function getClubMemberById(
    id: string
): Promise<NewsletterClubMember | null> {
    try {
        const response =
            await tablesDB.getRow({
                databaseId: DATABASE_ID,

                tableId:
                    NEWSLETTER_MEMBERS_TABLE_ID,

                rowId: id,
            });

        return await mapClubMember(
            response
        );
    } catch (error) {
        console.error(
            `Failed to get club member ${id}:`,
            error
        );

        return null;
    }
}