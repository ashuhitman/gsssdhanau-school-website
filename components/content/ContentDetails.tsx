import {
    CalendarCheck,
    CalendarDays,
    FileText,
    Sparkles,
    UserCheck,
} from "lucide-react";

/* ============================================================
   Props
============================================================ */

export interface ContentDetailsProps {
    title: string;

    image?: string | null;
    imageAlt?: string;

    contentType?: string;

    category?: string[];

    excerpt?: string;

    content?: string | null;

    publishedAt?: string;

    publishedBy?: string;

    date?: string;

    footerLabel?: string;

    fallbackImage?: string;
}

/* ============================================================
   Content Details
============================================================ */

export default function ContentDetails({
    title,
    image,
    imageAlt,
    contentType,
    category = [],
    excerpt,
    content,
    publishedAt,
    publishedBy,
    date,
    footerLabel = "School Content",
    fallbackImage = "/images/articles/default-card.jpeg",
}: ContentDetailsProps) {
    const imageSrc =
        image?.trim()
            ? image
            : fallbackImage;

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
                    px-6
                    py-8
                    sm:px-10
                    sm:py-10
                    lg:px-14
                    lg:py-12
                "
            >
                {/* ═════════════════════════
                    CONTENT TYPE
                ═════════════════════════ */}

                {contentType && (
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
                                <FileText
                                    className="
                                        size-4
                                    "
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
                                {formatLabel(
                                    contentType
                                )}
                            </p>
                        </div>

                        <Sparkles
                            className="
                                size-5
                                text-amber-400
                            "
                        />
                    </div>
                )}

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
                    {title}
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
                        src={imageSrc}
                        alt={
                            imageAlt ??
                            title
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
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-blue-950/50
                            via-transparent
                            to-transparent
                        "
                    />

                    {/* IMAGE LABEL */}

                    {category.length > 0 && (
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
                            <FileText
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
                                {category
                                    .map(
                                        (item) =>
                                            formatLabel(
                                                item
                                            )
                                    )
                                    .join(
                                        " • "
                                    )}
                            </span>
                        </div>
                    )}
                </div>

                {/* ═════════════════════════
                    CONTENT META
                ═════════════════════════ */}

                {(date ||
                    publishedAt ||
                    publishedBy) && (
                        <div
                            className="
                            mt-4
                            flex
                            shrink-0
                            flex-wrap
                            items-center
                            gap-x-4
                            gap-y-2
                            text-xs
                            text-slate-400
                        "
                        >
                            {/* Content Date */}

                            {date && (
                                <span
                                    className="
                                    flex
                                    items-center
                                    gap-1.5
                                "
                                >
                                    <CalendarDays
                                        className="
                                        size-3.5
                                    "
                                    />

                                    <span>
                                        {formatDate(
                                            date
                                        )}
                                    </span>
                                </span>
                            )}

                            {/* Published At */}

                            {publishedAt && (
                                <span
                                    className="
                                    flex
                                    items-center
                                    gap-1.5
                                "
                                >
                                    <CalendarCheck
                                        className="
                                        size-3.5
                                    "
                                    />

                                    <span>
                                        Published{" "}
                                        {formatDate(
                                            publishedAt
                                        )}
                                    </span>
                                </span>
                            )}

                            {/* Published By */}

                            {publishedBy && (
                                <span
                                    className="
                                    flex
                                    items-center
                                    gap-1.5
                                "
                                >
                                    <UserCheck
                                        className="
                                        size-3.5
                                    "
                                    />

                                    <span>
                                        By{" "}
                                        <span
                                            className="
                                            font-semibold
                                            text-slate-600
                                        "
                                        >
                                            {
                                                publishedBy
                                            }
                                        </span>
                                    </span>
                                </span>
                            )}
                        </div>
                    )}

                {/* ═════════════════════════
                    DESCRIPTION / EXCERPT
                ═════════════════════════ */}

                {excerpt && (
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
                                text-justify
                            "
                        >
                            {excerpt}
                        </p>
                    </div>
                )}

                {/* ═════════════════════════
                    FULL CONTENT
                ═════════════════════════ */}

                {content && (
                    <div
                        className="
                            mt-6
                            min-h-0
                        "
                    >
                        <div
                            className="
                                whitespace-pre-line
                                text-sm
                                leading-7
                                text-slate-700
                                text-justify
                            "
                        >
                            {content}
                        </div>
                    </div>
                )}

                {/* ═════════════════════════
                    FOOTER
                ═════════════════════════ */}

                <div
                    className="
                        mt-6
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
                        {footerLabel}
                    </span>
                </div>
            </div>
        </article >
    );
}

/* ============================================================
   Label
============================================================ */

function formatLabel(
    value: string
): string {
    return value
        .replace(/[-_]/g, " ")
        .replace(
            /\b\w/g,
            (char) =>
                char.toUpperCase()
        );
}

/* ============================================================
   Date
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
        return "";
    }

    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    ).format(parsedDate);
}