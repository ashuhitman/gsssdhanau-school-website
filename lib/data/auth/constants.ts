export const USER_ROLE = {
    ADMIN: "admin",
    FACULTY: "faculty",
    NEWSLETTER_INCHARGE: "newsletter_incharge",
    STUDENT: "student",
} as const;

export type UserRole =
    (typeof USER_ROLE)[keyof typeof USER_ROLE];