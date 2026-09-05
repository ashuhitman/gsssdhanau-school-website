import PageHero from "@/components/common/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import NewsletterLatestIssue from "@/components/newsletters/NewsletterLatestIssue";
import NewsletterTeam from "@/components/newsletters/NewsletterTeam";
import PreviousIssues from "@/components/newsletters/PreviousIssues";

import {
    getPublishedNewsletters,
    getLatestPublishedNewsletter,
} from "@/lib/data/newsletter/get";

/* ============================================================
   Newsletters Page
============================================================ */

export default async function NewslettersPage() {
    const [latestNewsletter, newsletters] = await Promise.all([
        getLatestPublishedNewsletter(true),
        getPublishedNewsletters(),
    ]);

    const articleCount = latestNewsletter?.articles.length ?? 0;
    const activityCount = latestNewsletter?.activities.length ?? 0;

    const previousIssues = newsletters
        .filter(
            (newsletter) => newsletter.id !== latestNewsletter?.id
        )
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
                                href: latestNewsletter
                                    ? `/newsletters/${latestNewsletter.slug}`
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
                <section className="py-10 lg:py-14">
                    <div className="mx-auto w-full space-y-12">
                        {/* ==================================================
                            LATEST NEWSLETTER
                        ================================================== */}

                        {latestNewsletter && (
                            <NewsletterLatestIssue
                                newsletter={latestNewsletter}
                                articleCount={articleCount}
                                activityCount={activityCount}
                            />
                        )}

                        {/* ==================================================
                            NEWSLETTER TEAM
                        ================================================== */}

                        {latestNewsletter && (
                            <NewsletterTeam
                                newsletter={latestNewsletter}
                            />
                        )}

                        {/* ==================================================
                            PREVIOUS ISSUES
                        ================================================== */}

                        {previousIssues.length > 0 && (
                            <div id="archive">
                                <PreviousIssues
                                    newsletters={previousIssues}
                                />
                            </div>
                        )}
                    </div>
                </section>
            </PageLayout>
        </main>
    );
}