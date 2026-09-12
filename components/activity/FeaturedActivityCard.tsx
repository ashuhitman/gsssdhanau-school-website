import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    CalendarDays,
} from "lucide-react";

import type { Activity } from "@/lib/data/activity/types";
import { ACTIVITY_CATEGORY } from "@/lib/data/activity/constants";

/* ============================================================
   Default Image
============================================================ */

const DEFAULT_FEATURED_IMAGE =
    "/images/activity/default-featured.jpeg";

/* ============================================================
   Activity Category Labels
============================================================ */

const activityCategoryLabels: Record<
    Activity["category"],
    string
> = {
    [ACTIVITY_CATEGORY.EVENT]: "Event",
    [ACTIVITY_CATEGORY.ACTIVITY]: "Activity",
    [ACTIVITY_CATEGORY.ACHIEVEMENT]: "Achievement",
    [ACTIVITY_CATEGORY.COMPETITION]: "Competition",
};

/* ============================================================
   Activity Tag Labels
============================================================ */

const activityTagLabels: Record<
    Activity["activityTags"][number],
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
        activity.image?.value?.trim()
            ? activity.image.value
            : DEFAULT_FEATURED_IMAGE;

    const activityHref =
        `/activities/${activity.slug}`;

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
                    href={activityHref}
                    className="
                        relative
                        block
                        aspect-[16/10]
                        overflow-hidden
                        bg-surface
                        lg:aspect-auto
                        lg:min-h-[19.375rem]
                    "
                >
                    <Image
                        src={imageSrc}
                        alt={activity.title}
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

                    {/* Activity Category Badge */}

                    <span
                        className="
                            absolute
                            right-4
                            top-4
                            rounded-lg
                            bg-accent
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
                        {activityCategoryLabels[activity.category]}
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
                        Activity Tags
                    ================================================== */}

                    {activity.activityTags.length > 0 && (
                        <div
                            className="
                                flex
                                flex-wrap
                                items-center
                                gap-1.5
                            "
                        >
                            {activity.activityTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="
                                        rounded-md
                                        bg-primary-soft
                                        px-2
                                        py-0.5
                                        text-[0.6875rem]
                                        font-medium
                                        capitalize
                                        text-primary
                                    "
                                >
                                    {activityTagLabels[tag]}
                                </span>
                            ))}
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
                            text-heading
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
                                text-muted
                                sm:text-base
                                sm:leading-[1.625rem]
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
                                text-muted
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
                            href={activityHref}
                            className="
                                mt-6
                                inline-flex
                                items-center
                                gap-2
                                self-start
                                text-sm
                                font-semibold
                                text-primary
                                transition-colors
                                hover:text-primary-hover
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

function formatDate(date: string): string {
    if (!date) {
        return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(parsedDate);
}