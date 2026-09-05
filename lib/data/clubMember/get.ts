import { Query } from "node-appwrite";

import {
    DATABASE_ID,
    NEWSLETTER_MEMBERS_TABLE_ID,
    tablesDB,
} from "@/lib/appwrite/server";

import type { NewsletterMember } from "./types";

function mapNewsletterMember(
    row: Record<string, unknown>
): NewsletterMember {
    return {
        id: String(row.$id),
        createdAt: String(row.$createdAt),
        updatedAt: String(row.$updatedAt),

        name:
            typeof row.name === "string"
                ? row.name
                : null,

        role:
            typeof row.role === "string"
                ? row.role
                : null,

        image:
            typeof row.image === "string"
                ? row.image
                : null,

        sortOrder: Number(row.sortOrder ?? 0),

        class:
            row.class !== null &&
                row.class !== undefined
                ? Number(row.class)
                : null,

        section:
            typeof row.section === "string"
                ? row.section
                : null,
    };
}

export async function getNewsletterMembers(): Promise<
    NewsletterMember[]
> {
    const result = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTER_MEMBERS_TABLE_ID,
        queries: [
            Query.orderAsc("sortOrder"),
        ],
    });

    return result.rows.map((row) =>
        mapNewsletterMember(
            row as unknown as Record<string, unknown>
        )
    );
}

export async function getNewsletterMemberById(
    id: string
): Promise<NewsletterMember | null> {
    try {
        const row = await tablesDB.getRow({
            databaseId: DATABASE_ID,
            tableId: NEWSLETTER_MEMBERS_TABLE_ID,
            rowId: id,
        });

        return mapNewsletterMember(
            row as unknown as Record<string, unknown>
        );
    } catch {
        return null;
    }
}