import {
    BookOpen,
    ClipboardCheck,
    UsersRound,
} from "lucide-react";

import { InfoCard } from "../ui/InfoCard";

const quickLinks = [
    {
        title: "Classes & Subjects",
        description:
            "Classes 9 to 12 with diverse subjects and streams.",
        icon: BookOpen,
        href: "/academics/classes",
    },
    {
        title: "Our Faculty",
        description:
            "Dedicated and experienced teachers guiding our students.",
        icon: UsersRound,
        href: "/academics/faculty",
    },
    {
        title: "Examinations & Results",
        description:
            "Examination information, results and academic updates.",
        icon: ClipboardCheck,
        href: "/academics/results",
    },
];

export default function AcademicsQuickLinks() {
    return (
        <section className="py-8">
            <div className="grid gap-5 md:grid-cols-3">
                {quickLinks.map((item) => (
                    <InfoCard
                        key={item.title}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                        href={item.href}
                        variant="circleIcon"
                        showArrow
                        className="
                            rounded-xl
                            border
                            border-border
                            bg-card
                            p-5
                            transition-all
                            duration-200
                            hover:-translate-y-1
                            hover:border-primary-200
                            hover:shadow-md
                            dark:hover:border-primary-800
                        "
                    />
                ))}
            </div>
        </section>
    );
}