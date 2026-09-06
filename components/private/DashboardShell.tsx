"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import type { AuthUser } from "@/lib/data/auth/types";
import LogoutButton from "./LogoutButton";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface DashboardShellProps {
    user: AuthUser;
    children: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function SchoolIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            aria-hidden="true"
        >
            <path
                d="M3 10.5 12 4l9 6.5M5 9v10h14V9M9 19v-6h6v6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function DashboardIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
        >
            <path
                d="M4 13h6V4H4v9ZM14 20h6v-9h-6v9ZM14 9h6V4h-6v5ZM4 20h6v-3H4v3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function AdministrationIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
        >
            <path
                d="M4 21V9l8-5 8 5v12M8 21v-6h8v6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 10h.01M12 10h.01M15 10h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function ClassesIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
        >
            <path
                d="m3 9 9-5 9 5-9 5-9-5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M7 11.5V16c2.8 2.2 7.2 2.2 10 0v-4.5M21 10v5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function FacultyIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
        >
            <circle
                cx="9"
                cy="8"
                r="3"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M3.5 19a5.5 5.5 0 0 1 11 0"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M15 5.5a3 3 0 0 1 0 5.8M17 19a5 5 0 0 0-3-4.58"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function TimetableIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
        >
            <rect
                x="4"
                y="5"
                width="16"
                height="15"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M8 3v4M16 3v4M4 10h16M8 14h2M14 14h2M8 17h2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function ActivityIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
        >
            <path
                d="M4 19V9M9 19V5M14 19v-8M19 19V3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function ArticlesIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
        >
            <path
                d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M8 8h7M8 12h7M8 16h4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function NewsletterIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
        >
            <rect
                x="4"
                y="6"
                width="16"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="m4 7 8 6 8-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function NoticesIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
        >
            <path
                d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function EventsIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
        >
            <rect
                x="4"
                y="5"
                width="16"
                height="15"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M8 3v4M16 3v4M4 10h16M8 14h3M8 17h2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function ReportsIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
        >
            <path
                d="M5 20V10M12 20V4M19 20v-7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function WebsiteIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
        >
            <circle
                cx="12"
                cy="12"
                r="8"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M4 12h16M12 4c2 2.2 3 4.8 3 8s-1 5.8-3 8c-2-2.2-3-4.8-3-8s1-5.8 3-8Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
        >
            <path
                d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3h-.2a1.8 1.8 0 0 1 0-3.6H4a1.8 1.8 0 0 0 .9-3l-.1-.1a1.8 1.8 0 0 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3-.9V4a1.8 1.8 0 0 1 3.6 0v.2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3h.2a1.8 1.8 0 0 1 0 3.6h-.2a1.8 1.8 0 0 0-.9.8Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            aria-hidden="true"
        >
            <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function MenuIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            aria-hidden="true"
        >
            <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function NotificationIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            aria-hidden="true"
        >
            <path
                d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ChevronDownIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 text-admin-muted"
            aria-hidden="true"
        >
            <path
                d="m6 9 6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/* -------------------------------------------------------------------------- */
/* Navigation item                                                            */
/* -------------------------------------------------------------------------- */

function NavItem({
    href,
    label,
    icon,
    active,
    onClick,
}: {
    href: string;
    label: string;
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            aria-current={active ? "page" : undefined}
            className={[
                "group flex h-10 w-full items-center gap-3 rounded-[0.5rem] px-3",
                "text-sm font-medium transition-all duration-200",
                active
                    ? "admin-sidebar-item-active"
                    : "admin-sidebar-item",
            ].join(" ")}
        >
            <span
                className={[
                    "transition-colors duration-200",
                    active
                        ? "text-admin-sidebar"
                        : "text-admin-sidebar-muted group-hover:text-admin-sidebar",
                ].join(" ")}
            >
                {icon}
            </span>

            <span className="truncate">{label}</span>
        </Link>
    );
}

/* -------------------------------------------------------------------------- */
/* Dashboard shell                                                            */
/* -------------------------------------------------------------------------- */

export default function DashboardShell({
    user,
    children,
}: DashboardShellProps) {
    const pathname = usePathname();

    /*
     * Mobile/tablet drawer state.
     * This remains separate so mobile keeps its original behavior.
     */
    const [sidebarOpen, setSidebarOpen] = useState(false);

    /*
     * Desktop sidebar state.
     * Desktop starts open, matching the original dashboard.
     */
    const [desktopSidebarOpen, setDesktopSidebarOpen] =
        useState(true);

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const closeDesktopSidebar = () => {
        setDesktopSidebarOpen(false);
    };

    const openSidebar = () => {
        setSidebarOpen(true);
        setDesktopSidebarOpen(true);
    };

    const isDashboardActive =
        pathname === "/dashboard" ||
        pathname === "/dashboard/admin";

    const isAdministrationActive =
        pathname.startsWith(
            "/dashboard/admin/administration",
        );

    const isClassesActive =
        pathname.startsWith("/dashboard/admin/classes");

    const isFacultyActive =
        pathname.startsWith("/dashboard/admin/faculty");

    const isTimetableActive =
        pathname.startsWith("/dashboard/admin/timetable");

    const isActivityActive =
        pathname.startsWith("/dashboard/admin/activities");

    const isArticlesActive =
        pathname.startsWith("/dashboard/admin/articles");

    const isNewsletterActive =
        pathname.startsWith("/dashboard/admin/newsletter");

    const isNoticesActive =
        pathname.startsWith("/dashboard/admin/notices");

    const isEventsActive =
        pathname.startsWith("/dashboard/admin/events");

    const isReportsActive =
        pathname.startsWith("/dashboard/admin/reports");

    const isSettingsActive =
        pathname.startsWith("/dashboard/settings");

    return (
        <div className="min-h-screen bg-admin-page">
            {/* ---------------------------------------------------------------- */}
            {/* Mobile overlay                                                    */}
            {/* ---------------------------------------------------------------- */}

            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={closeSidebar}
                    className="fixed inset-0 z-40 bg-admin-sidebar/45 backdrop-blur-[0.125rem] lg:hidden"
                />
            )}

            <div className="flex min-h-screen">
                {/* ============================================================ */}
                {/* SIDEBAR                                                       */}
                {/* ============================================================ */}

                <aside
                    className={[
                        "sticky top-0 z-50 flex h-screen w-64 shrink-0 flex-col",
                        "overflow-hidden admin-sidebar",
                        "shadow-admin-sidebar",

                        /*
                         * Desktop:
                         * Animate width independently from the mobile
                         * transform animation.
                         */
                        "lg:transition-[width] lg:duration-300 lg:ease-out",
                        desktopSidebarOpen
                            ? "lg:w-64"
                            : "lg:w-0",

                        /*
                         * Mobile/tablet:
                         * Preserve the original sliding drawer.
                         */
                        "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:w-64",
                        "max-lg:transition-transform max-lg:duration-300 max-lg:ease-out",
                        sidebarOpen
                            ? "max-lg:translate-x-0"
                            : "max-lg:-translate-x-full",
                    ].join(" ")}
                >
                    {/* -------------------------------------------------------- */}
                    {/* Brand                                                     */}
                    {/* -------------------------------------------------------- */}

                    <div className="flex h-16 shrink-0 items-center border-b border-admin-sidebar px-3">
                        <Link
                            href="/dashboard"
                            onClick={closeSidebar}
                            className="group flex min-w-0 flex-1 items-center gap-3 rounded-[0.5rem] p-1.5"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.5rem] bg-admin-primary text-admin-sidebar shadow-sm transition-transform duration-200 group-hover:scale-[1.03]">
                                <SchoolIcon />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-admin-sidebar">
                                    School Admin
                                </p>

                                <p className="truncate text-[0.625rem] text-admin-sidebar-muted">
                                    PM SHRI GSSS Dhanau
                                </p>
                            </div>
                        </Link>

                        {/* Mobile/tablet close button */}
                        <button
                            type="button"
                            onClick={closeSidebar}
                            aria-label="Close navigation"
                            className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.5rem] text-admin-sidebar-muted transition-colors hover:bg-admin-sidebar-hover hover:text-admin-sidebar lg:hidden"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* -------------------------------------------------------- */}
                    {/* Main navigation                                           */}
                    {/* -------------------------------------------------------- */}

                    <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="space-y-1">
                            <NavItem
                                href="/dashboard"
                                label="Dashboard"
                                icon={<DashboardIcon />}
                                active={isDashboardActive}
                                onClick={closeSidebar}
                            />

                            <NavItem
                                href="/dashboard/admin/administration"
                                label="Administration"
                                icon={<AdministrationIcon />}
                                active={isAdministrationActive}
                                onClick={closeSidebar}
                            />

                            <NavItem
                                href="/dashboard/admin/classes"
                                label="Classes"
                                icon={<ClassesIcon />}
                                active={isClassesActive}
                                onClick={closeSidebar}
                            />

                            <NavItem
                                href="/dashboard/admin/faculty"
                                label="Faculty"
                                icon={<FacultyIcon />}
                                active={isFacultyActive}
                                onClick={closeSidebar}
                            />

                            <NavItem
                                href="/dashboard/admin/timetable"
                                label="Time Table"
                                icon={<TimetableIcon />}
                                active={isTimetableActive}
                                onClick={closeSidebar}
                            />

                            <NavItem
                                href="/dashboard/admin/activities"
                                label="Activity"
                                icon={<ActivityIcon />}
                                active={isActivityActive}
                                onClick={closeSidebar}
                            />

                            <NavItem
                                href="/dashboard/admin/articles"
                                label="Articles"
                                icon={<ArticlesIcon />}
                                active={isArticlesActive}
                                onClick={closeSidebar}
                            />

                            <NavItem
                                href="/dashboard/admin/newsletter"
                                label="Newsletter"
                                icon={<NewsletterIcon />}
                                active={isNewsletterActive}
                                onClick={closeSidebar}
                            />

                            <NavItem
                                href="/dashboard/admin/notices"
                                label="Notices"
                                icon={<NoticesIcon />}
                                active={isNoticesActive}
                                onClick={closeSidebar}
                            />

                            <NavItem
                                href="/dashboard/admin/events"
                                label="Events"
                                icon={<EventsIcon />}
                                active={isEventsActive}
                                onClick={closeSidebar}
                            />

                            <NavItem
                                href="/dashboard/admin/reports"
                                label="Reports"
                                icon={<ReportsIcon />}
                                active={isReportsActive}
                                onClick={closeSidebar}
                            />
                        </div>

                        {/* ---------------------------------------------------- */}
                        {/* Secondary navigation                                  */}
                        {/* ---------------------------------------------------- */}

                        <div className="my-4 border-t border-admin-sidebar" />

                        <div className="space-y-1">
                            <NavItem
                                href="/"
                                label="Visit Website"
                                icon={<WebsiteIcon />}
                                active={false}
                                onClick={closeSidebar}
                            />
                        </div>
                    </nav>

                    {/* -------------------------------------------------------- */}
                    {/* User section                                              */}
                    {/* -------------------------------------------------------- */}

                    <div className="shrink-0 border-t border-admin-sidebar p-3">
                        <div className="mb-2 rounded-[0.5rem] border border-admin-sidebar bg-admin-sidebar-hover p-2 transition-colors hover:border-admin-sidebar hover:bg-admin-sidebar-hover">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-admin-card text-xs font-bold text-admin-primary">
                                    {user.name
                                        ? user.name
                                            .charAt(0)
                                            .toUpperCase()
                                        : "U"}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-admin-sidebar">
                                        {user.name}
                                    </p>

                                    <p className="truncate text-[0.625rem] capitalize text-admin-sidebar-muted">
                                        {user.role.replace(
                                            "_",
                                            " ",
                                        )}
                                    </p>
                                </div>

                                <span className="text-lg leading-none text-admin-sidebar-muted">
                                    ›
                                </span>
                            </div>
                        </div>

                        <NavItem
                            href="/dashboard/settings"
                            label="Settings"
                            icon={<SettingsIcon />}
                            active={isSettingsActive}
                            onClick={closeSidebar}
                        />

                        <LogoutButton />
                    </div>

                    {/* -------------------------------------------------------- */}
                    {/* Desktop sidebar collapse button                          */}
                    {/* -------------------------------------------------------- */}

                    {/* Desktop sidebar collapse button */}
                    <button
                        type="button"
                        onClick={closeDesktopSidebar}
                        aria-label="Collapse sidebar"
                        className="absolute right-2 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-admin-sidebar bg-admin-sidebar text-admin-sidebar shadow-sm transition-colors hover:bg-admin-sidebar-hover lg:flex cursor-pointer"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path
                                d="m14 6-6 6 6 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </aside>

                {/* ============================================================ */}
                {/* MAIN CONTENT                                                  */}
                {/* ============================================================ */}

                <div className="min-w-0 flex-1">
                    {/* -------------------------------------------------------- */}
                    {/* Header                                                     */}
                    {/* -------------------------------------------------------- */}

                    <header className="sticky top-0 z-30 flex h-14 items-center border-b border-admin bg-admin-card px-4 shadow-sm">
                        {/* Open sidebar button */}
                        {(!sidebarOpen || !desktopSidebarOpen) && (
                            <button
                                type="button"
                                onClick={openSidebar}
                                aria-label="Open navigation"
                                title="Open navigation"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.5rem] text-admin-heading transition-colors hover:bg-admin-blue-soft hover:text-admin-primary"
                            >
                                <MenuIcon />
                            </button>
                        )}

                        {/* School branding */}
                        <Link
                            href="/dashboard"
                            className="ml-3 flex min-w-0 flex-1 items-center gap-2 lg:ml-0"
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.5rem] bg-admin-primary text-admin-sidebar">
                                <SchoolIcon />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-admin-heading">
                                    School Admin
                                </p>

                                <p className="truncate text-[0.5625rem] text-admin-muted">
                                    PM SHRI GSSS Dhanau
                                </p>
                            </div>
                        </Link>

                        {/* Right side */}
                        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
                            {/* Notifications */}
                            <button
                                type="button"
                                aria-label="Notifications"
                                className="relative flex h-9 w-9 items-center justify-center rounded-full text-admin-heading transition-colors hover:bg-admin-blue-soft hover:text-admin-primary"
                            >
                                <NotificationIcon />

                                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-admin-danger px-1 text-[0.5625rem] font-bold text-white">
                                    3
                                </span>
                            </button>

                            {/* Profile */}
                            <button
                                type="button"
                                aria-label="Open profile menu"
                                className="flex items-center gap-2 rounded-xl px-1.5 py-1 transition-colors hover:bg-admin-surface-hover"
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-admin-sidebar text-xs font-semibold text-admin-sidebar">
                                    {user.name
                                        ? user.name
                                            .charAt(0)
                                            .toUpperCase()
                                        : "U"}
                                </span>

                                <span className="hidden text-left sm:block">
                                    <span className="block max-w-36 truncate text-xs font-semibold text-admin-heading">
                                        {user.name}
                                    </span>

                                    <span className="block max-w-36 truncate text-[0.5625rem] capitalize text-admin-muted">
                                        {user.role.replace(
                                            "_",
                                            " ",
                                        )}
                                    </span>
                                </span>

                                <ChevronDownIcon />
                            </button>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="w-full flex-1">
                        <div className="mx-auto w-full max-w-[100rem] p-4 sm:p-4 lg:p-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}