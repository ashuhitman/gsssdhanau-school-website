import { Query } from "node-appwrite";

import {
    DATABASE_ID,
    FACULTIES_TABLE_ID,
    APPWRITE_BUCKET_ID,
    tablesDB,
} from "@/lib/appwrite/server";

import { getImageUrl } from "@/lib/utils/utils";

import {
    FACULTY_CATEGORY,
    FACULTY_STATUS,
} from "./constants";

import type { Faculty } from "./types";

/* ============================================================
   Mapper
============================================================ */

function mapFaculty(
    row: Record<string, unknown>
): Faculty {
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
            typeof row.firstJoiningDate === "string"
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
   Get All Faculties
============================================================ */

export async function getAllFaculties(): Promise<Faculty[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: FACULTIES_TABLE_ID,
        queries: [
            Query.orderAsc("displayOrder"),
        ],
    });

    return response.rows.map((row) =>
        mapFaculty(
            row as unknown as Record<string, unknown>
        )
    );
}

/* ============================================================
   Get Published Faculties
============================================================ */

export async function getPublishedFaculties(): Promise<Faculty[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: FACULTIES_TABLE_ID,
        queries: [
            Query.equal("status", [
                FACULTY_STATUS.PUBLISHED,
            ]),
            Query.orderAsc("displayOrder"),
        ],
    });

    return response.rows.map((row) =>
        mapFaculty(
            row as unknown as Record<string, unknown>
        )
    );
}

/* ============================================================
   Get Faculty By ID
============================================================ */

export async function getFacultyById(
    id: string
): Promise<Faculty | null> {
    try {
        const response = await tablesDB.getRow({
            databaseId: DATABASE_ID,
            tableId: FACULTIES_TABLE_ID,
            rowId: id,
        });

        return mapFaculty(
            response as unknown as Record<string, unknown>
        );
    } catch {
        return null;
    }
}

/* ============================================================
   Get Faculty By Employee ID
============================================================ */

export async function getFacultyByEmployeeId(
    employeeId: string
): Promise<Faculty | null> {
    const cleanEmployeeId = employeeId.trim();

    if (!cleanEmployeeId) {
        return null;
    }

    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: FACULTIES_TABLE_ID,
        queries: [
            Query.equal("employeeId", [
                cleanEmployeeId,
            ]),
            Query.limit(1),
        ],
    });

    const row = response.rows[0];

    if (!row) {
        return null;
    }

    return mapFaculty(
        row as unknown as Record<string, unknown>
    );
}

/* ============================================================
   Get Faculties By Category
============================================================ */

export async function getFacultiesByCategory(
    category: Faculty["category"],
    limit?: number
): Promise<Faculty[]> {
    const queries = [
        Query.equal("status", [
            FACULTY_STATUS.PUBLISHED,
        ]),
        Query.equal("category", [category]),
        Query.orderAsc("displayOrder"),
    ];

    if (limit !== undefined) {
        queries.push(Query.limit(limit));
    }

    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: FACULTIES_TABLE_ID,
        queries,
    });

    return response.rows.map((row) =>
        mapFaculty(
            row as unknown as Record<string, unknown>
        )
    );
}

/* ============================================================
   Get Faculties By Gender
============================================================ */

export async function getFacultiesByGender(
    gender: Faculty["gender"],
    limit?: number
): Promise<Faculty[]> {
    const queries = [
        Query.equal("status", [
            FACULTY_STATUS.PUBLISHED,
        ]),
        Query.equal("gender", [gender]),
        Query.orderAsc("displayOrder"),
    ];

    if (limit !== undefined) {
        queries.push(Query.limit(limit));
    }

    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: FACULTIES_TABLE_ID,
        queries,
    });

    return response.rows.map((row) =>
        mapFaculty(
            row as unknown as Record<string, unknown>
        )
    );
}

/* ============================================================
   Get Principal
============================================================ */

export async function getPrincipal(): Promise<Faculty | null> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: FACULTIES_TABLE_ID,
        queries: [
            Query.equal("status", [
                FACULTY_STATUS.PUBLISHED,
            ]),
            Query.equal("category", [
                FACULTY_CATEGORY.PRINCIPAL,
            ]),
            Query.limit(1),
        ],
    });

    const row = response.rows[0];

    if (!row) {
        return null;
    }

    return mapFaculty(
        row as unknown as Record<string, unknown>
    );
}

/* ============================================================
   Get Teachers
============================================================ */

export async function getTeachers(): Promise<Faculty[]> {
    return getFacultiesByCategory(
        FACULTY_CATEGORY.TEACHER
    );
}