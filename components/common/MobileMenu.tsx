"use client";

import { ChevronRight, X } from "lucide-react";
import Link from "next/link";

import { navigation } from './PublicHeader';

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

export function MobileMenu({
    open,
    onClose,
}: MobileMenuProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="border-t border-white/10 bg-background xl:hidden">
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
                {/* Mobile menu header */}
                <div className="flex items-center justify-between border-b border-border pb-4">
                    <p className="text-sm font-bold">
                        Menu
                    </p>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close menu"
                        className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-surface-hover"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-3">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center justify-between border-b border-border py-3.5 text-sm font-semibold text-foreground transition-colors hover:text-primary-600"
                        >
                            {item.label}

                            <ChevronRight className="size-4 text-muted-foreground" />
                        </Link>
                    ))}
                </nav>

                {/* Mobile utility links */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link
                        href="/about"
                        onClick={onClose}
                        className="rounded-lg border border-border px-4 py-3 text-center text-sm font-semibold"
                    >
                        About Us
                    </Link>

                    <Link
                        href="/contact"
                        onClick={onClose}
                        className="rounded-lg border border-border px-4 py-3 text-center text-sm font-semibold"
                    >
                        Contact Us
                    </Link>
                </div>

                <Link
                    href="/login"
                    onClick={onClose}
                    className="mt-3 flex h-11 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white transition-colors hover:bg-primary-700"
                >
                    Teacher Login
                </Link>
            </div>
        </div>
    );
}