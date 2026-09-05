import type { NewsletterWithContent } from "@/lib/data/newsletter/types";

import { NewsletterFacultyCard } from "./NewsletterFacultyCard";
import { StudentContributorCard } from "./StudentContributorCard";

interface NewsletterTeamProps {
    newsletter: NewsletterWithContent;
}

export default function NewsletterTeam({
    newsletter,
}: NewsletterTeamProps) {
    return (
        <section className="bg-surface rounded-[1rem] p-4 sm:p-5 lg:p-6">
            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
                <div className="bg-primary-soft text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-6 w-6"
                        aria-hidden="true"
                    >
                        <path
                            d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                        <circle
                            cx="10"
                            cy="7"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        />
                        <path
                            d="M16 11a3 3 0 1 0-1.5-5.6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                        <path
                            d="M16.5 14.2A4.5 4.5 0 0 1 20 18.5V20"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <div>
                    <h2 className="text-heading text-xl font-bold">
                        Newsletter Team
                    </h2>

                    <p className="text-muted text-sm">
                        The people behind this issue.
                    </p>
                </div>
            </div>

            {/* Team */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[15rem_15rem_minmax(0,1fr)]">
                {/* Newsletter In-charge */}
                {newsletter.incharge && (
                    <NewsletterFacultyCard
                        faculty={newsletter.incharge}
                        title="Newsletter In-charge"
                    />
                )}

                {/* Digital Publisher */}
                {newsletter.digitalCoordinator && (
                    <NewsletterFacultyCard
                        faculty={newsletter.digitalCoordinator}
                        title="Digital Publisher"
                    />
                )}

                {/* Student Contributors */}
                {newsletter.newsletterMembers.length > 0 && (
                    <div className="bg-card border-default rounded-[0.75rem] border p-3 sm:p-4">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="icon-bg-primary icon-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M4 9.5 12 5l8 4.5-8 4.5L4 9.5Z"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7 12v4.5c1.4 1.2 3 1.8 5 1.8s3.6-.6 5-1.8V12"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-primary text-sm font-semibold">
                                    Student Contributors
                                </h3>

                                <p className="text-muted text-xs">
                                    Our students who made this issue possible
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                            {newsletter.newsletterMembers.map((member) => (
                                <StudentContributorCard
                                    key={member.id}
                                    member={member}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}