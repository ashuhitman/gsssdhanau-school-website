import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    CalendarDays,
} from "lucide-react";

import type {
    Activity,
    ActivityCategory,
    ActivityType,
} from "@/lib/data/activity";


/* ============================================================
   Default Image
============================================================ */

const DEFAULT_FEATURED_IMAGE =
    "/images/activity/default-featured.jpeg";


/* ============================================================
   Activity Type Labels
============================================================ */

const activityTypeLabels: Record<
    ActivityType,
    string
> = {
    event: "Event",
    activity: "Activity",
    achievement: "Achievement",
    competition: "Competition",
};


/* ============================================================
   Category Labels
============================================================ */

const categoryLabels: Record<
    ActivityCategory,
    string
> = {
    sports: "Sports",
    academic: "Academic",
    cultural: "Cultural",
    social: "Social",
};


/* ============================================================
   Featured Activity Card
============================================================ */

export default function FeaturedActivityCard({
    activity,
}: {
    activity: Activity;
}) {
    const imageSrc =
        activity.image?.trim()
            ? activity.image
            : DEFAULT_FEATURED_IMAGE;

    console.log("featured activity: ", imageSrc)

    return (
        <article
            className="
                group
                relative
                mt-8
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-card
                shadow-sm
                transition-shadow
                duration-300
                hover:shadow-school-card
            "
        >
            <div
                className="
                    grid
                    lg:grid-cols-[1.15fr_0.85fr]
                "
            >

                {/* ==================================================
                    Image
                ================================================== */}

                <Link
                    href={`/activities/${activity.id}`}
                    className="
                        relative
                        block
                        aspect-[16/10]
                        overflow-hidden
                        bg-muted
                        lg:aspect-auto
                        lg:min-h-[310px]
                    "
                >
                    <Image
                        src={imageSrc}
                        alt={
                            activity.imageAlt ??
                            activity.title
                        }
                        fill
                        priority
                        sizes="(max-width: 1023px) 100vw, 58vw"
                        className="
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-[1.02]
                        "
                    />

                    {/* Activity Type Badge */}

                    <span
                        className="
                            absolute
                            right-4
                            top-4
                            rounded-lg
                            bg-accent-500
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-white
                            shadow-sm
                        "
                    >
                        {
                            activityTypeLabels[
                            activity.activityType
                            ]
                        }
                    </span>
                </Link>


                {/* ==================================================
                    Content
                ================================================== */}

                <div
                    className="
                        flex
                        min-w-0
                        flex-col
                        p-6
                        sm:p-7
                        lg:p-8
                    "
                >

                    {/* ==================================================
                        Categories
                    ================================================== */}

                    {activity.category.length > 0 && (
                        <div
                            className="
                                flex
                                flex-wrap
                                items-center
                                gap-1.5
                            "
                        >
                            {activity.category.map(
                                (category) => (
                                    <span
                                        key={category}
                                        className="
                                            rounded-md
                                            bg-primary-50
                                            px-2
                                            py-0.5
                                            text-[0.6875rem]
                                            font-medium
                                            capitalize
                                            text-primary-700
                                            dark:bg-primary-950
                                            dark:text-primary-300
                                        "
                                    >
                                        {
                                            categoryLabels[
                                            category
                                            ]
                                        }
                                    </span>
                                )
                            )}
                        </div>
                    )}


                    {/* ==================================================
                        Title
                    ================================================== */}

                    <h2
                        className="
                            mt-3
                            max-w-lg
                            text-2xl
                            font-bold
                            leading-tight
                            tracking-tight
                            text-foreground
                            sm:text-[1.65rem]
                            lg:text-3xl
                        "
                    >
                        {activity.title}
                    </h2>


                    {/* ==================================================
                        Excerpt
                    ================================================== */}

                    {activity.excerpt && (
                        <p
                            className="
                                mt-4
                                line-clamp-4
                                max-w-lg
                                text-sm
                                leading-6
                                text-muted-foreground
                                sm:text-base
                                sm:leading-6.5
                            "
                        >
                            {activity.excerpt}
                        </p>
                    )}


                    {/* ==================================================
                        Bottom Information
                    ================================================== */}

                    <div
                        className="
                            mt-auto
                            pt-6
                        "
                    >

                        {/* Date */}

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-muted-foreground
                            "
                        >
                            <CalendarDays
                                className="
                                    size-4
                                    shrink-0
                                "
                            />

                            <time
                                dateTime={
                                    activity.activityDate
                                }
                            >
                                {formatDate(
                                    activity.activityDate
                                )}
                            </time>
                        </div>


                        {/* Read More */}

                        <Link
                            href={`/activities/${activity.id}`}
                            className="
                                mt-6
                                inline-flex
                                items-center
                                gap-2
                                self-start
                                text-sm
                                font-semibold
                                text-primary-700
                                transition-colors
                                hover:text-primary-500
                                dark:text-primary-400
                            "
                        >
                            Read more

                            <ArrowRight
                                className="
                                    size-4
                                    transition-transform
                                    duration-200
                                    group-hover:translate-x-1
                                "
                            />
                        </Link>

                    </div>

                </div>

            </div>

        </article>
    );
}


/* ============================================================
   Date Formatter
============================================================ */

function formatDate(
    date: string
): string {
    if (!date) {
        return "";
    }

    const parsedDate =
        new Date(date);

    if (
        Number.isNaN(
            parsedDate.getTime()
        )
    ) {
        return date;
    }

    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    ).format(parsedDate);
}