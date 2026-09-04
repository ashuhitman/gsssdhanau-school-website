import type { Faculty } from "@/lib/data/faculty/types";
import { titleCase } from "@/lib/utils/utils";

import {
    BookOpen,
    GraduationCap,
    Mail,
} from "lucide-react";

import Image from "next/image";

export function FacultyCard({
    member,
}: {
    member: Faculty;
}) {
    /* ============================================================
       Faculty Image
    ============================================================ */

    const imageSrc =
        member.profileImage ??
        (member.gender === "female"
            ? "/images/faculty/default-female.jpg"
            : "/images/faculty/default-male.jpg");

    /* ============================================================
       Clean + Format Subjects
    ============================================================ */

    const subjects = Array.isArray(member.subjects)
        ? member.subjects
            .filter(
                (subject) =>
                    typeof subject === "string" &&
                    subject.trim() !== ""
            )
            .map((subject) =>
                titleCase(subject)
            )
        : [];

    /* ============================================================
       Clean Qualifications
    ============================================================ */

    const qualifications = Array.isArray(
        member.qualifications
    )
        ? member.qualifications.filter(
            (qualification) =>
                typeof qualification === "string" &&
                qualification.trim() !== ""
        )
        : [];

    const subjectText = subjects.join(" | ");

    const qualificationText =
        qualifications.join(" | ");

    /* ============================================================
       Dynamic First Information Label
    ============================================================ */

    let subjectLabel = "Subject";

    if (member.category === "vt") {
        subjectLabel = "Trade";
    } else if (
        member.category === "udc" ||
        member.category === "lab-attendant" ||
        member.category === "other"
    ) {
        subjectLabel = "Role";
    }

    return (
        <article
            className="
                group
                relative
                flex
                h-full
                flex-col
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
                    shrink-0
                    bg-primary-950
                    dark:bg-primary-950
                    md:h-[5.5rem]
                    lg:h-20
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
                    top-5
                    z-20
                    -translate-x-1/2
                    md:top-4
                    lg:top-3
                "
            >
                <div

                    className="
        relative
        size-32
        rounded-full
        bg-card
        p-1
        shadow-md
        ring-2
        ring-accent-400
        md:size-[7rem]
       lg:size-24
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
                            alt={`${titleCase(
                                member.name
                            )}, ${member.designation}`}
                            fill
                            sizes="
                                (max-width: 767px) 7rem,
                                (max-width: 1023px) 6.5rem,
                                6rem
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
                    flex
                    flex-1
                    flex-col
                    px-4
                    pb-4
                    pt-14
                    md:px-5
                    md:pt-13
                    md:pb-4
                    lg:pt-12
                    lg:pb-4
                "
            >
                {/* ==================================================
                    Name
                ================================================== */}

                <h3
                    className="
                        mt-2
                        text-center
                        text-lg
                        font-bold
                        tracking-tight
                        text-foreground
                        md:text-lg
                        lg:text-base
                        xl:text-lg
                    "
                >
                    {member.prefix &&
                        `${member.prefix} `}

                    {titleCase(member.name)}
                </h3>

                {/* ==================================================
                    Designation
                ================================================== */}

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

                {/* ==================================================
                    Gold Divider
                ================================================== */}

                <div
                    className="
                        mx-auto
                        mt-3
                        flex
                        w-full
                        max-w-40
                        items-center
                        gap-1.5
                    "
                    aria-hidden="true"
                >
                    <span
                        className="
                            block
                            h-px
                            min-w-0
                            flex-1
                            bg-accent-400
                        "
                    />

                    <span
                        className="
                            size-1.5
                            shrink-0
                            rounded-full
                            bg-accent-400
                        "
                    />

                    <span
                        className="
                            block
                            h-px
                            min-w-0
                            flex-1
                            bg-accent-400
                        "
                    />
                </div>

                {/* ==================================================
                    Information
                ================================================== */}

                <div className="mt-3">
                    {/* Subject / Trade / Role */}

                    {subjectText && (
                        <FacultyInfoRow
                            icon={BookOpen}
                            label={subjectLabel}
                            value={subjectText}
                            boldLabel
                        />
                    )}

                    {/* Qualification */}

                    {qualificationText && (
                        <FacultyInfoRow
                            icon={GraduationCap}
                            label="Qualification"
                            value={qualificationText}
                            boldLabel
                        />
                    )}

                    {/* Email */}

                    {member.email &&
                        member.email.trim() !== "" && (
                            <FacultyInfoRow
                                icon={Mail}
                                label="Email"
                                value={member.email}
                                href={`mailto:${member.email}`}
                            />
                        )}
                </div>
            </div>

            {/* ==================================================
                Bottom Accent
            ================================================== */}

            <div
                className="
                    mt-auto
                    h-1
                    w-full
                    shrink-0
                    bg-accent-400
                "
            />
        </article>
    );
}

/* ================================================================
   Faculty Information Row
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
                    size-6
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
                    className="size-3"
                    strokeWidth={1.8}
                />
            </div>

            {/* Label - Value */}

            <div
                className="
                    flex
                    min-w-0
                    flex-1
                    items-start
                    gap-1.5
                    text-xs
                "
            >
                {/* Label */}

                <span
                    className={`
                        shrink-0
                        text-xs
                        leading-5
                        text-foreground
                        ${boldLabel
                            ? "font-bold"
                            : "font-medium"
                        }
                    `}
                >
                    {label}
                </span>

                {/* Dash */}

                <span
                    className="
                        shrink-0
                        text-xs
                        leading-5
                        text-muted-foreground
                    "
                >
                    -
                </span>

                {/* Value */}

                <span
                    className="
                        min-w-0
                        break-words
                        text-xs
                        font-medium
                        leading-5
                        text-muted-foreground
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
                    items-start
                    gap-2
                    border-b
                    border-border
                    py-1.5
                    last:border-b-0
                    transition-colors
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
                items-start
                gap-2
                border-b
                border-border
                py-1.5
                last:border-b-0
            "
        >
            {content}
        </div>
    );
}