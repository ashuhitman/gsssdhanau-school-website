
import AcademicsQuickLinks from "@/components/academics/AcademicQuickLinks";
import ClassesStreams from "@/components/academics/ClassesStreams";
import FacultyPreview from "@/components/academics/FacultyPreview";
import PageHero from "@/components/common/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { PublicHero } from "@/components/public/PublicHero";
import { ArrowBigDown, ArrowBigDownDash, GraduationCap, Trophy, Users } from "lucide-react";


export const metadata = {
    title: "Academics",
};
export default function AcademicsPage() {
    return (
        <>
            <PageLayout hero={<PageHero
                breadcrumb={[
                    {
                        label: "Academics",
                    },
                ]}
                title=""
                highlight="Academics"
                description="A wide range of co-curricular and extra-curricular activities that nurture talent, build character and promote the holistic development of our students."
                image="/images/academic/hero.jpg"
                imageAlt="PM SHRI GSSS Dhanau students participating in activities"
                stats={[
                    {
                        value: "600+",
                        label: "Students Enrolled",
                        icon: <GraduationCap size={20} />,
                        iconClassName: "bg-accent-soft text-accent",
                    },
                    {
                        value: "15+",
                        label: "Qualified Teachers",
                        icon: <Users size={20} />,
                        iconClassName: "bg-accent-soft text-accent",
                    },
                    {
                        value: "90%+",
                        label: "Board Result",
                        icon: <Trophy size={20} />,
                        iconClassName: "bg-accent-soft text-accent",
                    },
                ]}
            />}>

                <AcademicsQuickLinks />

                <ClassesStreams />

                <FacultyPreview />

            </PageLayout>






        </>
    );
}