import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function FeaturedStory() {
    return (
        <article className="home-grid-card group relative overflow-hidden p-0">
            {/* Image */}
            <div className="relative h-[10rem] w-full overflow-hidden sm:h-[11rem]">
                <Image
                    src="/images/home/featured.jpg"
                    alt="Students participating in a school activity"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                    <span
                        className="
                            text-[0.65rem]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-accent
                        "
                    >
                        Featured Story
                    </span>

                    <Link
                        href="/articles"
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

                <h2
                    className="
                        mt-3
                        font-serif
                        text-[1.1rem]
                        font-bold
                        leading-snug
                        text-heading
                        sm:text-[1.2rem]
                    "
                >
                    Celebrating Learning, Creativity and Achievement
                </h2>

                <p
                    className="
                        mt-2
                        line-clamp-2
                        text-[0.72rem]
                        leading-relaxed
                        text-body
                    "
                >
                    Discover the stories and experiences that showcase
                    the enthusiasm, creativity and achievements of our
                    students.
                </p>

                <div className="mt-auto pt-4">
                    <Link
                        href="/articles"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-primary
                            px-4
                            py-2
                            text-[0.68rem]
                            font-semibold
                            text-white
                            transition-colors
                            hover:bg-primary-hover
                        "
                    >
                        Read Story
                        <ArrowUpRight
                            className="size-[0.8rem]"
                            strokeWidth={2}
                        />
                    </Link>
                </div>
            </div>
        </article>
    );
}