interface FormFieldProps {
    label: string;
    required?: boolean;
    htmlFor?: string;
    description?: string;
    error?: string;
    children: React.ReactNode;
    className?: string;
}

export default function FormField({
    label,
    required = false,
    htmlFor,
    description,
    error,
    children,
    className = "",
}: FormFieldProps) {
    return (
        <div className={["min-w-0", className].join(" ")}>
            <label
                htmlFor={htmlFor}
                className="mb-1.5 block text-sm font-medium leading-tight text-admin-heading"
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