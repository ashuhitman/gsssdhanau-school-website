import Image from "next/image";
import Link from "next/link";

import {
    ArrowUpRight,
    CalendarDays,
    Tag,
} from "lucide-react";

import type { Activity } from "@/lib/data/activity/types";
import {
    ACTIVITY_TYPE,
} from "@/lib/data/activity/constants";

/* ============================================================
   Default Image
============================================================ */

const DEFAULT_CARD_IMAGE =
    "/images/activity/default-card.jpeg";

/* ============================================================
   Activity Type Labels
============================================================ */

const activityTypeLabels: Record<
    Activity["activityType"],
    string
> = {
    [ACTIVITY_TYPE.EVENT]: "Event",
    [ACTIVITY_TYPE.ACTIVITY]: "Activity",
    [ACTIVITY_TYPE.ACHIEVEMENT]: "Achievement",
    [ACTIVITY_TYPE.COMPETITION]: "Competition",
};

/* ============================================================
   Activity Type Styles
============================================================ */

const activityTypeStyles: Record<
    Activity["activityType"],
    string
> = {
    [ACTIVITY_TYPE.EVENT]: `
        bg-primary-soft
        text-primary
    `,

    [ACTIVITY_TYPE.ACTIVITY]: `
        bg-accent-soft
        text-accent
    `,

    [ACTIVITY_TYPE.ACHIEVEMENT]: `
        bg-primary-soft
        text-primary
    `,

    [ACTIVITY_TYPE.COMPETITION]: `
        bg-accent-soft
        text-accent
    `,
};

/* ============================================================
   Activity Card
============================================================ */

export default function ActivityCard({
    activity,
}: {
    activity: Activity;
}) {
    const imageSrc =
        activity.image?.trim()
            ? activity.image
            : DEFAULT_CARD_IMAGE;

    const activityHref =
        `/activities/${activity.slug}`;

    return (
        <article
            className="
                group
                flex
                h-full
                flex-col
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-card
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-school-card
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
                    aspect-[16/9]
                    overflow-hidden
                    bg-surface
                "
            >
                <Image
                    src={imageSrc}
                    alt={activity.title}
                    fill
                    sizes="
                        (max-width: 639px) 100vw,
                        (max-width: 1023px) 50vw,
                        (max-width: 1279px) 33vw,
                        25vw
                    "
                    className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
                />

                {/* Image Overlay */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/45
                        via-transparent
                        to-transparent
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                    "
                />

                {/* Open Icon */}

                <span
                    className="
                        absolute
                        right-3
                        top-3
                        flex
                        size-8
                        items-center
                        justify-center
                        rounded-full
                        bg-card/95
                        text-primary
                        opacity-0
                        shadow-sm
                        transition-all
                        duration-300
                        group-hover:opacity-100
                    "
                >
                    <ArrowUpRight className="size-4" />
                </span>

                {/* Date Badge */}

                <div
                    className="
                        absolute
                        bottom-3
                        left-3
                        flex
                        items-center
                        gap-1.5
                        rounded-lg
                        bg-card
                        px-2.5
                        py-1.5
                        text-xs
                        font-semibold
                        text-card-foreground
                        shadow-sm
                    "
                >
                    <CalendarDays
                        className="
                            size-3.5
                            text-accent
                        "
                    />

                    <time dateTime={activity.activityDate}>
                        {formatDate(activity.activityDate)}
                    </time>
                </div>
            </Link>

            {/* ==================================================
                Content
            ================================================== */}

            <div
                className="
                    flex
                    flex-1
                    flex-col
                    p-5
                "
            >
                {/* ==================================================
                    Type
                ================================================== */}

                <span
                    className={`
                        self-start
                        rounded-full
                        px-2.5
                        py-1
                        text-[0.65rem]
                        font-bold
                        uppercase
                        tracking-wider
                        ${activityTypeStyles[
                        activity.activityType
                        ]}
                    `}
                >
                    {
                        activityTypeLabels[
                        activity.activityType
                        ]
                    }
                </span>

                {/* ==================================================
                    Title
                ================================================== */}

                <h3
                    className="
                        mt-3
                        line-clamp-2
                        text-lg
                        font-bold
                        leading-snug
                        tracking-tight
                        text-heading
                    "
                >
                    {activity.title}
                </h3>

                {/* ==================================================
                    Excerpt
                ================================================== */}

                {activity.excerpt && (
                    <p
                        className="
                            mt-2.5
                            line-clamp-2
                            text-sm
                            leading-[1.375rem]
                            text-muted
                        "
                    >
                        {activity.excerpt}
                    </p>
                )}

                {/* ==================================================
                    Footer
                ================================================== */}

                <div
                    className="
                        mt-auto
                        flex
                        items-center
                        justify-between
                        gap-3
                        border-t
                        border-border
                        pt-4
                    "
                >
                    {/* Categories */}

                    <div
                        className="
                            flex
                            min-w-0
                            items-center
                            gap-2
                        "
                    >
                        <Tag
                            className="
                                size-3
                                shrink-0
                                text-muted
                            "
                        />

                        <div
                            className="
                                flex
                                min-w-0
                                flex-wrap
                                items-center
                            "
                        >
                            {activity.category
                                .slice(0, 2)
                                .map(
                                    (
                                        category,
                                        index
                                    ) => (
                                        <span
                                            key={category}
                                            className="
                                                inline-flex
                                                items-center
                                            "
                                        >
                                            {index > 0 && (
                                                <span
                                                    aria-hidden="true"
                                                    className="
                                                        mx-2
                                                        h-3
                                                        w-px
                                                        bg-border
                                                    "
                                                />
                                            )}

                                            <span
                                                className="
                                                    text-[0.6rem]
                                                    font-medium
                                                    uppercase
                                                    tracking-wide
                                                    text-muted
                                                "
                                            >
                                                {category}
                                            </span>
                                        </span>
                                    )
                                )}
                        </div>
                    </div>

                    {/* Read More */}

                    <Link
                        href={activityHref}
                        className="
                            inline-flex
                            shrink-0
                            items-center
                            gap-1
                            text-xs
                            font-bold
                            text-primary
                            transition-colors
                            hover:text-accent
                        "
                    >
                        Read more

                        <ArrowUpRight
                            className="
                                size-3.5
                                transition-transform
                                duration-200
                                group-hover:translate-x-0.5
                            "
                        />
                    </Link>
                </div>
            </div>

            {/* ==================================================
                Bottom Accent
            ================================================== */}

            <div
                className="
                    h-0.5
                    w-full
                    bg-accent
                "
            />
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