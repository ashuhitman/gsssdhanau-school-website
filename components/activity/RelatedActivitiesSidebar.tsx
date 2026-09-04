import Link from "next/link";

import {
    ArrowUpRight,
    Trophy,
} from "lucide-react";

import type { Activity } from "@/lib/data/activity/types";
import { ACTIVITY_TYPE } from "@/lib/data/activity/constants";

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
    Activity["activityType"],
    string
> = {
    [ACTIVITY_TYPE.EVENT]: "Events",
    [ACTIVITY_TYPE.ACTIVITY]: "Activities",
    [ACTIVITY_TYPE.ACHIEVEMENT]: "Achievements",
    [ACTIVITY_TYPE.COMPETITION]: "Competitions",
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
                            text-[0.5625rem]
                            font-black
                            uppercase
                            tracking-[0.2em]
                            text-accent
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
                            text-heading
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
                        bg-primary
                        text-white
                    "
                >
                    <Trophy className="size-3.5" />
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
                        bg-accent
                    "
                />

                <span
                    className="
                        size-1.5
                        shrink-0
                        rounded-full
                        bg-accent
                    "
                />

                <span
                    className="
                        h-px
                        flex-1
                        bg-accent
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
                {activities.map((activity) => (
                    <ImageInfoCard
                        key={activity.id}
                        href={`/activities/${activity.slug}`}
                        image={activity.image ?? ""}
                        imageAlt={activity.title}
                        title={activity.title}
                        label={
                            activityTypeLabels[
                            activity.activityType
                            ]
                        }
                        description={
                            activity.excerpt ?? undefined
                        }
                        info={
                            activity.participantName ??
                            undefined
                        }
                        date={activity.activityDate}
                        compact
                    />
                ))}
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
                    border-border
                    bg-card
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-muted
                    transition-all
                    hover:border-primary
                    hover:bg-surface
                    hover:text-heading
                "
            >
                View all activities

                <ArrowUpRight className="size-3.5" />
            </Link>
        </aside>
    );
}