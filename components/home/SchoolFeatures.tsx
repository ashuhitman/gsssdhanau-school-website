import {
    BarChart3,
    BookOpen,
    Leaf,
    Users,
} from "lucide-react";

import { InfoCard } from "@/components/ui/InfoCard";

const features = [
    {
        number: "01",
        title: "Quality Education",
        description:
            "A strong academic foundation that helps every student learn, grow and achieve their potential.",
        icon: BookOpen,
    },
    {
        number: "02",
        title: "Experienced Faculty",
        description:
            "Dedicated teachers who guide students with knowledge, care and commitment.",
        icon: Users,
    },
    {
        number: "03",
        title: "Holistic Development",
        description:
            "Equal emphasis on academics, sports, creativity, values and personality development.",
        icon: Leaf,
    },
    {
        number: "04",
        title: "Bright Future",
        description:
            "Preparing students with the skills, confidence and values needed for a successful future.",
        icon: BarChart3,
    },
];

export function SchoolFeatures() {
    return (
        <section className="px-4 pb-12 sm:px-6 lg:pb-16 xl:px-8">
            <div className="mx-auto max-w-[90rem]">
                <div className="mb-7">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-400">
                        What We Stand For
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
                        Building a Strong Foundation for Every Student
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((item) => (
                        <InfoCard
                            key={item.number}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            number={item.number}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}