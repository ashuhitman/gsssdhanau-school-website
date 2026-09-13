import type { ReactNode } from "react";

interface FormFieldProps {
    label: string;
    required?: boolean;
    htmlFor?: string;
    description?: string;
    error?: string;
    children: ReactNode;
    className?: string;
    action?: ReactNode;
}

export default function FormField({
    label,
    required = false,
    htmlFor,
    description,
    error,
    children,
    className = "",
    action,
}: FormFieldProps) {
    return (
        <div
            className={[
                "min-w-0",
                className,
            ].join(" ")}
        >
            <div className="mb-1.5 flex min-w-0 items-center justify-between gap-3">
                <label
                    htmlFor={htmlFor}
                    className="min-w-0 text-sm font-medium leading-tight text-admin-heading"
                >
                    {label}

                    {required && (
                        <span
                            aria-hidden="true"
                            className="ml-1 text-admin-danger"
                        >
                            *
                        </span>
                    )}
                </label>

                {action}
            </div>

            <div className="min-w-0">
                {children}
            </div>

            {description && !error && (
                <p className="mt-1.5 text-xs leading-relaxed text-admin-muted">
                    {description}
                </p>
            )}

            {error && (
                <p
                    role="alert"
                    className="mt-1.5 text-xs leading-relaxed text-admin-danger"
                >
                    {error}
                </p>
            )}
        </div>
    );
}