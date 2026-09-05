import {
    DATABASE_ID,
    NEWSLETTER_MEMBERS_TABLE_ID,
    tablesDB,
} from "@/lib/appwrite/server";

export async function deleteNewsletterMember(
    id: string
) {
    await tablesDB.deleteRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTER_MEMBERS_TABLE_ID,
        rowId: id,
    });
}