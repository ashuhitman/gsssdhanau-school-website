import {
    tablesDB,
    DATABASE_ID,
    NOTICES_TABLE_ID,
} from "@/lib/appwrite/server";

export async function deleteNotice(
    id: string,
): Promise<void> {
    await tablesDB.deleteRow({
        databaseId: DATABASE_ID,
        tableId: NOTICES_TABLE_ID,
        rowId: id,
    });
}