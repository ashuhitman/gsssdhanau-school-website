import { notFound } from "next/navigation";

import {
    ArrowLeft,
} from "lucide-react";

import Link from "next/link";

import {
    getActivityById,
    getRelatedActivities,
} from "@/lib/data/activity";

import ActivityDetails from "@/components/activity/AcitivityDetails";

import RelatedActivitiesSidebar from "@/components/activity/RelatedActivitiesSidebar";

/* ============================================================
   Page Props
============================================================ */

interface ActivityPageProps {
    params: Promise<{
        id: string;
    }>;
}

/* ============================================================
   Activity Page
============================================================ */

export default async function ActivityPage({
    params,
}: ActivityPageProps) {
    const { id } = await params;

    const activity =
        await getActivityById(id);

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

    return (
        <main
            className="
                min-h-screen
                bg-slate-50
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
                        text-slate-500
                        transition-colors
                        hover:text-slate-950
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
                            border-slate-200
                            bg-white
                            transition-colors
                            group-hover:bg-slate-100
                        "
                    >
                        <ArrowLeft
                            className="
                                size-3.5
                            "
                        />
                    </span>

                    All activities
                </Link>

                {/* ==================================================
                    Main Content + Sidebar
                ================================================== */}

                <div
                    className="
                        mt-5
                        grid
                        items-start
                        gap-6
                        lg:grid-cols-[minmax(0,1fr)_300px]
                        xl:grid-cols-[minmax(0,1fr)_320px]
                    "
                >
                    {/* ==================================================
                        Activity Details
                    ================================================== */}

                    <article
                        className="
                            overflow-hidden
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                        "
                    >
                        <ActivityDetails
                            activity={
                                activity
                            }
                        />
                    </article>

                    {/* ==================================================
                        Related Activities
                    ================================================== */}

                    <RelatedActivitiesSidebar
                        activities={
                            relatedActivities
                        }
                    />
                </div>
            </div>
        </main>
    );
}