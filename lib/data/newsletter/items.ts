import { ID, Query } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTER_ITEM_TABLE_ID,
} from "@/lib/appwrite/server";

import {
    NEWSLETTER_ITEM_TYPE,
    type NewsletterItemType,
} from "./constants";

import type { NewsletterItem } from "./types";

function mapNewsletterItem(
    row: Record<string, unknown>,
): NewsletterItem {
    return {
        id: row.$id as string,
        createdAt: row.$createdAt as string,
        updatedAt: row.$updatedAt as string,

        newsletterId: row.newsletterId as string,
        type: row.type as NewsletterItemType,
        contentId: row.contentId as string,
        sortOrder: row.sortOrder as number,
        isFeatured: row.isFeatured as boolean,
    };
}

export async function getNewsletterItems(
    newsletterId: string,
): Promise<NewsletterItem[]> {
    const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTER_ITEM_TABLE_ID,
        queries: [
            Query.equal("newsletterId", newsletterId),
            Query.orderAsc("sortOrder"),
        ],
    });

    return response.rows.map((row) =>
        mapNewsletterItem(
            row as unknown as Record<string, unknown>,
        ),
    );
}

export async function getNewsletterItemById(
    id: string,
): Promise<NewsletterItem | null> {
    try {
        const row = await tablesDB.getRow({
            databaseId: DATABASE_ID,
            tableId: NEWSLETTER_ITEM_TABLE_ID,
            rowId: id,
        });

        return mapNewsletterItem(
            row as unknown as Record<string, unknown>,
        );
    } catch {
        return null;
    }
}

export interface CreateNewsletterItemData {
    newsletterId: string;
    type: NewsletterItemType;
    contentId: string;
    sortOrder: number;
    isFeatured?: boolean;
}

export async function createNewsletterItem(
    data: CreateNewsletterItemData,
): Promise<NewsletterItem> {
    const row = await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTER_ITEM_TABLE_ID,
        rowId: ID.unique(),
        data: {
            newsletterId: data.newsletterId,
            type: data.type,
            contentId: data.contentId,
            sortOrder: data.sortOrder,
            isFeatured: data.isFeatured ?? true,
        },
    });

    return mapNewsletterItem(
        row as unknown as Record<string, unknown>,
    );
}

export async function addArticleToNewsletter(
    newsletterId: string,
    articleId: string,
    sortOrder: number,
): Promise<NewsletterItem> {
    return createNewsletterItem({
        newsletterId,
        type: NEWSLETTER_ITEM_TYPE.ARTICLE,
        contentId: articleId,
        sortOrder,
    });
}

export async function addActivityToNewsletter(
    newsletterId: string,
    activityId: string,
    sortOrder: number,
): Promise<NewsletterItem> {
    return createNewsletterItem({
        newsletterId,
        type: NEWSLETTER_ITEM_TYPE.ACTIVITY,
        contentId: activityId,
        sortOrder,
    });
}

export interface UpdateNewsletterItemData {
    sortOrder?: number;
    isFeatured?: boolean;
}

export async function updateNewsletterItem(
    id: string,
    data: UpdateNewsletterItemData,
): Promise<NewsletterItem> {
    const row = await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTER_ITEM_TABLE_ID,
        rowId: id,
        data,
    });

    return mapNewsletterItem(
        row as unknown as Record<string, unknown>,
    );
}

export async function deleteNewsletterItem(
    id: string,
): Promise<void> {
    await tablesDB.deleteRow({
        databaseId: DATABASE_ID,
        tableId: NEWSLETTER_ITEM_TABLE_ID,
        rowId: id,
    });
}

export async function getNewsletterItemCounts(
    newsletterId: string,
) {
    const [articles, activities] = await Promise.all([
        tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: NEWSLETTER_ITEM_TABLE_ID,
            queries: [
                Query.equal("newsletterId", newsletterId),
                Query.equal(
                    "type",
                    NEWSLETTER_ITEM_TYPE.ARTICLE,
                ),
                Query.limit(1),
            ],
        }),

        tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: NEWSLETTER_ITEM_TABLE_ID,
            queries: [
                Query.equal("newsletterId", newsletterId),
                Query.equal(
                    "type",
                    NEWSLETTER_ITEM_TYPE.ACTIVITY,
                ),
                Query.limit(1),
            ],
        }),
    ]);

    return {
        articleCount: articles.total,
        activityCount: activities.total,
    };
}