import type {
    ActivityCategory,
    ActivityImageType,
    ActivityStatus,
    ActivityTags,
    ParticipantType,
} from "./constants";

export interface ActivityImage {
    value: string;
    type: ActivityImageType;
    fileId: string | null;
}

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

    image: ActivityImage | null;

    category: ActivityCategory;
    activityTags: ActivityTags[];
}