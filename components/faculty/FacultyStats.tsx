import {
    UsersRound,
    GraduationCap,
    Layers3,
    Trophy,
} from "lucide-react";

import { StatCard } from "@/components/common/StatCard";

const stats = [
    {
        number: "600+",
        title: "Students Enrolled",
        icon: UsersRound,
        iconClassName: "icon-accent icon-bg-accent",
    },
    {
        number: "15+",
        title: "Qualified Teachers",
        icon: GraduationCap,
        iconClassName: "icon-info icon-bg-info",
    },
    {
        number: "3",
        title: "Senior Secondary Streams",
        icon: Layers3,
        iconClassName: "icon-success icon-bg-success",
    },
    {
        number: "90%+",
        title: "Board Result (Last Year)",
        icon: Trophy,
        iconClassName: "icon-primary icon-bg-primary",
    },
];

export function FacultyStats() {
    return (
        <section className="py-5 sm:py-6">
            <div
                className="
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    px-2
                    py-3
                    shadow-school-card
                    sm:px-3
                    sm:py-4
                "
            >
                <div className="grid grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.title}
                            className={`
                                flex
                                min-w-0
                                items-center
                                justify-center
                                px-2
                                py-3
                                sm:px-4
                                sm:py-4

                                ${index === 0
                                    ? "border-r border-b border-border lg:border-b-0"
                                    : ""
                                }

                                ${index === 1
                                    ? "border-b border-border lg:border-r lg:border-b-0"
                                    : ""
                                }

                                ${index === 2
                                    ? "border-r border-border"
                                    : ""
                                }
                            `}
                        >
                            <StatCard
                                icon={stat.icon}
                                number={stat.number}
                                title={stat.title}
                                variant="horizontal"
                                iconClassName={stat.iconClassName}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}