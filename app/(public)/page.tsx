
import { HomeQuickLinks } from "@/components/home/HomeQuickLinks";
import PageHero from "@/components/common/PageHero";
import { FeaturedStory } from "@/components/home/FeaturedStory";
import { LatestNews } from "@/components/home/LatestNews";
import { Notices } from "@/components/home/Notices";
import { LatestArticles } from "@/components/home/LatestArticles";
import { LatestNewsletter } from "@/components/home/LatestNewsletter";

export default function HomePage() {
  return (
    <main>
      <PageHero
        subheading="Welcome to"
        title="PM SHRI GSSS"
        highlight="Dhanau"
        description="A place where knowledge, creativity, character and opportunity come together to nurture the leaders of tomorrow."
        image="/images/home/hero.jpg"
        imageAlt="PM SHRI GSSS Dhanau"
        actions={[
          {
            label: "Explore Our School",
            href: "/about",
            variant: "primary",
          },
          {
            label: "View Activities",
            href: "/activities",
            variant: "secondary",
          },
        ]}
      />

      <HomeQuickLinks />

      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto w-full max-w-[90rem] space-y-8">
          {/* Featured Story */}
          <FeaturedStory />

          {/* Latest News & Activities + Notices */}
          <div
            className="
                        grid
                        grid-cols-1
                        gap-6
                        lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.85fr)]
                    "
          >
            <LatestNews />

            <Notices />
          </div>

          {/* Latest Articles + Latest Newsletter */}
          <div
            className="
                        grid
                        grid-cols-1
                        gap-6
                        lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]
                    
                    
                    "
          >
            {/* Latest Articles takes remaining space */}
            <div className="min-w-0">
              <LatestArticles />
            </div>

            {/* Newsletter stays on the right */}
            <div className="min-w-0">
              <LatestNewsletter />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}