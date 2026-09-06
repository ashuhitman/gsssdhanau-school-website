import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";

interface PageHeroAction {
    label: string;
    href: string;
}

interface PageHeroProps {
    breadcrumbs: string[];
    title: string;
    description?: string;
    action?: PageHeroAction;
}

export default function PageHero({
    breadcrumbs,
    title,
    description,
    action,
}: PageHeroProps) {
    return (
        <section className="min-w-0">
            <div
                className="
                    flex min-w-0 flex-col gap-4
                    lg:flex-row lg:items-end lg:justify-between
                    lg:gap-6
                "
            >
                <div className="min-w-0">
                    {/* Breadcrumbs */}
                    <nav
                        aria-label="Breadcrumb"
                        className="mb-1.5 flex min-w-0 items-center gap-1.5 overflow-hidden"
                    >
                        {breadcrumbs.map((item, index) => {
                            const isLast =
                                index === breadcrumbs.length - 1;

                            return (
                                <div
                                    key={`${item}-${index}`}
                                    className="flex min-w-0 items-center gap-1.5"
                                >
                                    {index > 0 && (
                                        <ChevronRight
                                            className="h-3.5 w-3.5 shrink-0 text-admin-subtle"
                                        />
                                    )}

                                    <span
                                        className={[
                                            "truncate text-sm",
                                            isLast
                                                ? "font-medium text-admin-heading"
                                                : "text-admin-muted",
                                        ].join(" ")}
                                    >
                                        {item}
                                    </span>
                                </div>
                            );
                        })}
                    </nav>

                    {/* Title */}
                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-admin-heading sm:text-3xl lg:text-4xl">
                        {title}
                    </h1>

                    {/* Description */}
                    {description && (
                        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-admin-muted sm:text-base">
                            {description}
                        </p>
                    )}
                </div>

                {/* Action */}
                {action && (
                    <div className="w-full shrink-0 lg:w-auto">
                        <Link
                            href={action.href}
                            className="
                                admin-button
                                inline-flex
                                h-10
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-[0.5rem]
                                px-4
                                text-sm
                                font-semibold
                                sm:h-11
                                sm:w-auto
                                sm:px-5
                            "
                        >
                            <Plus className="h-4 w-4" />
                            <span>{action.label}</span>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}