import {
    DATABASE_ID,
    FACULTIES_TABLE_ID,
    tablesDB,
} from "@/lib/appwrite/server";

export async function deleteFaculty(
    id: string
): Promise<void> {
    await tablesDB.deleteRow({
        databaseId: DATABASE_ID,
        tableId: FACULTIES_TABLE_ID,
        rowId: id,
    });
}