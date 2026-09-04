import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTER_MEMBERS_TABLE_ID,
} from "@/lib/appwrite/server";

export async function deleteClubMember(
    id: string,
): Promise<void> {
    await tablesDB.deleteRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTER_MEMBERS_TABLE_ID,
        rowId: id,
    });
}