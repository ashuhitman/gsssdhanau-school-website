"use client";

import { ReactNode } from "react";

interface DashboardShellProps {
    children: ReactNode;
    title?: string;
}

export function DashboardShell({ children, title }: DashboardShellProps) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-slate-50 dark:bg-slate-900 p-6">
                <nav className="space-y-4">
                    <div>
                        <h3 className="font-bold text-sm uppercase text-gray-600 mb-2">Menu</h3>
                        <ul className="space-y-2">
                            <li><a href="/dashboard" className="hover:underline text-sm">Dashboard</a></li>
                            <li><a href="/dashboard/admin" className="hover:underline text-sm">Admin</a></li>
                            <li><a href="/dashboard/teacher" className="hover:underline text-sm">Teacher</a></li>
                            <li><a href="/dashboard/student" className="hover:underline text-sm">Student</a></li>
                            <li><a href="/dashboard/newsletter" className="hover:underline text-sm">Newsletter</a></li>
                        </ul>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {/* Header */}
                <div className="border-b bg-white dark:bg-slate-800 px-8 py-4">
                    {title && <h1 className="text-2xl font-bold">{title}</h1>}
                </div>

                {/* Content */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
