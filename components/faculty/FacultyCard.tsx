import type { FacultyMember } from "@/lib/data/faculty";

import {
    BookOpen,
    BriefcaseBusiness,
    GraduationCap,
    Mail,
} from "lucide-react";

import Image from "next/image";

export function FacultyCard({
    member,
}: {
    member: FacultyMember;
}) {
    const imageSrc =
        member.image ||
        (member.gender === "female"
            ? "/images/faculty/default-female.jpg"
            : "/images/faculty/default-male.jpg");

    const subjectText =
        member.subjects.length > 0
            ? member.subjects.join(" | ")
            : "";

    const qualificationText =
        member.qualifications.length > 0
            ? member.qualifications.join(" | ")
            : "";

    return (
        <article
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-card
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary-300
                hover:shadow-school-card
                dark:hover:border-primary-700
            "
        >
            {/* ==================================================
                Top Header
            ================================================== */}

            <div
                className="
                    relative
                    h-24
                    bg-primary-950
                    dark:bg-primary-950
                "
            >
                {/* Decorative dots */}

                <div
                    className="
                        absolute
                        left-4
                        top-4
                        grid
                        grid-cols-4
                        gap-1.5
                        opacity-40
                    "
                    aria-hidden="true"
                >
                    {Array.from({
                        length: 12,
                    }).map((_, index) => (
                        <span
                            key={index}
                            className="
                                size-1
                                rounded-full
                                bg-white
                            "
                        />
                    ))}
                </div>

                {/* Gold curve */}

                <div
                    className="
                        absolute
                        -bottom-5
                        -left-[10%]
                        h-10
                        w-[120%]
                        rounded-[50%]
                        border-t-2
                        border-accent-400
                        bg-card
                    "
                    aria-hidden="true"
                />
            </div>

            {/* ==================================================
                Profile Image
            ================================================== */}

            <div
                className="
                    absolute
                    left-1/2
                    top-7
                    z-20
                    -translate-x-1/2
                "
            >
                <div
                    className="
                        relative
                        size-24
                        rounded-full
                        bg-card
                        p-1
                        shadow-md
                        ring-2
                        ring-accent-400
                        sm:size-28
                    "
                >
                    <div
                        className="
                            relative
                            size-full
                            overflow-hidden
                            rounded-full
                            bg-muted
                        "
                    >
                        <Image
                            src={imageSrc}
                            alt={
                                member.imageAlt ??
                                `${member.name}, ${member.designation}`
                            }
                            fill
                            sizes="
                                (max-width: 639px) 6rem,
                                7rem
                            "
                            className="
                                object-cover
                                object-[center_18%]
                                transition-transform
                                duration-500
                                group-hover:scale-105
                            "
                        />
                    </div>
                </div>
            </div>

            {/* ==================================================
                Content
            ================================================== */}

            <div
                className="
                    px-4
                    pb-4
                    pt-12
                    sm:px-5
                    sm:pb-5
                "
            >
                {/* Name */}

                <h3
                    className="
                        text-center
                        text-lg
                        font-bold
                        tracking-tight
                        text-foreground
                        sm:text-xl
                    "
                >
                    {member.prefix &&
                        `${member.prefix} `}

                    {member.name}
                </h3>

                {/* Designation */}

                <p
                    className="
                        mt-0.5
                        text-center
                        text-xs
                        font-medium
                        text-muted-foreground
                    "
                >
                    {member.designation}
                </p>

                {/* Gold divider */}

                <div
                    className="
                        mx-auto
                        mt-3
                        flex
                        max-w-40
                        items-center
                        gap-1.5
                    "
                    aria-hidden="true"
                >
                    <span
                        className="
                            h-px
                            flex-1
                            bg-accent-400
                        "
                    />

                    <span
                        className="
                            size-1.5
                            rounded-full
                            bg-accent-400
                        "
                    />

                    <span
                        className="
                            h-px
                            flex-1
                            bg-accent-400
                        "
                    />
                </div>

                {/* ==================================================
                    Information
                ================================================== */}

                <div className="mt-3">
                    <FacultyInfoRow
                        icon={BookOpen}
                        label="Subject"
                        value={subjectText}
                        boldLabel
                    />

                    <FacultyInfoRow
                        icon={GraduationCap}
                        label="Qualification"
                        value={qualificationText}
                        boldLabel
                    />

                    {/* {member.experience && (
                        <FacultyInfoRow
                            icon={BriefcaseBusiness}
                            label="Experience"
                            value={member.experience}
                        />
                    )} */}

                    {member.email && (
                        <FacultyInfoRow
                            icon={Mail}
                            label="Email"
                            value={member.email}
                            href={`mailto:${member.email}`}
                        />
                    )}
                </div>
            </div>

            {/* Bottom accent */}

            <div
                className="
                    h-1
                    bg-accent-400
                "
            />
        </article>
    );
}

/* ================================================================
   Information Row
================================================================ */

function FacultyInfoRow({
    icon: Icon,
    label,
    value,
    href,
    boldLabel = false,
}: {
    icon: typeof BookOpen;
    label: string;
    value: string;
    href?: string;
    boldLabel?: boolean;
}) {
    const content = (
        <>
            {/* Icon */}

            <div
                className="
                    flex
                    size-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-primary-950
                    text-accent-400
                    dark:bg-primary-900
                "
            >
                <Icon
                    className="size-3.5"
                    strokeWidth={1.8}
                />
            </div>

            {/* Label - Value */}

            <div
                className="
                    flex
                    min-w-0
                    flex-1
                    items-baseline
                    gap-1.5
                "
            >
                <span
                    className={`
                        shrink-0
                        text-xs
                        text-muted-foreground
                        sm:text-sm
                        ${boldLabel
                            ? "font-bold"
                            : "font-semibold"
                        }
                    `}
                >
                    {label}
                </span>

                <span
                    className="
                        shrink-0
                        text-xs
                        text-muted-foreground
                        sm:text-sm
                    "
                >
                    -
                </span>

                <span
                    className="
                        min-w-0
                        truncate
                        text-xs
                        font-medium
                        text-foreground
                        sm:text-sm
                    "
                >
                    {value}
                </span>
            </div>
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                className="
                    flex
                    items-center
                    gap-2.5
                    border-b
                    border-border
                    py-2
                    last:border-b-0
                    hover:text-primary-600
                    dark:hover:text-primary-400
                "
            >
                {content}
            </a>
        );
    }

    return (
        <div
            className="
                flex
                items-center
                gap-2.5
                border-b
                border-border
                py-2
                last:border-b-0
            "
        >
            {content}
        </div>
    );
}