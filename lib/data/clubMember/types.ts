import type {
    NewsletterMemberType,
} from "./constants";

export interface NewsletterClubMember {
    id: string;
    createdAt: string;
    updatedAt: string;

    name: string | null;
    role: string | null;
    memberType: NewsletterMemberType;
    image: string | null;
    sortOrder: number;

    facultyId: string | null;
    designation: string | null;

    class: number | null;
    section: string | null;
}