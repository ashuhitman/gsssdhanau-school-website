import { ArrowRight, type LucideIcon } from "lucide-react";

interface InfoCardProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    href?: string;
    number?: string;
    variant?: "default" | "circleIcon";
    className?: string;
    items?: string[];
    showArrow?: boolean;

    /* Custom styling */
    circleColor?: string;
    boxShadow?: string;
}

export function InfoCard({
    icon: Icon,
    title,
    description,
    href,
    number,
    variant = "default",
    className = "",
    items = [],
    showArrow = false,
    circleColor,
    boxShadow,
}: InfoCardProps) {
    if (variant === "circleIcon") {
        const content = (
            <>
                {/* Icon */}
                <div
                    className={`
                        flex
                        size-16
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-primary-600
                        dark:text-primary-400
                        ${circleColor
                            ? ""
                            : "bg-primary-50 dark:bg-primary-950/30"
                        }
                    `}
                    style={
                        circleColor
                            ? {
                                backgroundColor: circleColor,
                            }
                            : undefined
                    }
                >
                    <Icon
                        className="size-8"
                        strokeWidth={1.8}
                    />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 overflow-hidden">
                    <h3 className="whitespace-normal break-normal text-sm font-bold leading-5 text-foreground">
                        {title}
                    </h3>

                    {description && (
                        <p className="mt-1 whitespace-normal break-normal text-xs leading-4 text-muted-foreground">
                            {description}
                        </p>
                    )}

                    {items.length > 0 &&
                        items.map((item, index) => (
                            <p
                                key={index}
                                className="mt-0.5 whitespace-normal break-normal text-xs leading-4 text-muted-foreground"
                            >
                                {item}
                            </p>
                        ))}
                </div>

                {/* Arrow */}
                {showArrow && (
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white transition-transform group-hover:translate-x-1">
                        <ArrowRight className="size-4" />
                    </div>
                )}
            </>
        );

        const classes = `
            group
            flex
            w-full
            min-w-0
            items-center
            gap-4
            overflow-hidden
            ${className}
        `;

        if (href) {
            return (
                <a
                    href={href}
                    className={classes}
                    style={
                        boxShadow
                            ? { boxShadow }
                            : undefined
                    }
                >
                    {content}
                </a>
            );
        }

        return (
            <div
                className={classes}
                style={
                    boxShadow
                        ? { boxShadow }
                        : undefined
                }
            >
                {content}
            </div>
        );
    }

    const content = (
        <>
            <div className="flex items-start justify-between gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                    <Icon
                        className="size-5"
                        strokeWidth={1.8}
                    />
                </div>

                {number && (
                    <span className="shrink-0 whitespace-nowrap text-xs font-bold tracking-wider text-primary-400">
                        {number}
                    </span>
                )}
            </div>

            <div className="mt-4 min-w-0 overflow-hidden">
                <h3 className="whitespace-normal break-normal text-sm font-bold text-foreground">
                    {title}
                </h3>

                {description && (
                    <p className="mt-1.5 whitespace-normal break-normal text-xs leading-5 text-muted-foreground">
                        {description}
                    </p>
                )}

                {items.length > 0 &&
                    items.map((item, index) => (
                        <p
                            key={index}
                            className="mt-0.5 whitespace-normal break-normal text-xs leading-5 text-muted-foreground"
                        >
                            {item}
                        </p>
                    ))}
            </div>

            {showArrow && (
                <div className="mt-4 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                    <ArrowRight className="size-4" />
                </div>
            )}
        </>
    );

    const classes = `
        group
        min-w-0
        overflow-hidden
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
        ${className}
    `;

    if (href) {
        return (
            <a
                href={href}
                className={classes}
                style={
                    boxShadow
                        ? { boxShadow }
                        : undefined
                }
            >
                {content}
            </a>
        );
    }

    return (
        <div
            className={classes}
            style={
                boxShadow
                    ? { boxShadow }
                    : undefined
            }
        >
            {content}
        </div>
    );
}