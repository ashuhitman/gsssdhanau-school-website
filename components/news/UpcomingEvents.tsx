import {
    CalendarDays,
    Clock3,
    MapPin,
} from "lucide-react";

const events = [
    {
        day: "15",
        month: "May",
        year: "2025",
        title: "Science Exhibition",
        time: "10:00 AM - 02:00 PM",
        location: "School Auditorium",
    },
    {
        day: "20",
        month: "May",
        year: "2025",
        title: "Annual Day Celebration",
        time: "04:00 PM - 08:00 PM",
        location: "School Ground",
    },
    {
        day: "05",
        month: "Jun",
        year: "2025",
        title: "World Environment Day",
        time: "09:00 AM - 12:00 PM",
        location: "School Campus",
    },
];

export default function UpcomingEvents() {
    return (
        <section className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
                <CalendarDays className="size-5 text-primary-600" />

                <h2 className="text-base font-bold text-foreground">
                    Upcoming Events
                </h2>
            </div>

            <div className="mt-5">
                {events.map((event, index) => (
                    <div
                        key={`${event.title}-${event.day}`}
                        className={`
                            flex gap-3 py-3
                            ${index !== events.length - 1
                                ? "border-b border-border"
                                : ""
                            }
                        `}
                    >
                        {/* Date */}
                        <div className="flex h-[58px] w-[48px] shrink-0 flex-col items-center justify-center rounded-lg bg-primary-600 text-white">
                            <span className="text-lg font-extrabold leading-none">
                                {event.day}
                            </span>

                            <span className="mt-0.5 text-[9px] font-bold uppercase">
                                {event.month}
                            </span>

                            <span className="text-[8px]">
                                {event.year}
                            </span>
                        </div>

                        {/* Details */}
                        <div className="min-w-0">
                            <h3 className="text-sm font-bold text-foreground">
                                {event.title}
                            </h3>

                            <div className="mt-1.5 space-y-1">
                                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                    <Clock3 className="size-3" />
                                    {event.time}
                                </p>

                                <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                    <MapPin className="size-3" />
                                    {event.location}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="mt-4 w-full text-right text-xs font-bold text-primary-600 hover:text-primary-700"
            >
                View All Events →
            </button>
        </section>
    );
}