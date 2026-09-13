import type { ReactNode } from "react";

interface FormSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
    action?: ReactNode;
}

export default function FormSection({
    title,
    description,
    children,
    className = "",
    action,
}: FormSectionProps) {
    return (
        <section
            className={[
                "min-w-0 rounded-[0.7rem] bg-admin-card",
                "p-3.5 sm:p-4 lg:p-5",
                "shadow-admin-card",
                className,
            ].join(" ")}
        >
            <div className="mb-4 min-w-0 sm:mb-5">
                <div className="flex min-w-0 items-center justify-between gap-3">
                    <h2 className="min-w-0 text-base font-semibold leading-tight text-admin-heading sm:text-lg">
                        {title}
                    </h2>

                    {action}
                </div>

                {description && (
                    <p className="mt-1 max-w-3xl text-xs leading-relaxed text-admin-muted sm:text-sm">
                        {description}
                    </p>
                )}
            </div>

            <div className="min-w-0">
                {children}
            </div>
        </section>
    );
}