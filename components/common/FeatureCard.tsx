import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface FeatureCardProps {
    title: string;
    description: string;

    image?: string;
    imageAlt?: string;

    icon?: ReactNode;
    iconClassName?: string;

    href?: string;
    linkText?: string;
}

export default function FeatureCard({
    title,
    description,
    image,
    imageAlt = "",
    icon,
    iconClassName = "icon-bg-primary icon-primary",
    href,
    linkText = "Explore",
}: FeatureCardProps) {
    return (
        <article
            className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-default
                bg-card
                shadow-school-card
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-school-card-hover
            "
        >
            {/* =====================================================
                IMAGE
            ====================================================== */}

            {image && (
                <div
                    className="
                        relative
                        aspect-[16/9]
                        overflow-hidden
                        bg-surface
                    "
                >
                    <Image
                        src={image}
                        alt={imageAlt}
                        fill
                        sizes="
                            (max-width: 640px) 100vw,
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

                    {/* Image overlay */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/60
                            via-black/10
                            to-transparent
                        "
                    />

                    {/* =================================================
                        ICON ON IMAGE
                    ================================================== */}

                    {icon && (
                        <div
                            className={`
                                absolute
                                bottom-4
                                left-4
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                shadow-school-button
                                ${iconClassName}
                            `}
                        >
                            {icon}
                        </div>
                    )}
                </div>
            )}

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <div
                className="
                    p-5
                    sm:p-6
                "
            >
                {/* =================================================
                    ICON WITHOUT IMAGE
                ================================================== */}

                {!image && icon && (
                    <div
                        className={`
                            mb-4
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            ${iconClassName}
                        `}
                    >
                        {icon}
                    </div>
                )}

                {/* =================================================
                    TITLE
                ================================================== */}

                <h3
                    className="
                        text-lg
                        font-bold
                        leading-tight
                        text-heading

                        sm:text-xl
                    "
                >
                    {title}
                </h3>

                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                <p
                    className="
                        mt-2
                        text-sm
                        leading-6
                        text-muted
                    "
                >
                    {description}
                </p>

                {/* =================================================
                    LINK
                ================================================== */}

                {href && (
                    <Link
                        href={href}
                        className="
                            mt-4
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-primary
                            transition-colors
                            hover:text-primary-hover
                        "
                    >
                        {linkText}

                        <ArrowRight
                            size={16}
                            className="
                                transition-transform
                                duration-200
                                group-hover:translate-x-1
                            "
                        />
                    </Link>
                )}
            </div>
        </article>
    );
}