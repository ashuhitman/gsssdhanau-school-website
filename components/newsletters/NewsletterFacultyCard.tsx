import Image from "next/image";

import type { Faculty } from "@/lib/data/faculty/types";

interface NewsletterFacultyCardProps {
    faculty: Faculty;
    title: string;
}

export function NewsletterFacultyCard({
    faculty,
    title,
}: NewsletterFacultyCardProps) {
    return (
        <div className="bg-card border-default rounded-[0.75rem] border p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
                <div className="icon-bg-primary icon-primary flex h-9 w-9 items-center justify-center rounded-full">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                        aria-hidden="true"
                    >
                        <path
                            d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        />
                        <path
                            d="M4.5 20c.7-3.1 3.2-5 7.5-5s6.8 1.9 7.5 5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <h3 className="text-primary text-sm font-semibold">
                    {title}
                </h3>
            </div>

            <div className="flex flex-col items-center text-center">
                <div className="bg-surface relative h-28 w-28 overflow-hidden rounded-full">
                    {faculty.profileImage ? (
                        <Image
                            src={faculty.profileImage}
                            alt={faculty.name}
                            fill
                            sizes="7rem"
                            className="object-cover"
                        />
                    ) : (
                        <div className="text-muted flex h-full w-full items-center justify-center text-2xl font-semibold">
                            {faculty.name.charAt(0)}
                        </div>
                    )}
                </div>

                <h4 className="text-heading mt-4 text-base font-bold">
                    {faculty.name}
                </h4>

                <p className="text-primary mt-1 text-sm font-medium">
                    {faculty.designation}
                </p>

                <p className="text-muted mt-1 text-sm">
                    {title}
                </p>
            </div>
        </div>
    );
}