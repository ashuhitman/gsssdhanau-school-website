import ActivitiesClient from "@/components/activity/ActivitiesClient";

import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import { PageLayout } from "@/components/layout/PageLayout";

import { getPublishedActivities } from "@/lib/data/activity/get";

export default async function NewsActivitiesPage() {
    const activities =
        await getPublishedActivities();

    return (
        <PageLayout
            hero={
                <PageHero
                    title="News and Events"
                    description="A wide range of co-curricular and extra-curricular activities that nurture talent, build character and promote the holistic development of our students."
                    image="/images/activity/hero.jpg"
                    imageAlt="Students of PM SHRI GSSS Dhanau participating in activities"
                    breadcrumb={[
                        {
                            label: "News and Events",
                        },
                    ]}
                />
            }
        >
            <section
                className="
                    py-10
                    sm:py-12
                    lg:py-14
                "
            >
                <div
                    className="
                        mx-auto
                        max-w-7xl
                    "
                >
                    {/* Section Heading */}

                    <SectionHeading
                        eyebrow="School Life"
                        title="Latest Activities"
                        description="Stay connected with what is happening at our school."
                    />

                    {/* Activities */}

                    <ActivitiesClient
                        activities={activities}
                    />
                </div>
            </section>
        </PageLayout>
    );
}