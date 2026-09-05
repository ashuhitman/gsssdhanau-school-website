"use client";

import { useState } from "react";
import Link from "next/link";

import type { AuthUser } from "@/lib/data/auth/types";

import LogoutButton from "./LogoutButton";

interface DashboardShellProps {
    user: AuthUser;
    children: React.ReactNode;
}

export default function DashboardShell({
    user,
    children,
}: DashboardShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const roleLabel = user.role.replaceAll("_", " ");

    return (
        <div className="bg-background text-foreground flex min-h-screen">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* Desktop sidebar / Mobile drawer */}
            <aside
                className={`bg-card border-default fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r transition-transform duration-200 lg:sticky lg:top-0 lg:z-30 lg:translate-x-0 ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >
                {/* Sidebar header */}
                <div className="border-default flex h-16 shrink-0 items-center justify-between border-b px-5">
                    <Link
                        href="/dashboard"
                        onClick={() => setSidebarOpen(false)}
                        className="flex min-w-0 items-center gap-3"
                    >
                        <div className="bg-primary-soft text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.625rem]">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-5 w-5"
                                aria-hidden="true"
                            >
                                <path
                                    d="M3 10.5 12 4l9 6.5"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M5.5 9.5V20h13V9.5"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9 20v-5h6v5"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <div className="min-w-0">
                            <p className="text-heading truncate text-sm font-bold">
                                School Admin
                            </p>

                            <p className="text-muted truncate text-xs">
                                Management Portal
                            </p>
                        </div>
                    </Link>

                    {/* Mobile close */}
                    <button
                        type="button"
                        aria-label="Close navigation"
                        onClick={() => setSidebarOpen(false)}
                        className="text-muted hover:bg-surface hover:text-heading flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.625rem] transition-colors lg:hidden"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-5 w-5"
                            aria-hidden="true"
                        >
                            <path
                                d="m6 6 12 12M18 6 6 18"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                    <p className="text-muted mb-2 px-2 text-[0.6875rem] font-semibold uppercase tracking-wider">
                        Menu
                    </p>

                    <div className="space-y-1">
                        {/* Dashboard */}
                        <Link
                            href="/dashboard"
                            onClick={() => setSidebarOpen(false)}
                            className="text-heading hover:bg-surface flex items-center gap-3 rounded-[0.625rem] px-3 py-2.5 text-sm font-medium transition-colors"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-5 w-5 shrink-0"
                                aria-hidden="true"
                            >
                                <rect
                                    x="4"
                                    y="4"
                                    width="6"
                                    height="6"
                                    rx="1"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                />
                                <rect
                                    x="14"
                                    y="4"
                                    width="6"
                                    height="6"
                                    rx="1"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                />
                                <rect
                                    x="4"
                                    y="14"
                                    width="6"
                                    height="6"
                                    rx="1"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                />
                                <rect
                                    x="14"
                                    y="14"
                                    width="6"
                                    height="6"
                                    rx="1"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                />
                            </svg>

                            <span>Dashboard</span>
                        </Link>

                        {/* Administration */}
                        {user.role === "admin" && (
                            <Link
                                href="/dashboard/admin"
                                onClick={() => setSidebarOpen(false)}
                                className="text-heading hover:bg-surface flex items-center gap-3 rounded-[0.625rem] px-3 py-2.5 text-sm font-medium transition-colors"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-5 w-5 shrink-0"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M4 20V10l8-6 8 6v10"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8 20v-5h8v5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9 11h6"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                <span>Administration</span>
                            </Link>
                        )}

                        {/* Faculty */}
                        {user.role === "faculty" && (
                            <Link
                                href="/dashboard/faculty"
                                onClick={() => setSidebarOpen(false)}
                                className="text-heading hover:bg-surface flex items-center gap-3 rounded-[0.625rem] px-3 py-2.5 text-sm font-medium transition-colors"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-5 w-5 shrink-0"
                                    aria-hidden="true"
                                >
                                    <circle
                                        cx="12"
                                        cy="8"
                                        r="3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                    />
                                    <path
                                        d="M5 20c.8-3.4 3.3-5 7-5s6.2 1.6 7 5"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                <span>Faculty</span>
                            </Link>
                        )}

                        {/* Newsletter */}
                        {(user.role === "newsletter_incharge" ||
                            user.role === "student") && (
                                <Link
                                    href="/dashboard/newsletter"
                                    onClick={() => setSidebarOpen(false)}
                                    className="text-heading hover:bg-surface flex items-center gap-3 rounded-[0.625rem] px-3 py-2.5 text-sm font-medium transition-colors"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M5 5h14v14H5z"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8 9h8M8 12h8M8 15h5"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                    <span>Newsletter</span>
                                </Link>
                            )}

                        {/* Visit Website */}
                        <Link
                            href="/"
                            onClick={() => setSidebarOpen(false)}
                            className="text-muted hover:bg-surface hover:text-heading flex items-center gap-3 rounded-[0.625rem] px-3 py-2.5 text-sm font-medium transition-colors"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-5 w-5 shrink-0"
                                aria-hidden="true"
                            >
                                <path
                                    d="M3 10.5 12 4l9 6.5"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M5.5 9.5V20h13V9.5"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span>Visit Website</span>
                        </Link>
                    </div>
                </nav>

                {/* User section */}
                <div className="border-default shrink-0 border-t p-4">
                    <div className="bg-surface flex items-center gap-3 rounded-[0.75rem] p-3">
                        <div className="bg-primary-soft text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold uppercase">
                            {user.name?.charAt(0) ||
                                user.email.charAt(0)}
                        </div>

                        <div className="min-w-0">
                            <p className="text-heading truncate text-sm font-medium">
                                {user.name || "User"}
                            </p>

                            <p className="text-muted truncate text-xs capitalize">
                                {roleLabel}
                            </p>
                        </div>
                    </div>

                    <div className="mt-2">
                        <LogoutButton />
                    </div>
                </div>
            </aside>

            {/* Main area */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* Mobile header */}
                <header className="bg-card border-default sticky top-0 z-30 flex h-16 items-center border-b px-4 sm:px-6 lg:hidden">
                    <button
                        type="button"
                        aria-label="Open navigation"
                        onClick={() => setSidebarOpen(true)}
                        className="text-muted hover:bg-surface hover:text-heading flex h-10 w-10 items-center justify-center rounded-[0.625rem] transition-colors"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-5 w-5"
                            aria-hidden="true"
                        >
                            <path
                                d="M4 7h16M4 12h16M4 17h16"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>

                    <div className="ml-3 min-w-0">
                        <p className="text-heading truncate text-sm font-semibold">
                            School Admin
                        </p>

                        <p className="text-muted truncate text-xs">
                            {user.name || user.email}
                        </p>
                    </div>
                </header>

                {/* Page content */}
                <main className="w-full flex-1">
                    <div className="mx-auto w-full max-w-[100rem] p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}