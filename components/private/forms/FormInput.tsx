import type { InputHTMLAttributes } from "react";

interface FormInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export default function FormInput({
    error,
    className = "",
    ...props
}: FormInputProps) {
    return (
        <input
            {...props}
            className={[
                "h-10 w-full min-w-0",
                "rounded-[0.5rem]",
                "border border-admin",
                "bg-admin-card",
                "px-3",
                "text-sm leading-normal",
                "text-admin-heading",
                "outline-none",
                "placeholder:text-admin-subtle",
                "transition-colors",
                "focus:border-admin-primary",
                "focus:ring-2 focus:ring-admin-primary/10",
                error
                    ? "border-admin-danger focus:border-admin-danger focus:ring-admin-danger/10"
                    : "",
                className,
            ].join(" ")}
        />
    );
}