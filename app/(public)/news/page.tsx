import NewsCategoryFilter from "@/components/news/NewsCategoryFilter";
import NewsList from "@/components/news/NewsList";
import RecentAchievements from "@/components/news/RecentAchievements";
import UpcomingEvents from "@/components/news/UpcomingEvents";
import { PublicHero } from "@/components/public/PublicHero";
import { NewsActivity, NewsCategoryOption } from "@/types/newsTypes";


/* ─────────────────────────────────────
   NEWS DATA
───────────────────────────────────── */

const news: NewsActivity[] = [
    {
        id: "1",
        title: "Tiranga Rally Organized in School",
        description:
            "Students participated in the Tiranga Rally with great enthusiasm to spread awareness about our national flag and its significance.",
        date: "12 May 2025",
        category: "Events",
        image: "/images/news/tiranga-rally.jpg",
        href: "/news/tiranga-rally-organized-in-school",
    },
    {
        id: "2",
        title: "Inter-House Volleyball Tournament",
        description:
            "The Inter-House Volleyball Tournament was a grand success. Students showcased excellent teamwork and sportsmanship.",
        date: "08 May 2025",
        category: "Sports",
        image: "/images/news/volleyball.jpg",
        href: "/news/inter-house-volleyball-tournament",
    },
    {
        id: "3",
        title: "Tree Plantation Drive",
        description:
            "Our students and teachers came together for a tree plantation drive to promote a greener and healthier environment.",
        date: "05 May 2025",
        category: "Activities",
        image: "/images/news/tree-plantation.jpg",
        href: "/news/tree-plantation-drive",
    },
];

/* ─────────────────────────────────────
   CATEGORY DATA
───────────────────────────────────── */

const categories: NewsCategoryOption[] = [
    {
        label: "All",
        value: "All",
        count: 32,
        icon: "grid",
    },
    {
        label: "Events",
        value: "Events",
        count: 10,
        icon: "calendar",
    },
    {
        label: "Activities",
        value: "Activities",
        count: 9,
        icon: "activities",
    },
    {
        label: "Sports",
        value: "Sports",
        count: 6,
        icon: "sports",
    },
    {
        label: "Achievements",
        value: "Achievements",
        count: 5,
        icon: "achievement",
    },
    {
        label: "Announcements",
        value: "Announcements",
        count: 2,
        icon: "announcement",
    },
];

export default function NewsActivitiesPage() {
    return (
        <main>
            {/* ─────────────────────────────────
                HERO
            ───────────────────────────────── */}
            <PublicHero
                eyebrow="News & Activities"
                title="News & Activities"
                description="Stay updated with the latest news, events, and exciting activities happening in our school."
                image="/images/news/activity.jpg"
                imageAlt="Students participating in school activities"
                breadcrumbs={[
                    {
                        label: "Home",
                        href: "/",
                    },
                    {
                        label: "Latest News & Activity",
                    },
                ]}
            />

            {/* ─────────────────────────────────
                CONTENT
            ───────────────────────────────── */}
            <section className="mx-auto max-w-[1350px] px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                    {/* =================================================
                        LEFT COLUMN
                    ================================================= */}
                    <div className="min-w-0">
                        {/* Category Filter */}
                        <NewsCategoryFilter
                            categories={categories}
                        />

                        {/* Latest News */}
                        <div className="mt-8">
                            <NewsList news={news} />
                        </div>
                    </div>

                    {/* =================================================
                        RIGHT COLUMN
                    ================================================= */}
                    <aside className="space-y-6">
                        <UpcomingEvents />

                        <RecentAchievements />
                    </aside>
                </div>
            </section>
        </main>
    );
}