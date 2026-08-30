import PageHero from "@/components/common/PageHero";

import { PageLayout } from "@/components/layout/PageLayout";

import NewsletterLatestIssue from "@/components/newsletters/NewsletterLatestIssue";
import ClubMembers from "@/components/newsletters/ClubMembers";
import PreviousIssues from "@/components/newsletters/PreviousIssues";

import {
    getAllNewsletters,
} from "@/lib/data/newsletter";

import {
    getAllClubMembers,
} from "@/lib/data/clubMember";

/* ============================================================
   Newsletters Page
============================================================ */

export default async function NewslettersPage() {
    /* ========================================================
       Newsletters
    ======================================================== */

    const newsletters =
        await getAllNewsletters();

    const currentNewsletter =
        newsletters[0];

    /* ========================================================
       Previous Issues
    ======================================================== */

    const previousIssues =
        newsletters.slice(1).map((newsletter) => ({
            id: newsletter.id,
            month: newsletter.month,
            year: newsletter.year,
            volume: "1",
            issue: newsletter.issueNumber,
            coverImage: newsletter.coverImage,
            href: `/newsletters/${newsletter.year}/${newsletter.month}`,
            downloadHref: null,
        }));

    /* ========================================================
       Club Members
    ======================================================== */

    const clubMembers =
        await getAllClubMembers();

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
                                    ? `/newsletters/${currentNewsletter.year}/${currentNewsletter.month}`
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
                                newsletter={
                                    currentNewsletter
                                }
                            />
                        )}

                        {/* ==================================================
                            NEWSLETTER CLUB MEMBERS
                        ================================================== */}

                        {clubMembers.length > 0 && (
                            <ClubMembers
                                members={
                                    clubMembers
                                }
                            />
                        )}

                        {/* ==================================================
                            NEWSLETTER ARCHIVE / PREVIOUS ISSUES
                        ================================================== */}

                        {previousIssues.length > 0 && (
                            <div id="archive">
                                <PreviousIssues
                                    newsletters={
                                        previousIssues
                                    }
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