export const ARTICLE_STATUS = {
    DRAFT: "draft",
    PUBLISHED: "published",
} as const;

export type ArticleStatus =
    (typeof ARTICLE_STATUS)[keyof typeof ARTICLE_STATUS];

export const ARTICLE_TYPE = {
    STORY: "story",
    OPINION: "opinion",
    EXPERIENCE: "experience",
    GUIDE: "guide",
    REFLECTION: "reflection",
    ACHIEVEMENT: "achievement",
    REPORT: "report",
} as const;

export type ArticleType =
    (typeof ARTICLE_TYPE)[keyof typeof ARTICLE_TYPE];

export const ARTICLE_CATEGORY = {
    ACADEMIC: "academic",
    STUDENT_LIFE: "student-life",
    SCHOOL_LIFE: "school-life",
    SPORTS: "sports",
    EDUCATION: "education",
    VALUES: "values",
    INSPIRATION: "inspiration",
    CREATIVITY: "creativity",
    COMMUNITY: "community",
} as const;

export type ArticleCategory =
    (typeof ARTICLE_CATEGORY)[keyof typeof ARTICLE_CATEGORY];