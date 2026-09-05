import Link from "next/link";

const adminSections = [
    {
        title: "Faculty",
        description: "Manage faculty members and their information.",
        href: "/dashboard/admin/faculty",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                aria-hidden="true"
            >
                <circle
                    cx="12"
                    cy="8"
                    r="3.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />
                <path
                    d="M5 20c.8-3.4 3.3-5 7-5s6.2 1.6 7 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: "Articles",
        description: "Manage school articles and publications.",
        href: "/dashboard/admin/articles",
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
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path
                    d="M8 8h8M8 12h8M8 16h5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: "Activities",
        description: "Manage school activities and events.",
        href: "/dashboard/admin/activities",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                aria-hidden="true"
            >
                <path
                    d="M6 4h12v16H6z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path
                    d="M9 8h6M9 12h6M9 16h4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: "Notices",
        description: "Publish and manage school notices.",
        href: "/dashboard/admin/notices",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                aria-hidden="true"
            >
                <path
                    d="M5 6h14v12H5z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path
                    d="M8 10h8M8 14h5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: "Newsletter",
        description: "Manage newsletter issues and content.",
        href: "/dashboard/admin/newsletter",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                aria-hidden="true"
            >
                <path
                    d="M5 5h14v14H5z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path
                    d="M8 9h8M8 12h8M8 15h5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: "Timetable",
        description: "Manage class and teacher timetables.",
        href: "/dashboard/admin/timetable",
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
                    height="15"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                />
                <path
                    d="M8 3v4M16 3v4M4 10h16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <path
                    d="M8 14h3M13 14h3M8 17h3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <p className="text-primary text-sm font-semibold">
                    Administration
                </p>

                <h1 className="text-heading mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                    Admin Dashboard
                </h1>

                <p className="text-muted mt-2 max-w-2xl text-sm sm:text-base">
                    Manage your school website content, faculty,
                    newsletter, timetable and other information.
                </p>
            </div>

            {/* Management sections */}
            <section>
                <div className="mb-4">
                    <h2 className="text-heading text-lg font-semibold">
                        Management
                    </h2>

                    <p className="text-muted mt-1 text-sm">
                        Choose a section to manage.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {adminSections.map((section) => (
                        <Link
                            key={section.title}
                            href={section.href}
                            className="bg-card border-default group rounded-[0.875rem] border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="bg-primary-soft text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.75rem]">
                                    {section.icon}
                                </div>

                                <svg
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="text-muted h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
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

                            <h3 className="text-heading mt-5 text-base font-semibold">
                                {section.title}
                            </h3>

                            <p className="text-muted mt-1.5 text-sm leading-6">
                                {section.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}