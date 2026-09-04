import {
    tablesDB,
    DATABASE_ID,
    ACTIVITIES_TABLE_ID,
} from "@/lib/appwrite/server";

export async function deleteActivity(
    id: string,
): Promise<void> {
    await tablesDB.deleteRow({
        databaseId: DATABASE_ID,
        tableId: ACTIVITIES_TABLE_ID,
        rowId: id,
    });
}