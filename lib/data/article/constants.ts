export const ARTICLE_IMAGE_TYPE = {
    APPWRITE: "appwrite",
    URL: "url",
} as const;

export type ArticleImageType =
    (typeof ARTICLE_IMAGE_TYPE)[keyof typeof ARTICLE_IMAGE_TYPE];

export const ARTICLE_STATUS = {
    DRAFT: "draft",
    PUBLISHED: "published",
} as const;

export type ArticleStatus =
    (typeof ARTICLE_STATUS)[keyof typeof ARTICLE_STATUS];

export const ARTICLE_CATEGORY = {
    STORY: "story",
    OPINION: "opinion",
    EXPERIENCE: "experience",
    GUIDE: "guide",
    REFLECTION: "reflection",
    ACHIEVEMENT: "achievement",
    REPORT: "report",
} as const;

export type ArticleCategory =
    (typeof ARTICLE_CATEGORY)[keyof typeof ARTICLE_CATEGORY];

export const ARTICLE_TAGS = {
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

export type ArticleTag =
    (typeof ARTICLE_TAGS)[keyof typeof ARTICLE_TAGS];