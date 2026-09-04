import {
    DATABASE_ID,
    FACULTIES_TABLE_ID,
    tablesDB,
} from "@/lib/appwrite/server";

import type {
    FacultyCategory,
    FacultyGender,
    FacultyStatus,
} from "./constants";

export interface CreateFacultyData {
    employeeId?: string | null;

    name: string;
    gender: FacultyGender;
    designation: string;

    subjects?: string[];
    qualifications?: string[];

    profileImage?: string | null;
    bio?: string | null;

    displayOrder: number;

    email?: string | null;
    phone?: string | null;

    firstJoiningDate?: string | null;
    currentPostJoiningDate?: string | null;
    currentSchoolJoiningDate?: string | null;

    status: FacultyStatus;

    message?: string | null;
    prefix?: string | null;

    category: FacultyCategory;
}

export async function createFaculty(
    data: CreateFacultyData
) {
    return tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: FACULTIES_TABLE_ID,
        rowId: "unique()",
        data: {
            employeeId: data.employeeId ?? null,

            name: data.name.trim(),
            gender: data.gender,
            designation: data.designation.trim(),

            subjects: data.subjects ?? [],
            qualifications: data.qualifications ?? [],

            profileImage: data.profileImage ?? null,
            bio: data.bio ?? null,

            displayOrder: data.displayOrder,

            email: data.email ?? null,
            phone: data.phone ?? null,

            firstJoiningDate:
                data.firstJoiningDate ?? null,

            currentPostJoiningDate:
                data.currentPostJoiningDate ?? null,

            currentSchoolJoiningDate:
                data.currentSchoolJoiningDate ?? null,

            status: data.status,

            message: data.message ?? null,
            prefix: data.prefix ?? null,

            category: data.category,
        },
    });
}