export interface NewsletterMember {
    id: string;
    createdAt: string;
    updatedAt: string;

    name: string | null;
    role: string | null;
    image: string | null;

    sortOrder: number;

    class: number | null;
    section: string | null;
}

export interface CreateNewsletterMemberData {
    name?: string | null;
    role?: string | null;
    image?: string | null;

    sortOrder: number;

    class?: number | null;
    section?: string | null;

    newsletters?: string[];
}

export interface UpdateNewsletterMemberData {
    name?: string | null;
    role?: string | null;
    image?: string | null;

    sortOrder?: number;

    class?: number | null;
    section?: string | null;

    newsletters?: string[];
}