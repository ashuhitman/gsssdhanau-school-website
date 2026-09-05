import type { Article } from "@/lib/data/article/types";
import type { Activity } from "@/lib/data/activity/types";
import type { NewsletterStatus } from "./constants";
import { NewsletterMember } from "../clubMember/types";
import { Faculty } from "../faculty/types";

export interface Newsletter {
    id: string;
    createdAt: string;
    updatedAt: string;

    title: string;
    month: number;
    year: number;
    issue: number;

    description: string | null;
    coverImage: string | null;
    pdfUrl: string | null;

    status: NewsletterStatus;
    volume: string | null;
    publishedAt: string | null;
    slug: string;
}

export interface NewsletterFaculty extends Faculty {

}



export interface NewsletterWithContent extends Newsletter {
    incharge: NewsletterFaculty | null;
    digitalCoordinator: NewsletterFaculty | null;
    newsletterMembers: NewsletterMember[];
    articles: Article[];
    activities: Activity[];
}

export interface CreateNewsletterData {
    title: string;
    month: number;
    year: number;
    issue: number;

    description?: string | null;
    coverImage?: string | null;
    pdfUrl?: string | null;

    status: NewsletterStatus;
    volume?: string | null;
    publishedAt?: string | null;
    slug: string;

    incharge?: string | null;
    digitalCoordinator?: string | null;

    newsletterMembers?: string[];
    articles?: string[];
    activities?: string[];
}

export interface UpdateNewsletterData {
    title?: string;
    month?: number;
    year?: number;
    issue?: number;

    description?: string | null;
    coverImage?: string | null;
    pdfUrl?: string | null;

    status?: NewsletterStatus;
    volume?: string | null;
    publishedAt?: string | null;
    slug?: string;

    incharge?: string | null;
    digitalCoordinator?: string | null;

    newsletterMembers?: string[];
    articles?: string[];
    activities?: string[];
}