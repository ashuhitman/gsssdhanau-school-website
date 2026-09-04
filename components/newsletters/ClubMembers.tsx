import { UsersRound } from "lucide-react";

import ClubMemberCard from "./ClubMemberCard";

import SectionHeading from "../common/SectionHeading";

import type { NewsletterClubMember } from "@/lib/data/clubMember/types";

export interface ClubMembersProps {
    members: NewsletterClubMember[];
    showViewAll?: boolean;
}

export default function ClubMembers({
    members,
    showViewAll = true,
}: ClubMembersProps) {
    return (
        <section className="w-full">
            <SectionHeading
                title="Newsletter Club Members"
                align="left"
                icon={
                    <UsersRound
                        className="
                            size-[clamp(1.25rem,2.5vw,1.75rem)]
                            text-accent
                        "
                        strokeWidth={2}
                    />
                }
            />

            <div
                className="
                    mt-6
                    flex
                    w-full
                    flex-nowrap
                    gap-5
                    overflow-x-auto
                    overflow-y-hidden
                    pb-[0.5rem]
                    [scrollbar-width:none]
                    [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden
                "
            >
                {members.map((member) => (
                    <div
                        key={member.id}
                        className="shrink-0"
                    >
                        <ClubMemberCard
                            member={member}
                        />
                    </div>
                ))}
            </div>

            {showViewAll && (
                <div>
                    {/* View all button/link */}
                </div>
            )}
        </section>
    );
}