import {
    CalendarDays,
    ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { NewsActivity } from "@/types/newsTypes";



interface NewsListProps {
    news: NewsActivity[];
}

export default function NewsList({
    news,
}: NewsListProps) {
    return (
        <section className="min-w-0">
            <SectionHeading title="Latest News & Activities" />

            <div className="mt-5 overflow-hidden rounded-xl border border-border">
                {news.map((item, index) => (
                    <Link
                        key={item.id}
                        href={item.href ?? "#"}
                        className={`
                            group
                            grid
                            min-w-0
                            grid-cols-[110px_minmax(0,1fr)]
                            gap-4
                            p-3
                            transition-colors
                            hover:bg-primary-50/50
                            dark:hover:bg-primary-950/20
                            sm:grid-cols-[180px_minmax(0,1fr)]
                            ${index !== news.length - 1
                                ? "border-b border-border"
                                : ""
                            }
                        `}
                    >
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 640px) 110px, 180px"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex min-w-0 flex-col justify-center">
                            <span className="w-fit max-w-full rounded-full bg-primary-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                                {item.category}
                            </span>

                            <h3 className="mt-2 break-words text-sm font-bold text-foreground transition-colors group-hover:text-primary-600 sm:text-base">
                                {item.title}
                            </h3>

                            <p className="mt-1.5 line-clamp-2 break-words text-xs leading-5 text-muted-foreground sm:text-sm">
                                {item.description}
                            </p>

                            <div className="mt-3 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                    <CalendarDays className="size-3.5 shrink-0" />
                                    <span>{item.date}</span>
                                </div>

                                <span className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-primary-600 sm:inline-flex">
                                    Read More
                                    <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All */}
            <div className="mt-5 flex justify-center">
                <Link
                    href="/news"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-md
                        border
                        border-primary-600
                        px-5
                        py-2.5
                        text-xs
                        font-bold
                        text-primary-700
                        transition-colors
                        hover:bg-primary-600
                        hover:text-white
                        dark:text-primary-400
                        dark:hover:text-white
                    "
                >
                    View All News & Activities

                    <ChevronRight className="size-4" />
                </Link>
            </div>
        </section>
    );
}