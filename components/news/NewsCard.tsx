import { CalendarDays, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export interface NewsCardProps {
    title: string;
    description: string;
    date: string;
    image: string;
    href: string;
}

export function NewsCard({
    title,
    description,
    date,
    image,
    href,
}: NewsCardProps) {
    return (
        <Link
            href={href}
            className="group flex min-w-0 gap-4 border-b border-border py-4 first:pt-0 last:border-0 last:pb-0"
        >
            {/* Image */}
            <div className="relative size-[4.5rem] shrink-0 overflow-hidden rounded-xl">
                <Image
                    src={image}
                    alt=""
                    fill
                    sizes="4.5rem"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-bold leading-5 text-foreground transition-colors group-hover:text-primary-600">
                    {title}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {description}
                </p>

                <div className="mt-1.5 flex items-center gap-1.5 text-[0.625rem] text-muted-foreground">
                    <CalendarDays className="size-3 shrink-0" />

                    <span>{date}</span>
                </div>
            </div>


            <ChevronRight className="mt-5 size-4 shrink-0 text-primary-400 transition-transform group-hover:translate-x-1" />
        </Link>
    );
}