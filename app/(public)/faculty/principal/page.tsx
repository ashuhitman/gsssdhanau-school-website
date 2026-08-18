import PageHero from "@/components/common/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { getPrincipal } from "@/lib/data/primcipal";
import {
    Award,
    BookOpen,
    GraduationCap,
    HeartHandshake,
    Laptop,
    Quote,
    Users,
} from "lucide-react";



const visionCards = [
    {
        title: "Quality Education",
        description:
            "We are committed to providing quality education that builds strong concepts and prepares students for a bright future.",
        icon: GraduationCap,
        iconClassName: "bg-purple-100 text-purple-700",
        accentClassName: "bg-purple-600",
    },
    {
        title: "Student Development",
        description:
            "We focus on the overall development of every student through academics, sports, arts and co-curricular activities.",
        icon: Users,
        iconClassName: "bg-orange-100 text-orange-600",
        accentClassName: "bg-orange-500",
    },
    {
        title: "Digital Learning",
        description:
            "We encourage the use of technology and digital resources to make learning engaging, practical and effective.",
        icon: Laptop,
        iconClassName: "bg-pink-100 text-pink-600",
        accentClassName: "bg-pink-500",
    },
    {
        title: "Values & Community",
        description:
            "We nurture respect, discipline, integrity and compassion while strengthening our connection with the community.",
        icon: HeartHandshake,
        iconClassName: "bg-emerald-100 text-emerald-700",
        accentClassName: "bg-emerald-600",
    },
];

export default async function Principal() {
    const principal = await getPrincipal();

    if (!principal) {
        return null;
    }

    return (
        <PageLayout
            hero={
                <PageHero
                    breadcrumb={[
                        {
                            label: "Faculty",
                        },
                        {
                            label: principal.designation,
                        },
                    ]}
                    title="Principal"
                    highlight={principal.name}
                    description={principal.description}
                    image={principal.image}
                    imageAlt={principal.imageAlt}
                    imageViewTransitionName="principal-photo"
                    stats={[
                        {
                            value: principal.qualification,
                            label: "Qualification",
                            icon: <GraduationCap size={20} />,
                        },
                        {
                            value: principal.designation,
                            label: "Designation",
                            icon: <Award size={20} />,
                            iconClassName:
                                "bg-accent-soft text-accent",
                        },
                        {
                            value: principal.focus,
                            label: "Focus",
                            icon: <BookOpen size={20} />,
                        },
                    ]}
                />
            }
        >
            <div className="py-12 sm:py-16 lg:py-20">
                {/* Principal's Message */}
                <section className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_0.5rem_2.5rem_rgba(55,35,120,0.07)] sm:p-8 lg:p-12">
                    <div className="pointer-events-none absolute -right-16 top-8 hidden text-purple-700 opacity-[0.06] lg:block">
                        <Mandala />
                    </div>

                    <div className="relative max-w-5xl">
                        <div className="mb-8 flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-800">
                                <BookOpen size={23} />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-purple-900 sm:text-3xl">
                                    Principal&apos;s Message
                                </h2>

                                <div className="mt-3 h-1 w-9 rounded-full bg-orange-500" />
                            </div>
                        </div>

                        <div className="space-y-5 text-[0.98rem] leading-7 text-slate-700 sm:text-base">
                            <p className="font-semibold text-slate-900">
                                Dear Students, Parents and Well-wishers,
                            </p>

                            <p>{principal.message}</p>
                        </div>

                        <div className="mt-9 border-t border-slate-100 pt-7">
                            <p className="text-sm text-slate-500">
                                With best wishes,
                            </p>

                            <div className="my-2 flex h-12 w-36 items-center">
                                <span className="font-[cursive] text-3xl italic text-purple-800">
                                    {principal.firstName}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-purple-900">
                                {principal.name}
                            </h3>

                            <p className="text-sm text-slate-600">
                                {principal.designation}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Vision */}
                <section className="mt-16 lg:mt-20">
                    <SectionHeading title="Our Vision" />

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {visionCards.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.iconClassName}`}
                                        >
                                            <Icon size={23} />
                                        </div>

                                        <div>
                                            <h3 className="text-base font-bold text-slate-800">
                                                {item.title}
                                            </h3>

                                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className={`mt-6 h-1 w-9 rounded-full ${item.accentClassName}`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Quote */}
                <section className="mt-14 lg:mt-20">
                    <div className="relative overflow-hidden rounded-xl border border-purple-100 bg-purple-50 px-6 py-8 sm:px-10 sm:py-10">
                        <div className="pointer-events-none absolute -left-5 top-1/2 -translate-y-1/2 text-purple-700 opacity-10">
                            <Quote size={100} />
                        </div>

                        <div className="relative mx-auto max-w-3xl text-center">
                            <Quote
                                size={30}
                                className="mx-auto mb-4 text-purple-700"
                            />

                            <blockquote className="text-lg font-semibold leading-8 text-purple-900 sm:text-xl lg:text-2xl">
                                &ldquo;Education is the most powerful weapon which
                                you can use to change the world.&rdquo;
                            </blockquote>

                            <p className="mt-3 text-sm text-slate-600">
                                — Nelson Mandela
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}

function SectionHeading({
    title,
}: {
    title: string;
}) {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-900 sm:text-3xl">
                {title}
            </h2>

            <div className="mx-auto mt-3 flex items-center justify-center gap-2">
                <span className="h-px w-10 bg-orange-500" />
                <span className="h-2 w-2 rotate-45 bg-orange-500" />
                <span className="h-px w-10 bg-orange-500" />
            </div>
        </div>
    );
}

function Mandala() {
    return (
        <svg
            width="20rem"
            height="20rem"
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <circle
                cx="160"
                cy="160"
                r="135"
                stroke="currentColor"
                strokeWidth="2"
            />

            <circle
                cx="160"
                cy="160"
                r="105"
                stroke="currentColor"
                strokeWidth="2"
            />

            <circle
                cx="160"
                cy="160"
                r="70"
                stroke="currentColor"
                strokeWidth="2"
            />

            {Array.from({ length: 12 }).map((_, index) => (
                <ellipse
                    key={index}
                    cx="160"
                    cy="70"
                    rx="22"
                    ry="65"
                    stroke="currentColor"
                    strokeWidth="2"
                    transform={`rotate(${index * 30} 160 160)`}
                />
            ))}

            <circle
                cx="160"
                cy="160"
                r="25"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    );
}