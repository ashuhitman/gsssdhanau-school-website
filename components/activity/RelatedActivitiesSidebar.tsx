import Link from "next/link";

import {
    ArrowUpRight,
    Trophy,
} from "lucide-react";

import type {
    Activity,
    ActivityType,
} from "@/lib/data/activity";

import ImageInfoCard from "@/components/common/ImageInfoCard";

/* ============================================================
   Props
============================================================ */

interface RelatedActivitiesSidebarProps {
    activities: Activity[];
}

/* ============================================================
   Activity Type Labels
============================================================ */

const activityTypeLabels: Record<
    ActivityType,
    string
> = {
    event: "Events",
    activity: "Activities",
    achievement: "Achievements",
    competition: "Competitions",
};

/* ============================================================
   Related Activities Sidebar
============================================================ */

export default function RelatedActivitiesSidebar({
    activities,
}: RelatedActivitiesSidebarProps) {
    if (activities.length === 0) {
        return null;
    }

    const activityType =
        activities[0].activityType;

    return (
        <aside
            className="
                w-full
                lg:sticky
                lg:top-6
            "
        >
            {/* ==================================================
                Header
            ================================================== */}

            <div
                className="
                    flex
                    items-end
                    justify-between
                    gap-4
                "
            >
                <div>
                    <p
                        className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.2em]
                            text-accent-600
                        "
                    >
                        Related
                    </p>

                    <h2
                        className="
                            mt-1
                            text-xl
                            font-black
                            tracking-tight
                            text-slate-950
                        "
                    >
                        News and Activities
                    </h2>
                </div>

                <div
                    className="
                        flex
                        size-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-950
                        text-white
                    "
                >
                    <Trophy
                        className="
                            size-3.5
                        "
                    />
                </div>
            </div>

            {/* ==================================================
                Divider
            ================================================== */}

            <div
                aria-hidden="true"
                className="
                    mt-3
                    flex
                    w-full
                    items-center
                    gap-1.5
                "
            >
                <span
                    className="
                        h-px
                        flex-1
                        bg-accent-400
                    "
                />

                <span
                    className="
                        size-1.5
                        shrink-0
                        rounded-full
                        bg-accent-400
                    "
                />

                <span
                    className="
                        h-px
                        flex-1
                        bg-accent-400
                    "
                />
            </div>

            {/* ==================================================
                Activities
            ================================================== */}

            <div
                className="
                    mt-4
                    space-y-3
                "
            >
                {activities.map(
                    (activity) => (
                        <ImageInfoCard
                            key={
                                activity.id
                            }
                            href={`/activities/${activity.id}`}
                            image={
                                activity.image ??
                                ""
                            }
                            imageAlt={
                                activity.imageAlt ??
                                activity.title
                            }
                            title={
                                activity.title
                            }
                            label={
                                formatType(
                                    activity.activityType
                                )
                            }
                            description={
                                activity.excerpt
                            }
                            info={
                                activity.participantName
                            }
                            date={
                                activity.activityDate
                            }
                            compact
                        />
                    )
                )}
            </div>

            {/* ==================================================
                View All
            ================================================== */}

            <Link
                href="/activities"
                className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-slate-600
                    transition-all
                    hover:border-slate-300
                    hover:bg-slate-50
                    hover:text-slate-950
                "
            >
                View all activities

                <ArrowUpRight
                    className="
                        size-3.5
                    "
                />
            </Link>
        </aside>
    );
}

/* ============================================================
   Format Type
============================================================ */

function formatType(
    type: ActivityType
): string {
    return (
        type.charAt(0).toUpperCase() +
        type.slice(1)
    );
}