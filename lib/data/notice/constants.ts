export const NOTICE_CATEGORY = {
    ACADEMIC: "academic",
    EXAMINATION: "examination",
    ADMISSION: "admission",
    HOLIDAY: "holiday",
    GENERAL: "general",
    ANNOUNCEMENT: "announcement",
} as const;

export type NoticeCategory =
    (typeof NOTICE_CATEGORY)[keyof typeof NOTICE_CATEGORY];

export const NOTICE_STATUS = {
    DRAFT: "draft",
    PUBLISHED: "published",
} as const;

export type NoticeStatus =
    (typeof NOTICE_STATUS)[keyof typeof NOTICE_STATUS];