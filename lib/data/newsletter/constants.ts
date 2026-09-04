export const NEWSLETTER_STATUS = {
    DRAFT: "draft",
    PUBLISHED: "published",
} as const;

export type NewsletterStatus =
    (typeof NEWSLETTER_STATUS)[keyof typeof NEWSLETTER_STATUS];