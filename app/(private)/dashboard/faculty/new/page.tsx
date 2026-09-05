import Link from "next/link";

export default function NewFacultyPage() {
    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Header */}
            <div>
                <Link
                    href="/dashboard/admin/faculty"
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

                    Faculty
                </Link>

                <p className="text-primary mb-1 text-sm font-semibold">
                    Administration
                </p>

                <h1 className="text-heading text-2xl font-bold tracking-tight sm:text-3xl">
                    Add Faculty
                </h1>

                <p className="text-muted mt-2 max-w-2xl text-sm sm:text-base">
                    Add a new faculty profile to the school website.
                </p>
            </div>

            {/* Form */}
            <form className="bg-card border-default rounded-[0.875rem] border shadow-sm">
                <div className="space-y-6 p-5 sm:p-6 lg:p-8">
                    {/* Basic Information */}
                    <section>
                        <div className="mb-5">
                            <h2 className="text-heading text-base font-semibold">
                                Basic Information
                            </h2>

                            <p className="text-muted mt-1 text-sm">
                                Enter the faculty member's basic details.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="name"
                                    className="text-heading mb-2 block text-sm font-medium"
                                >
                                    Full name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Enter full name"
                                    className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 h-11 w-full rounded-[0.625rem] border px-3 text-sm outline-none transition focus:ring-2"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="designation"
                                    className="text-heading mb-2 block text-sm font-medium"
                                >
                                    Designation
                                </label>

                                <input
                                    id="designation"
                                    name="designation"
                                    type="text"
                                    required
                                    placeholder="e.g. PGT, TGT, Principal"
                                    className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 h-11 w-full rounded-[0.625rem] border px-3 text-sm outline-none transition focus:ring-2"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="text-heading mb-2 block text-sm font-medium"
                                >
                                    Subject
                                </label>

                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    placeholder="e.g. Mathematics"
                                    className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 h-11 w-full rounded-[0.625rem] border px-3 text-sm outline-none transition focus:ring-2"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Contact Information */}
                    <section className="border-default border-t pt-6">
                        <div className="mb-5">
                            <h2 className="text-heading text-base font-semibold">
                                Contact Information
                            </h2>

                            <p className="text-muted mt-1 text-sm">
                                Add contact information if it should be
                                displayed publicly.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-heading mb-2 block text-sm font-medium"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="faculty@example.com"
                                    className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 h-11 w-full rounded-[0.625rem] border px-3 text-sm outline-none transition focus:ring-2"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="text-heading mb-2 block text-sm font-medium"
                                >
                                    Phone
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Enter phone number"
                                    className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 h-11 w-full rounded-[0.625rem] border px-3 text-sm outline-none transition focus:ring-2"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Profile */}
                    <section className="border-default border-t pt-6">
                        <div className="mb-5">
                            <h2 className="text-heading text-base font-semibold">
                                Profile
                            </h2>

                            <p className="text-muted mt-1 text-sm">
                                Add information that will appear on the
                                faculty profile.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="bio"
                                    className="text-heading mb-2 block text-sm font-medium"
                                >
                                    About
                                </label>

                                <textarea
                                    id="bio"
                                    name="bio"
                                    rows={5}
                                    placeholder="Write a short profile..."
                                    className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 w-full resize-y rounded-[0.625rem] border px-3 py-2.5 text-sm outline-none transition focus:ring-2"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="image"
                                    className="text-heading mb-2 block text-sm font-medium"
                                >
                                    Profile image
                                </label>

                                <div className="border-default bg-surface rounded-[0.625rem] border border-dashed p-5 sm:p-6">
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        className="text-muted block w-full text-sm"
                                    />

                                    <p className="text-muted mt-2 text-xs">
                                        Upload a clear profile photograph.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Actions */}
                <div className="border-default flex flex-col-reverse gap-3 border-t p-5 sm:flex-row sm:items-center sm:justify-end sm:p-6 lg:px-8">
                    <Link
                        href="/dashboard/admin/faculty"
                        className="border-default text-heading hover:bg-surface inline-flex h-11 w-full items-center justify-center rounded-[0.625rem] border px-5 text-sm font-medium transition-colors sm:w-auto"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="bg-accent hover:bg-accent-hover inline-flex h-11 w-full items-center justify-center gap-2 rounded-[0.625rem] px-5 text-sm font-semibold text-white shadow-sm transition-colors sm:w-auto"
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
                    </button>
                </div>
            </form>
        </div>
    );
}