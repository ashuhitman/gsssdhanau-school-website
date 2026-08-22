

import PageHero from "@/components/common/PageHero";
import { FeaturedStory } from "@/components/home/FeaturedStory";
import { LatestNews } from "@/components/home/LatestNews";
import { Notices } from "@/components/home/Notices";
import { LatestArticles } from "@/components/home/LatestArticles";
import { LatestNewsletter } from "@/components/home/LatestNewsletter";
import { PageLayout } from "@/components/layout/PageLayout";
import { HomeStats } from "@/components/home/HomeStats";
import { PrincipalMessage } from "@/components/home/PrincipalMessage";




export default function HomePage() {
  return (
    <main>
      <PageLayout hero={<PageHero
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

      }>

        <HomeStats />
        <PrincipalMessage />

        <section className="py-10 lg:py-14">
          <div className="mx-auto w-full space-y-8">
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
              sm:flex
               gap-8
                    "
            >
              {/* Latest Articles takes remaining space */}
              <div className="min-w-0 flex-1">
                <LatestArticles />
              </div>

              {/* Newsletter stays on the right */}
              <div className="min-w-0">
                <LatestNewsletter />
              </div>
            </div>
          </div>
        </section>

      </PageLayout>




    </main>
  );
}