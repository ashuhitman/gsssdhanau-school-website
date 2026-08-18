import {
    CalendarDays,
    Newspaper,
    Trophy,
} from "lucide-react";


import NewsletterArchiveGrid, {
    NewsletterItem,
} from "@/components/newsletter/NewsletterArchiveGrid";
import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import NewsletterSubscribe from "@/components/newsletter/NewsletterSubscribe";
import NewsletterLatestIssue from "@/components/newsletter/NewsletterLatestIssue";
import { PageLayout } from "@/components/layout/PageLayout";

export default function NewsletterPage() {
    /* ================================================================
       NEWSLETTER ARCHIVE
    ================================================================= */

    const newsletters: NewsletterItem[] = [
        {
            id: "april-2025",
            title: "Newsletter – April 2025",
            description:
                "Highlights, activities and achievements from April 2025.",
            issue: "April 2025",
            date: "20 April 2025",
            href: "/newsletter/april-2025",
        },

        {
            id: "march-2025",
            title: "Newsletter – March 2025",
            description:
                "Highlights, activities and achievements from March 2025.",
            issue: "March 2025",
            date: "20 March 2025",
            href: "/newsletter/march-2025",
        },

        {
            id: "february-2025",
            title: "Newsletter – February 2025",
            description:
                "Highlights, activities and achievements from February 2025.",
            issue: "February 2025",
            date: "20 February 2025",
            href: "/newsletter/february-2025",
        },

        {
            id: "january-2025",
            title: "Newsletter – January 2025",
            description:
                "Highlights, activities and achievements from January 2025.",
            issue: "January 2025",
            date: "20 January 2025",
            href: "/newsletter/january-2025",
        },

        {
            id: "december-2024",
            title: "Newsletter – December 2024",
            description:
                "Highlights, activities and achievements from December 2024.",
            issue: "December 2024",
            date: "20 December 2024",
            href: "/newsletter/december-2024",
        },

        {
            id: "november-2024",
            title: "Newsletter – November 2024",
            description:
                "Highlights, activities and achievements from November 2024.",
            issue: "November 2024",
            date: "20 November 2024",
            href: "/newsletter/november-2024",
        },
    ];

    return (
        <>
            {/* =========================================================
                HERO
            ========================================================== */}
            <PageLayout hero={<PageHero
                breadcrumb={[
                    {
                        label: "Newsletter",
                    },
                ]}
                title="School"
                highlight="Newsletter"
                description="Stay connected with the latest updates, achievements, events and stories from PM SHRI GSSS Dhanau."
                image="/images/newsletter/hero.jpg"
                imageAlt="PM SHRI GSSS Dhanau school"
                stats={[
                    {
                        value: "12+",
                        label: "Issues Published",
                        icon: <Newspaper size={20} />,
                        iconClassName: "icon-bg-primary icon-primary",
                    },
                    {
                        value: "500+",
                        label: "Students Featured",
                        icon: <Trophy size={20} />,
                        iconClassName: "icon-bg-accent icon-accent",
                    },
                    {
                        value: "2025",
                        label: "Latest Edition",
                        icon: <CalendarDays size={20} />,
                        iconClassName: "icon-bg-success icon-success",
                    },
                ]}
            />
            }>

                {/* =========================================================
                CONTENT
            ========================================================== */}

                <div
                    className="
                    mx-auto
                    w-full
                   

                  
                "
                >
                    {/* =====================================================
                    SUBSCRIBE
                ====================================================== */}

                    <section
                        className="
                        py-10

                        sm:py-12

                        lg:py-16
                    "
                    >
                        <NewsletterSubscribe />
                    </section>

                    {/* =====================================================
                    LATEST NEWSLETTER
                ====================================================== */}

                    <section
                        id="latest-newsletter"
                        className="
                        border-t
                        border-default
                        py-10

                        sm:py-12

                        lg:py-16
                    "
                    >
                        <SectionHeading
                            align="center"
                            eyebrow="Featured"
                            title="Latest Newsletter"
                            description="Take a look at our most recent school newsletter and discover what has been happening at PM SHRI GSSS Dhanau."
                        />

                        <div
                            className="
                            mt-8

                            sm:mt-10
                        "
                        >
                            <NewsletterLatestIssue
                                title="Newsletter – May 2025"
                                description="Read about our recent activities, student achievements, important announcements and upcoming events."
                                issue="May 2025"
                                date="May 20, 2025"
                                pages="12 Pages"
                                size="2.4 MB"
                                href="/newsletter/may-2025"
                                downloadHref="/documents/newsletters/may-2025.pdf"
                            />
                        </div>
                    </section>

                    {/* =====================================================
                    NEWSLETTER ARCHIVE
                ====================================================== */}

                    <section
                        id="newsletter-archive"
                        className="
                        border-t
                        border-default
                        py-10

                        sm:py-12

                        lg:py-16
                    "
                    >
                        <SectionHeading
                            align="center"
                            eyebrow="Explore"
                            title="Newsletter Archive"
                            description="Browse previous editions and stay connected with the journey, achievements and activities of our school."
                        />

                        <div
                            className="
                            mt-8

                            sm:mt-10
                        "
                        >
                            <NewsletterArchiveGrid
                                newsletters={newsletters}
                            />
                        </div>
                    </section>

                    {/* =====================================================
                    CLOSING MESSAGE
                ====================================================== */}

                    <section
                        className="
                        border-t
                        border-default
                        py-10

                        sm:py-12

                        lg:py-16
                    "
                    >
                        <div
                            className="
                            mx-auto
                            max-w-[48rem]
                            text-center
                        "
                        >
                            <div
                                className="
                                mx-auto
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-full
                                icon-bg-accent
                                icon-accent
                            "
                            >
                                <Newspaper size={22} />
                            </div>

                            <h2
                                className="
                                mt-4
                                text-[clamp(1.3rem,2.5vw,1.8rem)]
                                font-bold
                                text-heading
                            "
                            >
                                Keeping our school community connected
                            </h2>

                            <p
                                className="
                                mx-auto
                                mt-3
                                max-w-[42rem]
                                text-sm
                                leading-6
                                text-muted

                                sm:text-base
                            "
                            >
                                Our newsletter brings together important
                                announcements, student achievements, school
                                activities and memorable moments from across
                                the academic year.
                            </p>
                        </div>
                    </section>

                    {/* Bottom spacing */}

                    <div className="h-4 sm:h-6 lg:h-8" />
                </div>

            </PageLayout>


        </>
    );
}