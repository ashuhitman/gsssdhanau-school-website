import type { TextareaHTMLAttributes } from "react";

interface FormTextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

export default function FormTextarea({
    error,
    className = "",
    ...props
}: FormTextareaProps) {
    return (
        <textarea
            {...props}
            className={[
                "min-h-[6rem] w-full min-w-0 resize-y",
                "rounded-[0.5rem]",
                "border border-admin",
                "bg-admin-card",
                "px-3 py-2.5",
                "text-sm leading-relaxed",
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