
import { ID } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTERS_TABLE_ID,
} from "@/lib/appwrite/server";

import {
    NEWSLETTER_STATUS,
    type NewsletterStatus,
} from "./constants";

export interface CreateNewsletterData {
    title: string;
    month: number;
    year: number;
    issue: number;
    description?: string | null;
    coverImage?: string | null;
    pdfUrl?: string | null;
    status?: NewsletterStatus;
    volume?: string | null;
    publishedAt?: string | null;
    slug: string;
}

export async function createNewsletter(
    data: CreateNewsletterData,
) {
    return tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTERS_TABLE_ID,
        rowId: ID.unique(),
        data: {
            title: data.title,
            month: data.month,
            year: data.year,
            issue: data.issue,
            description: data.description ?? null,
            coverImage: data.coverImage ?? null,
            pdfUrl: data.pdfUrl ?? null,
            status: data.status ?? NEWSLETTER_STATUS.PUBLISHED,
            volume: data.volume ?? null,
            publishedAt: data.publishedAt ?? null,
            slug: data.slug,
        },
    });
}

