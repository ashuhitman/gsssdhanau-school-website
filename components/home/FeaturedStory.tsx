import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

export interface FeaturedStoryItem {
    id: string;
    title: string;
    excerpt?: string;
    date: string;
    image: string;
    href: string;
    author?: string;
    category?: string;
}

interface FeaturedStoryProps {
    story?: FeaturedStoryItem;
    title?: string;
}

const sampleStory: FeaturedStoryItem = {
    id: "1",
    title: "Learning Beyond the Classroom",
    excerpt:
        "A look at how our students learn through practical experiences, projects, activities and meaningful participation beyond the classroom.",
    date: "12 Aug 2026",
    image: "/images/news/activity.png",
    href: "/articles/learning-beyond-the-classroom",
    author: "School Editorial Team",
    category: "Academic",
};

export function FeaturedStory({
    story = sampleStory,
    title = "Featured Story",
}: FeaturedStoryProps) {
    return (
        <section className="min-w-0">
            {/* Section heading */}
            <SectionHeading
                align="left"
                eyebrow="From Our School"
                title="Featured Story"
            />

            <article
                className="
                mt-3
                    group
                    grid
                    grid-cols-1
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    shadow-sm
                    transition
                    hover:shadow-md
                    lg:grid-cols-2
                "
            >
                {/* Image */}
                <Link
                    href={story.href}
                    className="
                        relative
                        block
                        min-h-[15rem]
                        overflow-hidden
                        sm:min-h-[20rem]
                        lg:min-h-[22rem]
                    "
                >
                    <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        sizes="width:100%"
                        className="
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-105
                        "
                    />

                    {/* Image overlay */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/40
                            via-transparent
                            to-transparent
                        "
                    />

                    {/* Category strip */}
                    {story.category && (
                        <div
                            className="
                                absolute
                                right-4
                                top-4
                                rounded-md
                                bg-primary-950/90
                                px-3
                                py-1.5
                                backdrop-blur-sm
                            "
                        >
                            <span
                                className="
                                    text-[0.6rem]
                                    font-bold
                                    uppercase
                                    tracking-[0.1em]
                                    text-white
                                "
                            >
                                {story.category}
                            </span>
                        </div>
                    )}
                </Link>

                {/* Content */}
                <div
                    className="
                        flex
                        flex-col
                        justify-center
                        p-6
                        sm:p-8
                        lg:p-10
                    "
                >
                    {/* Date + Author */}
                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                            text-xs
                            text-muted-foreground
                        "
                    >
                        <span className="inline-flex items-center gap-1">
                            <CalendarDays className="size-3.5" />
                            {story.date}
                        </span>

                        {story.author && (
                            <>
                                <span>•</span>
                                <span>{story.author}</span>
                            </>
                        )}
                    </div>

                    {/* Title */}
                    <h3
                        className="
                            mt-3
                            text-[clamp(1.4rem,2.5vw,2rem)]
                            font-bold
                            leading-tight
                            text-foreground
                        "
                    >
                        {story.title}
                    </h3>

                    {/* Excerpt */}
                    {story.excerpt && (
                        <p
                            className="
                                mt-4
                                max-w-xl
                                text-sm
                                leading-6
                                text-muted-foreground
                                sm:text-base
                                sm:leading-7
                            "
                        >
                            {story.excerpt}
                        </p>
                    )}

                    {/* Read Story */}
                    <Link
                        href={story.href}
                        className="
                            mt-6
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-primary-600
                            transition
                            hover:text-primary-700
                        "
                    >
                        Read Story

                        <ArrowRight
                            className="
                                size-4
                                transition-transform
                                group-hover:translate-x-1
                            "
                        />
                    </Link>
                </div>
            </article>
        </section>
    );
}