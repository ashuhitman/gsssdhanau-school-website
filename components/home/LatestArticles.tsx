import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard, ArticleItem } from "../Articles/ArticleCard";



interface LatestArticlesProps {
    articles?: ArticleItem[];
    title?: string;
    href?: string;
}

const sampleArticles: ArticleItem[] = [
    {
        id: "1",
        title: "The Joy of Planting Trees",
        description:
            "A small step towards a greener tomorrow and a healthier environment.",
        author: "Rahul Verma",
        date: "09 Aug 2026",
        image: "/images/articles/planting-trees.jpg",
        href: "/articles/the-joy-of-planting-trees",
    },
    {
        id: "2",
        title: "Teamwork Makes Dreamwork",
        description:
            "Learning the power of collaboration, responsibility and working together.",
        author: "Priya Singh",
        date: "08 Aug 2026",
        image: "/images/articles/teamwork.jpg",
        href: "/articles/teamwork-makes-dreamwork",
    },
    {
        id: "3",
        title: "Why Science Excites Me",
        description:
            "Exploring the wonders of science through experiments and curiosity.",
        author: "Karan Patel",
        date: "07 Aug 2026",
        image: "/images/articles/science.jpg",
        href: "/articles/why-science-excites-me",
    },
];

export function LatestArticles({
    articles = sampleArticles,
    title = "Latest Articles",
    href = "/articles",
}: LatestArticlesProps) {
    return (
        <section className="flex h-full min-w-0 flex-col">
            {/* Heading */}
            <div className="mb-5 text-center">
                <h2
                    className="
                        text-[clamp(1.35rem,2vw,1.75rem)]
                        font-bold
                        tracking-tight
                        text-foreground
                    "
                >
                    {title}
                </h2>
            </div>

            {/* Articles */}
            <div
                className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    xl:grid-cols-3
                "
            >
                {articles.slice(0, 3).map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                    />
                ))}
            </div>

            {/* View all */}
            <div className="mt-auto pt-6">
                <div className="flex justify-center">
                    <Link
                        href={href}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-border
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-primary-600
                            transition
                            hover:border-primary-300
                            hover:bg-primary-50
                            dark:hover:border-primary-700
                            dark:hover:bg-primary-950
                        "
                    >
                        View all articles

                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}