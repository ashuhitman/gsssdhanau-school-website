import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PublicHeroProps {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    children?: React.ReactNode;
    bottomLeftIcon?: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export function PublicHero({
    eyebrow,
    title,
    description,
    image,
    imageAlt,
    children,
    bottomLeftIcon,
    breadcrumbs,
}: PublicHeroProps) {
    return (
        <section className="relative overflow-hidden bg-background">
            {/* Bottom-left icon relative to the whole hero */}
            {bottomLeftIcon && (
                <div
                    aria-hidden="true"
                    className="absolute bottom-4 left-4 z-20"
                >
                    {bottomLeftIcon}
                </div>
            )}

            <div className="mx-auto">
                <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                    {/* =================================================
                        CONTENT
                    ================================================= */}
                    <div className="relative flex items-center bg-primary-50 dark:bg-primary-950">
                        {/* Decorative dots */}
                        <div
                            aria-hidden="true"
                            className="absolute left-5 top-5 grid grid-cols-6 gap-1.5 opacity-60 sm:left-8"
                        >
                            {Array.from({ length: 30 }).map(
                                (_, index) => (
                                    <span
                                        key={index}
                                        className="size-[3px] rounded-full bg-primary-400"
                                    />
                                ),
                            )}
                        </div>

                        {/* Main content */}
                        <div className="relative z-10 w-full px-10 py-6 sm:px-12 sm:py-7 lg:px-14 lg:py-8 xl:px-16">
                            <div className="max-w-[650px]">
                                {/* =================================================
                                    BREADCRUMB
                                ================================================= */}
                                {breadcrumbs &&
                                    breadcrumbs.length > 0 && (
                                        <nav
                                            aria-label="Breadcrumb"
                                            className="mb-5"
                                        >
                                            <ol className="flex items-center gap-1.5 text-xs font-medium">
                                                {breadcrumbs.map(
                                                    (
                                                        item,
                                                        index,
                                                    ) => {
                                                        const isLast =
                                                            index ===
                                                            breadcrumbs.length -
                                                            1;

                                                        return (
                                                            <li
                                                                key={`${item.label}-${index}`}
                                                                className="flex items-center gap-1.5"
                                                            >
                                                                {/* Home icon */}
                                                                {index ===
                                                                    0 && (
                                                                        <Home className="size-3.5 shrink-0 text-primary-600 dark:text-primary-400" />
                                                                    )}

                                                                {/* Breadcrumb label */}
                                                                {item.href &&
                                                                    !isLast ? (
                                                                    <Link
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className="whitespace-nowrap text-muted-foreground transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Link>
                                                                ) : (
                                                                    <span
                                                                        className={`whitespace-nowrap ${isLast
                                                                            ? "font-semibold text-primary-700 dark:text-primary-300"
                                                                            : "text-muted-foreground"
                                                                            }`}
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </span>
                                                                )}

                                                                {/* Separator */}
                                                                {!isLast && (
                                                                    <ChevronRight className="size-3 shrink-0 text-muted-foreground/60" />
                                                                )}
                                                            </li>
                                                        );
                                                    },
                                                )}
                                            </ol>
                                        </nav>
                                    )}

                                {/* =================================================
                                    EYEBROW
                                ================================================= */}
                                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary-600 dark:text-primary-300 sm:text-sm">
                                    {eyebrow}
                                </p>

                                {/* =================================================
                                    TITLE
                                ================================================= */}
                                <h1
                                    className="
                                        mt-1.5
                                        whitespace-nowrap
                                        text-[clamp(1.5rem,2.5vw,2.4rem)]
                                        font-extrabold
                                        leading-tight
                                        tracking-[-0.025em]
                                        text-foreground
                                    "
                                >
                                    {title}
                                </h1>

                                {/* =================================================
                                    ACCENT
                                ================================================= */}
                                <div className="mt-3 h-0.5 w-10 bg-primary-500" />

                                {/* =================================================
                                    DESCRIPTION
                                ================================================= */}
                                <p className="mt-3 max-w-[500px] text-xs font-medium leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                                    {description}
                                </p>

                                {/* =================================================
                                    PAGE-SPECIFIC CONTENT
                                ================================================= */}
                                {children}
                            </div>
                        </div>

                        {/* =================================================
                            TEAL ANGLED ACCENT
                        ================================================= */}
                        <div
                            aria-hidden="true"
                            className="
                                absolute
                                -right-4
                                inset-y-0
                                hidden
                                w-8
                                skew-x-[-8deg]
                                bg-primary-600
                                lg:block
                            "
                        />
                    </div>

                    {/* =================================================
                        SCHOOL IMAGE
                    ================================================= */}
                    <div className="relative aspect-video">
                        <Image
                            src={image}
                            alt={imageAlt}
                            fill
                            priority
                            sizes="width: 100%"
                            className="object-cover object-center"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/10" />

                        {/* Image caption */}
                        <div className="absolute bottom-3 left-3 hidden rounded-md border border-white/20 bg-black/25 px-3 py-1.5 text-white backdrop-blur-md sm:block">
                            <p className="text-xs font-semibold">
                                PM SHRI GSSS Dhanau
                            </p>

                            <p className="mt-0.5 text-[10px] text-white/70">
                                Dhanau, Barmer, Rajasthan
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}