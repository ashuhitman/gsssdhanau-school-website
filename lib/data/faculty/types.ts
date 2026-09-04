import type {
    FacultyCategory,
    FacultyGender,
    FacultyStatus,
} from "./constants";

export interface Faculty {
    id: string;
    createdAt: string;
    updatedAt: string;

    employeeId: string | null;

    name: string;
    gender: FacultyGender;
    designation: string;

    subjects: string[];
    qualifications: string[];

    profileImage: string | null;
    bio: string | null;

    displayOrder: number;

    email: string | null;
    phone: string | null;

    firstJoiningDate: string | null;
    currentPostJoiningDate: string | null;
    currentSchoolJoiningDate: string | null;

    status: FacultyStatus;

    message: string | null;
    prefix: string | null;

    category: FacultyCategory;
}