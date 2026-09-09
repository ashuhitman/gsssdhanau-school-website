import type { ReactNode } from "react";

interface FormActionsProps {
    children: ReactNode;
    className?: string;
}

export default function FormActions({
    children,
    className = "",
}: FormActionsProps) {
    return (
        <div
            className={[
                "flex min-w-0 flex-col-reverse gap-2",
                "sm:flex-row sm:items-center sm:justify-end",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
}