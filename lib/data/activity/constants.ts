export const ACTIVITY_STATUS = {
    DRAFT: "draft",
    PUBLISHED: "published",
} as const;

export type ActivityStatus =
    (typeof ACTIVITY_STATUS)[keyof typeof ACTIVITY_STATUS];

export const ACTIVITY_TYPE = {
    EVENT: "event",
    ACTIVITY: "activity",
    ACHIEVEMENT: "achievement",
    COMPETITION: "competition",
} as const;

export type ActivityType =
    (typeof ACTIVITY_TYPE)[keyof typeof ACTIVITY_TYPE];

export const PARTICIPANT_TYPE = {
    STUDENT: "student",
    TEACHER: "teacher",
    TEAM: "team",
    SCHOOL: "school",
} as const;

export type ParticipantType =
    (typeof PARTICIPANT_TYPE)[keyof typeof PARTICIPANT_TYPE];

export const ACTIVITY_CATEGORY = {
    SPORTS: "sports",
    ACADEMIC: "academic",
    CULTURAL: "cultural",
    SOCIAL: "social",
} as const;

export type ActivityCategory =
    (typeof ACTIVITY_CATEGORY)[keyof typeof ACTIVITY_CATEGORY];