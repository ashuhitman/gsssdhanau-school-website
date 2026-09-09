import {
    ARTICLES_TABLE_ID,
    DATABASE_ID,
    tablesDB,
} from "@/lib/appwrite/server";
import { ArticleImage } from "./types";
import { ArticleCategory, ArticleStatus, ArticleTag } from "./constants";



export interface CreateArticleData {
    title: string;
    slug: string;
    excerpt?: string | null;
    content?: string | null;
    authorBy?: string | null;
    image?: ArticleImage | null;
    featured?: boolean;
    status: ArticleStatus;
    publishedAt?: string | null;
    publishedBy?: string | null;
    category?: ArticleCategory | null;
    articleTags?: ArticleTag[] | null;
}

export async function createArticle(
    data: CreateArticleData
) {
    return tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: ARTICLES_TABLE_ID,
        rowId: "unique()",
        data: {
            title: data.title.trim(),

            slug: data.slug.trim(),

            excerpt:
                data.excerpt?.trim() || null,

            content:
                data.content ?? null,

            authorBy:
                data.authorBy?.trim() || null,

            // Appwrite still stores these as
            // separate fields.
            image:
                data.image?.type === "appwrite"
                    ? data.image.fileId
                    : data.image?.value || null,

            imageType:
                data.image?.type ?? null,

            featured:
                data.featured ?? false,

            status:
                data.status,

            publishedAt:
                data.publishedAt ?? null,

            publishedBy:
                data.publishedBy?.trim() || null,

            category:
                data.category ?? null,

            articleTags:
                data.articleTags ?? [],
        },
    });
}