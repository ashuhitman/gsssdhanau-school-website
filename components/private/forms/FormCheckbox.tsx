import type { InputHTMLAttributes, ReactNode } from "react";

interface FormCheckboxProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "type"
    > {
    label: ReactNode;
    description?: ReactNode;
}

export default function FormCheckbox({
    label,
    description,
    className = "",
    ...props
}: FormCheckboxProps) {
    return (
        <label
            className="
                flex
                min-w-0
                cursor-pointer
                items-start
                gap-3
                rounded-[0.5rem]
                border
                border-admin
                bg-admin-card
                px-3
                py-2.5
                transition-colors
                hover:bg-admin-surface-hover
            "
        >
            <input
                {...props}
                type="checkbox"
                className={[
                    "mt-0.5 h-4 w-4 shrink-0 rounded",
                    "border-admin",
                    "accent-admin-primary",
                    className,
                ].join(" ")}
            />

            <span className="min-w-0">
                <span className="block text-sm font-medium leading-tight text-admin-heading">
                    {label}
                </span>

                {description && (
                    <span className="mt-1 block text-xs leading-relaxed text-admin-muted">
                        {description}
                    </span>
                )}
            </span>
        </label>
    );
}