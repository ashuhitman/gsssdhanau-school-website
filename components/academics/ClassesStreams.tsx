import { FlaskConical, GraduationCap, Leaf } from "lucide-react";

import { InfoCard } from "../common/InfoCard";
import { SectionHeading } from "../ui/SectionHeading";

interface AcademicStream {
    title: string;
    items: string[];
    icon: typeof GraduationCap;
}

const streams: AcademicStream[] = [
    {
        title: "Secondary",
        items: ["Class 9", "Class 10"],
        icon: GraduationCap,
    },
    {
        title: "Senior Secondary",
        items: ["Class 11", "Class 12"],
        icon: GraduationCap,
    },
    {
        title: "Science Stream",
        items: ["Physics, Chemistry", "Mathematics, Biology"],
        icon: FlaskConical,
    },
    {
        title: "Agriculture Stream",
        items: ["Agriculture and related", "subjects"],
        icon: Leaf,
    },
];

export default function ClassesStreams() {
    return (
        <section className="py-8">
            <div className="flex justify-center text-center">
                <SectionHeading title="Classes & Streams" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {streams.map((stream) => (
                    <InfoCard
                        key={stream.title}
                        icon={stream.icon}
                        title={stream.title}
                        items={stream.items}
                        variant="circleIcon"
                        className="
                rounded-none
                border-r
                border-border
                px-5
                py-4
                last:border-r-0
            "
                    />
                ))}
            </div>
        </section>
    );
}