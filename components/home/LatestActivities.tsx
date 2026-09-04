import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Activity } from "@/lib/data/activity/types";

interface LatestActivitiesProps {
    activities: Activity[];
}

export function LatestActivities({
    activities,
}: LatestActivitiesProps) {
    return (
        <section className="home-grid-card">
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
                <h2
                    className="
                        font-serif
                        text-[1.15rem]
                        font-bold
                        text-heading
                    "
                >
                    Latest Activities
                </h2>

                <Link
                    href="/activities"
                    className="
                        text-[0.68rem]
                        font-medium
                        text-primary
                        hover:underline
                    "
                >
                    View All →
                </Link>
            </div>

            {/* Activities */}
            <div className="mt-5 space-y-3">
                {activities.map((activity) => (
                    <Link
                        key={activity.id}
                        href={`/activities/${activity.slug}`}
                        className="
                            group
                            flex
                            min-w-0
                            items-center
                            gap-3
                            rounded-lg
                            transition-colors
                            hover:bg-surface-hover
                        "
                    >
                        <div
                            className="
                                relative
                                size-[3.5rem]
                                shrink-0
                                overflow-hidden
                                rounded-lg
                                bg-surface
                            "
                        >
                            {activity.image ? (
                                <Image
                                    src={activity.image}
                                    alt={activity.title}
                                    fill
                                    sizes="3.5rem"
                                    className="
                                        object-cover
                                        transition-transform
                                        duration-300
                                        group-hover:scale-105
                                    "
                                />
                            ) : (
                                <div className="size-full bg-surface" />
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h3
                                className="
                                    truncate
                                    text-[0.75rem]
                                    font-semibold
                                    text-heading
                                "
                            >
                                {activity.title}
                            </h3>

                            <p
                                className="
                                    mt-1
                                    text-[0.63rem]
                                    text-muted
                                "
                            >
                                {new Date(
                                    activity.activityDate
                                ).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>
                        </div>

                        <ArrowRight
                            className="
                                size-[0.8rem]
                                shrink-0
                                text-muted
                                transition-transform
                                group-hover:translate-x-[0.15rem]
                                group-hover:text-primary
                            "
                            strokeWidth={1.8}
                        />
                    </Link>
                ))}
            </div>

            {/* Footer */}
            <Link
                href="/activities"
                className="
                    mt-auto
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-default
                    py-2
                    text-[0.68rem]
                    font-semibold
                    text-primary
                    transition-colors
                    hover:bg-primary-soft
                "
            >
                Explore All Activities

                <ArrowRight
                    className="size-[0.8rem]"
                    strokeWidth={2}
                />
            </Link>
        </section>
    );
}