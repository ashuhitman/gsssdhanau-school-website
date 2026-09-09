"use client";

import {
    CheckCircle2,
    Info,
    TriangleAlert,
    X,
    XCircle,
    type LucideIcon,
} from "lucide-react";
import { useEffect } from "react";

type SnackbarType =
    | "success"
    | "error"
    | "warning"
    | "info";

type SnackbarPosition =
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

interface SnackbarProps {
    open: boolean;
    message: string;
    type?: SnackbarType;
    position?: SnackbarPosition;
    duration?: number;
    onClose: () => void;
}

const typeStyles: Record<
    SnackbarType,
    {
        icon: LucideIcon;
        iconClass: string;
    }
> = {
    success: {
        icon: CheckCircle2,
        iconClass: "text-admin-success",
    },
    error: {
        icon: XCircle,
        iconClass: "text-admin-danger",
    },
    warning: {
        icon: TriangleAlert,
        iconClass: "text-admin-warning",
    },
    info: {
        icon: Info,
        iconClass: "text-admin-info",
    },
};

const positionStyles: Record<
    SnackbarPosition,
    string
> = {
    "top-left":
        "top-3 left-3 sm:top-5 sm:left-5",
    "top-center":
        "top-3 left-1/2 -translate-x-1/2 sm:top-5",
    "top-right":
        "top-3 right-3 sm:top-5 sm:right-5",
    "bottom-left":
        "bottom-3 left-3 sm:bottom-5 sm:left-5",
    "bottom-center":
        "bottom-3 left-1/2 -translate-x-1/2 sm:bottom-5",
    "bottom-right":
        "bottom-3 right-3 sm:bottom-5 sm:right-5",
};

export default function Snackbar({
    open,
    message,
    type = "success",
    position = "bottom-right",
    duration = 4000,
    onClose,
}: SnackbarProps) {
    useEffect(() => {
        if (!open || duration <= 0) {
            return;
        }

        const timeout = window.setTimeout(() => {
            onClose();
        }, duration);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [open, duration, onClose]);

    if (!open) {
        return null;
    }

    const { icon: Icon, iconClass } = typeStyles[type];

    return (
        <div
            className={[
                "fixed z-[100]",
                "w-[calc(100%-1.5rem)] max-w-sm",
                positionStyles[position],
            ].join(" ")}
            role="status"
            aria-live="polite"
        >
            <div
                className="
                    flex
                    items-center
                    gap-3
                    rounded-[0.6rem]
                    border
                    border-admin
                    bg-admin-card
                    px-3
                    py-3
                    shadow-admin-card-hover
                "
            >
                <Icon
                    className={[
                        "h-5 w-5 shrink-0",
                        iconClass,
                    ].join(" ")}
                />

                <p className="min-w-0 flex-1 break-words text-sm font-medium text-admin-heading">
                    {message}
                </p>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close notification"
                    className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-[0.4rem]
                        text-admin-muted
                        transition-colors
                        hover:bg-admin-surface-hover
                        hover:text-admin-heading
                    "
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}