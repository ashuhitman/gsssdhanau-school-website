import { notFound } from "next/navigation";
import Link from "next/link";

import {
    ArrowLeft,
    BookOpen,
} from "lucide-react";

import {
    getNewsletters,
    getNewsletterBySlug,
} from "@/lib/data/newsletter/get";

import { NewsletterContentsPage } from "@/components/newsletters/pages/NewsletterContentsPage";
import { NewsletterArticlePage } from "@/components/newsletters/pages/NewsletterArticlePage";
import { NewsletterActivityPage } from "@/components/newsletters/pages/NewsletterActivityPage";
import { NewsletterEndPage } from "@/components/newsletters/pages/NewsletterEndPage";
import NewsletterCoverPage from "@/components/newsletters/pages/NewsletterCoverPage";

/* ============================================================
   Page Props
============================================================ */

interface NewsletterPageProps {
    params: Promise<{
        slug: string;
    }>;
}

/* ============================================================
   Static Newsletter Routes
============================================================ */

export async function generateStaticParams() {
    const newsletters = await getNewsletters();

    return newsletters.map((newsletter) => ({
        slug: newsletter.slug,
    }));
}

export const dynamicParams = false;

/* ============================================================
   Month Names
============================================================ */

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
] as const;

/* ============================================================
   Newsletter Page
============================================================ */

export default async function NewsletterPage({
    params,
}: NewsletterPageProps) {
    const { slug } = await params;

    const decodedSlug = decodeURIComponent(slug);

    if (!decodedSlug.trim()) {
        notFound();
    }

    /* ========================================================
       NEWSLETTER

       Includes:
       - incharge
       - digitalCoordinator
       - newsletterMembers
       - articles
       - activities
    ======================================================== */

    const newsletter = await getNewsletterBySlug(
        decodedSlug
    );

    if (!newsletter) {
        notFound();
    }

    /* ========================================================
       MONTH
    ======================================================== */

    const monthName = MONTH_NAMES[newsletter.month - 1];

    /* ========================================================
       STORY COUNT
    ======================================================== */

    const storyCount =
        newsletter.activities.length +
        newsletter.articles.length;

    /* ========================================================
       PAGE
    ======================================================== */

    return (
        <main className="min-h-screen bg-slate-100">
            {/* ==================================================
                ISSUE INFORMATION
            ================================================== */}

            <div
                className="
                    mx-auto
                    max-w-2xl
                    px-4
                    pt-6
                    sm:px-6
                    sm:pt-8
                "
            >
                {/* Back */}

                <Link
                    href="/newsletters"
                    className="
                        mb-5
                        inline-flex
                        items-center
                        gap-1.5
                        text-xs
                        font-semibold
                        text-slate-500
                        transition-colors
                        hover:text-blue-950
                    "
                >
                    <ArrowLeft className="size-3.5" />

                    Back to Newsletters
                </Link>

                {/* Issue meta */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-slate-200
                        pb-4
                    "
                >
                    {/* Left */}

                    <div>
                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >
                            <BookOpen
                                className="
                                    size-4
                                    text-amber-500
                                "
                            />

                            <p
                                className="
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.25em]
                                    text-amber-600
                                "
                            >
                                School Newsletter
                            </p>
                        </div>

                        <h1
                            className="
                                mt-1
                                text-lg
                                font-black
                                tracking-tight
                                text-slate-950
                            "
                        >
                            Issue #
                            {String(
                                newsletter.issue
                            ).padStart(2, "0")}
                        </h1>
                    </div>

                    {/* Right */}

                    <div className="text-right">
                        <p
                            className="
                                text-sm
                                font-bold
                                text-blue-950
                            "
                        >
                            {monthName}{" "}
                            {newsletter.year}
                        </p>

                        <p
                            className="
                                mt-0.5
                                text-[9px]
                                text-slate-400
                            "
                        >
                            {storyCount}{" "}
                            {storyCount === 1
                                ? "story"
                                : "stories"}
                        </p>
                    </div>
                </div>
            </div>

            {/* ==================================================
                NEWSLETTER
            ================================================== */}

            <div
                className="
                    mx-auto
                    max-w-4xl
                    px-4
                    py-8
                    sm:px-6
                    sm:py-12
                    lg:px-8
                "
            >
                <div
                    className="
                        mx-auto
                        max-w-2xl
                        space-y-8
                    "
                >
                    {/* ==================================================
                        COVER
                    ================================================== */}

                    <NewsletterCoverPage
                        title={newsletter.title}
                        coverImage={newsletter.coverImage}
                        schoolName="PM SHRI GSSS DHANAU"
                        issue={`ISSUE ${newsletter.issue}`}
                        date={`${monthName.toUpperCase()} ${newsletter.year}`}
                        subtitle={
                            newsletter.description ??
                            undefined
                        }
                    />

                    {/* ==================================================
                        CONTENTS
                    ================================================== */}

                    <NewsletterContentsPage
                        newsletter={newsletter}
                    />

                    {/* ==================================================
                        ACTIVITIES
                    ================================================== */}

                    {newsletter.activities.map(
                        (activity) => (
                            <NewsletterActivityPage
                                key={`activity-${activity.id}`}
                                activity={activity}
                            />
                        )
                    )}

                    {/* ==================================================
                        ARTICLES
                    ================================================== */}

                    {newsletter.articles.map(
                        (article) => (
                            <NewsletterArticlePage
                                key={`article-${article.id}`}
                                article={article}
                            />
                        )
                    )}

                    {/* ==================================================
                        END PAGE
                    ================================================== */}

                    <NewsletterEndPage
                        issueNumber={newsletter.issue}
                    />
                </div>
            </div>
        </main>
    );
}