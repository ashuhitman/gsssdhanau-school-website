import {
    DATABASE_ID,
    NEWSLETTER_MEMBERS_TABLE_ID,
    tablesDB,
} from "@/lib/appwrite/server";

import type { UpdateNewsletterMemberData } from "./types";

export async function updateNewsletterMember(
    id: string,
    data: UpdateNewsletterMemberData
) {
    const updateData: Record<string, unknown> = {};

    if (data.name !== undefined) {
        updateData.name = data.name;
    }

    if (data.role !== undefined) {
        updateData.role = data.role;
    }

    if (data.image !== undefined) {
        updateData.image = data.image;
    }

    if (data.sortOrder !== undefined) {
        updateData.sortOrder = data.sortOrder;
    }

    if (data.class !== undefined) {
        updateData.class = data.class;
    }

    if (data.section !== undefined) {
        updateData.section = data.section;
    }

    if (data.newsletters !== undefined) {
        updateData.newsletters = data.newsletters;
    }

    return tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTER_MEMBERS_TABLE_ID,
        rowId: id,
        data: updateData,
    });
}