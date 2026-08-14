"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function PublicHeader() {
    return (
        <header className="border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">School</div>
                    <div className="flex gap-4 items-center">
                        <a href="/" className="hover:underline">Home</a>
                        <a href="/about" className="hover:underline">About</a>
                        <a href="/academics" className="hover:underline">Academics</a>
                        <a href="/news" className="hover:underline">News</a>
                        <ThemeToggle />
                    </div>
                </div>
            </nav>
        </header>
    );
}
