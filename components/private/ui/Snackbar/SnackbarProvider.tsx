"use client";

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import Snackbar, {
    type ResponsiveValue,
    type SnackbarPosition,
    type SnackbarSlideFrom,
    type SnackbarType,
} from "./Snackbar";

export type ShowSnackbarOptions = {
    message: string;

    type?: SnackbarType;

    duration?: number;

    position?:
    | SnackbarPosition
    | ResponsiveValue<SnackbarPosition>;

    slideFrom?:
    | SnackbarSlideFrom
    | ResponsiveValue<SnackbarSlideFrom>;
};

type SnackbarContextValue = {
    showSnackbar: (
        options: ShowSnackbarOptions,
    ) => void;

    hideSnackbar: () => void;
};

const SnackbarContext =
    createContext<SnackbarContextValue | null>(
        null,
    );

export function SnackbarProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [snackbar, setSnackbar] =
        useState<ShowSnackbarOptions | null>(
            null,
        );

    const showSnackbar = (
        options: ShowSnackbarOptions,
    ) => {
        setSnackbar(options);
    };

    const hideSnackbar = () => {
        setSnackbar(null);
    };

    return (
        <SnackbarContext.Provider
            value={{
                showSnackbar,
                hideSnackbar,
            }}
        >
            {children}

            {snackbar && (
                <Snackbar
                    open={true}
                    message={snackbar.message}
                    type={snackbar.type}
                    duration={snackbar.duration}
                    position={snackbar.position}
                    slideFrom={snackbar.slideFrom}
                    onClose={hideSnackbar}
                />
            )}
        </SnackbarContext.Provider>
    );
}

export function useSnackbar() {
    const context = useContext(
        SnackbarContext,
    );

    if (!context) {
        throw new Error(
            "useSnackbar must be used inside SnackbarProvider",
        );
    }

    return context;
}