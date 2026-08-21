import {
    BookOpen,
    BriefcaseBusiness,
    GraduationCap,
    Laptop,
    Mail,
    Medal,
    School,
    Users,
    UserRound,
} from "lucide-react";
import Image from "next/image";

import { PageLayout } from "@/components/layout/PageLayout";
import PageHero from "@/components/common/PageHero";
import TransitionLink from "@/components/transition/TransitionLink";


const staffStats = [
    {
        label: "Lecturers",
        value: "12",
        icon: GraduationCap,
    },
    {
        label: "2nd Grade Teachers",
        value: "07",
        icon: BookOpen,
    },
    {
        label: "3rd Grade Teachers",
        value: "04",
        icon: UserRound,
    },
    {
        label: "Computer Anudeshak",
        value: "01",
        icon: Laptop,
    },
    {
        label: "4th Grade Staff",
        value: "04",
        icon: BriefcaseBusiness,
    },
    {
        label: "Vocational Trainers",
        value: "02",
        icon: Medal,
    },
    {
        label: "Panchayat Shikshak",
        value: "01",
        icon: School,
    },
];

const seniorFaculty = [
    {
        name: "Rakesh Kumar",
        designation: "Sr. Teacher",
        subject: "Mathematics",
        qualification: "M.Sc., B.Ed.",
        image: "/images/faculty/rakesh-kumar.jpg",
    },
    {
        name: "Dharmendra Kumar",
        designation: "Sr. Teacher",
        subject: "Chemistry",
        qualification: "M.Sc., B.Ed.",
        image: "/images/faculty/dharmendra-kumar.jpg",
    },
    {
        name: "Manish Kumar",
        designation: "Sr. Teacher",
        subject: "Physics",
        qualification: "M.Sc., B.Ed.",
        image: "/images/faculty/manish-kumar.jpg",
    },
    {
        name: "Praveen Kumar",
        designation: "Sr. Teacher",
        subject: "Hindi",
        qualification: "M.A., B.Ed.",
        image: "/images/faculty/praveen-kumar.jpg",
    },
    {
        name: "Satram Das",
        designation: "Sr. Teacher",
        subject: "English",
        qualification: "M.A., B.Ed.",
        image: "/images/faculty/satram-das.jpg",
    },
    {
        name: "Mobtar Ram Chaudhary",
        designation: "Sr. Teacher",
        subject: "Sanskrit",
        qualification: "M.A., B.Ed.",
        image: "/images/faculty/mobtar-ram.jpg",
    },
];

const subjectFaculty = [
    {
        name: "Sunita Jakhad",
        subject: "Hindi",
        qualification: "M.A., B.Ed.",
        image: "/images/faculty/sunita-jakhad.jpg",
    },
    {
        name: "Bhomaram Jakhad",
        subject: "English",
        qualification: "M.A., B.Ed.",
        image: "/images/faculty/bhomaram-jakhad.jpg",
    },
    {
        name: "Rakesh Kumar",
        subject: "Mathematics",
        qualification: "M.Sc., B.Ed.",
        image: "/images/faculty/rakesh-kumar.jpg",
    },
    {
        name: "Manish Kumar",
        subject: "Physics",
        qualification: "M.Sc., B.Ed.",
        image: "/images/faculty/manish-kumar.jpg",
    },
    {
        name: "Dharmendra Kumar",
        subject: "Chemistry",
        qualification: "M.Sc., B.Ed.",
        image: "/images/faculty/dharmendra-kumar.jpg",
    },
    {
        name: "Ashutosh Singh",
        subject: "Computer",
        qualification: "M.Sc. (CS), B.Ed.",
        image: "/images/faculty/ashutosh-singh.jpg",
    },
];

const otherStaff = [
    {
        name: "4th Grade Staff",
        value: "04",
        description:
            "Supporting the smooth functioning of school operations.",
        icon: BriefcaseBusiness,
    },
    {
        name: "Vocational Trainers",
        value: "02",
        description:
            "Providing practical skills and vocational training to students.",
        icon: Medal,
    },
    {
        name: "Panchayat Shikshak",
        value: "01",
        description:
            "Supporting primary education and community learning initiatives.",
        icon: Users,
    },
];

function SectionHeading({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mb-5 flex items-center gap-3">
            <span className="h-0.5 w-7 rounded-full bg-accent" />

            <h2 className="text-lg font-bold text-primary sm:text-xl">
                {children}
            </h2>
        </div>
    );
}

function FacultyCard({
    faculty,
}: {
    faculty: {
        name: string;
        designation?: string;
        subject: string;
        qualification: string;
        image: string;
    };
}) {
    return (
        <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                    src={faculty.image}
                    alt={faculty.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-cover"
                />
            </div>

            <div className="p-3.5">
                <h3 className="truncate text-sm font-bold text-primary">
                    {faculty.name}
                </h3>

                {faculty.designation && (
                    <p className="mt-1 text-xs font-semibold text-accent">
                        {faculty.designation}
                    </p>
                )}

                <div className="mt-2 space-y-1 text-xs text-muted">
                    <p className="flex items-center gap-1.5">
                        <BookOpen className="size-3.5 shrink-0" />
                        {faculty.subject}
                    </p>

                    <p className="flex items-center gap-1.5">
                        <GraduationCap className="size-3.5 shrink-0" />
                        {faculty.qualification}
                    </p>
                </div>

                <button
                    type="button"
                    aria-label={`Email ${faculty.name}`}
                    className="mt-3 flex size-8 items-center justify-center rounded-lg bg-primary-soft text-primary transition-colors hover:bg-primary hover:text-white"
                >
                    <Mail className="size-4" />
                </button>
            </div>
        </article>
    );
}

export default function FacultyPage() {
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
                            icon: <Users className="size-5" />,
                        },
                        {
                            value: "10+",
                            label: "Subjects",
                            icon: <GraduationCap className="size-5" />,
                        },
                        {
                            value: "Years",
                            label: "Years of Excellence",
                            icon: <Medal className="size-5" />,
                        },
                    ]}
                />
            }
        >
            <div className="space-y-10 py-8 sm:space-y-12 sm:py-10 lg:space-y-14 lg:py-12">

                {/* Principal */}
                <section>
                    <SectionHeading>
                        Principal / Head of School
                    </SectionHeading>

                    <div className="grid overflow-hidden rounded-xl border border-border bg-card shadow-sm lg:grid-cols-[35%_65%]">
                        <div className="relative min-h-64 bg-muted sm:min-h-80 lg:min-h-0">
                            <Image
                                src="/images/faculty/principal.jpg"
                                alt="Principal of PM SHRI GSSS Dhanau"
                                fill
                                sizes="(max-width: 1024px) 100vw, 35vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                            <h3 className="text-2xl font-bold text-primary">
                                Mr. Bhagirath Kuldeep
                            </h3>

                            <p className="mt-1 font-semibold text-accent">
                                Principal
                            </p>

                            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
                                <span className="flex items-center gap-2">
                                    <GraduationCap className="size-4" />
                                    Academic Leadership
                                </span>

                                <span className="flex items-center gap-2">
                                    <Medal className="size-4" />
                                    School Administration
                                </span>
                            </div>

                            <p className="mt-5 max-w-2xl leading-7 text-body">
                                With a vision for academic excellence and
                                holistic development, the school leadership
                                works with dedication to create a positive,
                                disciplined and supportive learning environment.
                            </p>

                            <TransitionLink
                                href="/faculty/principal"
                                className="mt-6 inline-flex w-fit items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                            >
                                Message from Principal
                            </TransitionLink>
                        </div>
                    </div>
                </section>

                {/* Staff Categories */}
                <section>
                    <SectionHeading>
                        Our Teaching Staff
                    </SectionHeading>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                        {staffStats.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className="rounded-xl border border-border bg-card p-4 text-center shadow-sm"
                                >
                                    <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary">
                                        <Icon className="size-5" />
                                    </div>

                                    <div className="mt-3 text-xl font-bold text-primary">
                                        {item.value}
                                    </div>

                                    <div className="mt-1 text-xs font-semibold leading-4 text-foreground">
                                        {item.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Senior Faculty */}
                <section>
                    <SectionHeading>
                        Senior Faculty
                    </SectionHeading>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        {seniorFaculty.map((faculty) => (
                            <FacultyCard
                                key={`${faculty.name}-${faculty.subject}`}
                                faculty={faculty}
                            />
                        ))}
                    </div>
                </section>

                {/* Subject-wise Faculty */}
                <section>
                    <SectionHeading>
                        Subject-wise Faculty
                    </SectionHeading>

                    <div className="mb-5 flex overflow-x-auto rounded-xl border border-border bg-card p-1">
                        {[
                            "All",
                            "Languages",
                            "Science",
                            "Mathematics",
                            "Social Science",
                            "Computer",
                            "Others",
                        ].map((category, index) => (
                            <button
                                key={category}
                                type="button"
                                className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium ${index === 0
                                    ? "bg-primary text-white"
                                    : "text-foreground hover:bg-primary-soft"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        {subjectFaculty.map((faculty) => (
                            <FacultyCard
                                key={`${faculty.name}-${faculty.subject}`}
                                faculty={faculty}
                            />
                        ))}
                    </div>
                </section>

                {/* Other Staff */}
                <section>
                    <SectionHeading>
                        Other Staff
                    </SectionHeading>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {otherStaff.map((staff) => {
                            const Icon = staff.icon;

                            return (
                                <div
                                    key={staff.name}
                                    className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
                                >
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                                        <Icon className="size-6" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-primary">
                                            {staff.name}
                                        </h3>

                                        <p className="mt-1 text-2xl font-bold text-primary">
                                            {staff.value}
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-muted">
                                            {staff.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* CTA */}
                <section className="flex flex-col gap-5 rounded-xl bg-primary-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                    <div className="flex items-center gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-sm">
                            <Users className="size-6" />
                        </div>

                        <div>
                            <h2 className="font-bold text-primary">
                                Our teachers are our strength and our students&apos;
                                greatest guide.
                            </h2>

                            <p className="mt-1 text-sm text-body">
                                Together, we create a culture of learning,
                                respect and excellence.
                            </p>
                        </div>
                    </div>

                    <a
                        href="/contact"
                        className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                    >
                        Contact School
                    </a>
                </section>
            </div>
        </PageLayout>
    );
}