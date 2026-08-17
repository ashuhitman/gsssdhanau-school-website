import Image from "next/image";
import { ReactNode } from "react";

interface ActivityHighlightCardProps {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    imageAlt: string;
    icon?: ReactNode;
    badge?: string;
}

export default function ActivityHighlightCard({
    title,
    subtitle,
    description,
    image,
    imageAlt,
    icon,
    badge,
}: ActivityHighlightCardProps) {
    return (
        <article
            className="
        grid
        overflow-hidden
        rounded-[1.25rem]
        border
        border-default
        bg-card
        shadow-school-card

        lg:grid-cols-[0.9fr_1.1fr]
      "
        >
            {/* Image */}

            <div
                className="
          relative
          min-h-[15rem]

          sm:min-h-[18rem]

          lg:min-h-[25rem]
        "
            >
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="
            (max-width: 1024px) 100vw,
            45vw
          "
                    className="object-cover"
                />
            </div>

            {/* Content */}

            <div
                className="
          flex
          flex-col
          justify-center
          p-[1.25rem]

          sm:p-[1.75rem]

          md:p-[2rem]

          lg:p-[2.5rem]
        "
            >
                {badge && (
                    <span
                        className="
              mb-[0.75rem]
              w-fit
              rounded-full
              bg-accent-soft
              px-[0.7rem]
              py-[0.35rem]
              text-[0.7rem]
              font-bold
              uppercase
              tracking-wide
              text-accent
            "
                    >
                        {badge}
                    </span>
                )}

                {icon && (
                    <div
                        className="
              mb-[0.8rem]
              flex
              h-[2.75rem]
              w-[2.75rem]
              items-center
              justify-center
              rounded-full
              bg-primary-soft
              text-primary
            "
                    >
                        {icon}
                    </div>
                )}

                <h3
                    className="
            text-[1.6rem]
            font-bold
            leading-[1.1]
            text-heading

            sm:text-[1.9rem]
          "
                >
                    {title}
                </h3>

                <p
                    className="
            mt-[0.5rem]
            text-[0.9rem]
            font-semibold
            text-primary
          "
                >
                    {subtitle}
                </p>

                <p
                    className="
            mt-[0.8rem]
            max-w-[35rem]
            text-[0.9rem]
            leading-[1.7]
            text-muted

            sm:text-[1rem]
          "
                >
                    {description}
                </p>
            </div>
        </article>
    );
}