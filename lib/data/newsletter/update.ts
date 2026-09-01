import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTERS_TABLE_ID,
} from "@/lib/appwrite/server";

import {
    NEWSLETTER_STATUS,
    type NewsletterStatus,
} from "./constants";

export interface UpdateNewsletterData {
    title?: string;
    month?: number;
    year?: number;
    issue?: number;
    description?: string | null;
    coverImage?: string | null;
    pdfUrl?: string | null;
    status?: NewsletterStatus;
    volume?: string | null;
    publishedAt?: string | null;
    slug?: string;
}

export async function updateNewsletter(
    id: string,
    data: UpdateNewsletterData,
) {
    return tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTERS_TABLE_ID,
        rowId: id,
        data,
    });
}

export async function publishNewsletter(id: string) {
    return updateNewsletter(id, {
        status: NEWSLETTER_STATUS.PUBLISHED,
        publishedAt: new Date().toISOString(),
    });
}

export async function unpublishNewsletter(id: string) {
    return updateNewsletter(id, {
        status: NEWSLETTER_STATUS.DRAFT,
        publishedAt: null,
    });
}