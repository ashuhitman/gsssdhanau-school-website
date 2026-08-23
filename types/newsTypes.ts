export type NewsCategory =
    | "Events"
    | "Activities"
    | "Sports"
    | "Achievements"
    | "Academic";

export type CategoryIcon =
    | "grid"
    | "calendar"
    | "activities"
    | "sports"
    | "achievement"
    | "academic";

export interface NewsActivity {
    id: string;
    title: string;
    description: string;
    date: string;
    category: NewsCategory;
    image: string;
    href?: string;
}

export interface NewsCategoryOption {
    label: string;
    value: NewsCategory | "All";
    count: number;
    icon: CategoryIcon;
}