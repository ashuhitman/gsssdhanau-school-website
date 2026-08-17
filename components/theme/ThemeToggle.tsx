"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
    variant?: "default" | "topbar";
}

export function ThemeToggle({
    variant = "default",
}: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();

    const [mounted, setMounted] =
        useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = theme === "dark";

    const className =
        variant === "topbar"
            ? "flex size-7 items-center justify-center rounded-md text-white/90 transition-colors hover:bg-white/10 hover:text-white"
            : "flex size-10 items-center justify-center rounded-lg border border-border bg-card text-card-foreground transition-colors hover:bg-surface-hover";

    /*
     * Server and initial client render the same
     * empty button.
     *
     * The theme itself has already been applied
     * by ThemeScript before the page becomes interactive.
     */
    if (!mounted) {
        return (
            <div
                aria-hidden="true"
                className={
                    variant === "topbar"
                        ? "size-7"
                        : "size-10 rounded-lg border border-border bg-card"
                }
            />
        );
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
            title={
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
            className={className}
        >
            {isDark ? (
                <Sun className="size-4" />
            ) : (
                <Moon className="size-4" />
            )}
        </button>
    );
}