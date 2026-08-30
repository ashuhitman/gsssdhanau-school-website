import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    BookOpen,
    CalendarDays,
    PenLine,
} from "lucide-react";

export function NewsletterHero() {
    return (
        <section className="relative overflow-hidden bg-[var(--school-background)]">
            {/* Decorative dots */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute right-8 top-8
                    hidden opacity-50 sm:block
                "
            >
                <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 25 }).map((_, index) => (
                        <span
                            key={index}
                            className="
                                h-1 w-1 rounded-full
                                bg-[var(--school-primary)]
                            "
                        />
                    ))}
                </div>
            </div>

            <div
                className="
                    relative mx-auto grid max-w-7xl
                    items-center
                    gap-8
                    px-4 py-12
                    sm:px-6 sm:py-16
                    lg:grid-cols-[0.9fr_1.1fr]
                    lg:gap-10
                    lg:px-8 lg:py-20
                "
            >
                {/* =====================================================
                    LEFT CONTENT
                ====================================================== */}

                <div className="relative z-10 max-w-2xl">
                    {/* Eyebrow */}
                    <div className="mb-6 flex items-center gap-3">
                        <span
                            className="
                                flex h-10 w-10 shrink-0
                                items-center justify-center
                                rounded-full
                                bg-[var(--school-primary)]
                                text-white
                            "
                        >
                            <BookOpen
                                className="h-5 w-5"
                                strokeWidth={1.8}
                            />
                        </span>

                        <div>
                            <span
                                className="
                                    text-xs font-semibold
                                    uppercase tracking-[0.16em]
                                    text-[var(--school-primary)]
                                "
                            >
                                The School's Student Voice
                            </span>

                            <span
                                className="
                                    mt-2 block h-0.5 w-10
                                    bg-[var(--school-primary)]
                                "
                            />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1
                        className="
                            text-5xl font-bold
                            leading-[0.95]
                            tracking-tight
                            text-[var(--school-heading)]
                            sm:text-6xl
                            lg:text-7xl
                        "
                    >
                        Newsletter
                        <span
                            className="
                                block
                                font-serif
                                font-normal
                                italic
                                text-[var(--school-primary)]
                            "
                        >
                            Club
                        </span>
                    </h1>

                    {/* Pen decoration */}
                    <div
                        aria-hidden="true"
                        className="
                            mt-2 flex items-center
                            gap-2
                            text-[var(--school-primary)]
                        "
                    >
                        <span
                            className="
                                h-px w-20
                                bg-[var(--school-primary)]
                            "
                        />

                        <PenLine
                            className="h-5 w-5"
                            strokeWidth={1.5}
                        />

                        <span
                            className="
                                h-px w-10
                                bg-[var(--school-primary)]
                            "
                        />
                    </div>

                    {/* Tagline */}
                    <div
                        className="
                            mt-7 flex flex-wrap
                            items-center gap-x-5 gap-y-2
                            text-lg font-medium
                            text-[var(--school-primary)]
                            sm:text-xl
                        "
                    >
                        <span>Stories</span>

                        <span
                            className="
                                h-5 w-px
                                bg-[var(--school-border)]
                            "
                        />

                        <span>Ideas</span>

                        <span
                            className="
                                h-5 w-px
                                bg-[var(--school-border)]
                            "
                        />

                        <span>Voices</span>
                    </div>

                    {/* Divider */}
                    <div
                        className="
                            mt-6 h-1 w-12
                            rounded-full
                            bg-[var(--school-accent)]
                        "
                    />

                    {/* Description */}
                    <p
                        className="
                            mt-6 max-w-lg
                            text-base leading-7
                            text-[var(--school-text)]
                            sm:text-lg sm:leading-8
                        "
                    >
                        A student-led publication celebrating
                        the creativity, achievements and
                        everyday moments of our school community.
                    </p>

                    {/* Actions */}
                    <div
                        className="
                            mt-8 flex flex-wrap gap-3
                        "
                    >
                        <Link
                            href="/newsletters"
                            className="
                                inline-flex items-center gap-2
                                rounded-xl
                                bg-[var(--school-primary)]
                                px-5 py-3
                                text-sm font-semibold text-white
                                shadow-[var(--school-shadow-button)]
                                transition-all duration-200
                                hover:-translate-y-0.5
                                hover:bg-[var(--school-primary-hover)]
                            "
                        >
                            <BookOpen className="h-4 w-4" />

                            Read Latest Issue

                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/newsletters"
                            className="
                                inline-flex items-center gap-2
                                rounded-xl
                                border
                                border-[var(--school-primary)]
                                bg-[var(--school-card)]
                                px-5 py-3
                                text-sm font-semibold
                                text-[var(--school-primary)]
                                transition-all duration-200
                                hover:-translate-y-0.5
                                hover:bg-[var(--school-surface)]
                            "
                        >
                            <CalendarDays className="h-4 w-4" />

                            View Archive
                        </Link>
                    </div>
                </div>

                {/* =====================================================
                    RIGHT IMAGE
                ====================================================== */}

                <div
                    className="
                        relative mx-auto
                        w-full max-w-2xl
                    "
                >
                    {/* Soft blue background shape */}
                    <div
                        aria-hidden="true"
                        className="
                            absolute -inset-3
                            rounded-[3rem]
                            bg-[var(--school-light-blue)]
                            opacity-60
                        "
                    />

                    {/* Image */}
                    <div
                        className="
                            relative overflow-hidden
                            rounded-[2.5rem]
                            bg-[var(--school-card)]
                            p-2
                            shadow-[var(--school-shadow-card)]
                        "
                    >
                        <div
                            className="
                                relative aspect-[4/3]
                                overflow-hidden
                                rounded-[2rem]
                            "
                        >
                            <Image
                                src="/images/newsletter/newsletter-club.jpg"
                                alt="Newsletter Club members working together"
                                fill
                                priority
                                className="
                                    object-cover
                                    transition-transform
                                    duration-700
                                    hover:scale-105
                                "
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            {/* Image gradient */}
                            <div
                                className="
                                    absolute inset-0
                                    bg-gradient-to-t
                                    from-[var(--school-heading)]/45
                                    via-transparent
                                    to-transparent
                                "
                            />

                            {/* Image label */}
                            <div
                                className="
                                    absolute bottom-5 left-5 right-5
                                "
                            >
                                <div
                                    className="
                                        inline-flex items-center gap-2
                                        rounded-full
                                        bg-white/90
                                        px-3 py-2
                                        text-xs font-semibold
                                        text-[var(--school-heading)]
                                        shadow-sm
                                        backdrop-blur-sm
                                    "
                                >
                                    <span
                                        className="
                                            h-2 w-2 rounded-full
                                            bg-[var(--school-accent)]
                                        "
                                    />

                                    Writing • Designing • Creating
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating text */}
                    <div
                        className="
                            absolute -bottom-5 left-5
                            hidden rounded-2xl
                            border
                            border-[var(--school-border)]
                            bg-[var(--school-card)]
                            px-4 py-3
                            shadow-[var(--school-shadow-card)]
                            sm:block
                            lg:left-0
                        "
                    >
                        <p
                            className="
                                text-xs font-medium
                                text-[var(--school-muted)]
                            "
                        >
                            By students, for everyone
                        </p>

                        <p
                            className="
                                mt-0.5 text-sm font-bold
                                text-[var(--school-heading)]
                            "
                        >
                            Every story matters.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}