import {
    Atom,
    BookOpen,
    Building2,
    FlaskConical,
    LibraryBig,
    Microscope,
    Monitor,
    MonitorSmartphone,
    Presentation,
    Projector
} from "lucide-react";

import { InfoCard } from "@/components/common/InfoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PublicHero } from "@/components/public/PublicHero";
import { FacilityCard } from "@/components/Facilities/FacilityCard";
import PageHero from "@/components/common/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";


export const metadata = {
    title: "Facilities",
};

const facilities = [
    {
        number: "01",
        title: "Digital Library",
        description:
            "Access digital learning resources and educational content that support self-paced learning, exploration, and research.",
        image: "/images/facilities/digitallib.jpg",
        icon: MonitorSmartphone,
    },
    {
        number: "02",
        title: "ICT Lab",
        description:
            "A technology-enabled learning space that helps students develop digital literacy, computer skills, and practical knowledge.",
        image: "/images/facilities/ict.jpg",
        icon: Monitor,
    },
    {
        number: "03",
        title: "Smart Classrooms",
        description:
            "Two smart classrooms equipped with digital tools that make classroom teaching more interactive, engaging, and effective.",
        image: "/images/facilities/smartclass.jpg",
        icon: Projector,
    },
    {
        number: "04",
        title: "Physics Lab",
        description:
            "A dedicated practical learning environment where students explore Physics concepts through experiments and hands-on activities.",
        image: "/images/facilities/physics.jpg",
        icon: Atom,
    },
    {
        number: "05",
        title: "Chemistry & Biology Labs",
        description:
            "Practical science laboratories that encourage scientific curiosity and experiential learning through Chemistry and Biology activities.",
        image: "/images/facilities/chem.jpg",
        icon: Microscope,
    },
    {
        number: "06",
        title: "Library",
        description:
            "A dedicated library with books and reference materials that encourage reading, knowledge building, and independent study.",
        image: "/images/facilities/library.jpg",
        icon: LibraryBig,
    },
];

const facilityHighlights = [
    {
        title: "Digital Learning",
        description:
            "Technology-supported resources for modern learning.",
        icon: MonitorSmartphone,
    },
    {
        title: "Practical Learning",
        description:
            "Hands-on learning through laboratory activities.",
        icon: FlaskConical,
    },
    {
        title: "Reading & Research",
        description:
            "Resources that encourage reading and self-learning.",
        icon: BookOpen,
    },
];

export default function FacilitiesPage() {
    return (
        <>
            <PageLayout hero={<PageHero
                breadcrumb={[
                    {
                        label: "Facilities",
                    },
                ]}
                subheading="School Facilities"
                title="Our Facilities"
                highlight=""
                description="Well-equipped learning spaces and resources that support academic growth, practical learning, digital education, and the overall development of our students."
                image="/images/facilities/hero.jpg"
                imageAlt="our facilities"
                stats={[
                    {
                        value: "2",
                        label: "Smart Class",
                        icon: <Presentation size={20} />,
                    },
                    {
                        value: "1",
                        label: "Digital Library",
                        icon: <LibraryBig size={20} />,
                        iconClassName:
                            "bg-accent-soft text-accent",
                    },
                    {
                        value: "10+`",
                        label: "Computers",
                        icon: <Monitor size={20} />,
                        iconClassName:
                            "bg-success-soft text-success",
                    },
                ]}
            />
            }>
                {/* =========================================================
                FACILITY INTRODUCTION
            ========================================================= */}
                <section className="py-4 lg:py-5 ">
                    <div className="mx-auto ">
                        <div
                            className="
                            rounded-xl
                            border
                            border-border
                            bg-primary-50/60
                            px-4
                            py-3
                            dark:bg-primary-950/40
                            sm:px-5
                            sm:py-3.5
                        "
                        >
                            <div
                                className="
                                grid
                                items-center
                                gap-4
                                lg:grid-cols-[1.15fr_1.85fr]
                                lg:gap-5
                            "
                            >
                                {/* Introduction */}
                                <div className="min-w-0">
                                    <div className="flex items-center gap-3">
                                        {/* Facility icon */}
                                        <div
                                            className="
                                            flex
                                            size-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-primary-600
                                            text-white
                                            shadow-sm
                                        "
                                        >
                                            <Building2
                                                className="size-5"
                                                strokeWidth={1.7}
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="text-xs font-bold leading-4 text-primary-700 dark:text-primary-300 sm:text-sm">
                                                Our Learning Facilities
                                            </h2>

                                            <p className="mt-0.5 text-[10px] leading-4 text-muted-foreground sm:text-xs sm:leading-4">
                                                At PM SHRI GSSS Dhanau, we
                                                provide well-equipped
                                                facilities that support
                                                academics, practical learning,
                                                and the overall growth of our
                                                students.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Highlights */}
                                <div
                                    className="
                                    grid
                                    grid-cols-1
                                    divide-y
                                    divide-primary-200
                                    sm:grid-cols-3
                                    sm:divide-x
                                    sm:divide-y-0
                                    dark:divide-primary-800
                                "
                                >
                                    {facilityHighlights.map((item) => (
                                        <InfoCard
                                            key={item.title}
                                            icon={item.icon}
                                            title={item.title}
                                            description={item.description}
                                            variant="circleIcon"
                                            circleColor="white"
                                            className="
                                            gap-2
                                            px-2
                                            py-2
                                            sm:px-3
                                            sm:py-1
                                        "
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================================
                FACILITIES
            ========================================================= */}
                <section className=" pb-8 lg:pb-10">
                    <div className="mx-auto ">
                        <SectionHeading
                            eyebrow="Our Infrastructure"
                            title="Facilities for Better Learning"
                            description="Explore the facilities available at PM SHRI GSSS Dhanau."
                        />

                        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {facilities.map((facility) => (
                                <FacilityCard
                                    key={facility.title}
                                    number={facility.number}
                                    title={facility.title}
                                    description={facility.description}
                                    image={facility.image}
                                    imageAlt={`${facility.title} at PM SHRI GSSS Dhanau`}
                                    icon={facility.icon}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* =========================================================
                WHY OUR FACILITIES MATTER
            ========================================================= */}
                <section className="pb-8  lg:pb-10">
                    <div
                        className="
                        mx-auto
                     
                        overflow-hidden
                        rounded-xl
                        bg-primary-50
                        px-5
                        py-6
                        dark:bg-primary-950
                        sm:px-7
                        lg:px-10
                        lg:py-7
                    "
                    >
                        <div className="mx-auto max-w-2xl text-center">
                            <SectionHeading
                                title="Why Our Facilities Matter"
                                description="Our facilities help create an environment where students can learn, experiment, explore, and develop skills for the future."
                            />
                        </div>

                        <div
                            className="
                            mt-6
                            grid
                            grid-cols-1
                            divide-y
                            divide-primary-200
                            sm:grid-cols-3
                            sm:divide-x
                            sm:divide-y-0
                            dark:divide-primary-800
                        "
                        >
                            <InfoCard
                                icon={BookOpen}
                                title="Better Learning"
                                description="Resources that make learning more engaging and meaningful."
                                variant="circleIcon"
                                circleColor="white"
                                className="px-4 py-4 sm:px-5"
                            />

                            <InfoCard
                                icon={FlaskConical}
                                title="Practical Skills"
                                description="Hands-on experiences that connect theory with practice."
                                variant="circleIcon"
                                circleColor="white"
                                className="px-4 py-4 sm:px-5"
                            />

                            <InfoCard
                                icon={MonitorSmartphone}
                                title="Future Ready"
                                description="Digital and academic resources that prepare students for tomorrow."
                                variant="circleIcon"
                                circleColor="white"
                                className="px-4 py-4 sm:px-5"
                            />
                        </div>
                    </div>
                </section>

            </PageLayout>


        </>
    );
}