import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    hero?: ReactNode;
    className?: string;
}

export function PageLayout({
    children,
    hero,
    className = "",
}: PageLayoutProps) {
    return (
        <div className={`w-full ${className}`}>
            {/* Full-width Hero */}
            {hero}

            {/* Page Content */}
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}