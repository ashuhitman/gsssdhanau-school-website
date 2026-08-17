import Image from "next/image";

interface ImageCardProps {
    image: string;
    imageAlt?: string;
    title: string;
    description?: string;
    href?: string;

    direction?: "horizontal" | "vertical";

    /** Controls image size */
    imageClassName?: string;

    /** Makes image circular */
    imageRounded?: boolean;

    /** Show card border */
    border?: boolean;

    /** Padding inside card */
    cardPadding?: string;

    /** Next/Image sizes */
    imageSizes?: string;

    /** Additional card classes */
    className?: string;
}

export function ImageCard({
    image,
    imageAlt = "",
    title,
    description,
    href,
    direction = "horizontal",
    imageClassName = "size-[90px]",
    imageRounded = false,
    border = true,
    cardPadding = "p-2.5",
    imageSizes = "90px",
    className = "",
}: ImageCardProps) {
    const content = (
        <article
            className={`
                group
                min-w-0
                ${direction === "horizontal"
                    ? "flex items-center gap-4"
                    : "flex flex-col"
                }
                ${border ? "rounded-lg border border-border" : ""}
                ${cardPadding}
                ${className}
            `}
        >
            {/* Image */}
            <div
                className={`
                    relative
                    shrink-0
                    overflow-hidden
                    ${imageRounded ? "rounded-full" : "rounded-lg"}
                    ${imageClassName}
                `}
            >
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes={imageSizes}
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div
                className={`
                    min-w-0
                    ${direction === "vertical"
                        ? "w-full"
                        : ""
                    }
                `}
            >
                <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {title}
                </h3>

                {description && (
                    <p className="mt-2 text-sm leading-5 text-foreground">
                        {description}
                    </p>
                )}
            </div>
        </article>
    );

    if (href) {
        return (
            <a href={href} className="block">
                {content}
            </a>
        );
    }

    return content;
}