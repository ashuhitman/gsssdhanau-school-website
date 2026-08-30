import Image from "next/image";

import type { NewsletterClubMember } from "@/lib/data/newsletter";

interface ClubMemberCardProps {
    member: NewsletterClubMember;
}

export default function ClubMemberCard({
    member,
}: ClubMemberCardProps) {
    const formattedName = member.name
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

    return (
        <article
            className="
                group
                flex
                w-fit
                min-w-0
                flex-col
                items-center
                overflow-hidden
                rounded-[0.75rem]
                bg-white
                px-[1.5rem]
                pb-[1rem]
                pt-[1rem]
                shadow-[0_0.25rem_0.9rem_rgba(15,35,70,0.08)]
                transition-all
                duration-300
                hover:-translate-y-[0.15rem]
                hover:shadow-[0_0.5rem_1.2rem_rgba(15,35,70,0.14)]
            "
        >
            {/* Circular Image */}
            <div
                className="
                    relative
                    h-[7rem]
                    w-[7rem]
                    shrink-0
                    overflow-hidden
                    rounded-full
                    border-[0.2rem]
                    border-white
                    bg-slate-100
                    shadow-[0_0.15rem_0.5rem_rgba(0,0,0,0.12)]
                    ring-[0.1rem]
                    ring-slate-200
                    transition-transform
                    duration-300
                    group-hover:scale-[1.02]
                "
            >
                {member.image ? (
                    <Image
                        src={member.image}
                        alt={member.name}
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
                            text-[2rem]
                            font-bold
                            text-slate-400
                        "
                    >
                        {member.name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            {/* Role */}
            {member.role && (
                <span
                    className="
                        mt-[0.6rem]
                        rounded-[0.3rem]
                        bg-[#0b4a9e]
                        px-[0.65rem]
                        py-[0.25rem]
                        text-center
                        text-[0.58rem]
                        font-semibold
                        leading-none
                        text-white
                        shadow-[0_0.1rem_0.25rem_rgba(0,0,0,0.14)]
                        sm:px-[0.75rem]
                        sm:py-[0.28rem]
                        sm:text-[0.62rem]
                    "
                >
                    {member.role}
                </span>
            )}

            {/* Name */}
            <h3
                className="
                    mt-[0.5rem]
                    truncate
                    px-[0.25rem]
                    text-center
                    text-[0.78rem]
                    font-semibold
                    leading-tight
                    text-[#102d63]
                    sm:text-[0.84rem]
                "
                title={formattedName}
            >
                {formattedName}
            </h3>

            {/* Class */}
            {member.className && (
                <p
                    className="
                        mt-[0.3rem]
                        truncate
                        px-[0.25rem]
                        text-center
                        text-[0.62rem]
                        leading-tight
                        text-slate-500
                        sm:text-[0.68rem]
                    "
                    title={member.className}
                >
                    {member.className}
                </p>
            )}
        </article>
    );
}