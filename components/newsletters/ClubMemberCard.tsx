import Image from "next/image";
import { GraduationCap } from "lucide-react";

import type { NewsletterClubMember } from "@/lib/data/clubMember/types";

interface ClubMemberCardProps {
    member: NewsletterClubMember;
}

export default function ClubMemberCard({
    member,
}: ClubMemberCardProps) {
    const formattedName = member.name
        ? member.name
            .toLowerCase()
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase(),
            )
        : "";

    const className =
        member.class !== null
            ? `${member.class}${member.section ?? ""}`
            : "";

    return (
        <article
            className="
                group
                relative
                w-[12rem]
                shrink-0
                overflow-hidden
                rounded-[1rem]
                bg-white
                shadow-[0_0.35rem_1rem_rgba(15,35,70,0.10)]
                transition-all
                duration-300
                hover:-translate-y-[0.2rem]
                hover:shadow-[0_0.6rem_1.4rem_rgba(15,35,70,0.15)]
            "
        >
            {/* =====================================================
                TOP COLORED AREA
            ====================================================== */}

            <div
                className="
                    relative
                    h-[8.5rem]
                    w-full
                    overflow-hidden
                    bg-primary
                "
            >
                {/* Decorative curved shapes */}

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -right-[2.5rem]
                        -top-[2.5rem]
                        h-[7rem]
                        w-[7rem]
                        rounded-full
                        bg-primary-hover
                        opacity-70
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        -bottom-[3.5rem]
                        -left-[3rem]
                        h-[6rem]
                        w-[6rem]
                        rounded-full
                        bg-primary-hover
                        opacity-40
                    "
                />

                {/* =================================================
                    PROFILE IMAGE
                ================================================== */}

                <div
                    className="
                        absolute
                        left-1/2
                        top-[1rem]
                        z-10
                        h-[7rem]
                        w-[7rem]
                        -translate-x-1/2
                        overflow-hidden
                        rounded-full
                        border-[0.2rem]
                        border-white
                        bg-slate-100
                        shadow-[0_0.25rem_0.8rem_rgba(15,35,70,0.20)]
                        ring-[0.1rem]
                        ring-white/80
                        transition-transform
                        duration-300
                        group-hover:scale-[1.03]
                    "
                >
                    {member.image ? (
                        <Image
                            src={member.image}
                            alt={formattedName}
                            fill
                            sizes="7rem"
                            className="
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-105
                            "
                        />
                    ) : (
                        <div
                            className="
                                flex
                                h-full
                                w-full
                                items-center
                                justify-center
                                bg-slate-100
                                text-[2rem]
                                font-bold
                                text-slate-400
                            "
                        >
                            {formattedName.charAt(0)}
                        </div>
                    )}
                </div>
            </div>

            {/* =====================================================
                INFORMATION AREA
            ====================================================== */}

            <div
                className="
                    flex
                    min-h-[8.5rem]
                    flex-col
                    items-center
                    px-[0.75rem]
                    pb-[0.75rem]
                    pt-[1.5rem]
                "
            >
                {/* =================================================
                    NEWSLETTER ROLE
                ================================================== */}

                {member.role && (
                    <span
                        className="
                            max-w-full
                            truncate
                            rounded-full
                            bg-primary
                            px-[0.75rem]
                            py-[0.3rem]
                            text-center
                            text-[0.52rem]
                            font-bold
                            uppercase
                            tracking-wide
                            text-white
                            shadow-[0_0.1rem_0.3rem_rgba(15,35,70,0.16)]
                            sm:text-[0.56rem]
                        "
                        title={member.role}
                    >
                        {member.role}
                    </span>
                )}

                {/* =================================================
                    NAME
                ================================================== */}

                <h3
                    className="
                        mt-[0.55rem]
                        w-full
                        truncate
                        text-center
                        font-serif
                        text-[0.95rem]
                        font-bold
                        leading-tight
                        text-heading
                        sm:text-[1rem]
                    "
                    title={formattedName}
                >
                    {formattedName}
                </h3>

                {/* =================================================
                    FACULTY DESIGNATION
                ================================================== */}

                {member.memberType === "teacher" &&
                    member.designation && (
                        <p
                            className="
                                mt-[0.25rem]
                                w-full
                                truncate
                                text-center
                                text-[0.68rem]
                                font-medium
                                leading-tight
                                text-body
                                sm:text-[0.72rem]
                            "
                            title={member.designation}
                        >
                            {member.designation}
                        </p>
                    )}

                {/* =================================================
                    STUDENT CLASS
                ================================================== */}

                {member.memberType === "student" &&
                    className && (
                        <p
                            className="
                                mt-[0.25rem]
                                text-center
                                text-[0.68rem]
                                font-medium
                                leading-tight
                                text-body
                                sm:text-[0.72rem]
                            "
                        >
                            Class {className}
                        </p>
                    )}

                {/* =================================================
                    BOTTOM DECORATION
                ================================================== */}

                <div
                    className="
                        mt-auto
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-[0.5rem]
                        pt-[0.75rem]
                    "
                >
                    <span
                        aria-hidden="true"
                        className="
                            h-px
                            w-[2rem]
                            bg-slate-200
                        "
                    />

                    <GraduationCap
                        aria-hidden="true"
                        className="
                            size-[1rem]
                            shrink-0
                            text-primary
                        "
                        strokeWidth={2}
                    />

                    <span
                        aria-hidden="true"
                        className="
                            h-px
                            w-[2rem]
                            bg-slate-200
                        "
                    />
                </div>
            </div>
        </article>
    );
}