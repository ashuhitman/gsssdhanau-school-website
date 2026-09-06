import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export interface ActionProps {
    label: string;
    icon: LucideIcon;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "danger";
    external?: boolean;
}

export default function Action({
    label,
    icon: Icon,
    href,
    onClick,
    variant = "default",
    external = false,
}: ActionProps) {
    const className = [
        "flex h-8 w-8 shrink-0 items-center justify-center",
        "cursor-pointer rounded-[0.4rem]",
        "bg-primary-soft",
        "text-admin-primary",
        "transition-colors hover:bg-primary-soft-hover",
        variant === "danger"
            ? "text-admin-danger"
            : "text-admin-primary",
    ].join(" ");

    if (href) {
        return (
            <Link
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                title={label}
                className={className}
            >
                <Icon className="h-4 w-4" />
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            className={className}
        >
            <Icon className="h-4 w-4" />
        </button>
    );
}