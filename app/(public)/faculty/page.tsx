import {
    GraduationCap,
    Medal,
    Users,
} from "lucide-react";

import { PageLayout } from "@/components/layout/PageLayout";
import PageHero from "@/components/common/PageHero";

import { FacultyStats } from "@/components/faculty/FacultyStats";
import { FacultyPrincipal } from "@/components/faculty/FacultyPrincipal";
import { FacultyDirectory } from "@/components/faculty/FacultyDirectory";

import {
    getPublishedFaculties,
    getPrincipal,
} from "@/lib/data/faculty/get";

export const metadata = {
    title: "Faculty",
};

export default async function FacultyPage() {
    const [faculty, principal] = await Promise.all([
        getPublishedFaculties(),
        getPrincipal(),
    ]);

    return (
        <PageLayout
            hero={
                <PageHero
                    title="Our Faculty"
                    description="Our dedicated and experienced educators are committed to nurturing young minds, inspiring excellence and building a brighter future."
                    image="/images/faculty/hero.jpg"
                    imageAlt="Faculty of PM SHRI GSSS Dhanau"
                    breadcrumb={[
                        {
                            label: "Faculty",
                        },
                    ]}
                    stats={[
                        {
                            value: "35+",
                            label: "Teaching Staff",
                            icon: (
                                <Users className="size-5" />
                            ),
                        },
                        {
                            value: "10+",
                            label: "Subjects",
                            icon: (
                                <GraduationCap className="size-5" />
                            ),
                        },
                        {
                            value: "Years",
                            label: "Years of Excellence",
                            icon: (
                                <Medal className="size-5" />
                            ),
                        },
                    ]}
                />
            }
        >
            {/* Faculty Stats */}

            <FacultyStats />

            {/* Principal Message */}

            <FacultyPrincipal
                principal={principal}
            />

            {/* Faculty Directory */}

            <FacultyDirectory
                faculty={faculty}
            />
        </PageLayout>
    );
}