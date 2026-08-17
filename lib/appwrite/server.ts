import { Client, TablesDB } from "node-appwrite";

const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (!endpoint) {
    throw new Error("APPWRITE_ENDPOINT is not defined");
}

if (!projectId) {
    throw new Error("APPWRITE_PROJECT_ID is not defined");
}

if (!apiKey) {
    throw new Error("APPWRITE_API_KEY is not defined");
}

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

export const tablesDB = new TablesDB(client);

export const APPWRITE_DATABASE_ID =
    process.env.APPWRITE_DATABASE_ID!;

export const APPWRITE_ACTIVITIES_TABLE_ID =
    process.env.APPWRITE_ACTIVITIES_TABLE_ID!;