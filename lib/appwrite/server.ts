import {
    Account,
    Client,
    Storage,
    TablesDB,
} from "node-appwrite";

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

const APPWRITE_ENDPOINT: string = endpoint;
const APPWRITE_PROJECT_ID: string = projectId;
const APPWRITE_API_KEY: string = apiKey;

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

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

export const SESSION_COOKIE = "school-admin-session";

if (!DATABASE_ID) {
    throw new Error("Missing APPWRITE_DATABASE_ID");
}

if (!FACULTIES_TABLE_ID) {
    throw new Error("Missing APPWRITE_FACULTIES_TABLE_ID");
}

if (!APPWRITE_BUCKET_ID) {
    throw new Error(
        "Missing APPWRITE_FACULTY_IMAGES_BUCKET_ID"
    );
}

if (!ACTIVITIES_TABLE_ID) {
    throw new Error(
        "Missing APPWRITE_ACTIVITIES_TABLE_ID"
    );
}

if (!ARTICLES_TABLE_ID) {
    throw new Error(
        "Missing APPWRITE_ARTICLES_TABLE_ID"
    );
}

if (!NOTICES_TABLE_ID) {
    throw new Error(
        "Missing APPWRITE_NOTICES_TABLE_ID"
    );
}

if (!NEWSLETTERS_TABLE_ID) {
    throw new Error(
        "Missing APPWRITE_NEWSLETTERS_TABLE_ID"
    );
}

if (!NEWSLETTER_MEMBERS_TABLE_ID) {
    throw new Error(
        "Missing APPWRITE_NEWSLETTER_MEMBERS_TABLE_ID"
    );
}

export function createAccountClient(session: string) {
    const sessionClient = new Client()
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)
        .setSession(session);

    return new Account(sessionClient);
}

export function createAdminAccountClient() {
    return new Account(client);
}