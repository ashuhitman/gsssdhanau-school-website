export const NEWSLETTER_MEMBER_TYPE = {
    TEACHER: "teacher",
    STUDENT: "student",
} as const;

export type NewsletterMemberType =
    (typeof NEWSLETTER_MEMBER_TYPE)[keyof typeof NEWSLETTER_MEMBER_TYPE];