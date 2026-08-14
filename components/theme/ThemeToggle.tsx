"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
    variant?: "default" | "topbar";
}

export function ThemeToggle({
    variant = "default",
}: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === "dark";

    const className =
        variant === "topbar"
            ? "flex size-7 items-center justify-center rounded-md text-white/90 transition-colors hover:bg-white/10 hover:text-white"
            : "flex size-10 items-center justify-center rounded-lg border border-border bg-card text-card-foreground transition-colors hover:bg-surface-hover";

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