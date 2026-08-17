import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

export interface ArticleItem {
    id: string;
    title: string;
    description?: string;
    author?: string;
    date: string;
    image: string;
    href: string;
}

interface ArticleCardProps {
    article: ArticleItem;
}

export function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Link
            href={article.href}
            className="
                group
                block
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-card
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-md
            "
        >
            {/* Image */}
            <div
                className="
                    relative
                    aspect-[16/9]
                    overflow-hidden
                "
            >
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="
                        (max-width: 40rem) 100vw,
                        (max-width: 80rem) 50vw,
                        30vw
                    "
                    className="
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-105
                    "
                />
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Date + Author */}
                <div
                    className="
                        flex
                        items-center
                        gap-2
                        text-[0.65rem]
                        text-muted-foreground
                    "
                >
                    <span className="inline-flex items-center gap-1">
                        <CalendarDays className="size-3" />
                        {article.date}
                    </span>

                    {article.author && (
                        <>
                            <span>•</span>

                            <span className="truncate">
                                {article.author}
                            </span>
                        </>
                    )}
                </div>

                {/* Title */}
                <h3
                    className="
                        mt-2
                        line-clamp-2
                        text-base
                        font-bold
                        leading-5
                        text-foreground
                        transition
                        group-hover:text-primary-600
                    "
                >
                    {article.title}
                </h3>

                {/* Description */}
                {article.description && (
                    <p
                        className="
                            mt-2
                            line-clamp-2
                            text-sm
                            leading-5
                            text-muted-foreground
                        "
                    >
                        {article.description}
                    </p>
                )}

                {/* Read */}
                <span
                    className="
                        mt-4
                        inline-flex
                        items-center
                        gap-1
                        text-sm
                        font-semibold
                        text-primary-600
                    "
                >
                    Read article

                    <ArrowRight
                        className="
                            size-4
                            transition-transform
                            group-hover:translate-x-1
                        "
                    />
                </span>
            </div>
        </Link>
    );
}