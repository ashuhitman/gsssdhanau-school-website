"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext =
    createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "school-theme";

function getCurrentTheme(): Theme {
    if (typeof document === "undefined") {
        return "light";
    }

    return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
}

export function ThemeProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [theme, setThemeState] =
        useState<Theme>(getCurrentTheme);

    function setTheme(nextTheme: Theme) {
        setThemeState(nextTheme);

        document.documentElement.classList.toggle(
            "dark",
            nextTheme === "dark",
        );

        localStorage.setItem(STORAGE_KEY, nextTheme);
    }

    function toggleTheme() {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    useEffect(() => {
        const currentTheme = getCurrentTheme();

        setThemeState(currentTheme);
    }, []);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useTheme must be used inside ThemeProvider",
        );
    }

    return context;
}