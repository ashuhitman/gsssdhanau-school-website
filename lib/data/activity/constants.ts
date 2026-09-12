export const ACTIVITY_IMAGE_TYPE = {
    URL: "url",
    APPWRITE: "appwrite",
} as const;

export type ActivityImageType =
    (typeof ACTIVITY_IMAGE_TYPE)[keyof typeof ACTIVITY_IMAGE_TYPE];


/* ============================================================
   Activity Status
============================================================ */

export const ACTIVITY_STATUS = {
    DRAFT: "draft",
    PUBLISHED: "published",
} as const;

export type ActivityStatus =
    (typeof ACTIVITY_STATUS)[keyof typeof ACTIVITY_STATUS];


/* ============================================================
   Activity Category
============================================================ */

export const ACTIVITY_CATEGORY = {
    EVENT: "event",
    ACTIVITY: "activity",
    ACHIEVEMENT: "achievement",
    COMPETITION: "competition",
} as const;

export type ActivityCategory =
    (typeof ACTIVITY_CATEGORY)[keyof typeof ACTIVITY_CATEGORY];


/* ============================================================
   Participant Type
============================================================ */

export const PARTICIPANT_TYPE = {
    STUDENT: "student",
    TEACHER: "teacher",
    TEAM: "team",
    SCHOOL: "school",
} as const;

export type ParticipantType =
    (typeof PARTICIPANT_TYPE)[keyof typeof PARTICIPANT_TYPE];


/* ============================================================
   Activity Tags
============================================================ */

export const ACTIVITY_TAGS = {
    SPORTS: "sports",
    ACADEMIC: "academic",
    CULTURAL: "cultural",
    SOCIAL: "social",
} as const;

export type ActivityTags =
    (typeof ACTIVITY_TAGS)[keyof typeof ACTIVITY_TAGS];