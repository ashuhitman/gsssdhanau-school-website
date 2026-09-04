import PageHero from "@/components/common/PageHero";

import { HomeContentGrid } from "@/components/home/HomeContentGrid";
import { PageLayout } from "@/components/layout/PageLayout";
import { HomeStats } from "@/components/home/HomeStats";
import { PrincipalMessage } from "@/components/home/PrincipalMessage";

export default function HomePage() {
  return (
    <main>
      <PageLayout
        hero={
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
        }
      >
        <HomeStats />

        <PrincipalMessage />

        <section className="py-10 lg:py-14">
          <div className="mx-auto w-full">
            <HomeContentGrid />
          </div>
        </section>
      </PageLayout>
    </main>
  );
}