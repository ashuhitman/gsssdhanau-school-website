"use client";

import { useEffect, useRef, useState } from "react";

export type SnackbarType =
    | "success"
    | "error"
    | "warning"
    | "info";

export type SnackbarPosition =
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

export type SnackbarSlideFrom =
    | "top"
    | "right"
    | "bottom"
    | "left";

export type Breakpoint =
    | "mobile"
    | "tablet"
    | "desktop";

export type ResponsiveValue<T> = {
    mobile?: T;
    tablet?: T;
    desktop?: T;
};

export type SnackbarProps = {
    open: boolean;
    message: string;

    type?: SnackbarType;

    /**
     * Duration in milliseconds.
     *
     * 0 = no automatic dismissal.
     */
    duration?: number;

    /**
     * Snackbar position.
     *
     * Can be a single position or responsive.
     */
    position?:
    | SnackbarPosition
    | ResponsiveValue<SnackbarPosition>;

    /**
     * Direction from which snackbar enters.
     *
     * Can be a single direction or responsive.
     */
    slideFrom?:
    | SnackbarSlideFrom
    | ResponsiveValue<SnackbarSlideFrom>;

    onClose: () => void;
};

const typeConfig: Record<
    SnackbarType,
    {
        icon: "success" | "error" | "warning" | "info";
        className: string;
    }
> = {
    error: {
        icon: "error",
        className:
            "bg-[#e53935] text-white",
    },

    warning: {
        icon: "warning",
        className:
            "bg-[#ff9800] text-white",
    },

    info: {
        icon: "info",
        className:
            "bg-[#1976d2] text-white",
    },

    success: {
        icon: "success",
        className:
            "bg-[#2e9d45] text-white",
    },
};

const getBreakpoint = (): Breakpoint => {
    if (window.innerWidth < 640) {
        return "mobile";
    }

    if (window.innerWidth < 1024) {
        return "tablet";
    }

    return "desktop";
};

const isResponsiveValue = <T,>(
    value: T | ResponsiveValue<T>,
): value is ResponsiveValue<T> => {
    if (
        typeof value !== "object" ||
        value === null
    ) {
        return false;
    }

    return (
        "mobile" in value ||
        "tablet" in value ||
        "desktop" in value
    );
};

const getResponsiveValue = <T,>(
    value: T | ResponsiveValue<T>,
    breakpoint: Breakpoint,
): T => {
    if (!isResponsiveValue(value)) {
        return value;
    }

    return (
        value[breakpoint] ??
        value.mobile ??
        value.tablet ??
        value.desktop!
    );
};

const getPositionClasses = (
    position: SnackbarPosition,
): string => {
    switch (position) {
        case "top-left":
            return "top-4 left-4";

        case "top-center":
            return "top-4 left-1/2 -translate-x-1/2";

        case "top-right":
            return "top-4 right-4";

        case "bottom-left":
            return "bottom-4 left-4";

        case "bottom-center":
            return "bottom-4 left-1/2 -translate-x-1/2";

        case "bottom-right":
            return "bottom-4 right-4";
    }
};

const getHiddenTransform = (
    slideFrom: SnackbarSlideFrom,
): string => {
    switch (slideFrom) {
        case "top":
            return "-translate-y-[calc(100%+1rem)]";

        case "right":
            return "translate-x-[calc(100%+1rem)]";

        case "bottom":
            return "translate-y-[calc(100%+1rem)]";

        case "left":
            return "-translate-x-[calc(100%+1rem)]";
    }
};

/*
 * Icons
 */
function SnackbarIcon({
    type,
}: {
    type: "success" | "error" | "warning" | "info";
}) {
    const commonProps = {
        width: 20,
        height: 20,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2.5,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        "aria-hidden": true,
    };

    if (type === "success") {
        return (
            <svg {...commonProps}>
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12 2.5 2.5L16 9" />
            </svg>
        );
    }

    if (type === "error") {
        return (
            <svg {...commonProps}>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5" />
                <path d="M12 16h.01" />
            </svg>
        );
    }

    if (type === "warning") {
        return (
            <svg {...commonProps}>
                <path d="M10.3 4.2 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
            </svg>
        );
    }

    return (
        <svg {...commonProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5" />
            <path d="M12 8h.01" />
        </svg>
    );
}

export default function Snackbar({
    open,
    message,
    type = "success",
    duration = 4000,
    position = "bottom-right",
    slideFrom = "right",
    onClose,
}: SnackbarProps) {
    const [visible, setVisible] =
        useState(false);

    const [breakpoint, setBreakpoint] =
        useState<Breakpoint>("desktop");

    const closeTimerRef =
        useRef<ReturnType<typeof setTimeout> | null>(
            null,
        );

    const hideTimerRef =
        useRef<ReturnType<typeof setTimeout> | null>(
            null,
        );

    const onCloseRef = useRef(onClose);

    /*
     * Always keep latest onClose.
     */
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    /*
     * Resolve responsive values.
     */
    const resolvedPosition =
        getResponsiveValue(
            position,
            breakpoint,
        );

    const resolvedSlideFrom =
        getResponsiveValue(
            slideFrom,
            breakpoint,
        );

    const config = typeConfig[type];

    /*
     * Clear all timers.
     */
    const clearTimers = () => {
        if (closeTimerRef.current) {
            clearTimeout(
                closeTimerRef.current,
            );

            closeTimerRef.current = null;
        }

        if (hideTimerRef.current) {
            clearTimeout(
                hideTimerRef.current,
            );

            hideTimerRef.current = null;
        }
    };

    /*
     * Handle responsive breakpoint.
     */
    useEffect(() => {
        const handleResize = () => {
            setBreakpoint(getBreakpoint());
        };

        handleResize();

        window.addEventListener(
            "resize",
            handleResize,
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize,
            );
        };
    }, []);

    /*
     * Handle entrance animation.
     */
    useEffect(() => {
        if (!open) {
            setVisible(false);
            return;
        }

        const timer = setTimeout(() => {
            setVisible(true);
        }, 10);

        return () => {
            clearTimeout(timer);
        };
    }, [open]);

    /*
     * Automatic dismissal.
     */
    useEffect(() => {
        clearTimers();

        if (!open || duration <= 0) {
            return;
        }

        closeTimerRef.current =
            setTimeout(() => {
                setVisible(false);

                hideTimerRef.current =
                    setTimeout(() => {
                        onCloseRef.current();
                    }, 300);
            }, duration);

        return clearTimers;
    }, [open, duration]);

    /*
     * Cleanup.
     */
    useEffect(() => {
        return () => {
            clearTimers();
        };
    }, []);

    if (!open) {
        return null;
    }

    return (
        <div
            className={[
                "pointer-events-none fixed z-[9999]",

                /*
                 * Mobile:
                 * nearly full width.
                 *
                 * Larger screens:
                 * content width.
                 */
                "w-[calc(100%-2rem)]",
                "max-w-[26rem]",
                "sm:w-auto",

                getPositionClasses(
                    resolvedPosition,
                ),
            ].join(" ")}
            role={
                type === "error"
                    ? "alert"
                    : "status"
            }
            aria-live={
                type === "error"
                    ? "assertive"
                    : "polite"
            }
            aria-atomic="true"
        >
            <div
                className={[
                    "pointer-events-auto",

                    "flex items-center gap-3",

                    "rounded-sm",

                    "px-4 py-3",

                    /*
                     * Similar to the reference image.
                     */
                    "shadow-lg",

                    "transition-all",
                    "duration-300",
                    "ease-out",

                    "motion-reduce:transition-none",

                    config.className,

                    visible
                        ? "translate-x-0 translate-y-0 opacity-100"
                        : `${getHiddenTransform(
                            resolvedSlideFrom,
                        )} opacity-0`,
                ].join(" ")}
            >
                {/* Icon */}
                <span
                    className={[
                        "flex shrink-0",
                        "items-center justify-center",
                    ].join(" ")}
                >
                    <SnackbarIcon
                        type={config.icon}
                    />
                </span>

                {/* Message */}
                <p
                    className={[
                        "min-w-0 flex-1",
                        "break-words",
                        "text-sm",
                        "font-medium",
                        "leading-5",
                    ].join(" ")}
                >
                    {message}
                </p>

                {/* Close */}
                <button
                    type="button"
                    onClick={() => {
                        clearTimers();

                        setVisible(false);

                        hideTimerRef.current =
                            setTimeout(() => {
                                onCloseRef.current();
                            }, 300);
                    }}
                    className={[
                        "flex size-7 shrink-0",
                        "items-center justify-center",
                        "rounded-sm",
                        "text-white/90",
                        "transition-colors",
                        "hover:bg-white/10",
                        "hover:text-white",
                        "focus:outline-none",
                        "focus:ring-2",
                        "focus:ring-white/50",
                    ].join(" ")}
                    aria-label="Close notification"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}