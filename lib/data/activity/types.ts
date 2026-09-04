import type {
    ActivityCategory,
    ActivityStatus,
    ActivityType,
    ParticipantType,
} from "./constants";

export interface Activity {
    id: string;
    createdAt: string;
    updatedAt: string;

    title: string;
    slug: string;

    description: string | null;
    activityDate: string;

    status: ActivityStatus;
    publishedAt: string | null;
    publishedBy: string | null;

    participantName: string | null;
    participantType: ParticipantType | null;

    excerpt: string | null;
    image: string | null;

    activityType: ActivityType;
    category: ActivityCategory[];
}