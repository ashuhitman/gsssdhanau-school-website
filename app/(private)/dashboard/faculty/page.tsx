import Link from "next/link";

export default function AdminFacultyPage() {
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

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-primary mb-1 text-sm font-semibold">
                            Administration
                        </p>

                        <h1 className="text-heading text-2xl font-bold tracking-tight sm:text-3xl">
                            Faculty
                        </h1>

                        <p className="text-muted mt-2 max-w-2xl text-sm sm:text-base">
                            Manage faculty profiles and information used
                            throughout the school website.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/admin/faculty/new"
                        className="bg-accent hover:bg-accent-hover inline-flex h-11 w-full items-center justify-center gap-2 rounded-[0.625rem] px-4 text-sm font-semibold text-white shadow-sm transition-colors sm:w-auto"
                    >
                        <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path
                                d="M10 4v12M4 10h12"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>

                        Add Faculty
                    </Link>
                </div>
            </div>

            {/* Search */}
            <section className="bg-card border-default rounded-[0.875rem] border p-4 shadow-sm sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative min-w-0 flex-1">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-muted pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                            aria-hidden="true"
                        >
                            <circle
                                cx="11"
                                cy="11"
                                r="6.5"
                                stroke="currentColor"
                                strokeWidth="1.7"
                            />

                            <path
                                d="m16 16 4 4"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                            />
                        </svg>

                        <input
                            type="search"
                            placeholder="Search faculty..."
                            className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 h-11 w-full rounded-[0.625rem] border pl-10 pr-3 text-sm outline-none transition focus:ring-2"
                        />
                    </div>

                    <button
                        type="button"
                        className="border-default text-heading hover:bg-surface h-11 rounded-[0.625rem] border px-4 text-sm font-medium transition-colors"
                    >
                        Filter
                    </button>
                </div>
            </section>

            {/* Faculty list placeholder */}
            <section>
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-heading text-lg font-semibold">
                            Faculty Members
                        </h2>

                        <p className="text-muted mt-1 text-sm">
                            View and manage all faculty profiles.
                        </p>
                    </div>

                    <span className="bg-primary-soft text-primary rounded-full px-3 py-1 text-xs font-semibold">
                        0 Faculty
                    </span>
                </div>

                <div className="bg-card border-default rounded-[0.875rem] border shadow-sm">
                    <div className="flex min-h-48 flex-col items-center justify-center px-5 py-10 text-center">
                        <div className="bg-primary-soft text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full">
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
                            </svg>
                        </div>

                        <h3 className="text-heading text-base font-semibold">
                            No faculty members yet
                        </h3>

                        <p className="text-muted mt-1 max-w-sm text-sm">
                            Add a faculty member to start building your
                            faculty directory.
                        </p>

                        <Link
                            href="/dashboard/admin/faculty/new"
                            className="text-primary hover:text-primary-hover mt-4 text-sm font-semibold transition-colors"
                        >
                            Add your first faculty member →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}