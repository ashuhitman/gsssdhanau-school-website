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

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "school-theme";

export function ThemeProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [theme, setThemeState] = useState<Theme>("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem(STORAGE_KEY);

        if (storedTheme === "light" || storedTheme === "dark") {
            setThemeState(storedTheme);

            document.documentElement.classList.toggle(
                "dark",
                storedTheme === "dark",
            );

            return;
        }

        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;

        const initialTheme: Theme = prefersDark ? "dark" : "light";

        setThemeState(initialTheme);

        document.documentElement.classList.toggle(
            "dark",
            initialTheme === "dark",
        );
    }, []);

    function setTheme(nextTheme: Theme) {
        setThemeState(nextTheme);

        localStorage.setItem(STORAGE_KEY, nextTheme);

        document.documentElement.classList.toggle(
            "dark",
            nextTheme === "dark",
        );
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

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