import Image from "next/image";
import { Sparkles } from "lucide-react";

interface NewsletterCoverProps {
    title: string;
    schoolName?: string;
    issue: string;
    date: string;
    coverImage: string | null;
}

export function NewsletterCover({
    issue,
    date,
    coverImage,
    title = "CAMPUS CHRONICLES",
}: NewsletterCoverProps) {
    return (
        <div
            className="
                relative
                mx-auto
                w-full
                max-w-[15rem]
                [perspective:100rem]
            "
        >
            {/* =====================================================
                GROUND SHADOW
            ====================================================== */}

            <div
                className="
                    absolute
                    -bottom-2
                    left-4
                    right-4
                    h-4
                    rounded-[50%]
                    bg-black/15
                    blur-md
                    transition-all
                    duration-500
                    group-hover:left-6
                    group-hover:right-6
                    group-hover:bg-black/20
                "
            />

            {/* =====================================================
                MAGAZINE
            ====================================================== */}

            <div
                className="
                    relative
                    aspect-[3/4]
                    [transform-style:preserve-3d]
                "
            >
                {/* =================================================
                    INNER PAGE
                ================================================== */}

                <div
                    className="
                        absolute
                        inset-y-0
                        right-0
                        w-[97%]
                        overflow-hidden
                        rounded-r-md
                        rounded-l-[2px]
                        border
                        border-default
                        bg-card
                        shadow-[0.2rem_0.25rem_0.625rem_rgba(0,0,0,0.15)]
                    "
                >
                    {/* Page edge */}
                    <div
                        className="
                            absolute
                            bottom-2
                            right-1
                            top-2
                            w-[0.2rem]
                            rounded-r
                            bg-gradient-to-r
                            from-muted
                            via-card
                            to-muted
                        "
                    />

                    <div className="absolute inset-0 p-4">
                        {/* Header */}
                        <div
                            className="
                                flex
                                min-w-0
                                items-center
                                justify-between
                                gap-2
                            "
                        >
                            <span
                                className="
                                    min-w-0
                                    max-w-[75%]
                                    whitespace-normal
                                    break-words
                                    text-[0.4375rem]
                                    font-bold
                                    uppercase
                                    leading-3
                                    tracking-[0.15em]
                                    text-primary
                                "
                            >
                                {issue}
                            </span>

                            <span
                                className="
                                    shrink-0
                                    whitespace-nowrap
                                    text-[0.4375rem]
                                    text-muted
                                "
                            >
                                01
                            </span>
                        </div>

                        <div className="mt-2.5 h-px bg-border" />

                        {/* Article heading */}
                        <div className="mt-5">
                            <div
                                className="
                                    h-1.5
                                    w-20
                                    rounded
                                    bg-muted
                                "
                            />

                            <div className="mt-3 space-y-1.5">
                                <div className="h-1 w-full rounded bg-muted" />
                                <div className="h-1 w-[92%] rounded bg-muted" />
                                <div className="h-1 w-[80%] rounded bg-muted" />
                            </div>
                        </div>

                        {/* Image placeholder */}
                        <div
                            className="
                                mt-5
                                h-14
                                rounded-md
                                bg-primary-soft
                            "
                        />

                        {/* Text */}
                        <div className="mt-4 space-y-1.5">
                            <div className="h-1 w-full rounded bg-muted" />
                            <div className="h-1 w-[95%] rounded bg-muted" />
                            <div className="h-1 w-[82%] rounded bg-muted" />
                            <div className="h-1 w-[90%] rounded bg-muted" />
                        </div>

                        {/* Footer */}
                        <div
                            className="
                                absolute
                                bottom-4
                                left-4
                                right-4
                                flex
                                min-w-0
                                items-center
                                justify-between
                                gap-2
                            "
                        >
                            <span
                                className="
                                    min-w-0
                                    max-w-[80%]
                                    whitespace-normal
                                    break-words
                                    text-[0.4375rem]
                                    leading-3
                                    text-muted
                                "
                            >
                                PM SHRI GSSS Dhanau
                            </span>

                            <span
                                className="
                                    shrink-0
                                    whitespace-nowrap
                                    text-[0.4375rem]
                                    text-muted
                                "
                            >
                                01
                            </span>
                        </div>
                    </div>
                </div>

                {/* =================================================
                    PAGE LAYERS
                ================================================== */}

                <div
                    className="
                        absolute
                        bottom-[0.1875rem]
                        right-[-0.25rem]
                        top-[0.1875rem]
                        z-10
                        w-1
                        rounded-r-sm
                        bg-card
                        shadow-sm
                    "
                />

                <div
                    className="
                        absolute
                        bottom-[0.3125rem]
                        right-[-0.375rem]
                        top-[0.3125rem]
                        z-10
                        w-0.5
                        rounded-r-sm
                        bg-muted
                    "
                />

                {/* =================================================
                    FRONT COVER
                ================================================== */}

                <div
                    className="
                        absolute
                        inset-0
                        z-20
                        origin-left
                        overflow-hidden
                        rounded-r-md
                        rounded-l-[0.1875rem]
                        border
                        border-white/10
                        bg-gradient-to-br
                        from-primary-700
                        via-primary-600
                        to-primary-900
                        shadow-[0.25rem_0.3125rem_0.75rem_rgba(0,0,0,0.22)]
                        transition-transform
                        duration-700
                        ease-[cubic-bezier(0.4,0,0.2,1)]
                        [container-type:inline-size]
                        [transform-style:preserve-3d]
                        group-hover:[transform:rotateY(-72deg)]
                    "
                >
                    {/* =================================================
                        COVER IMAGE
                    ================================================== */}

                    {coverImage && (
                        <div
                            className="
                                absolute
                                inset-x-0
                                bottom-0
                                top-[42%]
                                overflow-hidden
                            "
                        >
                            <Image
                                src={coverImage}
                                alt={`${issue} newsletter cover`}
                                fill
                                sizes="
                                    (max-width: 640px) 70vw,
                                    15rem
                                "
                                className="
                                    object-cover
                                    object-center
                                "
                            />

                            {/* Top image blend */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-x-0
                                    top-0
                                    h-[45%]
                                    bg-gradient-to-b
                                    from-primary-600
                                    via-primary-600/70
                                    to-transparent
                                "
                            />

                            {/* Bottom image blend */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-x-0
                                    bottom-0
                                    h-[30%]
                                    bg-gradient-to-t
                                    from-primary-900
                                    via-primary-900/75
                                    to-transparent
                                "
                            />
                        </div>
                    )}

                    {/* =================================================
                        FALLBACK BACKGROUND
                    ================================================== */}

                    {!coverImage && (
                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-br
                                from-primary-700
                                via-primary-600
                                to-primary-900
                            "
                        />
                    )}

                    {/* =================================================
                        TOP COVER COLOR
                    ================================================== */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-x-0
                            top-0
                            z-10
                            h-[55%]
                            bg-gradient-to-b
                            from-primary-700
                            via-primary-600
                            to-transparent
                        "
                    />

                    {/* =================================================
                        SPINE
                    ================================================== */}

                    <div
                        className="
                            absolute
                            bottom-0
                            left-0
                            top-0
                            z-40
                            w-[0.3125rem]
                            bg-black/25
                            shadow-[0.125rem_0_0.25rem_rgba(0,0,0,0.25)]
                        "
                    />

                    {/* =================================================
                        DECORATIVE CIRCLES
                    ================================================== */}

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -right-16
                            -top-16
                            z-20
                            size-44
                            rounded-full
                            border
                            border-white/10
                        "
                    />

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -bottom-20
                            -left-16
                            z-20
                            size-52
                            rounded-full
                            border
                            border-white/10
                        "
                    />

                    {/* =================================================
                        TOP HEADER
                    ================================================== */}

                    <div
                        className="
                            absolute
                            left-[7%]
                            right-[7%]
                            top-[7%]
                            z-50
                            min-w-0
                        "
                    >
                        <div
                            className="
                                flex
                                min-w-0
                                items-start
                                justify-between
                                gap-2
                            "
                        >
                            <span
                                className="
                                    min-w-0
                                    max-w-[calc(100%-1.375rem)]
                                    break-words
                                    text-[clamp(0.3rem,3.5cqw,0.4375rem)]
                                    font-bold
                                    uppercase
                                    leading-[1.1]
                                    tracking-[0.09em]
                                    text-white
                                    drop-shadow
                                "
                            >
                                PM SHRI GSSS DHANAU
                            </span>

                            <Sparkles
                                className="
                                    size-[clamp(0.55rem,4cqw,0.875rem)]
                                    shrink-0
                                    text-white/90
                                "
                            />
                        </div>

                        <div
                            className="
                                mt-[6%]
                                h-px
                                bg-white/30
                            "
                        />
                    </div>

                    {/* =================================================
                        MAGAZINE TITLE
                    ================================================== */}

                    <div
                        className="
                            absolute
                            left-[7%]
                            right-[7%]
                            top-[20%]
                            z-50
                            min-w-0
                            overflow-hidden
                            text-center
                        "
                    >
                        <h2
                            className="
                                w-full
                                break-words
                                font-serif
                                text-[clamp(0.55rem,9cqw,1.35rem)]
                                font-black
                                uppercase
                                leading-[0.9]
                                tracking-[-0.03em]
                                text-white
                                drop-shadow-md
                            "
                        >
                            {title}
                        </h2>

                        <div
                            className="
                                mx-auto
                                mt-[7%]
                                h-[0.1rem]
                                w-[18%]
                                bg-white/80
                            "
                        />

                        <p
                            className="
                                mx-auto
                                mt-[5%]
                                max-w-full
                                break-words
                                text-[clamp(0.3rem,2.5cqw,0.375rem)]
                                font-medium
                                leading-[1.1]
                                tracking-[0.03em]
                                text-white/85
                                drop-shadow
                            "
                        >
                            School Life • Learning • Activities
                        </p>
                    </div>

                    {/* =================================================
                        ISSUE + DATE
                    ================================================== */}

                    <div
                        className="
                            absolute
                            bottom-[7%]
                            left-[7%]
                            right-[7%]
                            z-50
                            flex
                            min-w-0
                            items-end
                            justify-between
                            gap-3
                        "
                    >
                        <div className="min-w-0 max-w-[48%]">
                            <p
                                className="
                                    mt-0.5
                                    whitespace-nowrap
                                    text-[clamp(0.35rem,3.5cqw,0.75rem)]
                                    font-bold
                                    leading-[1.1]
                                    text-white
                                    drop-shadow
                                "
                            >
                                ISSUE #{issue.padStart(2, "0")}
                            </p>
                        </div>

                        <p
                            className="
                                mt-0.5
                                whitespace-nowrap
                                text-[clamp(0.35rem,3.5cqw,0.75rem)]
                                font-bold
                                leading-[1.1]
                                text-white
                                drop-shadow
                            "
                        >
                            {date}
                        </p>
                    </div>

                    {/* =================================================
                        BOTTOM STRIP
                    ================================================== */}

                    <div
                        className="
                            absolute
                            bottom-0
                            left-0
                            right-0
                            z-50
                            h-1.5
                            bg-black/20
                        "
                    />
                </div>
            </div>
        </div>
    );
}