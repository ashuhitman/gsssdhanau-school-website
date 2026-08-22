import {
    GraduationCap,
    Users,
    BookOpen,
    Trophy,
} from "lucide-react";

import { StatCard } from "@/components/common/StatCard";

const stats = [
    {
        title: "Students Enrolled",
        number: "600+",
        icon: GraduationCap,
        iconClassName: "icon-primary icon-bg-primary",
    },
    {
        title: "Qualified Teachers",
        number: "15+",
        icon: Users,
        iconClassName: "icon-danger icon-bg-danger",
    },
    {
        title: "Activity Categories",
        number: "25+",
        icon: BookOpen,
        iconClassName: "icon-info icon-bg-info",
    },
    {
        title: "Board Result",
        number: "90%+",
        icon: Trophy,
        iconClassName: "icon-accent icon-bg-accent",
    },
];

export function HomeStats() {
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
                                px-3
                                py-3
                                sm:px-5
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
                                className="
                                    w-fit
                                    justify-center
                                "
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}