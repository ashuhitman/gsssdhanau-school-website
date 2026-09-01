import { Client, Storage, TablesDB } from "node-appwrite";

const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (!endpoint) {
    throw new Error("Missing APPWRITE_ENDPOINT");
}

if (!projectId) {
    throw new Error("Missing APPWRITE_PROJECT_ID");
}

if (!apiKey) {
    throw new Error("Missing APPWRITE_API_KEY");
}

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

export const tablesDB = new TablesDB(client);

export const storage = new Storage(client);

export const DATABASE_ID =
    process.env.APPWRITE_DATABASE_ID!;

export const FACULTIES_TABLE_ID =
    process.env.APPWRITE_FACULTIES_TABLE_ID!;

export const APPWRITE_BUCKET_ID =
    process.env.APPWRITE_FACULTY_IMAGES_BUCKET_ID!;

export const ACTIVITIES_TABLE_ID =
    process.env.APPWRITE_ACTIVITIES_TABLE_ID!;

export const ARTICLES_TABLE_ID =
    process.env.APPWRITE_ARTICLES_TABLE_ID!;

export const NOTICES_TABLE_ID =
    process.env.APPWRITE_NOTICES_TABLE_ID!;

export const NEWSLETTERS_TABLE_ID =
    process.env.APPWRITE_NEWSLETTERS_TABLE_ID!;

export const NEWSLETTER_MEMBERS_TABLE_ID =
    process.env.APPWRITE_NEWSLETTER_MEMBERS_TABLE_ID!;

export const NEWSLETTER_ITEM_TABLE_ID =
    process.env.APPWRITE_NEWSLETTER_ITEMS_TABLE_ID!;

if (!DATABASE_ID) {
    throw new Error(
        "Missing APPWRITE_DATABASE_ID"
    );
}

if (!FACULTIES_TABLE_ID) {
    throw new Error(
        "Missing APPWRITE_FACULTIES_TABLE_ID"
    );
}

if (!ACTIVITIES_TABLE_ID) {
    throw new Error(
        "Missing APPWRITE_ACTIVITIES_TABLE_ID"
    );
}

if (!APPWRITE_BUCKET_ID) {
    throw new Error(
        "Missing APPWRITE_FACULTY_IMAGES_BUCKET_ID"
    );
}

if (!NEWSLETTERS_TABLE_ID) {
    throw new Error(
        "Missing APPWRITE_NEWSLETTERS_TABLE_ID"
    );
}

if (!NEWSLETTER_MEMBERS_TABLE_ID) {
    throw new Error(
        "Missing APPWRITE_NEWSLETTER_MEMBERS_TABLE_ID "
    );
}

if (!NEWSLETTER_ITEM_TABLE_ID) {
    throw new Error(
        "Missing APPWRITE_NEWSLETTER_ITEMS_TABLE_ID "
    );
}