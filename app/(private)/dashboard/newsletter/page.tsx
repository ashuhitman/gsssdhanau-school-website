import Link from "next/link";

const newsletterSections = [
    {
        title: "Newsletters",
        description: "Create, edit and publish newsletter issues.",
        href: "/dashboard/admin/newsletter/issues",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                aria-hidden="true"
            >
                <rect
                    x="4"
                    y="5"
                    width="16"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                />
                <path
                    d="m5 7 7 5 7-5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Newsletter Team",
        description: "Manage in-charge, coordinator and contributors.",
        href: "/dashboard/admin/newsletter/team",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                aria-hidden="true"
            >
                <circle
                    cx="9"
                    cy="8"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                />
                <path
                    d="M3.5 20a5.5 5.5 0 0 1 11 0"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                />
                <circle
                    cx="17"
                    cy="9"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                />
                <path
                    d="M15.5 14.5a5 5 0 0 1 5 5.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: "Student Submissions",
        description: "Review articles submitted by students.",
        href: "/dashboard/admin/newsletter/submissions",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                aria-hidden="true"
            >
                <path
                    d="M5 4h14v16H5z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                />
                <path
                    d="M8 8h8M8 12h6M8 16h4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
];

export default function AdminNewsletterPage() {
    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Header */}
            <div>
                <Link
                    href="/dashboard/admin"
                    className="text-primary hover:text-primary-hover mb-4 inline-flex items-center gap-2 text-sm font-medium transition-colors"
                >
                    <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-4 w-4"
                        aria-hidden="true"
                    >
                        <path
                            d="M16 10H4M9 5l-5 5 5 5"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    Admin Dashboard
                </Link>

                <p className="text-primary mb-1 text-sm font-semibold">
                    Administration
                </p>

                <h1 className="text-heading text-2xl font-bold tracking-tight sm:text-3xl">
                    Newsletter
                </h1>

                <p className="text-muted mt-2 max-w-2xl text-sm sm:text-base">
                    Manage newsletter issues, team members and student
                    submissions.
                </p>
            </div>

            {/* Sections */}
            <section>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {newsletterSections.map((section) => (
                        <Link
                            key={section.href}
                            href={section.href}
                            className="bg-card border-default group rounded-[0.875rem] border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-start gap-4">
                                <div className="bg-primary-soft text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.75rem] transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    {section.icon}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <h2 className="text-heading text-sm font-semibold sm:text-base">
                                            {section.title}
                                        </h2>

                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            className="text-muted h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M4 10h11"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                                strokeLinecap="round"
                                            />

                                            <path
                                                d="m11 6 4 4-4 4"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>

                                    <p className="text-muted mt-1.5 text-sm leading-5">
                                        {section.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}