import {
    Award,
    Star,
    Trophy,
} from "lucide-react";

const achievements = [
    {
        title: "District Level Kabaddi Winner",
        description:
            "Students secured First Position in the District Level Kabaddi Competition.",
        date: "10 May 2025",
        icon: Trophy,
    },
    {
        title: "Best Teacher Award",
        description:
            "Mr. Ashutosh Singh honoured with the Best Teacher Award.",
        date: "28 Apr 2025",
        icon: Star,
    },
];

export default function RecentAchievements() {
    return (
        <section className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
                <Award className="size-5 text-primary-600" />

                <h2 className="text-base font-bold text-foreground">
                    Recent Achievements
                </h2>
            </div>

            <div className="mt-5">
                {achievements.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="flex gap-3 border-b border-border py-3 last:border-b-0"
                        >
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                                <Icon className="size-5" />
                            </div>

                            <div className="min-w-0">
                                <h3 className="text-sm font-bold text-foreground">
                                    {item.title}
                                </h3>

                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    {item.description}
                                </p>

                                <p className="mt-1.5 text-[10px] text-muted-foreground">
                                    {item.date}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                type="button"
                className="mt-4 w-full text-right text-xs font-bold text-primary-600 hover:text-primary-700"
            >
                View All Achievements →
            </button>
        </section>
    );
}