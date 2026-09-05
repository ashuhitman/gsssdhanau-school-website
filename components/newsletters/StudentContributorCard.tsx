import type { NewsletterMember } from "@/lib/data/clubMember/types";

interface StudentContributorCardProps {
    member: NewsletterMember;
}

export function StudentContributorCard({
    member,
}: StudentContributorCardProps) {
    return (
        <div className="bg-card border-default flex items-center gap-3 rounded-[0.75rem] border p-3 shadow-sm">
            <div className="icon-bg-primary icon-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
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

            <div className="min-w-0">
                <h4 className="text-heading truncate text-sm font-semibold">
                    {member.name}
                </h4>

                <p className="text-muted text-xs">
                    Class {member.class}
                    {member.section ? ` ${member.section}` : ""}
                </p>

                <p className="text-muted truncate text-xs">
                    {member.role}
                </p>
            </div>
        </div>
    );
}