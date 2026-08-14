"use client";

import {
    Mail,
    MapPin,
    Menu,
    Phone,
    UserRound,
    X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { LanguageSelector } from "./LanguageSelector";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navigation = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Academics",
        href: "/academics",
    },
    {
        label: "News & Activities",
        href: "/news",
    },
    {
        label: "Achievements",
        href: "/achievements",
    },
    {
        label: "Gallery",
        href: "/gallery",
    },
    {
        label: "Notices",
        href: "/notices",
    },
    {
        label: "Newsletter",
        href: "/newsletter",
    },
];

export function PublicHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="relative z-50 bg-background">
            {/* =====================================================
          TOP UTILITY BAR
          This scrolls away with the page.
      ====================================================== */}
            <div className="bg-primary-600 text-white">
                <div className="mx-auto flex min-h-10 max-w-[1600px] items-center justify-between gap-4 px-4 text-xs sm:px-6 xl:px-8">
                    {/* Contact information */}
                    <div className="hidden items-center gap-6 lg:flex">
                        <div className="flex items-center gap-2">
                            <MapPin className="size-3.5 shrink-0" />

                            <span>
                                Dhanau, Barmer, Rajasthan
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Phone className="size-3.5 shrink-0" />

                            <span>Phone Number</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Mail className="size-3.5 shrink-0" />

                            <span>gsssdhanau@gmail.com</span>
                        </div>
                    </div>

                    {/* Mobile school name */}
                    <div className="lg:hidden">
                        <span className="font-medium">
                            PM SHRI GSSS Dhanau
                        </span>
                    </div>

                    {/* Utility navigation */}
                    <div className="ml-auto flex items-center gap-1">
                        <Link
                            href="/notices"
                            className="hidden rounded-md px-3 py-1.5 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:block"
                        >
                            Notices
                        </Link>

                        <Link
                            href="/about"
                            className="hidden rounded-md px-3 py-1.5 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:block"
                        >
                            About Us
                        </Link>

                        <Link
                            href="/contact"
                            className="hidden rounded-md px-3 py-1.5 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:block"
                        >
                            Contact Us
                        </Link>

                        <LanguageSelector />

                        <div className="mx-1 h-4 w-px bg-white/20" />

                        <ThemeToggle variant="topbar" />

                        <Link
                            href="/login"
                            className="ml-2 hidden h-8 items-center gap-2 rounded-md bg-primary-800 px-3.5 font-semibold text-white transition-colors hover:bg-primary-900 sm:inline-flex"
                        >
                            <UserRound className="size-3.5" />
                            Teacher Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* =====================================================
          STICKY MAIN HEADER
      ====================================================== */}
            <div className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur-xl">
                <div className="mx-auto flex h-[88px] max-w-[1600px] items-center justify-between gap-6 px-4 sm:px-6 xl:px-8">
                    {/* School identity */}
                    <Link
                        href="/"
                        onClick={() => setMobileOpen(false)}
                        className="flex min-w-0 items-center gap-4"
                    >
                        {/* Temporary logo */}
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-primary-200 bg-primary-50 text-xl font-black text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-200 sm:size-16">
                            G
                        </div>

                        <div className="min-w-0">
                            <h1 className="truncate text-lg font-black tracking-tight text-primary-800 dark:text-primary-200 sm:text-xl lg:text-2xl">
                                PM SHRI GSSS DHANAU
                            </h1>

                            <p className="mt-0.5 text-xs font-medium tracking-wide text-muted-foreground sm:text-sm">
                                Learning • Character • Excellence
                            </p>
                        </div>
                    </Link>

                    {/* Desktop navigation */}
                    <nav className="hidden items-stretch self-stretch xl:flex">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group relative flex items-center px-3 text-sm font-semibold text-foreground transition-colors hover:text-primary-600 2xl:px-4"
                            >
                                {item.label}

                                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary-500 transition-all duration-200 group-hover:w-6" />
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile controls */}
                    <div className="flex shrink-0 items-center gap-2 xl:hidden">
                        <ThemeToggle />

                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={
                                mobileOpen
                                    ? "Close navigation"
                                    : "Open navigation"
                            }
                            aria-expanded={mobileOpen}
                            className="flex size-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-surface-hover"
                        >
                            {mobileOpen ? (
                                <X className="size-5" />
                            ) : (
                                <Menu className="size-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <MobileMenu
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                />
            </div>
        </header>
    );
}