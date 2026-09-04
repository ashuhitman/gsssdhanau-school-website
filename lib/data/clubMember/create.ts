import { ID } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTER_MEMBERS_TABLE_ID,
} from "@/lib/appwrite/server";

import {
    NEWSLETTER_MEMBER_TYPE,
    type NewsletterMemberType,
} from "./constants";

export interface CreateClubMemberData {
    name?: string | null;
    role?: string | null;
    memberType: NewsletterMemberType;
    image?: string | null;
    sortOrder: number;

    facultyId?: string | null;

    class?: number | null;
    section?: string | null;
}

export async function createClubMember(
    data: CreateClubMemberData,
) {
    return tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTER_MEMBERS_TABLE_ID,
        rowId: ID.unique(),
        data: {
            name: data.name ?? null,
            role: data.role ?? null,
            memberType: data.memberType,
            image: data.image ?? null,
            sortOrder: data.sortOrder,

            facultyId: data.facultyId ?? null,

            class: data.class ?? null,
            section: data.section ?? null,
        },
    });
}