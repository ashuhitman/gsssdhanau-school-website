export type ContentStatus = "draft" | "published";

export type NewsActivityCategory =
    | "event"
    | "activity"
    | "sports"
    | "achievement"
    | "academic";

export type NoticeCategory =
    | "academic"
    | "examination"
    | "admission"
    | "holiday"
    | "general"
    | "announcement";

export interface Article {
    $id: string;
    $createdAt: string;
    $updatedAt: string;

    title: string;
    excerpt?: string;
    content: string;

    authorBy?: string;
    authorAt?: string;

    date: string;
    image?: string;

    featured: boolean;

    status: ContentStatus;

    publishedAt?: string;
    publishedBy?: string;
}

export interface NewsActivity {
    $id: string;
    $createdAt: string;
    $updatedAt: string;

    title: string;
    description?: string;

    date: string;
    category: NewsActivityCategory;

    image?: string;

    status: ContentStatus;

    publishedAt?: string;
    publishedBy?: string;
}

export interface Notice {
    $id: string;
    $createdAt: string;
    $updatedAt: string;

    title: string;
    description?: string;

    date: string;
    category: NoticeCategory;

    status: ContentStatus;

    publishedAt?: string;
    publishedBy?: string;
}

export interface Newsletter {
    $id: string;
    $createdAt: string;
    $updatedAt: string;

    title: string;
    issue: string;

    month: number;
    year: number;

    description?: string;
    coverImage?: string;

    status: ContentStatus;

    publishedAt?: string;
    publishedBy?: string;
}