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
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSelector } from "../public/LanguageSelector";
import { MobileMenu } from "./MobileMenu";
import Image from "next/image";

type PublicHeaderProps = {
    subtitle?: string;
};

export const navigation = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Academics",
        href: "/academics",
    },



    {
        label: "News & Activity",
        href: "/activities",
    },
    {
        label: "Faculty",
        href: "/faculty",
    },
    {
        label: "Notices",
        href: "/notices",
    },
    {
        label: "Articles",
        href: "/articles",
    },
    {
        label: "Newsletter",
        href: "/newsletters",
    },
    {
        label: "Newsletter",
        href: "/newsletter",
    },
];

export function PublicHeader({ subtitle }: PublicHeaderProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* =================================================
                TOP UTILITY BAR
            ================================================= */}
            <div className="bg-primary-600 text-white " >
                <div className="mx-auto flex items-center justify-between gap-4 px-4 text-xs sm:px-6 lg:px-8 z-100 bg">
                    <div className="hidden items-center gap-5 lg:flex bg-red">
                        <div className="flex items-center gap-2">
                            <MapPin className="size-3.5 shrink-0" />
                            <span>
                                Dhanau, Barmer, Rajasthan 344041
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Phone className="size-3.5 shrink-0" />
                            <span>01666-XXXXXX</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Mail className="size-3.5 shrink-0" />
                            <span>gsss.dhanau@gmail.com</span>
                        </div>
                    </div>

                    <div className="min-w-0 lg:hidden">
                        <span className="truncate font-medium">
                            PM SHRI GSSS Dhanau
                        </span>
                    </div>

                    <div className="ml-auto flex items-center gap-1">
                        <Link
                            href="/notices"
                            className="hidden rounded-md px-2.5 py-1.5 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:block"
                        >
                            Notices
                        </Link>

                        <Link
                            href="/gallery"
                            className="hidden rounded-md px-2.5 py-1.5 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:block"
                        >
                            Gallery
                        </Link>

                        <Link
                            href="/about"
                            className="hidden rounded-md px-2.5 py-1.5 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:block"
                        >
                            About Us
                        </Link>

                        <Link
                            href="/contact"
                            className="hidden rounded-md px-2.5 py-1.5 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white sm:block"
                        >
                            Contact Us
                        </Link>

                        <LanguageSelector />

                        <div className="mx-1 h-4 w-px bg-white/20" />

                        <ThemeToggle variant="topbar" />

                        <Link
                            href="/login"
                            className="ml-1.5 hidden h-8 items-center gap-2 rounded-md bg-primary-800 px-3 font-semibold text-white transition-colors hover:bg-primary-900 sm:inline-flex"
                        >
                            <UserRound className="size-3.5" />
                            Teacher Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* =================================================
                MAIN HEADER
            ================================================= */}
            <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur-xl">
                <div className="mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-2">
                    {/* School Identity */}
                    {/* Brand */}
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                        onClick={() => setMobileOpen(false)}
                    >
                        <Image
                            src="/logo-new.png"
                            alt="PM SHRI GSSS Dhanau Logo"
                            width={40}
                            height={40}
                            className="h-12 w-12 object-contain"
                        />

                        <div className="leading-tight">
                            <p
                                className="
                text-sm font-bold tracking-tight
                text-[var(--school-heading)]
                sm:text-base
              "
                            >
                                PM SHRI GSSS DHANAU
                            </p>

                            <p
                                className="
                text-xs font-medium
                text-[var(--school-accent-hover)]
              "
                            >
                                {subtitle}
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-1 lg:flex">
                        {navigation.map((item) => {
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname === item.href ||
                                    pathname.startsWith(
                                        `${item.href}/`,
                                    );

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}


                                    className={[
                                        "rounded-lg px-3 py-2 text-sm font-medium transition-colors ",

                                        isActive
                                            ? "bg-primary-600 text-white shadow-school-button"
                                            : [
                                                "text-[var(--school-text)]",
                                                "hover:bg-[var(--school-surface)]",
                                                "hover:text-[var(--school-heading)]",
                                            ].join(" "),
                                    ].join(" ")}
                                >
                                    {item.label}


                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Controls */}
                    <div className="flex shrink-0 items-center gap-2 xl:hidden">
                        <ThemeToggle />

                        <button
                            type="button"
                            onClick={() =>
                                setMobileOpen(!mobileOpen)
                            }
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

                <MobileMenu
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                />
            </header>
        </>
    );
}