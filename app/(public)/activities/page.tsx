
import FeatureCard from "@/components/common/FeatureCard";
import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";

import {
    Award,
    BookOpen,
    Dumbbell,
    HeartHandshake,
    Mic2,
    Palette,
    Trophy,
    Users,
} from "lucide-react";

export default function ActivitiesPage() {
    const activities = [
        {
            title: "Sports and Games",
            description:
                "Encouraging fitness, teamwork, discipline and a healthy competitive spirit through indoor and outdoor sports.",
            image: "/images/activities/sports.jpeg",
            imageAlt: "Students participating in sports and games",
            icon: <Dumbbell size={20} />,
            href: "#sports",
        },
        {
            title: "Cultural Activities",
            description:
                "Celebrating creativity, traditions and expression through music, dance, art, drama and cultural programmes.",
            image: "/images/activities/cultural.jpeg",
            imageAlt: "Students participating in cultural activities",
            icon: <Palette size={20} />,
            href: "#cultural",
        },
        {
            title: "Computer Lab Activity",
            description:
                "Developing digital skills through practical computer learning, technology-based activities and hands-on practice.",
            image: "/images/activities/computer-lab.png",
            imageAlt: "Students participating in computer lab activities",
            icon: <BookOpen size={20} />,
            href: "#computer-lab",
        },
        {
            title: "Community Service",
            description:
                "Developing social responsibility, cooperation and a spirit of service towards the school and wider community.",
            image: "/images/activities/quiz.jpeg",
            imageAlt: "Students participating in community service",
            icon: <HeartHandshake size={20} />,
            href: "#community-service",
        },
        {
            title: "Quiz Competition",
            description:
                "Promoting curiosity, knowledge, critical thinking and healthy academic competition among students.",
            image: "/images/activities/quiz.jpeg",
            imageAlt: "Students participating in a quiz competition",
            icon: <Trophy size={20} />,
            href: "#quiz",
        },
        {
            title: "News Reading",
            description:
                "Encouraging students to stay informed about current events while developing reading, communication and presentation skills.",
            image: "/images/activities/quiz.jpeg",
            imageAlt: "Students participating in news reading activity",
            icon: <Mic2 size={20} />,
            href: "#news-reading",
        },
    ];

    return (
        <>
            {/* =====================================================
                HERO
            ====================================================== */}

            <PageHero
                breadcrumb={[
                    {
                        label: "Activities",
                    },
                ]}
                title="Our"
                highlight="Activities"
                description="A wide range of co-curricular and extra-curricular activities that nurture talent, build character and promote the holistic development of our students."
                image="/images/activities/hero-cover.png"
                imageAlt="PM SHRI GSSS Dhanau students participating in activities"
                stats={[
                    {
                        value: "150+",
                        label: "Active Students",
                        icon: <Users size={20} />,
                    },
                    {
                        value: "25+",
                        label: "Activity Categories",
                        icon: <Trophy size={20} />,
                        iconClassName:
                            "bg-accent-soft text-accent",
                    },
                    {
                        value: "Many",
                        label: "Achievements",
                        icon: <Award size={20} />,
                        iconClassName:
                            "bg-success-soft text-success",
                    },
                ]}
            />

            {/* =====================================================
                INTRODUCTION
            ====================================================== */}

            <section
                className="
                    mx-auto
                    w-full
                    max-w-[96rem]
                    px-4
                    py-12

                    sm:px-6
                    sm:py-16

                    md:px-8

                    lg:px-10
                    lg:py-20

                    xl:px-12
                "
            >
                <div
                    className="
                        mx-auto
                        max-w-[52rem]
                        text-center
                    "
                >
                    <SectionHeading
                        align="center"
                        eyebrow="Beyond The Classroom"
                        title="Learning through participation"
                        description="School life is more than textbooks and examinations. Our activities give students opportunities to discover their interests, develop confidence, work with others and learn important life skills."
                    />
                </div>
            </section>

            {/* =====================================================
                ACTIVITY CATEGORIES
            ====================================================== */}

            <section
                id="activity-categories"
                className="
                    bg-surface
                    py-12

                    sm:py-16

                    lg:py-20
                "
            >
                <div
                    className="
                        mx-auto
                        w-full
                        max-w-[96rem]
                        px-4

                        sm:px-6

                        md:px-8

                        lg:px-10

                        xl:px-12
                    "
                >
                    <SectionHeading
                        align="center"
                        eyebrow="Explore"
                        title="Our Activity Areas"
                        description="A variety of activities help our students discover their strengths and develop skills beyond academics."
                    />

                    <div
                        className="
                            mt-8
                            grid
                            grid-cols-1
                            gap-5

                            sm:grid-cols-2

                            lg:grid-cols-3
                            lg:gap-6

                            xl:mt-10
                        "
                    >
                        {activities.map((activity) => (
                            <FeatureCard
                                key={activity.title}
                                title={activity.title}
                                description={activity.description}
                                image={activity.image}
                                imageAlt={activity.imageAlt}
                                icon={activity.icon}
                                href={activity.href}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
                CLOSING INTRODUCTION
            ====================================================== */}

            <section
                className="
                    mx-auto
                    w-full
                    max-w-[96rem]
                    px-4
                    py-12

                    sm:px-6
                    sm:py-16

                    md:px-8

                    lg:px-10
                    lg:py-20

                    xl:px-12
                "
            >
                <div
                    className="
                        mx-auto
                        max-w-[52rem]
                        text-center
                    "
                >
                    <div
                        className="
                            mx-auto
                            mb-5
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-primary-soft
                            text-primary
                        "
                    >
                        <HeartHandshake size={22} />
                    </div>

                    <SectionHeading
                        align="center"
                        eyebrow="Our Philosophy"
                        title="Every student has something to discover"
                        description="We encourage every student to participate according to their interests and abilities. Through activities, students learn to collaborate, take responsibility, overcome challenges and celebrate the achievements of others."
                    />
                </div>
            </section>
        </>
    );
}