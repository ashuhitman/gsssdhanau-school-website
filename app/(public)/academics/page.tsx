
import AcademicsQuickLinks from "@/components/academics/AcademicQuickLinks";
import ClassesStreams from "@/components/academics/ClassesStreams";
import FacultyPreview from "@/components/academics/FacultyPreview";
import { PublicHero } from "@/components/public/PublicHero";
import { ArrowBigDown, ArrowBigDownDash } from "lucide-react";



export default function AcademicsPage() {
    return (
        <>
            <PublicHero
                eyebrow=""
                title="Academics"
                description="Empowering students with knowledge, skills and values for a brighter tommorrow."
                image="/images/school-building.jpg"
                imageAlt="PM SHRI Government Senior Secondary School Dhanau"
                bottomLeftIcon={<ArrowBigDown />}
                breadcrumbs={[
                    {
                        label: "Home",
                        href: "/",
                    },
                    {
                        label: "Academics",
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