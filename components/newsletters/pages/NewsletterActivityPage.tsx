import ContentDetails from "@/components/content/ContentDetails";

import type { Activity } from "@/lib/data/activity/types";

/* ============================================================
   Props
============================================================ */

interface NewsletterActivityPageProps {
    activity: Activity;
}

/* ============================================================
   Newsletter Activity Page
============================================================ */

export function NewsletterActivityPage({
    activity,
}: NewsletterActivityPageProps) {
    return (
        <div
            className="
                relative
                mx-auto
                w-full
                rounded-[0.25rem]
                bg-white
                shadow-[0_0.5rem_1.25rem_rgba(0,0,0,0.14),0_0.15rem_0.35rem_rgba(0,0,0,0.08)]
            "
        >
            <ContentDetails
                title={activity.title}
                image={activity.image}
                imageAlt={activity.title}
                contentType={activity.activityType}
                category={activity.category}
                excerpt={activity.excerpt ?? undefined}
                content={activity.description}
                date={activity.activityDate}
                publishedAt={activity.publishedAt ?? undefined}
                publishedBy={activity.publishedBy ?? undefined}
                footerLabel="Activity"
                fallbackImage="/images/activities/default-card.jpeg"
            />
        </div>
    );
}