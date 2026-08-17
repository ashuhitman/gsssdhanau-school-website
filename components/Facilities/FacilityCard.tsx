import Image from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface FacilityCardProps {
    title: string;
    description: string;
    image: string;
    imageAlt?: string;
    icon: LucideIcon;
    href?: string;
    number?: string;
}

export function FacilityCard({
    title,
    description,
    image,
    imageAlt = "",
    icon: Icon,
    href,
    number,
}: FacilityCardProps) {
    const content = (
        <article
            className="
                group
                relative
                flex
                h-full
                min-w-0
                flex-col
                overflow-hidden
                rounded-xl
                border
                border-border
                bg-card
                p-3.5
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-primary-200
                hover:shadow-md
                dark:hover:border-primary-800
                sm:p-4
            "
        >
            {/* Number */}
            {number && (
                <div
                    className="
                        absolute
                        right-3
                        top-3
                        z-10
                        flex
                        size-8
                        items-center
                        justify-center
                        rounded-md
                        bg-primary-600
                        text-[11px]
                        font-bold
                        text-white
                        shadow-sm
                    "
                >
                    {number}
                </div>
            )}

            {/* Top content */}
            <div className="px-2 pt-3 sm:px-2.5 sm:pt-3.5">
                <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div
                        className="
                            flex
                            size-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-primary-50
                            text-primary-700
                            dark:bg-primary-950/40
                            dark:text-primary-300
                        "
                    >
                        <Icon
                            className="size-7"
                            strokeWidth={1.7}
                        />
                    </div>

                    {/* Title */}
                    <div className="min-w-0">
                        <h3
                            className="
                                text-base
                                font-bold
                                leading-5
                                text-primary-800
                                dark:text-primary-200
                                sm:text-lg
                            "
                        >
                            {title}
                        </h3>

                        {/* Accent */}
                        <div
                            className="
                                mt-2
                                h-0.5
                                w-8
                                bg-primary-500
                                transition-all
                                duration-200
                                group-hover:w-11
                            "
                        />
                    </div>
                </div>

                {/* Description */}
                <p
                    className="
                        mt-5
                        min-h-[84px]
                        text-xs
                        leading-5
                        text-foreground
                        sm:text-sm
                        sm:leading-6
                    "
                >
                    {description}
                </p>
            </div>

            {/* Image */}
            <div
                className="
                    relative
                    mt-4
                    aspect-[16/7.5]
                    w-full
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    bg-muted
                "
            >
                <Image
                    src={image}
                    alt={imageAlt || title}
                    fill
                    sizes="
                        (max-width: 768px) 100vw,
                        (max-width: 1024px) 50vw,
                        33vw
                    "
                    className="
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
                />
            </div>

            {/* Optional link */}
            {href && (
                <div className="px-2 pt-3">
                    <span
                        className="
                            inline-flex
                            items-center
                            gap-1
                            text-xs
                            font-semibold
                            text-primary-600
                            dark:text-primary-400
                        "
                    >
                        Explore

                        <ArrowRight
                            className="
                                size-3.5
                                transition-transform
                                group-hover:translate-x-1
                            "
                        />
                    </span>
                </div>
            )}
        </article>
    );

    if (href) {
        return (
            <Link
                href={href}
                className="block h-full"
            >
                {content}
            </Link>
        );
    }

    return content;
}