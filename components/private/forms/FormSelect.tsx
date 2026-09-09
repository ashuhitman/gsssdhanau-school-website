import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface FormSelectProps
    extends SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
}

export default function FormSelect({
    error,
    className = "",
    children,
    ...props
}: FormSelectProps) {
    return (
        <div className="relative min-w-0">
            <select
                {...props}
                className={[
                    "h-10 w-full min-w-0 appearance-none",
                    "rounded-[0.5rem]",
                    "border border-admin",
                    "bg-admin-card",
                    "px-3 pr-9",
                    "text-sm leading-normal",
                    "text-admin-heading",
                    "outline-none",
                    "transition-colors",
                    "focus:border-admin-primary",
                    "focus:ring-2 focus:ring-admin-primary/10",
                    error
                        ? "border-admin-danger focus:border-admin-danger focus:ring-admin-danger/10"
                        : "",
                    className,
                ].join(" ")}
            >
                {children}
            </select>

            <ChevronDown
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-admin-muted
                "
            />
        </div>
    );
}