import type {
    NewsletterItemType,
    NewsletterStatus,
} from "./constants";

export interface Newsletter {
    id: string;
    createdAt: string;
    updatedAt: string;

    title: string;
    month: number;
    year: number;
    issue: number;
    description: string | null;
    coverImage: string | null;
    pdfUrl: string | null;
    status: NewsletterStatus;
    volume: string | null;
    publishedAt: string | null;
    slug: string;
}

export interface NewsletterItem {
    id: string;
    createdAt: string;
    updatedAt: string;

    newsletterId: string;
    type: NewsletterItemType;
    contentId: string;
    sortOrder: number;
    isFeatured: boolean;
}