import PageHero from "@/components/common/PageHero";

import { PageLayout } from "@/components/layout/PageLayout";

import NewsletterLatestIssue from "@/components/newsletters/NewsletterLatestIssue";
import ClubMembers from "@/components/newsletters/ClubMembers";
import PreviousIssues from "@/components/newsletters/PreviousIssues";

import {
    getPublishedNewsletters,
} from "@/lib/data/newsletter/get";

import {
    getNewsletterItemCounts,
} from "@/lib/data/newsletter/items";

import {
    getAllClubMembers,
} from "@/lib/data/clubMember";

/* ============================================================
   Newsletters Page
============================================================ */

export default async function NewslettersPage() {
    const start = performance.now();

    const [newsletters, clubMembers] = await Promise.all([
        (async () => {
            const start = performance.now();

            const result = await getPublishedNewsletters();

            console.log(
                `getPublishedNewsletters: ${(
                    performance.now() - start
                ).toFixed(0)}ms`,
            );

            return result;
        })(),

        (async () => {
            const start = performance.now();

            const result = await getAllClubMembers();

            console.log(
                `getAllClubMembers: ${(
                    performance.now() - start
                ).toFixed(0)}ms`,
            );

            return result;
        })(),
    ]);

    const currentNewsletter = newsletters[0];

    const counts = currentNewsletter
        ? await (async () => {
            const start = performance.now();

            const result = await getNewsletterItemCounts(
                currentNewsletter.id,
            );

            console.log(
                `getNewsletterItemCounts: ${(
                    performance.now() - start
                ).toFixed(0)}ms`,
            );

            return result;
        })()
        : {
            articleCount: 0,
            activityCount: 0,
        };

    console.log(
        `Newsletter data total: ${(
            performance.now() - start
        ).toFixed(0)}ms`,
    );

    /* ========================================================
       Previous Issues
    ======================================================== */

    const previousIssues = newsletters
        .slice(1)
        .map((newsletter) => ({
            id: newsletter.id,
            month: newsletter.month,
            year: newsletter.year,
            volume: newsletter.volume ?? "1",
            issue: newsletter.issue,
            coverImage: newsletter.coverImage,
            href: `/newsletters/${newsletter.slug}`,
            downloadHref: newsletter.pdfUrl,
        }));

    return (
        <main>
            <PageLayout
                hero={
                    <PageHero
                        subheading="The School's Student Voice"
                        title="Newsletter"
                        highlight="Club"
                        description="A student-led publication celebrating the creativity, achievements and everyday moments of our school community."
                        image="/images/newsletter/newsletter-club.jpeg"
                        imageAlt="Newsletter Club members working together"
                        actions={[
                            {
                                label: "Read Latest Issue",
                                href: currentNewsletter
                                    ? `/newsletters/${currentNewsletter.slug}`
                                    : "/newsletters",
                                variant: "primary",
                            },
                            {
                                label: "View Archive",
                                href: "#archive",
                                variant: "secondary",
                            },
                        ]}
                    />
                }
            >
                {/* ==================================================
                    NEWSLETTER CONTENT
                ================================================== */}

                <section
                    className="
                        py-10
                        lg:py-14
                    "
                >
                    <div
                        className="
                            mx-auto
                            w-full
                            space-y-12
                        "
                    >
                        {/* ==================================================
                            LATEST NEWSLETTER
                        ================================================== */}

                        {currentNewsletter && (
                            <NewsletterLatestIssue
                                newsletter={currentNewsletter}
                                articleCount={
                                    counts.articleCount
                                }
                                activityCount={
                                    counts.activityCount
                                }
                            />
                        )}

                        {/* ==================================================
                            NEWSLETTER CLUB MEMBERS
                        ================================================== */}

                        {clubMembers.length > 0 && (
                            <ClubMembers
                                members={clubMembers}
                            />
                        )}

                        {/* ==================================================
                            NEWSLETTER ARCHIVE / PREVIOUS ISSUES
                        ================================================== */}

                        {previousIssues.length > 0 && (
                            <div id="archive">
                                <PreviousIssues
                                    newsletters={previousIssues}
                                />
                            </div>
                        )}

                        {/* ==================================================
                            NEWSLETTER CONTRIBUTE
                        ================================================== */}

                        {/*
                        <NewsletterContribute />
                        */}
                    </div>
                </section>
            </PageLayout>
        </main>
    );
}