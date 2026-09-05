import { Client, TablesDB } from "node-appwrite";

const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const databaseId = process.env.APPWRITE_DATABASE_ID;
const tableId = process.env.APPWRITE_NEWSLETTERS_TABLE_ID;

if (!endpoint || !projectId || !apiKey || !databaseId || !tableId) {
    throw new Error(
        "Missing APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY, APPWRITE_DATABASE_ID, or APPWRITE_NEWSLETTERS_TABLE_ID"
    );
}

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const tablesDB = new TablesDB(client);

const result = await tablesDB.listColumns({
    databaseId,
    tableId,
});

console.log("\nNEWSLETTERS COLUMNS\n");
console.log(
    result.columns.map((column) => ({
        key: column.key,
        type: column.type,
        status: column.status,
        error: column.error,
        relatedTable: column.relatedTable,
        relationType: column.relationType,
        twoWay: column.twoWay,
        twoWayKey: column.twoWayKey,
        onDelete: column.onDelete,
    }))
);