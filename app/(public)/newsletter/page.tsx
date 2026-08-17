import {
    BookOpen,
    FileText,
    Info,
    Newspaper,
} from "lucide-react";

import { NewsletterList } from "@/components/newsletter/NewsletterList";
import { InfoCard } from "@/components/ui/InfoCard";
import { PublicHero } from "@/components/public/PublicHero";

const newsletters = [
    {
        title: "School Newsletter – May 2025",
        description:
            "A collection of recent school activities, student achievements, important events and updates from PM SHRI GSSS Dhanau.",
        image: "/images/newsletter/may-2025.jpg",
        issue: "Issue 06",
        date: "May 2025",
        href: "/newsletter/may-2025",
    },
    {
        title: "School Newsletter – April 2025",
        description:
            "Highlights from the month including classroom activities, celebrations, competitions and student participation.",
        image: "/images/newsletter/april-2025.jpg",
        issue: "Issue 05",
        date: "April 2025",
        href: "/newsletter/april-2025",
    },
    {
        title: "School Newsletter – March 2025",
        description:
            "A look back at academic activities, examinations, achievements and memorable moments from the school.",
        image: "/images/newsletter/march-2025.jpg",
        issue: "Issue 04",
        date: "March 2025",
        href: "/newsletter/march-2025",
    },
    {
        title: "School Newsletter – February 2025",
        description:
            "Monthly updates covering school events, student activities and important developments.",
        image: "/images/newsletter/february-2025.jpg",
        issue: "Issue 03",
        date: "February 2025",
        href: "/newsletter/february-2025",
    },
    {
        title: "School Newsletter – January 2025",
        description:
            "Highlights from January including academic activities, celebrations and student participation.",
        image: "/images/newsletter/january-2025.jpg",
        issue: "Issue 02",
        date: "January 2025",
        href: "/newsletter/january-2025",
    },
    {
        title: "School Newsletter – December 2024",
        description:
            "Important school events, activities and achievements from the final month of the year.",
        image: "/images/newsletter/december-2024.jpg",
        issue: "Issue 01",
        date: "December 2024",
        href: "/newsletter/december-2024",
    },
];

const quickLinks = [
    {
        title: "School News",
        description: "Latest school activities",
        icon: Newspaper,
        href: "/news",
    },
    {
        title: "Gallery",
        description: "View school moments",
        icon: BookOpen,
        href: "/gallery",
    },
    {
        title: "Notices",
        description: "Important announcements",
        icon: FileText,
        href: "/notices",
    },
];

export default function NewsletterPage() {
    return (
        <>
            {/* =========================================================
                HERO
            ========================================================= */}
            <PublicHero
                eyebrow="School Publications"
                title="Newsletter"
                description="Explore our school newsletters featuring activities, achievements, events, student participation and important updates from PM SHRI GSSS Dhanau."
                image="/images/newsletter/newsletter.jpg"
                imageAlt="PM SHRI GSSS Dhanau school building"
                breadcrumbs={[
                    {
                        label: "Home",
                        href: "/",
                    },
                    {
                        label: "Newsletter",
                    },
                ]}
            />

            {/* =========================================================
                MAIN CONTENT
            ========================================================= */}
            <section className="px-4 py-6 sm:px-6 lg:py-8 2xl:px-8">
                <div className="mx-auto max-w-[90rem]">

                    {/* =================================================
                        LEFT + RIGHT COLUMNS
                    ================================================= */}
                    <div
                        className="
                            grid
                            items-stretch
                            gap-6
                            lg:grid-cols-[minmax(0,1fr)_300px]
                        "
                    >
                        {/* =================================================
                            LEFT — NEWSLETTERS
                        ================================================= */}
                        <div
                            className="
                                flex
                                min-w-0
                                flex-col
                            "
                        >
                            <NewsletterList
                                newsletters={newsletters}
                            />
                        </div>

                        {/* =================================================
                            RIGHT — SIDEBAR
                        ================================================= */}
                        <aside
                            className="
                                flex
                                h-full
                                min-h-full
                                flex-col
                                gap-5
                            "
                        >
                            {/* =================================================
                                SUBSCRIBE
                            ================================================= */}
                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-primary-200
                                    bg-primary-50
                                    p-5
                                    dark:border-primary-800
                                    dark:bg-primary-950/40
                                "
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="
                                            flex
                                            size-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-primary-600
                                            text-white
                                            shadow-sm
                                        "
                                    >
                                        <Newspaper className="size-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <h2
                                            className="
                                                text-sm
                                                font-bold
                                                text-primary-800
                                                dark:text-primary-200
                                            "
                                        >
                                            Subscribe to Newsletter
                                        </h2>

                                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                                            Get the latest school updates
                                        </p>
                                    </div>
                                </div>

                                <p
                                    className="
                                        mt-4
                                        text-xs
                                        leading-5
                                        text-muted-foreground
                                    "
                                >
                                    Subscribe to receive our latest
                                    newsletters, school activities and
                                    important updates directly in your
                                    inbox.
                                </p>

                                <form className="mt-4 space-y-2">
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Enter your email"
                                        className="
                                            h-10
                                            w-full
                                            rounded-lg
                                            border
                                            border-border
                                            bg-background
                                            px-3
                                            text-xs
                                            text-foreground
                                            outline-none
                                            placeholder:text-muted-foreground
                                            focus:border-primary-500
                                            focus:ring-1
                                            focus:ring-primary-500/20
                                        "
                                    />

                                    <button
                                        type="submit"
                                        className="
                                            flex
                                            h-10
                                            w-full
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-primary-600
                                            px-4
                                            text-xs
                                            font-semibold
                                            text-white
                                            transition-colors
                                            hover:bg-primary-700
                                        "
                                    >
                                        Subscribe
                                    </button>
                                </form>

                                <p
                                    className="
                                        mt-3
                                        text-center
                                        text-[9px]
                                        text-muted-foreground
                                    "
                                >
                                    We respect your privacy. No spam.
                                </p>
                            </div>

                            {/* =================================================
                                QUICK LINKS
                            ================================================= */}
                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-border
                                    bg-card
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        border-b
                                        border-border
                                        px-5
                                        py-4
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            size-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-primary-50
                                            text-primary-600
                                            dark:bg-primary-950
                                            dark:text-primary-400
                                        "
                                    >
                                        <Newspaper className="size-4" />
                                    </div>

                                    <div className="min-w-0">
                                        <h2
                                            className="
                                                text-sm
                                                font-bold
                                                text-primary-800
                                                dark:text-primary-200
                                            "
                                        >
                                            Quick Links
                                        </h2>

                                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                                            Explore school resources
                                        </p>
                                    </div>
                                </div>

                                <div className="p-2">
                                    {quickLinks.map((item) => (
                                        <InfoCard
                                            key={item.href}
                                            icon={item.icon}
                                            title={item.title}
                                            description={item.description}
                                            href={item.href}
                                            variant="circleIcon"
                                            className="
                                                rounded-lg
                                                px-3
                                                py-2.5
                                                hover:bg-primary-50
                                                dark:hover:bg-primary-950/40
                                            "
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* =================================================
                                ABOUT NEWSLETTER
                            ================================================= */}
                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-border
                                    bg-primary-50/70
                                    p-5
                                    dark:bg-primary-950/30
                                "
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="
                                            flex
                                            size-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-primary-600
                                            text-white
                                        "
                                    >
                                        <Info className="size-4" />
                                    </div>

                                    <h2
                                        className="
                                            text-sm
                                            font-bold
                                            text-primary-800
                                            dark:text-primary-200
                                        "
                                    >
                                        About Our Newsletter
                                    </h2>
                                </div>

                                <p
                                    className="
                                        mt-3
                                        text-xs
                                        leading-5
                                        text-muted-foreground
                                    "
                                >
                                    Our newsletter brings together
                                    important school activities,
                                    celebrations, achievements and
                                    memorable moments from across the
                                    academic session.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}