
export const NEWSLETTER_STATUS = {
    DRAFT: "draft",
    PUBLISHED: "published",
} as const;

export type NewsletterStatus =
    (typeof NEWSLETTER_STATUS)[keyof typeof NEWSLETTER_STATUS];

export const NEWSLETTER_ITEM_TYPE = {
    ACTIVITY: "activity",
    ARTICLE: "article",
} as const;

export type NewsletterItemType =
    (typeof NEWSLETTER_ITEM_TYPE)[keyof typeof NEWSLETTER_ITEM_TYPE];

