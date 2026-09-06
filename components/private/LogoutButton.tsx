"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/lib/data/auth/logout";

export default function LogoutButton() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        if (loading) {
            return;
        }

        setLoading(true);

        await logout();

        router.replace("/login");
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="text-muted hover:bg-error-soft hover:text-error flex w-full items-center gap-3 rounded-[0.625rem] px-3 py-2.5 text-sm font-medium transition-colors disabled:cursor-wait disabled:opacity-60"
        >
            {loading ? (
                <svg
                    className="h-5 w-5 shrink-0 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="opacity-30"
                    />

                    <path
                        d="M21 12a9 9 0 0 0-9-9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            ) : (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 shrink-0"
                    aria-hidden="true"
                >
                    <path
                        d="M10 17l5-5-5-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <path
                        d="M15 12H3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />

                    <path
                        d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                </svg>
            )}

            <span>
                {loading ? "Signing out..." : "Sign out"}
            </span>
        </button>
    );
}