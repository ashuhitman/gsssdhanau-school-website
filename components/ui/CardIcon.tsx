import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type InfoCardIcon = LucideIcon | string | ReactNode;

interface InfoCardProps {
    icon?: InfoCardIcon;
    title: string;
    description?: string;
    href?: string;
    number?: string;
    variant?: "default" | "quickLink";
    className?: string;
}

export function CardIcon({ icon }: { icon?: InfoCardIcon }) {
    if (!icon) return null;

    // Image URL
    if (typeof icon === "string") {
        return (
            <img
                src={icon}
                alt=""
                className="h-full w-full object-contain"
            />
        );
    }

    // Lucide icon
    if (typeof icon === "function") {
        const Icon = icon;

        return (
            <Icon
                className="h-full w-full"
                strokeWidth={1.8}
            />
        );
    }

    // Custom React element
    return icon;
}