import { Award, Medal, Star } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { AchievementCard, type AchievementCardProps } from "../ui/AchievmentCard";


const achievements: AchievementCardProps[] = [
    {
        title: "District Level Kabaddi Winner",
        description:
            "Our students secured first position in the District Level Kabaddi Competition.",
        date: "10 May 2025",
        icon: Medal,
    },
    {
        title: "Board Examination 2024–25",
        description:
            "Excellent results by our Class 10 and 12 students.",
        date: "30 Apr 2025",
        icon: Award,
    },
    {
        title: "Best Teacher Award",
        description:
            "A member of our faculty was honoured with the Best Teacher Award.",
        date: "28 Apr 2025",
        icon: Star,
    },
];

export function RecentAchievements() {
    return (
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <SectionHeading
                eyebrow="Celebrating Success"
                title="Recent Achievements"
                href="/achievements"
            />

            <div className="mt-5">
                {achievements.map((item) => (
                    <AchievementCard
                        key={item.title}
                        {...item}
                    />
                ))}
            </div>
        </section>
    );
}