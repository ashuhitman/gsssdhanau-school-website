import {
    CalendarDays,
    Trophy,
    Sparkles,
} from "lucide-react";

import type {
    Activity,
    ActivityCategory,
    ActivityType,
} from "@/lib/data/activity";

/* ============================================================
   Props
============================================================ */

interface ActivityDetailsProps {
    activity: Activity;
}

/* ============================================================
   Labels
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
   Activity Details
============================================================ */

export default function ActivityDetails({
    activity,
}: ActivityDetailsProps) {
    return (
        <article
            className="
                relative
                h-full
                w-full
                overflow-hidden
                bg-[#eaf4ff]
            "
        >
            {/* ═════════════════════════════
                DECORATIVE BACKGROUND
            ═════════════════════════════ */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    size-40
                    rounded-full
                    border
                    border-blue-200/60
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-20
                    -left-20
                    size-44
                    rounded-full
                    bg-blue-200/30
                    blur-3xl
                "
            />

            {/* ═════════════════════════════
                MAIN CONTENT
            ═════════════════════════════ */}

            <div
                className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    px-8
                    py-10
                    sm:px-14
                    sm:py-12
                "
            >
                {/* ═════════════════════════
                    ACTIVITY TYPE
                ═════════════════════════ */}

                <div
                    className="
                        flex
                        shrink-0
                        items-center
                        justify-between
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <div
                            className="
                                flex
                                size-8
                                items-center
                                justify-center
                                rounded-full
                                bg-blue-950
                                text-white
                                shadow-sm
                            "
                        >
                            <ActivityIcon
                                type={
                                    activity.activityType
                                }
                            />
                        </div>

                        <p
                            className="
                                text-[9px]
                                font-black
                                uppercase
                                tracking-[0.2em]
                                text-amber-600
                            "
                        >
                            {
                                activityTypeLabels[
                                activity.activityType
                                ]
                            }
                        </p>
                    </div>

                    <Sparkles
                        className="
                            size-5
                            text-amber-400
                        "
                    />
                </div>

                {/* ═════════════════════════
                    TITLE
                ═════════════════════════ */}

                <h1
                    className="
                        mt-4
                        shrink-0
                        text-3xl
                        font-black
                        leading-[1.05]
                        tracking-tight
                        text-slate-950
                        sm:text-4xl
                    "
                >
                    {activity.title}
                </h1>

                {/* ═════════════════════════
                    COVER IMAGE
                ═════════════════════════ */}

                <div
                    className="
                        relative
                        mt-6
                        aspect-[16/9]
                        w-full
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        bg-slate-200
                        shadow-md
                    "
                >
                    <img
                        src={
                            activity.image?.trim()
                                ? activity.image
                                : "/images/activity/default-featured.jpeg"
                        }
                        alt={
                            activity.imageAlt ??
                            activity.title
                        }
                        className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            hover:scale-105
                        "
                    />

                    {/* IMAGE OVERLAY */}

                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-blue-950/50
                            via-transparent
                            to-transparent
                        "
                    />

                    {/* IMAGE LABEL */}

                    <div
                        className="
                            absolute
                            bottom-3
                            left-3
                            flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-white/90
                            px-2.5
                            py-1
                            shadow-sm
                            backdrop-blur-sm
                        "
                    >
                        <ActivityIcon
                            type={
                                activity.activityType
                            }
                            className="
                                size-3
                                text-blue-950
                            "
                        />

                        <span
                            className="
                                text-[7px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-blue-950
                            "
                        >
                            {activity.category
                                .map(
                                    (
                                        category
                                    ) =>
                                        categoryLabels[
                                        category
                                        ]
                                )
                                .join(
                                    " • "
                                )}
                        </span>
                    </div>
                </div>

                {/* ═════════════════════════
                    PARTICIPANT / DATE
                ═════════════════════════ */}

                <div
                    className="
                        mt-4
                        flex
                        shrink-0
                        flex-wrap
                        items-center
                        gap-2
                        text-xs
                        text-slate-400
                    "
                >
                    {/* Participant */}

                    {activity.participantName && (
                        <>
                            <span>
                                {participantLabel(
                                    activity.participantType
                                )}{" "}
                                <span
                                    className="
                                        font-semibold
                                        text-slate-600
                                    "
                                >
                                    {
                                        activity.participantName
                                    }
                                </span>
                            </span>

                            <span>
                                •
                            </span>
                        </>
                    )}

                    {/* Date */}

                    <span
                        className="
                            flex
                            items-center
                            gap-1
                        "
                    >
                        <CalendarDays
                            className="
                                size-3.5
                            "
                        />

                        <span>
                            Activity date{" "}
                        </span>

                        <span
                            className="
                                font-semibold
                                text-slate-600
                            "
                        >
                            {formatDate(
                                activity.activityDate
                            )}
                        </span>
                    </span>
                </div>

                {/* ═════════════════════════
                    DESCRIPTION
                ═════════════════════════ */}

                {activity.excerpt && (
                    <div
                        className="
                            relative
                            mt-5
                            shrink-0
                        "
                    >
                        {/* Accent line */}

                        <div
                            className="
                                absolute
                                left-0
                                top-0
                                h-full
                                w-1
                                rounded-full
                                bg-amber-400
                            "
                        />

                        <p
                            className="
                                pl-4
                                text-sm
                                leading-6
                                text-slate-600
                            "
                        >
                            {activity.excerpt}
                        </p>
                    </div>
                )}

                {/* ═════════════════════════
                    FULL ACTIVITY CONTENT
                ═════════════════════════ */}

                {activity.description && (
                    <div
                        className="
                            mt-6
                            min-h-0
                            flex-1
                            overflow-hidden
                        "
                    >
                        <div
                            className="
                                h-full
                                overflow-hidden
                                whitespace-pre-line
                                text-sm
                                leading-7
                                text-slate-700
                            "
                        >
                            {
                                activity.description
                            }
                        </div>
                    </div>
                )}

                {/* ═════════════════════════
                    FOOTER
                ═════════════════════════ */}

                <div
                    className="
                        mt-4
                        flex
                        shrink-0
                        items-center
                        justify-between
                        border-t
                        border-blue-200
                        pt-3
                    "
                >
                    <span
                        className="
                            text-[8px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-slate-400
                        "
                    >
                        PM SHRI GSSS DHANAU
                    </span>

                    <span
                        className="
                            text-[8px]
                            font-semibold
                            text-amber-600
                        "
                    >
                        School Activity
                    </span>
                </div>
            </div>
        </article>
    );
}

/* ============================================================
   Activity Icon
============================================================ */

function ActivityIcon({
    type,
    className = "size-4",
}: {
    type: ActivityType;
    className?: string;
}) {
    if (
        type === "achievement" ||
        type === "competition"
    ) {
        return (
            <Trophy
                className={className}
            />
        );
    }

    return (
        <Sparkles
            className={className}
        />
    );
}

/* ============================================================
   Participant Label
============================================================ */

function participantLabel(
    type?: Activity[
        "participantType"
    ]
): string {
    switch (type) {
        case "student":
            return "Student";

        case "teacher":
            return "Teacher";

        case "team":
            return "Team";

        case "school":
            return "School";

        default:
            return "Participant";
    }
}

/* ============================================================
   Date
============================================================ */

function formatDate(
    date: string
): string {
    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    ).format(
        new Date(date)
    );
}