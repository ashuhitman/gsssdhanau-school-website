export const FACULTY_GENDER = {
    MALE: "male",
    FEMALE: "female",
} as const;

export type FacultyGender =
    (typeof FACULTY_GENDER)[keyof typeof FACULTY_GENDER];

export const FACULTY_STATUS = {
    DRAFT: "draft",
    PUBLISHED: "published",
} as const;

export type FacultyStatus =
    (typeof FACULTY_STATUS)[keyof typeof FACULTY_STATUS];

export const FACULTY_CATEGORY = {
    PRINCIPAL: "principal",
    LECTURER: "lecturer",
    TEACHER: "teacher",
    LAB_ATTENDANT: "lab-attendant",
    UDC: "udc",
    VT: "vt",
    OTHER: "other",
    BCI: "bci",
} as const;

export type FacultyCategory =
    (typeof FACULTY_CATEGORY)[keyof typeof FACULTY_CATEGORY];