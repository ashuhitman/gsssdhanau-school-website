"use client";

import {
    Bell,
    BookOpen,
    FileText,
    GalleryHorizontal,
    Home,
    Menu,
    Newspaper,
    Settings,
    Trophy,
    Users,
    X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../theme/ThemeToggle";



const navigation = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: Home,
    },
    {
        label: "News & Activities",
        href: "/dashboard/articles",
        icon: Newspaper,
    },
    {
        label: "Achievements",
        href: "/dashboard/achievements",
        icon: Trophy,
    },
    {
        label: "Gallery",
        href: "/dashboard/gallery",
        icon: GalleryHorizontal,
    },
    {
        label: "Notices",
        href: "/dashboard/notices",
        icon: Bell,
    },
    {
        label: "Newsletter",
        href: "/dashboard/newsletter",
        icon: FileText,
    },
    {
        label: "Users",
        href: "/dashboard/users",
        icon: Users,
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function DashboardShell({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-surface text-foreground">
            {/* Mobile sidebar backdrop */}
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-card transition-transform duration-300 lg:translate-x-0 ${mobileOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
                    <Link
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3"
                    >
                        <div className="flex size-10 items-center justify-center rounded-xl bg-primary-500 font-black text-white">
                            G
                        </div>

                        <div>
                            <p className="text-sm font-black">
                                PM SHRI GSSS
                            </p>

                            <p className="text-xs text-muted-foreground">
                                Dhanau
                            </p>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="min-h-0 flex-1 overflow-y-auto p-4">
                    <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        Workspace
                    </p>

                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-950 dark:hover:text-primary-300"
                                >
                                    <Icon className="size-4.5 shrink-0" />

                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Sidebar bottom */}
                <div className="shrink-0 border-t border-border p-4">
                    <div className="rounded-2xl bg-primary-50 p-4 dark:bg-primary-950">
                        <p className="text-sm font-bold text-primary-900 dark:text-primary-100">
                            School Website
                        </p>

                        <p className="mt-1 text-xs leading-5 text-primary-700 dark:text-primary-300">
                            Manage your school content from one place.
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <div className="min-h-screen lg:pl-72">
                {/* Topbar */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="flex size-10 items-center justify-center rounded-xl border border-border bg-card lg:hidden"
                        aria-label="Open sidebar"
                    >
                        <Menu className="size-5" />
                    </button>

                    <div className="hidden min-w-0 lg:block">
                        <p className="text-sm font-semibold">
                            School Management
                        </p>

                        <p className="text-xs text-muted-foreground">
                            PM SHRI GSSS Dhanau
                        </p>
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                        <ThemeToggle />

                        <button
                            type="button"
                            className="flex size-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-800 dark:bg-primary-900 dark:text-primary-100"
                            aria-label="Open profile"
                        >
                            AS
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="min-w-0 p-4 sm:p-6 lg:p-8 xl:p-10">
                    <div className="mx-auto w-full max-w-[1800px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}