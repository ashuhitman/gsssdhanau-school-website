import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTER_MEMBERS_TABLE_ID,
} from "@/lib/appwrite/server";

import type { NewsletterMemberType } from "./constants";

export interface UpdateClubMemberData {
    name?: string | null;
    role?: string | null;
    memberType?: NewsletterMemberType;
    image?: string | null;
    sortOrder?: number;

    facultyId?: string | null;

    class?: number | null;
    section?: string | null;
}

export async function updateClubMember(
    id: string,
    data: UpdateClubMemberData,
) {
    return tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTER_MEMBERS_TABLE_ID,
        rowId: id,
        data,
    });
}