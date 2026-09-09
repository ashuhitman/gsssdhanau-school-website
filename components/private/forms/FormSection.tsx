interface FormSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export default function FormSection({
    title,
    description,
    children,
    className = "",
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
                <h2 className="text-base font-semibold leading-tight text-admin-heading sm:text-lg">
                    {title}
                </h2>

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