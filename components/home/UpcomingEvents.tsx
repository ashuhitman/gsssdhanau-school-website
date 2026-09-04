import Link from "next/link";
import { ArrowRight } from "lucide-react";

const events = [
    {
        id: "1",
        day: "15",
        month: "AUG",
        title: "Independence Day Celebration",
    },
    {
        id: "2",
        day: "25",
        month: "AUG",
        title: "Annual Sports Day",
    },
    {
        id: "3",
        day: "05",
        month: "SEP",
        title: "Teachers' Day Celebration",
    },
];

export function UpcomingEvents() {
    return (
        <section className="home-grid-card">
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
                <h2
                    className="
                        font-serif
                        text-[1.15rem]
                        font-bold
                        text-heading
                    "
                >
                    Upcoming Events
                </h2>

                <Link
                    href="/events"
                    className="
                        text-[0.68rem]
                        font-medium
                        text-primary
                        hover:underline
                    "
                >
                    View All →
                </Link>
            </div>

            {/* Events */}
            <div className="mt-5 space-y-3">
                {events.map((event) => (
                    <Link
                        key={event.id}
                        href={`/events/${event.id}`}
                        className="
                            group
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <div
                            className="
                                flex
                                size-[3rem]
                                shrink-0
                                flex-col
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-default
                                bg-surface
                            "
                        >
                            <span
                                className="
                                    text-[0.9rem]
                                    font-bold
                                    leading-none
                                    text-heading
                                "
                            >
                                {event.day}
                            </span>

                            <span
                                className="
                                    mt-1
                                    text-[0.48rem]
                                    font-bold
                                    tracking-wider
                                    text-accent
                                "
                            >
                                {event.month}
                            </span>
                        </div>

                        <h3
                            className="
                                min-w-0
                                flex-1
                                text-[0.74rem]
                                font-semibold
                                leading-snug
                                text-heading
                                group-hover:text-primary
                            "
                        >
                            {event.title}
                        </h3>

                        <ArrowRight
                            className="
                                size-[0.75rem]
                                shrink-0
                                text-muted
                                transition-transform
                                group-hover:translate-x-[0.15rem]
                                group-hover:text-primary
                            "
                            strokeWidth={1.8}
                        />
                    </Link>
                ))}
            </div>

            <Link
                href="/events"
                className="
                    mt-auto
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-default
                    py-2
                    text-[0.68rem]
                    font-semibold
                    text-primary
                    transition-colors
                    hover:bg-primary-soft
                "
            >
                All Events
                <ArrowRight
                    className="size-[0.8rem]"
                    strokeWidth={2}
                />
            </Link>
        </section>
    );
}