import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
    breadcrumbs: string[];
    title: string;
    description?: string;
    action?: {
        label: string;
        href: string;
    };
    actions?: ReactNode;
}

export default function PageHero({
    breadcrumbs,
    title,
    description,
    action,
    actions,
}: PageHeroProps) {
    return (
        <section className="min-w-0">
            <div className="mb-3 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-admin-muted sm:text-sm">
                {breadcrumbs.map((breadcrumb, index) => (
                    <div
                        key={`${breadcrumb}-${index}`}
                        className="flex min-w-0 items-center gap-1.5"
                    >
                        <span className="truncate">{breadcrumb}</span>

                        {index < breadcrumbs.length - 1 && (
                            <ChevronRight
                                aria-hidden="true"
                                className="h-3.5 w-3.5 shrink-0"
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <h1 className="break-words text-xl font-bold tracking-tight text-admin-heading sm:text-2xl lg:text-3xl">
                        {title}
                    </h1>

                    {description && (
                        <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-admin-muted sm:text-base">
                            {description}
                        </p>
                    )}
                </div>

                {(action || actions) && (
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                        {actions}

                        {action && (
                            <Link
                                href={action.href}
                                className="inline-flex items-center justify-center rounded-[0.45rem] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                {action.label}
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}