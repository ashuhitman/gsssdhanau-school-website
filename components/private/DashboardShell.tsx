"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    Activity,
    BarChart3,
    Bell,
    BookOpen,
    Building2,
    CalendarDays,
    ChevronDown,
    ChevronLeft,
    Globe,
    GraduationCap,
    LayoutDashboard,
    Mail,
    Menu,
    School,
    Settings,
    UsersRound,
    X,
} from "lucide-react";

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

            <span className="truncate">
                {label}
            </span>
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
     * Used only below lg.
     */
    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    /*
     * Desktop sidebar state.
     * Used only at lg and above.
     */
    const [
        desktopSidebarOpen,
        setDesktopSidebarOpen,
    ] = useState(true);

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const openMobileSidebar = () => {
        setSidebarOpen(true);
    };

    const closeDesktopSidebar = () => {
        setDesktopSidebarOpen(false);
    };

    const openDesktopSidebar = () => {
        setDesktopSidebarOpen(true);
    };

    /* ---------------------------------------------------------------------- */
    /* Nested admin page detection                                            */
    /* ---------------------------------------------------------------------- */

    /*
     * These are the root pages of each admin section.
     *
     * Example:
     *
     * /dashboard/admin/articles
     * /dashboard/admin/activities
     * /dashboard/admin/classes
     *
     * The sidebar remains visible on these pages.
     */
    const adminSections = [
        "/dashboard/admin/administration",
        "/dashboard/admin/classes",
        "/dashboard/admin/faculty",
        "/dashboard/admin/timetable",
        "/dashboard/admin/activities",
        "/dashboard/admin/articles",
        "/dashboard/admin/newsletter",
        "/dashboard/admin/notices",
        "/dashboard/admin/events",
        "/dashboard/admin/reports",
    ];

    /*
     * Find which admin section the current pathname belongs to.
     *
     * For example:
     *
     * pathname:
     * /dashboard/admin/articles/123/edit
     *
     * currentAdminSection:
     * /dashboard/admin/articles
     */
    const currentAdminSection = adminSections.find(
        (section) =>
            pathname === section ||
            pathname.startsWith(`${section}/`),
    );

    /*
     * A page is considered nested when:
     *
     * 1. It belongs to one of the admin sections.
     * 2. It is NOT the root page of that section.
     *
     * Examples:
     *
     * /dashboard/admin/articles
     * → false
     *
     * /dashboard/admin/articles/new
     * → true
     *
     * /dashboard/admin/articles/123/edit
     * → true
     */
    const isNestedAdminPage =
        !!currentAdminSection &&
        pathname !== currentAdminSection;

    /* ---------------------------------------------------------------------- */
    /* Active navigation states                                               */
    /* ---------------------------------------------------------------------- */

    const isDashboardActive =
        pathname === "/dashboard" ||
        pathname === "/dashboard/admin";

    const isAdministrationActive =
        pathname.startsWith(
            "/dashboard/admin/administration",
        );

    const isClassesActive =
        pathname.startsWith(
            "/dashboard/admin/classes",
        );

    const isFacultyActive =
        pathname.startsWith(
            "/dashboard/admin/faculty",
        );

    const isTimetableActive =
        pathname.startsWith(
            "/dashboard/admin/timetable",
        );

    const isActivityActive =
        pathname.startsWith(
            "/dashboard/admin/activities",
        );

    const isArticlesActive =
        pathname.startsWith(
            "/dashboard/admin/articles",
        );

    const isNewsletterActive =
        pathname.startsWith(
            "/dashboard/admin/newsletter",
        );

    const isNoticesActive =
        pathname.startsWith(
            "/dashboard/admin/notices",
        );

    const isEventsActive =
        pathname.startsWith(
            "/dashboard/admin/events",
        );

    const isReportsActive =
        pathname.startsWith(
            "/dashboard/admin/reports",
        );

    const isSettingsActive =
        pathname.startsWith(
            "/dashboard/settings",
        );

    return (
        <div className="min-h-screen bg-admin-page">
            {/* ---------------------------------------------------------------- */}
            {/* Mobile / tablet overlay                                          */}
            {/* ---------------------------------------------------------------- */}

            {sidebarOpen && !isNestedAdminPage && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={closeSidebar}
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-admin-sidebar/45
                        backdrop-blur-[0.125rem]
                        lg:hidden
                    "
                />
            )}

            <div className="flex min-h-screen">
                {/* ============================================================ */}
                {/* SIDEBAR                                                       */}
                {/* ============================================================ */}

                <aside
                    className={[
                        "sticky top-0 z-50 flex h-screen shrink-0 flex-col",
                        "overflow-hidden admin-sidebar",
                        "shadow-admin-sidebar",

                        /*
                         * Desktop:
                         *
                         * Nested admin page:
                         * completely hide sidebar.
                         *
                         * Root admin page:
                         * use normal open/collapsed state.
                         */
                        "lg:transition-[width] lg:duration-300 lg:ease-out",
                        isNestedAdminPage
                            ? "lg:w-0"
                            : desktopSidebarOpen
                                ? "lg:w-64"
                                : "lg:w-0",

                        /*
                         * Mobile / tablet:
                         *
                         * Nested admin page:
                         * keep drawer hidden.
                         *
                         * Root admin page:
                         * use normal drawer state.
                         */
                        "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:w-64",
                        isNestedAdminPage
                            ? "max-lg:-translate-x-full"
                            : sidebarOpen
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
                            className="
                                group
                                flex
                                min-w-0
                                flex-1
                                items-center
                                gap-3
                                rounded-[0.5rem]
                                p-1.5
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-[0.5rem]
                                    bg-admin-primary
                                    text-admin-sidebar
                                    shadow-sm
                                    transition-transform
                                    duration-200
                                    group-hover:scale-[1.03]
                                "
                            >
                                <School
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
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

                        {/* Mobile / tablet close button */}

                        <button
                            type="button"
                            onClick={closeSidebar}
                            aria-label="Close navigation"
                            className="
                                ml-1
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-[0.5rem]
                                text-admin-sidebar-muted
                                transition-colors
                                hover:bg-admin-sidebar-hover
                                hover:text-admin-sidebar
                                lg:hidden
                            "
                        >
                            <X
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    </div>

                    {/* -------------------------------------------------------- */}
                    {/* Main navigation                                           */}
                    {/* -------------------------------------------------------- */}

                    <nav
                        className="
                            min-h-0
                            flex-1
                            overflow-y-auto
                            px-3
                            py-4
                            [scrollbar-width:none]
                            [&::-webkit-scrollbar]:hidden
                        "
                    >
                        <div className="space-y-1">
                            <NavItem
                                href="/dashboard"
                                label="Dashboard"
                                icon={
                                    <LayoutDashboard
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                }
                                active={
                                    isDashboardActive
                                }
                                onClick={
                                    closeSidebar
                                }
                            />

                            <NavItem
                                href="/dashboard/admin/administration"
                                label="Administration"
                                icon={
                                    <Building2
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                }
                                active={
                                    isAdministrationActive
                                }
                                onClick={
                                    closeSidebar
                                }
                            />

                            <NavItem
                                href="/dashboard/admin/classes"
                                label="Classes"
                                icon={
                                    <GraduationCap
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                }
                                active={
                                    isClassesActive
                                }
                                onClick={
                                    closeSidebar
                                }
                            />

                            <NavItem
                                href="/dashboard/admin/faculty"
                                label="Faculty"
                                icon={
                                    <UsersRound
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                }
                                active={
                                    isFacultyActive
                                }
                                onClick={
                                    closeSidebar
                                }
                            />

                            <NavItem
                                href="/dashboard/admin/timetable"
                                label="Time Table"
                                icon={
                                    <CalendarDays
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                }
                                active={
                                    isTimetableActive
                                }
                                onClick={
                                    closeSidebar
                                }
                            />

                            <NavItem
                                href="/dashboard/admin/activities"
                                label="Activity"
                                icon={
                                    <Activity
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                }
                                active={
                                    isActivityActive
                                }
                                onClick={
                                    closeSidebar
                                }
                            />

                            <NavItem
                                href="/dashboard/admin/articles"
                                label="Articles"
                                icon={
                                    <BookOpen
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                }
                                active={
                                    isArticlesActive
                                }
                                onClick={
                                    closeSidebar
                                }
                            />

                            <NavItem
                                href="/dashboard/admin/newsletter"
                                label="Newsletter"
                                icon={
                                    <Mail
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                }
                                active={
                                    isNewsletterActive
                                }
                                onClick={
                                    closeSidebar
                                }
                            />

                            <NavItem
                                href="/dashboard/admin/notices"
                                label="Notices"
                                icon={
                                    <Bell
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                }
                                active={
                                    isNoticesActive
                                }
                                onClick={
                                    closeSidebar
                                }
                            />

                            <NavItem
                                href="/dashboard/admin/events"
                                label="Events"
                                icon={
                                    <CalendarDays
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                }
                                active={
                                    isEventsActive
                                }
                                onClick={
                                    closeSidebar
                                }
                            />

                            <NavItem
                                href="/dashboard/admin/reports"
                                label="Reports"
                                icon={
                                    <BarChart3
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                }
                                active={
                                    isReportsActive
                                }
                                onClick={
                                    closeSidebar
                                }
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
                                icon={
                                    <Globe
                                        className="h-5 w-5 shrink-0"
                                        aria-hidden="true"
                                    />
                                }
                                active={false}
                                onClick={
                                    closeSidebar
                                }
                            />
                        </div>
                    </nav>

                    {/* -------------------------------------------------------- */}
                    {/* User section                                              */}
                    {/* -------------------------------------------------------- */}

                    <div className="shrink-0 border-t border-admin-sidebar p-3">
                        <div
                            className="
                                mb-2
                                rounded-[0.5rem]
                                border
                                border-admin-sidebar
                                bg-admin-sidebar-hover
                                p-2
                                transition-colors
                                hover:border-admin-sidebar
                                hover:bg-admin-sidebar-hover
                            "
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-admin-card
                                        text-xs
                                        font-bold
                                        text-admin-primary
                                    "
                                >
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
                            icon={
                                <Settings
                                    className="h-5 w-5 shrink-0"
                                    aria-hidden="true"
                                />
                            }
                            active={
                                isSettingsActive
                            }
                            onClick={
                                closeSidebar
                            }
                        />

                        <LogoutButton />
                    </div>

                    {/* -------------------------------------------------------- */}
                    {/* Desktop collapse button                                  */}
                    {/* -------------------------------------------------------- */}

                    <button
                        type="button"
                        onClick={
                            closeDesktopSidebar
                        }
                        aria-label="Collapse sidebar"
                        title="Collapse sidebar"
                        className="
                            absolute
                            right-2
                            top-1/2
                            z-20
                            hidden
                            h-8
                            w-8
                            -translate-y-1/2
                            cursor-pointer
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-admin-sidebar
                            bg-admin-sidebar
                            text-admin-sidebar
                            shadow-sm
                            transition-colors
                            hover:bg-admin-sidebar-hover
                            lg:flex
                        "
                    >
                        <ChevronLeft
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                    </button>
                </aside>

                {/* ============================================================ */}
                {/* MAIN CONTENT                                                  */}
                {/* ============================================================ */}

                <div className="min-w-0 flex-1">
                    {/* -------------------------------------------------------- */}
                    {/* Header                                                     */}
                    {/* -------------------------------------------------------- */}

                    <header
                        className="
                            sticky
                            top-0
                            z-30
                            flex
                            h-14
                            items-center
                            border-b
                            border-admin
                            bg-admin-card
                            px-4
                            shadow-sm
                        "
                    >
                        {/* ==================================================== */}
                        {/* MOBILE / TABLET NAVIGATION                           */}
                        {/* ==================================================== */}

                        <div className="lg:hidden">
                            {isNestedAdminPage ? (
                                <Link
                                    href={
                                        currentAdminSection ??
                                        "/dashboard/admin"
                                    }
                                    aria-label="Go back"
                                    title="Go back"
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-[0.5rem]
                                        text-admin-heading
                                        transition-colors
                                        hover:bg-admin-blue-soft
                                        hover:text-admin-primary
                                    "
                                >
                                    <ChevronLeft
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </Link>
                            ) : (
                                !sidebarOpen && (
                                    <button
                                        type="button"
                                        onClick={
                                            openMobileSidebar
                                        }
                                        aria-label="Open navigation"
                                        title="Open navigation"
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-[0.5rem]
                                            text-admin-heading
                                            transition-colors
                                            hover:bg-admin-blue-soft
                                            hover:text-admin-primary
                                        "
                                    >
                                        <Menu
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                )
                            )}
                        </div>

                        {/* ==================================================== */}
                        {/* DESKTOP NAVIGATION                                   */}
                        {/* ==================================================== */}

                        <div className="hidden lg:block">
                            {isNestedAdminPage ? (
                                <Link
                                    href={
                                        currentAdminSection ??
                                        "/dashboard/admin"
                                    }
                                    aria-label="Go back"
                                    title="Go back"
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-[0.5rem]
                                        text-admin-heading
                                        transition-colors
                                        hover:bg-admin-blue-soft
                                        hover:text-admin-primary
                                    "
                                >
                                    <ChevronLeft
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </Link>
                            ) : (
                                !desktopSidebarOpen && (
                                    <button
                                        type="button"
                                        onClick={
                                            openDesktopSidebar
                                        }
                                        aria-label="Open sidebar"
                                        title="Open sidebar"
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-[0.5rem]
                                            text-admin-heading
                                            transition-colors
                                            hover:bg-admin-blue-soft
                                            hover:text-admin-primary
                                        "
                                    >
                                        <Menu
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                )
                            )}
                        </div>

                        {/* ==================================================== */}
                        {/* SCHOOL BRANDING                                      */}
                        {/* ==================================================== */}

                        <Link
                            href="/dashboard"
                            className="
                                ml-3
                                flex
                                min-w-0
                                flex-1
                                items-center
                                gap-2
                                lg:ml-3
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-[0.5rem]
                                    bg-admin-primary
                                    text-admin-sidebar
                                "
                            >
                                <School
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
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

                        {/* ==================================================== */}
                        {/* RIGHT SIDE                                            */}
                        {/* ==================================================== */}

                        <div
                            className="
                                ml-auto
                                flex
                                shrink-0
                                items-center
                                gap-2
                                sm:gap-3
                            "
                        >
                            {/* Notifications */}

                            <button
                                type="button"
                                aria-label="Notifications"
                                className="
                                    relative
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-admin-heading
                                    transition-colors
                                    hover:bg-admin-blue-soft
                                    hover:text-admin-primary
                                "
                            >
                                <Bell
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />

                                <span
                                    className="
                                        absolute
                                        right-0.5
                                        top-0.5
                                        flex
                                        h-4
                                        min-w-4
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-admin-danger
                                        px-1
                                        text-[0.5625rem]
                                        font-bold
                                        text-white
                                    "
                                >
                                    3
                                </span>
                            </button>

                            {/* Profile */}

                            <button
                                type="button"
                                aria-label="Open profile menu"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    px-1.5
                                    py-1
                                    transition-colors
                                    hover:bg-admin-surface-hover
                                "
                            >
                                <span
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-admin-sidebar
                                        text-xs
                                        font-semibold
                                        text-admin-sidebar
                                    "
                                >
                                    {user.name
                                        ? user.name
                                            .charAt(0)
                                            .toUpperCase()
                                        : "U"}
                                </span>

                                <span className="hidden text-left sm:block">
                                    <span
                                        className="
                                            block
                                            max-w-36
                                            truncate
                                            text-xs
                                            font-semibold
                                            text-admin-heading
                                        "
                                    >
                                        {user.name}
                                    </span>

                                    <span
                                        className="
                                            block
                                            max-w-36
                                            truncate
                                            text-[0.5625rem]
                                            capitalize
                                            text-admin-muted
                                        "
                                    >
                                        {user.role.replace(
                                            "_",
                                            " ",
                                        )}
                                    </span>
                                </span>

                                <ChevronDown
                                    className="h-4 w-4 text-admin-muted"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </header>

                    {/* -------------------------------------------------------- */}
                    {/* Page content                                               */}
                    {/* -------------------------------------------------------- */}

                    <main className="w-full flex-1">
                        <div
                            className="
                                mx-auto
                                w-full
                                max-w-[100rem]
                                p-4
                                lg:p-6
                            "
                        >
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}