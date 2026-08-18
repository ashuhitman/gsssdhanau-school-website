// import {
//     Bell,
//     BookOpen,
//     Building2,
//     GalleryHorizontal,
//     Newspaper,
//     Send,
// } from "lucide-react";

// import { InfoCard } from "../ui/InfoCard";

// const quickLinks = [
//     {
//         title: "Academics",
//         description: "Classes, Subjects & Streams",
//         href: "/academics",
//         icon: BookOpen,
//     },
//     {
//         title: "News & Activities",
//         description: "Latest events and school stories",
//         href: "/news",
//         icon: Newspaper,
//     },
//     {
//         title: "Facilities",
//         description: "Explore our school facilities",
//         href: "/facilities",
//         icon: Building2,
//     },
//     {
//         title: "Gallery",
//         description: "Moments captured in pictures",
//         href: "/gallery",
//         icon: GalleryHorizontal,
//     },
//     {
//         title: "Notices",
//         description: "Important announcements",
//         href: "/notices",
//         icon: Bell,
//     },
//     {
//         title: "Newsletter",
//         description: "Read our latest newsletter",
//         href: "/newsletter",
//         icon: Send,
//     },
// ];

// export function QuickLinks() {
//     return (
//         <section className="px-4 py-5 sm:px-6 lg:py-6 2xl:px-8">
//             <div className="mx-auto max-w-[90rem] rounded-2xl bg-primary-50 px-5 py-5 dark:bg-primary-950 sm:px-6 lg:px-7 lg:py-6 2xl:px-8">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//                     {quickLinks.map((item, index) => (
//                         <InfoCard
//                             key={item.href}
//                             icon={item.icon}
//                             title={item.title}
//                             description={item.description}
//                             href={item.href}
//                             variant="circleIcon"
//                             circleColor="white"
//                             className={`
//                                 min-w-0
//                                 py-2
//                                 sm:px-4
//                                 lg:px-5
//                                 xl:px-4
//                                 2xl:px-6

//                                 ${index > 0
//                                     ? `
//                                             border-t
//                                             border-primary-200
//                                             pt-4

//                                             sm:border-t-0
//                                             sm:pt-2

//                                             lg:border-t
//                                             lg:border-primary-200
//                                             lg:pt-4

//                                             xl:border-l
//                                             xl:border-t-0
//                                             xl:border-primary-200
//                                             xl:pt-2

//                                             dark:border-primary-800
//                                         `
//                                     : ""
//                                 }
//                             `}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

import {
    Bell,
    BookOpen,
    Building2,
    GalleryHorizontal,
    Newspaper,
    Send,
} from "lucide-react";

import { InfoCard } from "@/components/common/InfoCard";

const quickLinks = [
    {
        title: "Academics",
        description: "Classes, subjects & streams",
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
        description: "School moments in pictures",
        href: "/gallery",
        icon: GalleryHorizontal,
    },
    {
        title: "Notices",
        description: "Important school information",
        href: "/notices",
        icon: Bell,
    },
    {
        title: "Newsletter",
        description: "Read our latest newsletter",
        href: "/newsletter",
        icon: Send,
    },
];

export function QuickLinks() {
    return (
        <section className="px-4 py-5 sm:px-6 lg:py-6 2xl:px-8 ">
            <div className="mx-auto">
                <div
                    className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-primary-100
                        bg-primary-50/70
                        dark:border-primary-900
                        dark:bg-primary-950/40
                    "
                >
                    <div
                        className="
                            grid
                            grid-cols-1
                            divide-y
                            divide-primary-200
                            sm:grid-cols-2
                            sm:divide-x
                            sm:divide-y-0
                            lg:grid-cols-3
                            lg:divide-y
                            dark:divide-primary-800
                            xl:grid-cols-6
                            xl:divide-y-0
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
                                    min-w-0
                                    border-0
                                    px-4
                                    py-4
                                    sm:px-5
                                    lg:px-4
                                    xl:px-4
                                    2xl:px-5

                                    ${index > 0
                                        ? "xl:border-l xl:border-primary-200 dark:xl:border-primary-800"
                                        : ""
                                    }
                                `}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}