import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    Download,
    Sparkles,
} from "lucide-react";

interface NewsletterCardProps {
    title: string;
    description: string;
    issue: string;
    date: string;
    href?: string;

    /**
     * Show the information below the newsletter cover.
     * Default: true
     */
    showInfo?: boolean;
}

export function NewsletterCard({
    title,
    description,
    issue,
    date,
    href,
    showInfo = true,
}: NewsletterCardProps) {
    const card = (
        <article
            className="
                group
                relative
                z-0
                isolate
                min-w-0
                transition-[z-index]
                duration-0
                hover:z-50
            "
        >
            {/* =====================================================
                MAGAZINE
            ====================================================== */}

            <div
                className="
                    relative
                    mx-auto
                    w-full
                    max-w-[15rem]
                    [perspective:100rem]
                "
            >
                {/* Ground shadow */}

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

                {/* Magazine */}

                <div
                    className="
                        relative
                        aspect-[3/4]
                        [transform-style:preserve-3d]
                    "
                >
                    {/* =================================================
                        INNER PAGES
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
                                        break-normal
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

                            <div
                                className="
                                    mt-2.5
                                    h-px
                                    bg-border
                                "
                            />

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

                            {/* Image */}

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
                                        break-normal
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
                            [transform-style:preserve-3d]
                            group-hover:[transform:rotateY(-72deg)]
                        "
                    >
                        {/* Spine */}

                        <div
                            className="
                                absolute
                                bottom-0
                                left-0
                                top-0
                                z-30
                                w-[0.3125rem]
                                bg-black/25
                                shadow-[0.125rem_0_0.25rem_rgba(0,0,0,0.25)]
                            "
                        />

                        {/* Decorative circles */}

                        <div
                            aria-hidden="true"
                            className="
                                pointer-events-none
                                absolute
                                -right-16
                                -top-16
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
                                size-52
                                rounded-full
                                border
                                border-white/10
                            "
                        />

                        {/* Top header */}

                        <div
                            className="
                                absolute
                                left-4
                                right-4
                                top-4
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
                                        whitespace-normal
                                        break-normal
                                        text-[0.4375rem]
                                        font-bold
                                        uppercase
                                        leading-3
                                        tracking-[0.11em]
                                        text-white/85
                                    "
                                >
                                    PM SHRI GSSS DHANAU
                                </span>

                                <Sparkles
                                    className="
                                        size-3.5
                                        shrink-0
                                        text-white/70
                                    "
                                />
                            </div>

                            <div
                                className="
                                    mt-2.5
                                    h-px
                                    bg-white/20
                                "
                            />
                        </div>

                        {/* Magazine title */}

                        <div
                            className="
                                absolute
                                left-3
                                right-3
                                top-[28%]
                                min-w-0
                                overflow-hidden
                                text-center
                            "
                        >
                            <p
                                className="
                                    whitespace-nowrap
                                    text-[0.4375rem]
                                    font-semibold
                                    uppercase
                                    leading-3
                                    tracking-[0.2em]
                                    text-white/70
                                "
                            >
                                SCHOOL
                            </p>

                            <h2
                                className="
                                    mt-1.5
                                    w-full
                                    whitespace-nowrap
                                    text-center
                                    font-serif
                                    text-[1.35rem]
                                    font-black
                                    uppercase
                                    leading-none
                                    tracking-[-0.03em]
                                    text-white
                                "
                            >
                                Newsletter
                            </h2>

                            <div
                                className="
                                    mx-auto
                                    mt-4
                                    h-0.5
                                    w-9
                                    bg-white/70
                                "
                            />

                            <p
                                className="
                                    mx-auto
                                    mt-2.5
                                    max-w-full
                                    whitespace-nowrap
                                    text-[0.375rem]
                                    font-medium
                                    leading-3
                                    tracking-[0.04em]
                                    text-white/75
                                "
                            >
                                School Life • Learning • Activities
                            </p>
                        </div>

                        {/* Issue + date */}

                        <div
                            className="
                                absolute
                                bottom-6
                                left-4
                                right-4
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
                                        whitespace-nowrap
                                        text-[0.375rem]
                                        uppercase
                                        tracking-[0.18em]
                                        text-white/60
                                    "
                                >
                                    ISSUE
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        whitespace-nowrap
                                        text-xs
                                        font-bold
                                        leading-4
                                        text-white
                                    "
                                >
                                    {issue}
                                </p>
                            </div>

                            <p
                                className="
                                    min-w-0
                                    max-w-[48%]
                                    whitespace-nowrap
                                    text-right
                                    text-[0.4375rem]
                                    font-medium
                                    leading-3
                                    text-white/75
                                "
                            >
                                {date}
                            </p>
                        </div>

                        {/* Bottom strip */}

                        <div
                            className="
                                absolute
                                bottom-0
                                left-0
                                right-0
                                h-1.5
                                bg-black/15
                            "
                        />
                    </div>
                </div>
            </div>

            {/* =====================================================
                INFORMATION BELOW BOOK
            ====================================================== */}

            {showInfo && (
                <div
                    className="
                        mx-auto
                        mt-4
                        max-w-[15rem]
                        px-1
                    "
                >
                    {/* Date */}

                    <div
                        className="
                            flex
                            min-w-0
                            items-center
                            gap-1.5
                            text-[0.5625rem]
                            font-medium
                            text-muted

                            sm:text-[0.625rem]
                        "
                    >
                        <CalendarDays className="size-3 shrink-0" />

                        <span className="min-w-0 whitespace-normal break-normal">
                            {date}
                        </span>
                    </div>

                    {/* Title */}

                    <h3
                        className="
                            mt-1.5
                            whitespace-normal
                            break-normal
                            text-xs
                            font-bold
                            leading-5
                            text-heading

                            sm:text-sm
                        "
                    >
                        {title}
                    </h3>

                    {/* Accent */}

                    <div
                        className="
                            mt-1.5
                            h-0.5
                            w-7
                            bg-accent
                            transition-all
                            duration-300
                            group-hover:w-11
                        "
                    />

                    {/* Description */}

                    <p
                        className="
                            mt-2
                            line-clamp-2
                            whitespace-normal
                            break-normal
                            text-[0.625rem]
                            leading-4
                            text-muted

                            sm:text-xs
                        "
                    >
                        {description}
                    </p>

                    {/* Actions */}

                    {href && (
                        <div
                            className="
                                mt-3
                                flex
                                min-w-0
                                items-center
                                gap-3
                            "
                        >
                            <span
                                className="
                                    inline-flex
                                    min-w-0
                                    items-center
                                    gap-1
                                    text-[0.625rem]
                                    font-semibold
                                    text-primary

                                    sm:text-xs
                                "
                            >
                                <span className="whitespace-nowrap">
                                    Read Newsletter
                                </span>

                                <ArrowRight
                                    className="
                                        size-3
                                        shrink-0
                                        transition-transform
                                        duration-200
                                        group-hover:translate-x-1
                                    "
                                />
                            </span>

                            <span
                                className="
                                    ml-auto
                                    flex
                                    size-7
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-accent-soft
                                    text-accent
                                "
                            >
                                <Download className="size-3.5" />
                            </span>
                        </div>
                    )}
                </div>
            )}
        </article>
    );

    if (href) {
        return (
            <Link
                href={href}
                className="
                    block
                    h-full
                    min-w-0
                "
            >
                {card}
            </Link>
        );
    }

    return card;
}