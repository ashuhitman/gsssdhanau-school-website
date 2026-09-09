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

    category?: string;

    contentTags?: string[];

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
    contentTags = [],
    category,
    excerpt,
    content,
    publishedAt,
    publishedBy,
    date,
    footerLabel = "School Content",
    fallbackImage = "/images/articles/default-card.jpeg",
}: ContentDetailsProps) {
    const imageSrc = image?.trim()
        ? image
        : fallbackImage;

    return (
        <article
            className="
                @container
                relative
                h-full
                w-full
                min-w-0
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
                    min-w-0
                    flex-col
                    overflow-hidden
                    px-4
                    py-5
                    @[30rem]:px-6
                    @[30rem]:py-7
                    @[40rem]:px-10
                    @[40rem]:py-10
                    @[52rem]:px-14
                    @[52rem]:py-12
                "
            >
                {/* ═════════════════════════
                    CONTENT TYPE
                ═════════════════════════ */}

                {category && (
                    <div
                        className="
                            flex
                            min-w-0
                            shrink-0
                            items-center
                            justify-between
                        "
                    >
                        <div
                            className="
                                flex
                                min-w-0
                                items-center
                                gap-2
                            "
                        >
                            <div
                                className="
                                    flex
                                    size-7
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-blue-950
                                    text-white
                                    shadow-sm
                                    @[30rem]:size-8
                                "
                            >
                                <FileText
                                    className="
                                        size-3.5
                                        @[30rem]:size-4
                                    "
                                />
                            </div>

                            <p
                                className="
                                    min-w-0
                                    truncate
                                    text-[8px]
                                    font-black
                                    uppercase
                                    tracking-[0.16em]
                                    text-amber-600
                                    @[30rem]:text-[9px]
                                    @[30rem]:tracking-[0.2em]
                                "
                            >
                                {formatLabel(category)}
                            </p>
                        </div>

                        <Sparkles
                            className="
                                size-4
                                shrink-0
                                text-amber-400
                                @[30rem]:size-5
                            "
                        />
                    </div>
                )}

                {/* ═════════════════════════
                    TITLE
                ═════════════════════════ */}

                <h1
                    className="
                        mt-3
                        min-w-0
                        shrink-0
                        break-words
                        text-2xl
                        font-black
                        leading-[1.05]
                        tracking-tight
                        text-slate-950
                        @[30rem]:mt-4
                        @[30rem]:text-3xl
                        @[40rem]:text-4xl
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
                        mt-4
                        aspect-[16/9]
                        w-full
                        shrink-0
                        overflow-hidden
                        rounded-lg
                        bg-slate-200
                        shadow-md
                        @[30rem]:mt-5
                        @[30rem]:rounded-xl
                        @[40rem]:mt-6
                    "
                >
                    <img
                        src={imageSrc}
                        alt={imageAlt ?? title}
                        className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            hover:scale-105
                        "
                    />

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

                    {contentTags.length > 0 && (
                        <div
                            className="
                                absolute
                                bottom-2
                                left-2
                                flex
                                min-w-0
                                max-w-[calc(100%-1rem)]
                                items-center
                                gap-1
                                rounded-full
                                bg-white/90
                                px-2
                                py-0.5
                                shadow-sm
                                backdrop-blur-sm
                                @[30rem]:bottom-3
                                @[30rem]:left-3
                                @[30rem]:gap-1.5
                                @[30rem]:px-2.5
                                @[30rem]:py-1
                            "
                        >
                            <FileText
                                className="
                                    size-2.5
                                    shrink-0
                                    text-blue-950
                                    @[30rem]:size-3
                                "
                            />

                            <span
                                className="
                                    min-w-0
                                    truncate
                                    text-[6px]
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    text-blue-950
                                    @[30rem]:text-[7px]
                                    @[30rem]:tracking-wider
                                "
                            >
                                {contentTags
                                    .map((item) =>
                                        formatLabel(item)
                                    )
                                    .join(" • ")}
                            </span>
                        </div>
                    )}
                </div>

                {/* ═════════════════════════
                    CONTENT META
                ═════════════════════════ */}

                {(date || publishedAt || publishedBy) && (
                    <div
                        className="
                            mt-3
                            flex
                            min-w-0
                            shrink-0
                            flex-wrap
                            items-center
                            gap-x-3
                            gap-y-1.5
                            text-[10px]
                            text-slate-400
                            @[30rem]:mt-4
                            @[30rem]:gap-x-4
                            @[30rem]:gap-y-2
                            @[30rem]:text-xs
                        "
                    >
                        {date && (
                            <span
                                className="
                                    flex
                                    min-w-0
                                    items-center
                                    gap-1
                                "
                            >
                                <CalendarDays
                                    className="
                                        size-3
                                        shrink-0
                                        @[30rem]:size-3.5
                                    "
                                />

                                <span className="truncate">
                                    {formatDate(date)}
                                </span>
                            </span>
                        )}

                        {publishedAt && (
                            <span
                                className="
                                    flex
                                    min-w-0
                                    items-center
                                    gap-1
                                "
                            >
                                <CalendarCheck
                                    className="
                                        size-3
                                        shrink-0
                                        @[30rem]:size-3.5
                                    "
                                />

                                <span className="truncate">
                                    Published{" "}
                                    {formatDate(publishedAt)}
                                </span>
                            </span>
                        )}

                        {publishedBy && (
                            <span
                                className="
                                    flex
                                    min-w-0
                                    items-center
                                    gap-1
                                "
                            >
                                <UserCheck
                                    className="
                                        size-3
                                        shrink-0
                                        @[30rem]:size-3.5
                                    "
                                />

                                <span className="truncate">
                                    By{" "}
                                    <span className="font-semibold text-slate-600">
                                        {publishedBy}
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
                            mt-4
                            shrink-0
                            @[30rem]:mt-5
                        "
                    >
                        <div
                            className="
                                absolute
                                left-0
                                top-0
                                h-full
                                w-0.5
                                rounded-full
                                bg-amber-400
                                @[30rem]:w-1
                            "
                        />

                        <p
                            className="
                                pl-3
                                text-xs
                                leading-5
                                text-slate-600
                                text-justify
                                @[30rem]:pl-4
                                @[30rem]:text-sm
                                @[30rem]:leading-6
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
                            mt-5
                            min-h-0
                            @[30rem]:mt-6
                        "
                    >
                        <div
                            className="
                                whitespace-pre-line
                                break-words
                                text-xs
                                leading-6
                                text-slate-700
                                text-justify
                                @[30rem]:text-sm
                                @[30rem]:leading-7
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
                        mt-5
                        flex
                        min-w-0
                        shrink-0
                        items-center
                        justify-between
                        gap-3
                        border-t
                        border-blue-200
                        pt-2.5
                        @[30rem]:mt-6
                        @[30rem]:pt-3
                    "
                >
                    <span
                        className="
                            min-w-0
                            truncate
                            text-[7px]
                            font-bold
                            uppercase
                            tracking-[0.14em]
                            text-slate-400
                            @[30rem]:text-[8px]
                            @[30rem]:tracking-[0.18em]
                        "
                    >
                        PM SHRI GSSS DHANAU
                    </span>

                    <span
                        className="
                            shrink-0
                            text-[7px]
                            font-semibold
                            text-amber-600
                            @[30rem]:text-[8px]
                        "
                    >
                        {footerLabel}
                    </span>
                </div>
            </div>
        </article>
    );
}

/* ============================================================
   Label
============================================================ */

function formatLabel(value: string): string {
    return value
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

/* ============================================================
   Date
============================================================ */

function formatDate(date: string): string {
    if (!date) {
        return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(parsedDate);
}