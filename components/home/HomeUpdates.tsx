import {
    ArrowRight,
    Award,
    CalendarDays,
    ChevronRight,
    Medal,
    Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const news = [
    {
        title: "Tiranga Rally Organized in School",
        description:
            "Students participated with great enthusiasm in the Tiranga Rally organized by the school.",
        date: "12 May 2025",
        image: "/images/news/tiranga-rally.jpg",
        href: "/news/tiranga-rally",
    },
    {
        title: "Inter-House Volleyball Tournament",
        description:
            "Students displayed excellent teamwork and sportsmanship during the tournament.",
        date: "08 May 2025",
        image: "/images/news/volleyball.jpg",
        href: "/news/inter-house-volleyball",
    },
    {
        title: "Educational Visit to Local Farm",
        description:
            "Students visited a local farm to learn about modern farming practices.",
        date: "05 May 2025",
        image: "/images/news/farm-visit.jpg",
        href: "/news/farm-visit",
    },
];

const achievements = [
    {
        title: "District Level Kabaddi Winner",
        description:
            "Our students secured first position in the District Level Kabaddi Competition.",
        date: "10 May 2025",
        icon: Medal,
    },
    {
        title: "Board Examination 2024–25",
        description:
            "Excellent results by our Class 10 and 12 students.",
        date: "30 Apr 2025",
        icon: Award,
    },
    {
        title: "Best Teacher Award",
        description:
            "A member of our faculty was honoured with the Best Teacher Award.",
        date: "28 Apr 2025",
        icon: Star,
    },
];

export function HomeUpdates() {
    return (
        <section className="px-4 py-8 sm:px-6 lg:py-10 xl:px-8">
            <div className="mx-auto grid max-w-[90rem] gap-5 lg:grid-cols-2 xl:grid-cols-[1fr_1fr_0.8fr]">
                <LatestNews />

                <RecentAchievements />

                <SchoolHighlight />
            </div>
        </section>
    );
}

/* ================================================================
   SECTION HEADER
================================================================ */

function SectionHeader({
    eyebrow,
    title,
    href,
    linkLabel,
}: {
    eyebrow: string;
    title: string;
    href: string;
    linkLabel: string;
}) {
    return (
        <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
                <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-400">
                    {eyebrow}
                </p>

                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-foreground">
                    {title}
                </h2>
            </div>

            <Link
                href={href}
                className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400"
            >
                {linkLabel}

                <ArrowRight className="size-3.5" />
            </Link>
        </div>
    );
}

/* ================================================================
   LATEST NEWS
================================================================ */

function LatestNews() {
    return (
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <SectionHeader
                eyebrow="Stay Updated"
                title="Latest News & Activities"
                href="/news"
                linkLabel="View All"
            />

            <div className="mt-5 divide-y divide-border">
                {news.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="group flex gap-4 py-4 first:pt-0 last:pb-0"
                    >
                        {/* Image */}
                        <div className="relative size-[4.5rem] shrink-0 overflow-hidden rounded-xl">
                            <Image
                                src={item.image}
                                alt=""
                                fill
                                sizes="4.5rem"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                            <h3 className="line-clamp-2 text-sm font-bold leading-5 text-foreground transition-colors group-hover:text-primary-600">
                                {item.title}
                            </h3>

                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                                {item.description}
                            </p>

                            <div className="mt-1.5 flex items-center gap-1.5 text-[0.625rem] text-muted-foreground">
                                <CalendarDays className="size-3" />
                                {item.date}
                            </div>
                        </div>

                        <ChevronRight className="mt-5 size-4 shrink-0 text-primary-400 transition-transform group-hover:translate-x-1" />
                    </Link>
                ))}
            </div>
        </section>
    );
}

/* ================================================================
   ACHIEVEMENTS
================================================================ */

function RecentAchievements() {
    return (
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <SectionHeader
                eyebrow="Celebrating Success"
                title="Recent Achievements"
                href="/achievements"
                linkLabel="View All"
            />

            <div className="mt-5 divide-y divide-border">
                {achievements.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.title}
                            href="/achievements"
                            className="group flex gap-4 py-4 first:pt-0 last:pb-0"
                        >
                            {/* Icon */}
                            <div className="flex size-[4.5rem] shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500 dark:bg-primary-950">
                                <Icon
                                    className="size-8"
                                    strokeWidth={1.6}
                                />
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                                <h3 className="text-sm font-bold leading-5 text-foreground transition-colors group-hover:text-primary-600">
                                    {item.title}
                                </h3>

                                <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                                    {item.description}
                                </p>

                                <div className="mt-1.5 flex items-center gap-1.5 text-[0.625rem] text-muted-foreground">
                                    <CalendarDays className="size-3" />
                                    {item.date}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

/* ================================================================
   SCHOOL HIGHLIGHT
================================================================ */

function SchoolHighlight() {
    return (
        <section className="grid gap-5">
            {/* Mission */}
            <div className="relative overflow-hidden rounded-2xl bg-primary-600 p-6 text-white">
                <div className="relative z-10">
                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-primary-100">
                        Our Mission
                    </p>

                    <h2 className="mt-2 text-xl font-extrabold leading-tight">
                        Inspiring Learning.
                        <br />
                        Building Character.
                    </h2>

                    <p className="mt-3 text-xs leading-6 text-primary-50">
                        We strive to create an environment where every
                        student can learn, grow with confidence and become
                        a responsible citizen.
                    </p>

                    <Link
                        href="/about"
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-primary-700 transition-colors hover:bg-primary-50"
                    >
                        Know More

                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>

                {/* Decorative circles */}
                <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 size-40 rounded-full border border-white/15"
                />

                <div
                    aria-hidden="true"
                    className="absolute -bottom-20 -right-12 size-56 rounded-full border border-white/10"
                />
            </div>

            {/* School image */}
            <Link
                href="/gallery"
                className="group relative min-h-[13rem] overflow-hidden rounded-2xl"
            >
                <Image
                    src="/images/school-building.jpg"
                    alt="PM SHRI GSSS Dhanau"
                    fill
                    sizes="(max-width: 1280px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-primary-200">
                        Explore
                    </p>

                    <h2 className="mt-1 text-lg font-extrabold">
                        School Gallery
                    </h2>

                    <p className="mt-1 text-xs text-white/75">
                        Discover moments from school life →
                    </p>
                </div>
            </Link>
        </section>
    );
}