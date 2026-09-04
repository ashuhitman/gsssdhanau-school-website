import { notFound } from "next/navigation";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import {
    getActivityBySlug,
    getPublishedActivities,
    getRelatedActivities,
} from "@/lib/data/activity/get";

import RelatedActivitiesSidebar from "@/components/activity/RelatedActivitiesSidebar";
import ContentDetails from "@/components/content/ContentDetails";

/* ============================================================
   Page Props
============================================================ */

interface ActivityPageProps {
    params: Promise<{
        slug: string;
    }>;
}

/* ============================================================
   Static Params
============================================================ */

export async function generateStaticParams() {
    const activities = await getPublishedActivities();

    const params = activities.map((activity) => ({
        slug: activity.slug,
    }));

    console.log("=== STATIC ACTIVITY PATHS ===");

    params.forEach(({ slug }) => {
        console.log(`/activities/${slug}`);
    });

    console.log("=== TOTAL:", params.length, "===");

    return params;
}

/* ============================================================
   Activity Page
============================================================ */

export default async function ActivityPage({
    params,
}: ActivityPageProps) {
    const { slug } = await params;

    const decodedSlug = decodeURIComponent(slug);

    console.log("ACTIVITY SLUG:", decodedSlug);

    /* ========================================================
       Activity
    ======================================================== */

    const activity =
        await getActivityBySlug(decodedSlug);

    if (!activity) {
        notFound();
    }

    /* ========================================================
       Related Activities
    ======================================================== */

    const relatedActivities =
        await getRelatedActivities(
            activity.activityType,
            activity.id
        );

    const hasRelatedActivities =
        relatedActivities.length > 0;

    return (
        <main
            className="
                min-h-screen
                bg-background
            "
        >
            <div
                className="
                    mx-auto
                    max-w-6xl
                    px-4
                    py-7
                    sm:px-6
                    sm:py-9
                    lg:px-8
                "
            >
                {/* ==================================================
                    Back
                ================================================== */}

                <Link
                    href="/activities"
                    className="
                        group
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-muted
                        transition-colors
                        hover:text-heading
                    "
                >
                    <span
                        className="
                            flex
                            size-7
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-border
                            bg-card
                            transition-colors
                            group-hover:bg-surface
                        "
                    >
                        <ArrowLeft className="size-3.5" />
                    </span>

                    All activities
                </Link>

                {/* ==================================================
                    Main Content + Sidebar
                ================================================== */}

                <div
                    className={`
                        mt-5
                        grid
                        items-start
                        gap-6
                        ${hasRelatedActivities
                            ? `
                                    lg:grid-cols-[minmax(0,1fr)_18.75rem]
                                    xl:grid-cols-[minmax(0,1fr)_20rem]
                                `
                            : `
                                    lg:grid-cols-[minmax(0,1fr)_18.75rem]
                                    xl:grid-cols-[minmax(0,1fr)_20rem]
                                `
                        }
                    `}
                >
                    {/* ==================================================
                        Activity Details
                    ================================================== */}

                    <article
                        className={`
                            overflow-hidden
                            rounded-xl
                            border
                            border-border
                            bg-card
                            shadow-school-card
                            ${!hasRelatedActivities
                                ? "lg:col-start-1 lg:col-end-3 lg:mx-auto lg:w-full lg:max-w-[calc(100%-20rem-1.5rem)]"
                                : ""
                            }
                        `}
                    >
                        <ContentDetails
                            title={activity.title}
                            image={activity.image}
                            imageAlt={activity.title}
                            contentType={
                                activity.activityType
                            }
                            category={activity.category}
                            excerpt={
                                activity.excerpt ??
                                undefined
                            }
                            content={
                                activity.description ??
                                undefined
                            }
                            date={activity.activityDate}
                            publishedAt={
                                activity.publishedAt ??
                                undefined
                            }
                            publishedBy={
                                activity.publishedBy ??
                                undefined
                            }
                            footerLabel="School Activity"
                            fallbackImage="/images/activity/default-featured.jpeg"
                        />
                    </article>

                    {/* ==================================================
                        Related Activities
                    ================================================== */}

                    {hasRelatedActivities && (
                        <RelatedActivitiesSidebar
                            activities={relatedActivities}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}