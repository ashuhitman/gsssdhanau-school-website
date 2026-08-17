
import AcademicsQuickLinks from "@/components/academics/AcademicQuickLinks";
import ClassesStreams from "@/components/academics/ClassesStreams";
import FacultyPreview from "@/components/academics/FacultyPreview";
import PageHero from "@/components/common/PageHero";
import { PublicHero } from "@/components/public/PublicHero";
import { ArrowBigDown, ArrowBigDownDash, GraduationCap, Trophy, Users } from "lucide-react";



export default function AcademicsPage() {
    return (
        <>
            <PageHero
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
            />




            <main className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">

                <AcademicsQuickLinks />

                <ClassesStreams />

                <FacultyPreview />
            </main>
        </>
    );
}