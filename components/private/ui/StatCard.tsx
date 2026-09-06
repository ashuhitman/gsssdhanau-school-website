import type { LucideIcon } from "lucide-react";

type StatCardVariant =
    | "blue"
    | "green"
    | "purple"
    | "rose"
    | "orange";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    variant?: StatCardVariant;
}

const variantStyles: Record<
    StatCardVariant,
    {
        card: string;
        iconBackground: string;
        icon: string;
    }
> = {
    blue: {
        card: "bg-admin-stat-blue-surface",
        iconBackground: "bg-admin-stat-blue-soft",
        icon: "text-admin-stat-blue",
    },
    green: {
        card: "bg-admin-stat-green-surface",
        iconBackground: "bg-admin-stat-green-soft",
        icon: "text-admin-stat-green",
    },
    purple: {
        card: "bg-admin-stat-purple-surface",
        iconBackground: "bg-admin-stat-purple-soft",
        icon: "text-admin-stat-purple",
    },
    rose: {
        card: "bg-admin-stat-rose-surface",
        iconBackground: "bg-admin-stat-rose-soft",
        icon: "text-admin-stat-rose",
    },
    orange: {
        card: "bg-admin-stat-orange-surface",
        iconBackground: "bg-admin-stat-orange-soft",
        icon: "text-admin-stat-orange",
    },
};

export default function StatCard({
    label,
    value,
    icon: Icon,
    variant = "blue",
}: StatCardProps) {
    const styles = variantStyles[variant];

    return (
        <div
            className={[
                "min-w-0 rounded-[0.7rem] p-3 sm:p-4",
                "border border-admin",
                "shadow-admin-card",
                "transition-shadow duration-200",
                "hover:shadow-admin-card-hover",
                styles.card,
            ].join(" ")}
        >
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div
                    className={[
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.65rem]",
                        "sm:h-11 sm:w-11",
                        styles.iconBackground,
                    ].join(" ")}
                >
                    <Icon
                        className={[
                            "h-5 w-5",
                            styles.icon,
                        ].join(" ")}
                    />
                </div>

                <div className="min-w-0">
                    <p className="truncate text-xl font-bold leading-none text-admin-heading sm:text-2xl">
                        {value}
                    </p>

                    <p className="mt-1 truncate text-xs font-medium text-admin-muted sm:text-sm">
                        {label}
                    </p>
                </div>
            </div>
        </div>
    );
}