import {
    DATABASE_ID,
    NEWSLETTER_MEMBERS_TABLE_ID,
    tablesDB,
} from "@/lib/appwrite/server";

import type { CreateNewsletterMemberData } from "./types";

export async function createNewsletterMember(
    data: CreateNewsletterMemberData
) {
    const {
        name = null,
        role = null,
        image = null,
        sortOrder,
        class: classNumber = null,
        section = null,
        newsletters = [],
    } = data;

    return tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTER_MEMBERS_TABLE_ID,
        rowId: "unique()",

        data: {
            name,
            role,
            image,
            sortOrder,
            class: classNumber,
            section,
            newsletters,
        },
    });
}