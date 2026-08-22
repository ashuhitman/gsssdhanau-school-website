import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    icon: LucideIcon;
    title: string;
    number?: string;
    description?: string;
    variant?: "horizontal" | "vertical";
    iconClassName?: string;
    className?: string;
}

export function StatCard({
    icon: Icon,
    title,
    number,
    description,
    variant = "horizontal",
    iconClassName = "",
    className = "",
}: StatCardProps) {
    const isVertical = variant === "vertical";

    return (
        <div
            className={`
                flex
                min-w-0
                ${isVertical
                    ? "flex-col items-center text-center"
                    : "items-center justify-center"
                }
                ${className}
            `}
        >
            {/* Icon */}
            <div
                className={`
                    flex
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${isVertical
                        ? "size-9 sm:size-10"
                        : "size-8 sm:size-10 lg:size-11"
                    }
                    ${iconClassName}
                `}
            >
                <Icon
                    className={
                        isVertical
                            ? "size-4 sm:size-5"
                            : "size-4 sm:size-[1.1rem] lg:size-5"
                    }
                    strokeWidth={1.8}
                />
            </div>

            {/* Content */}
            <div
                className={`
                    min-w-0
                    ${isVertical
                        ? "mt-2 text-center"
                        : "ml-2.5 text-left sm:ml-3"
                    }
                `}
            >
                {/* Number */}
                {number && (
                    <p
                        className={`
                            font-bold
                            leading-none
                            tracking-tight
                            text-heading
                            ${isVertical
                                ? "text-base sm:text-lg"
                                : "text-sm sm:text-base lg:text-lg"
                            }
                        `}
                    >
                        {number}
                    </p>
                )}

                {/* Title */}
                <h3
                    className={`
                        max-w-full
                        whitespace-normal
                        break-words
                        font-semibold
                        leading-tight
                        text-muted
                        ${number
                            ? "mt-1"
                            : ""
                        }
                        ${isVertical
                            ? "text-[0.65rem] sm:text-xs"
                            : "text-[0.65rem] sm:text-xs lg:text-sm"
                        }
                    `}
                >
                    {title}
                </h3>

                {/* Description */}
                {!number && description && (
                    <p
                        className="
                            mt-1
                            max-w-full
                            text-[0.65rem]
                            leading-4
                            text-muted
                            sm:text-xs
                        "
                    >
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}