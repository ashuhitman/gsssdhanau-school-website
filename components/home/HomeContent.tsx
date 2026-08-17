import { LatestNews } from "./LatestNews";
import { Notices } from "./Notices";
import { FeaturedStory } from "./FeaturedStory";
import { LatestArticles } from "./LatestArticles";
import { LatestNewsletter } from "./LatestNewsletter";


export function HomeContent() {
    return (
        <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="mx-auto w-full max-w-[90rem] space-y-8">
                {/* Featured Story */}
                <FeaturedStory />

                {/* Latest News & Activities + Notices */}
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-6
                        lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.85fr)]
                    "
                >
                    <LatestNews />

                    <Notices />
                </div>

                {/* Latest Articles + Latest Newsletter */}
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-6
                        lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]
                        lg:items-start
                    "
                >
                    {/* Latest Articles takes remaining space */}
                    <div className="min-w-0">
                        <LatestArticles />
                    </div>

                    {/* Newsletter stays on the right */}
                    <div className="min-w-0">
                        <LatestNewsletter />
                    </div>
                </div>
            </div>
        </section>
    );
}