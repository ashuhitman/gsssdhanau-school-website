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

export interface UpdateFacultyData {
    employeeId?: string | null;

    name?: string;
    gender?: FacultyGender;
    designation?: string;

    subjects?: string[];
    qualifications?: string[];

    profileImage?: string | null;
    bio?: string | null;

    displayOrder?: number;

    email?: string | null;
    phone?: string | null;

    firstJoiningDate?: string | null;
    currentPostJoiningDate?: string | null;
    currentSchoolJoiningDate?: string | null;

    status?: FacultyStatus;

    message?: string | null;
    prefix?: string | null;

    category?: FacultyCategory;
}

export async function updateFaculty(
    id: string,
    data: UpdateFacultyData
) {
    const updateData: Record<string, unknown> = {};

    if (data.employeeId !== undefined) {
        updateData.employeeId = data.employeeId;
    }

    if (data.name !== undefined) {
        updateData.name = data.name.trim();
    }

    if (data.gender !== undefined) {
        updateData.gender = data.gender;
    }

    if (data.designation !== undefined) {
        updateData.designation =
            data.designation.trim();
    }

    if (data.subjects !== undefined) {
        updateData.subjects = data.subjects;
    }

    if (data.qualifications !== undefined) {
        updateData.qualifications =
            data.qualifications;
    }

    if (data.profileImage !== undefined) {
        updateData.profileImage =
            data.profileImage;
    }

    if (data.bio !== undefined) {
        updateData.bio = data.bio;
    }

    if (data.displayOrder !== undefined) {
        updateData.displayOrder =
            data.displayOrder;
    }

    if (data.email !== undefined) {
        updateData.email = data.email;
    }

    if (data.phone !== undefined) {
        updateData.phone = data.phone;
    }

    if (data.firstJoiningDate !== undefined) {
        updateData.firstJoiningDate =
            data.firstJoiningDate;
    }

    if (data.currentPostJoiningDate !== undefined) {
        updateData.currentPostJoiningDate =
            data.currentPostJoiningDate;
    }

    if (data.currentSchoolJoiningDate !== undefined) {
        updateData.currentSchoolJoiningDate =
            data.currentSchoolJoiningDate;
    }

    if (data.status !== undefined) {
        updateData.status = data.status;
    }

    if (data.message !== undefined) {
        updateData.message = data.message;
    }

    if (data.prefix !== undefined) {
        updateData.prefix = data.prefix;
    }

    if (data.category !== undefined) {
        updateData.category = data.category;
    }

    return tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: FACULTIES_TABLE_ID,
        rowId: id,
        data: updateData,
    });
}