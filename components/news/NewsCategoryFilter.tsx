"use client";

import { CategoryIcon, NewsCategoryOption } from "@/types/newsTypes";
import {
    Award,
    CalendarDays,
    GraduationCap,
    Grid2X2,
    Megaphone,
    Trophy,
    UsersRound,
} from "lucide-react";
import { useState } from "react";



interface NewsCategoryFilterProps {
    categories: NewsCategoryOption[];
}

const iconMap: Record<
    CategoryIcon,
    typeof Grid2X2
> = {
    grid: Grid2X2,
    calendar: CalendarDays,
    activities: UsersRound,
    sports: Trophy,
    achievement: Award,
    academic: GraduationCap,
};

export default function NewsCategoryFilter({
    categories,
}: NewsCategoryFilterProps) {
    const [active, setActive] = useState<
        NewsCategoryOption["value"]
    >("All");

    return (
        <section className="min-w-0">
            {/* Heading */}
            <h2 className="mb-4 w-fit whitespace-nowrap text-sm font-bold uppercase tracking-wide text-foreground">
                Browse by Category
            </h2>

            {/* Categories */}
            <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
                {categories.map((category) => {
                    const Icon = iconMap[category.icon];

                    const isActive =
                        active === category.value;

                    return (
                        <button
                            key={category.value}
                            type="button"
                            onClick={() =>
                                setActive(category.value)
                            }
                            className={`
                                flex
                                min-w-0
                                min-h-[62px]
                                items-center
                                gap-2.5
                                overflow-hidden
                                rounded-lg
                                border
                                px-3
                                py-2.5
                                text-left
                                transition-all
                                ${isActive
                                    ? "border-primary-600 bg-primary-600 text-white shadow-sm"
                                    : "border-border bg-card text-foreground hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-950"
                                }
                            `}
                        >
                            {/* Icon */}
                            <Icon
                                className={`
                                    size-5
                                    shrink-0
                                    ${isActive
                                        ? "text-white"
                                        : "text-primary-600 dark:text-primary-400"
                                    }
                                `}
                                strokeWidth={1.7}
                            />

                            {/* Text */}
                            <span className="min-w-0 flex-1">
                                <span
                                    className={`
                                        block
                                        whitespace-nowrap
                                        text-[11px]
                                        font-semibold
                                        leading-4
                                        ${isActive
                                            ? "text-white"
                                            : "text-foreground"
                                        }
                                    `}
                                >
                                    {category.label}
                                </span>

                                <span
                                    className={`
                                        mt-0.5
                                        block
                                        text-[10px]
                                        leading-3
                                        ${isActive
                                            ? "text-white/80"
                                            : "text-muted-foreground"
                                        }
                                    `}
                                >
                                    {category.count}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}