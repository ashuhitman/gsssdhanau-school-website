import {
    ARTICLES_TABLE_ID,
    DATABASE_ID,
    tablesDB,
} from "@/lib/appwrite/server";

export async function deleteArticle(
    id: string
): Promise<void> {
    await tablesDB.deleteRow({
        databaseId: DATABASE_ID,
        tableId: ARTICLES_TABLE_ID,
        rowId: id,
    });
}