import {
    Bell,
    BookMarked,
    BookOpen,
    Building2,
    Images,
    Newspaper,
} from "lucide-react";

import { InfoCard } from "@/components/ui/InfoCard";

interface QuickLink {
    title: string;
    description: string;
    href: string;
    icon: typeof BookOpen;
}

const quickLinks: QuickLink[] = [
    {
        title: "Academics",
        description: "Classes, subjects & learning",
        href: "/academics",
        icon: BookOpen,
    },
    {
        title: "News & Activities",
        description: "School events & activities",
        href: "/news",
        icon: Newspaper,
    },
    {
        title: "Facilities",
        description: "Explore our learning spaces",
        href: "/facilities",
        icon: Building2,
    },
    {
        title: "Gallery",
        description: "School moments & memories",
        href: "/gallery",
        icon: Images,
    },
    {
        title: "Notices",
        description: "Important school information",
        href: "/notices",
        icon: Bell,
    },
    {
        title: "Newsletter",
        description: "Read our school newsletter",
        href: "/newsletter",
        icon: BookMarked,
    },
];

export function HomeQuickLinks() {
    return (
        <section
            className="
                relative
                z-20
                hidden

                sm:-mt-8
                sm:block
                sm:px-6

                lg:-mt-12
                lg:px-8

                2xl:-mt-14
            "
        >
            <div className="mx-auto w-full max-w-[90rem]">
                <div
                    className="
                        grid
                        grid-cols-2
                        overflow-hidden
                        rounded-xl
                        border
                        border-border
                        bg-card
                        shadow-lg

                        lg:grid-cols-6
                    "
                >
                    {quickLinks.map((item, index) => (
                        <InfoCard
                            key={item.href}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            href={item.href}
                            variant="circleIcon"
                            circleColor="white"
                            className={`
                                rounded-none
                                border-0
                                bg-card
                                px-4
                                py-4

                                ${index >= 2
                                    ? "border-t border-border"
                                    : ""
                                }

                                ${index % 2 !== 0
                                    ? "border-l border-border"
                                    : ""
                                }

                                lg:border-l
                                lg:border-t-0

                                lg:first:border-l-0
                            `}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}