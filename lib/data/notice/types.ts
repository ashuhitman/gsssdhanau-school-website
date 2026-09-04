import type {
    NoticeCategory,
    NoticeStatus,
} from "./constants";

export interface Notice {
    id: string;
    createdAt: string;
    updatedAt: string;

    title: string;
    excerpt: string | null;
    description: string | null;
    noticeDate: string;

    category: NoticeCategory;
    attachment: string | null;

    status: NoticeStatus;
    publishedAt: string | null;
    publishedBy: string | null;
}