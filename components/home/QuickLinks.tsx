import Link from "next/link";
import {
    ArrowUpRight,
    CalendarDays,
    Download,
    FileText,
    GraduationCap,
} from "lucide-react";

const links = [
    {
        label: "Academic Calendar",
        href: "/academics/calendar",
        icon: CalendarDays,
    },
    {
        label: "Downloads",
        href: "/downloads",
        icon: Download,
    },
    {
        label: "Student Resources",
        href: "/students/resources",
        icon: GraduationCap,
    },
    {
        label: "Important Forms",
        href: "/downloads/forms",
        icon: FileText,
    },
];

export function QuickLinks() {
    return (
        <section className="home-grid-card">
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
                <h2
                    className="
                        font-serif
                        text-[1.15rem]
                        font-bold
                        text-heading
                    "
                >
                    Quick Links
                </h2>
            </div>

            {/* Links */}
            <div className="mt-5 grid grid-cols-2 gap-3">
                {links.map((link) => {
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="
                                group
                                flex
                                min-h-[5.25rem]
                                flex-col
                                justify-between
                                rounded-lg
                                border
                                border-default
                                bg-surface
                                p-3
                                transition-all
                                hover:-translate-y-[0.1rem]
                                hover:bg-surface-hover
                            "
                        >
                            <Icon
                                className="
                                    size-[1.25rem]
                                    text-primary
                                    transition-transform
                                    group-hover:scale-105
                                "
                                strokeWidth={1.8}
                            />

                            <div className="flex items-end justify-between gap-2">
                                <span
                                    className="
                                        text-[0.63rem]
                                        font-semibold
                                        leading-snug
                                        text-heading
                                    "
                                >
                                    {link.label}
                                </span>

                                <ArrowUpRight
                                    className="
                                        size-[0.7rem]
                                        shrink-0
                                        text-muted
                                    "
                                    strokeWidth={1.8}
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}