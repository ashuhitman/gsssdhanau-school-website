import { FeaturedStory } from "@/components/home/FeaturedStory";

import { Notices } from "@/components/home/Notices";
import { LatestNewsletter } from "@/components/home/LatestNewsletter";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { LatestActivities } from "./LatestActivities";
import { QuickLinks } from "./QuickLinks";
import { getLatestActivities } from "@/lib/data/activity/get";
import { getLatestNewsletter } from "@/lib/data/newsletter/get";


export async function HomeContentGrid() {
    const activities = await getLatestActivities(4);
    const latestNewsletter = await getLatestNewsletter();
    return (
        <div
            className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-2
                lg:grid-cols-3
            "
        >
            <FeaturedStory />
            <LatestActivities activities={activities} />
            <Notices />

            <LatestNewsletter newsletter={latestNewsletter} />
            <UpcomingEvents />
            <QuickLinks />
        </div>
    );
}