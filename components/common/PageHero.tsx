import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface HeroStat {
    value: string;
    label: string;
    icon?: ReactNode;
    iconClassName?: string;
}

interface HeroAction {
    label: string;
    href: string;
    icon?: ReactNode;
    variant?: "primary" | "secondary" | "ghost";
}

interface PageHeroProps {
    subheading?: string;

    title: string;
    highlight?: string;
    description: string;

    image: string;
    imageAlt?: string;

    breadcrumb?: BreadcrumbItem[];

    stats?: HeroStat[];

    actions?: HeroAction[];

    className?: string;
    imageViewTransitionName?: string;
}

export default function PageHero({
    subheading,
    title,
    highlight,
    description,
    image,
    imageAlt = "",
    breadcrumb = [],
    stats = [],
    actions = [],
    className = "",
    imageViewTransitionName

}: PageHeroProps) {
    const hasStats = stats.length > 0;
    const hasActions = actions.length > 0;

    return (
        <section
            className={`
                relative
                overflow-hidden
                bg-background
               
                ${className}
            `}
        >
            <div
                className="
                    relative
                    mx-auto
                    w-full
                    
                "
            >
                {/* =====================================================
                    MAIN HERO
                ====================================================== */}

                <div
                    className="
                        relative
                        grid
                        grid-cols-1
                        lg:grid-cols-[40%_60%]
                        
                       
                    "
                >
                    {/* =================================================
                        LEFT CONTENT
                    ================================================== */}

                    <div className="
        relative
        z-20
        flex
        min-h-[40svh]
        flex-col
        justify-center
        px-4
        py-8
        sm:px-6
        sm:py-9
        md:py-10
        lg:px-8
        lg:py-8
    "
                    >
                        {/* =================================================
                            DECORATIVE BACKGROUND
                        ================================================== */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-0
                                -z-10
                                overflow-hidden
                            "
                        >
                            <div
                                className="
                                    absolute
                                    -left-[12%]
                                    top-[5%]
                                    aspect-square
                                    w-[55%]
                                    rounded-full
                                    bg-primary-soft
                                    opacity-60
                                    blur-3xl
                                "
                            />

                            <div
                                className="
                                    absolute
                                    bottom-[-30%]
                                    left-[15%]
                                    aspect-square
                                    w-[45%]
                                    rounded-full
                                    bg-accent-soft
                                    opacity-40
                                    blur-3xl
                                "
                            />
                        </div>

                        {/* =================================================
                            BREADCRUMB
                        ================================================== */}

                        {breadcrumb.length > 0 && (
                            <nav
                                aria-label="Breadcrumb"
                                className="
                                    mb-5
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-1
                                    text-[0.7rem]
                                    text-muted
                                    sm:text-xs
                                "
                            >
                                <Link
                                    href="/"
                                    className="
                                        transition-colors
                                        hover:text-primary
                                    "
                                >
                                    Home
                                </Link>

                                {breadcrumb.map((item, index) => {
                                    const isLast =
                                        index === breadcrumb.length - 1;

                                    return (
                                        <div
                                            key={`${item.label}-${index}`}
                                            className="
                                                flex
                                                items-center
                                                gap-1
                                            "
                                        >
                                            <ChevronRight
                                                size={12}
                                                className="text-muted"
                                            />

                                            {item.href && !isLast ? (
                                                <Link
                                                    href={item.href}
                                                    className="
                                                        transition-colors
                                                        hover:text-primary
                                                    "
                                                >
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <span
                                                    className="
                                                        font-medium
                                                        text-primary
                                                    "
                                                    aria-current={
                                                        isLast
                                                            ? "page"
                                                            : undefined
                                                    }
                                                >
                                                    {item.label}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </nav>
                        )}

                        {/* =================================================
                            SUBHEADING
                        ================================================== */}

                        {subheading && (
                            <div
                                className="
                                    mb-2
                                    text-sm
                                    font-semibold
                                    tracking-wide
                                    text-accent

                                    sm:text-base
                                "
                            >
                                {subheading}
                            </div>
                        )}

                        {/* =================================================
                            TITLE

                            Always stays on one line.
                        ================================================== */}

                        <h1
                            className="
                                w-fit
                                max-w-full
                                text-[clamp(1.75rem,5vw,2.8rem)]
                                font-bold
                                leading-none
                                tracking-[-0.04em]
                                text-primary
                            "
                        >
                            {title}

                            {highlight && (
                                <>
                                    {" "}
                                    <span className="text-primary">
                                        {highlight}
                                    </span>
                                </>
                            )}
                        </h1>

                        {/* =================================================
                            ORANGE UNDERLINE
                        ================================================== */}

                        <div
                            className="
                                mt-4
                                flex
                                items-center
                                gap-1
                            "
                        >
                            <span
                                className="
                                    h-[3px]
                                    w-10
                                    rounded-full
                                    bg-accent
                                "
                            />

                            <span
                                className="
                                    h-[3px]
                                    w-2
                                    rounded-full
                                    bg-accent
                                "
                            />
                        </div>

                        {/* =================================================
                            DESCRIPTION
                        ================================================== */}

                        <p
                            className="
                                mt-4
                                max-w-[32rem]
                                text-[clamp(0.82rem,1.15vw,0.98rem)]
                                leading-[1.65]
                                text-body
                                sm:mt-5
                            "
                        >
                            {description}
                        </p>

                        {/* =================================================
                            ACTIONS / STATS / RESERVED SPACE

                            Priority:
                            1. Actions
                            2. Stats
                            3. Invisible placeholder
                        ================================================== */}

                        <div
                            className="
                                mt-6
                                min-h-10
                                sm:mt-7
                            "
                        >
                            {/* =================================================
                                ACTIONS
                            ================================================== */}

                            {hasActions && (
                                <div
                                    className="
                                        flex
                                        flex-wrap
                                        items-center
                                        gap-3
                                    "
                                >
                                    {actions.map((action, index) => {
                                        const variant =
                                            action.variant ?? "primary";

                                        return (
                                            <Link
                                                key={`${action.label}-${index}`}
                                                href={action.href}
                                                className={`
                                                    group
                                                    inline-flex
                                                    min-h-10
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    rounded-full
                                                    px-5
                                                    py-2
                                                    text-sm
                                                    font-semibold
                                                    transition-all
                                                    duration-200

                                                    ${variant === "primary"
                                                        ? `
                                                                bg-primary
                                                                text-white
                                                                shadow-school-button
                                                                hover:bg-primary-hover
                                                            `
                                                        : ""
                                                    }

                                                    ${variant === "secondary"
                                                        ? `
                                                                border
                                                                border-default
                                                                bg-card
                                                                text-primary
                                                                hover:bg-surface-hover
                                                            `
                                                        : ""
                                                    }

                                                    ${variant === "ghost"
                                                        ? `
                                                                text-primary
                                                                hover:bg-primary-soft
                                                            `
                                                        : ""
                                                    }
                                                `}
                                            >
                                                {action.icon && (
                                                    <span className="shrink-0">
                                                        {action.icon}
                                                    </span>
                                                )}

                                                <span>{action.label}</span>

                                                {!action.icon &&
                                                    variant === "primary" && (
                                                        <ArrowRight
                                                            size={16}
                                                            className="
                                                                transition-transform
                                                                duration-200
                                                                group-hover:translate-x-1
                                                            "
                                                        />
                                                    )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}

                            {/* =================================================
                                STATS
                            ================================================== */}

                            {!hasActions && hasStats && (
                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        gap-4
                                        sm:grid-cols-3
                                        sm:gap-3
                                    "
                                >
                                    {stats.map((stat, index) => (
                                        <div
                                            key={`${stat.label}-${index}`}
                                            className="
                                                flex
                                                min-w-0
                                                items-center
                                                gap-2.5
                                            "
                                        >
                                            <div
                                                className={`
                                                    flex
                                                    h-10
                                                    w-10
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    ${stat.iconClassName ??
                                                    "icon-bg-primary icon-primary"
                                                    }
                                                `}
                                            >
                                                {stat.icon}
                                            </div>

                                            <div className="min-w-0">
                                                <div
                                                    className="
                                                        text-[clamp(1rem,1.7vw,1.25rem)]
                                                        font-bold
                                                        leading-tight
                                                        text-primary
                                                    "
                                                >
                                                    {stat.value}
                                                </div>

                                                <div
                                                    className="
                                                        mt-0.5
                                                        text-[0.62rem]
                                                        font-medium
                                                        leading-tight
                                                        text-muted
                                                        sm:text-[0.68rem]
                                                    "
                                                >
                                                    {stat.label}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* =================================================
                                INVISIBLE PLACEHOLDER
                            ================================================== */}

                            {!hasActions && !hasStats && (
                                <div
                                    aria-hidden="true"
                                    className="
                                    hidden
                                        invisible
                                        sm:grid
                                        sm:grid-cols-1
                                       sm:gap-4
                                        sm:grid-cols-3
                                        sm:gap-3

                                    "
                                >
                                    <div className="h-10" />
                                    <div className="h-10" />
                                    <div className="h-10" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* =================================================
                        RIGHT IMAGE
                    ================================================== */}

                    <div
                        className="
                            relative
                            min-h-[18rem]
                            sm:min-h-[22rem]
                            md:min-h-[24rem]
                            lg:min-h-[40svh]
                            xl:min-h-[50svh]
                            
                        "
                    >
                        <div
                            style={{
                                viewTransitionName: imageViewTransitionName,
                            }}
                            className="relative h-full w-full"
                        >
                            <Image
                                src={image}
                                alt={imageAlt}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        {/* Left fade */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-y-0
                                left-0
                                hidden
                                w-[40%]
                                bg-gradient-to-r
                                from-background
                                via-background/70
                                to-transparent
                                lg:block
                            "
                        />

                        {/* Bottom fade */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-x-0
                                bottom-0
                                h-[20%]
                                bg-gradient-to-t
                                from-background/70
                                to-transparent
                            "
                        />

                        {/* Mobile fade */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-x-0
                                top-0
                                h-[15%]
                                bg-gradient-to-b
                                from-background/40
                                to-transparent
                                lg:hidden
                            "
                        />
                    </div>
                </div>

                {/* =====================================================
                    PURPLE + ORANGE CURVE
                ====================================================== */}

                <div
                    className="
                        pointer-events-none
                        relative
                        z-30
                        -mt-2
                        h-8
                        overflow-hidden
                        sm:-mt-3
                        sm:h-10
                    "
                >
                    <div
                        className="
                            absolute
                            -bottom-7
                            left-[15%]
                            h-10
                            w-[100%]
                            rotate-[-2deg]
                            rounded-[50%]
                            border-t-[5px]
                            border-primary
                        "
                    />

                    <div
                        className="
                            absolute
                            -bottom-8
                            left-[15%]
                            h-10
                            w-[100%]
                            rotate-[-2deg]
                            rounded-[50%]
                            border-t-[2px]
                            border-accent
                        "
                    />
                </div>
            </div>
        </section>
    );
}