import type {
    ArticleCategory,
    ArticleStatus,
    ArticleType,
} from "./constants";

export interface Article {
    id: string;
    createdAt: string;
    updatedAt: string;

    title: string;
    slug: string;

    excerpt: string | null;
    content: string | null;

    authorBy: string | null;

    image: string | null;

    featured: boolean;

    status: ArticleStatus;

    publishedAt: string | null;
    publishedBy: string | null;

    category: ArticleCategory[];
    articleType: ArticleType | null;
}