import {
    type ArticleCategory,
    type ArticleImageType,
    type ArticleStatus,
    type ArticleTag,
} from "./constants";

export interface ArticleImage {
    value: string;
    type: ArticleImageType;
    fileId: string | null;
}

export interface Article {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    authorBy: string | null;
    image: ArticleImage | null;
    featured: boolean;
    status: ArticleStatus;
    publishedAt: string | null;
    publishedBy: string | null;
    category: ArticleCategory | null;
    articleTags: ArticleTag[];
}