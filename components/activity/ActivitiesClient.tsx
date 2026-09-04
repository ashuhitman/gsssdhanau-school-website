"use client";

import { useMemo, useState } from "react";

import type { Activity } from "@/lib/data/activity/types";
import {
    ACTIVITY_CATEGORY,
    ACTIVITY_TYPE,
} from "@/lib/data/activity/constants";

import FeaturedActivityCard from "./FeaturedActivityCard";
import ActivityCard from "./ActivityCard";

/* ============================================================
   Filter
============================================================ */

type ActivityFilter =
    | "all"
    | "event"
    | "activity"
    | "sports"
    | "achievement"
    | "academic";

/* ============================================================
   Filters
============================================================ */

const filters: {
    value: ActivityFilter;
    label: string;
}[] = [
        {
            value: "all",
            label: "All",
        },
        {
            value: ACTIVITY_TYPE.EVENT,
            label: "Events",
        },
        {
            value: ACTIVITY_TYPE.ACTIVITY,
            label: "Activities",
        },
        {
            value: ACTIVITY_CATEGORY.SPORTS,
            label: "Sports",
        },
        {
            value: ACTIVITY_TYPE.ACHIEVEMENT,
            label: "Achievements",
        },
        {
            value: ACTIVITY_CATEGORY.ACADEMIC,
            label: "Academic",
        },
    ];

/* ============================================================
   Activities Client
============================================================ */

export default function ActivitiesClient({
    activities,
}: {
    activities: Activity[];
}) {
    const [activeFilter, setActiveFilter] =
        useState<ActivityFilter>("all");

    /* ========================================================
       Filter Activities
    ======================================================== */

    const filteredActivities = useMemo(() => {
        if (activeFilter === "all") {
            return activities;
        }

        return activities.filter((activity) => {
            /*
             * Activity type filters
             */

            if (
                activeFilter === ACTIVITY_TYPE.EVENT ||
                activeFilter === ACTIVITY_TYPE.ACTIVITY ||
                activeFilter === ACTIVITY_TYPE.ACHIEVEMENT
            ) {
                return activity.activityType === activeFilter;
            }

            /*
             * Category filters
             *
             * category is an array,
             * so an activity can belong
             * to multiple categories.
             */

            return activity.category.includes(activeFilter);
        });
    }, [activities, activeFilter]);

    /* ========================================================
       Featured Activity
    ======================================================== */

    const featuredActivity = filteredActivities[0];

    /* ========================================================
       Latest Activities
    ======================================================== */

    const latestActivities = filteredActivities.slice(1);

    return (
        <div className="mt-8">
            {/* ==================================================
                Filters
            ================================================== */}

            <div
                className="
                    flex
                    flex-wrap
                    justify-center
                    gap-2
                    sm:gap-3
                "
            >
                {filters.map((filter) => {
                    const isActive =
                        activeFilter === filter.value;

                    return (
                        <button
                            key={filter.value}
                            type="button"
                            onClick={() =>
                                setActiveFilter(filter.value)
                            }
                            className={`
                                rounded-full
                                border
                                px-5
                                py-2
                                text-sm
                                font-medium
                                transition-all
                                duration-200
                                ${isActive
                                    ? `
                                            border-primary
                                            bg-primary
                                            text-white
                                            shadow-sm
                                        `
                                    : `
                                            border-border
                                            bg-card
                                            text-foreground
                                            hover:border-primary
                                            hover:text-primary
                                        `
                                }
                            `}
                        >
                            {filter.label}
                        </button>
                    );
                })}
            </div>

            {/* ==================================================
                Results
            ================================================== */}

            {featuredActivity ? (
                <>
                    {/* ==================================================
                        Featured Activity
                    ================================================== */}

                    <FeaturedActivityCard
                        activity={featuredActivity}
                    />

                    {/* ==================================================
                        Latest Updates
                    ================================================== */}

                    {latestActivities.length > 0 && (
                        <section className="mt-10">
                            <div
                                className="
                                    mb-5
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                "
                            >
                                <h2
                                    className="
                                        text-xl
                                        font-bold
                                        tracking-tight
                                        text-heading
                                        sm:text-2xl
                                    "
                                >
                                    Latest Updates
                                </h2>
                            </div>

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-4
                                    sm:grid-cols-2
                                    lg:grid-cols-3
                                    xl:grid-cols-4
                                "
                            >
                                {latestActivities.map(
                                    (activity) => (
                                        <ActivityCard
                                            key={activity.id}
                                            activity={activity}
                                        />
                                    )
                                )}
                            </div>
                        </section>
                    )}
                </>
            ) : (
                /* ==================================================
                   Empty State
                ================================================== */

                <div
                    className="
                        mt-10
                        rounded-2xl
                        border
                        border-dashed
                        border-border
                        bg-card
                        px-6
                        py-16
                        text-center
                    "
                >
                    <h3
                        className="
                            text-lg
                            font-semibold
                            text-heading
                        "
                    >
                        No activities found
                    </h3>

                    <p
                        className="
                            mt-2
                            text-sm
                            text-muted
                        "
                    >
                        There are no published activities
                        in this category.
                    </p>

                    {activeFilter !== "all" && (
                        <button
                            type="button"
                            onClick={() =>
                                setActiveFilter("all")
                            }
                            className="
                                mt-4
                                text-sm
                                font-semibold
                                text-primary
                                hover:underline
                            "
                        >
                            View all activities
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}