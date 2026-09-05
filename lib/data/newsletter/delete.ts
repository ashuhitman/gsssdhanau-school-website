import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTERS_TABLE_ID,
} from "@/lib/appwrite/server";

export async function deleteNewsletter(
    id: string
): Promise<void> {
    await tablesDB.deleteRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTERS_TABLE_ID,
        rowId: id,
    });
}