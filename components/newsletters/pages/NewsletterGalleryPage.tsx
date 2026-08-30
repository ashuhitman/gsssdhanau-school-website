import Image from "next/image";

import { Newsletter } from "@/lib/data/newsletter";

interface NewsletterGalleryPageProps {
    newsletter: Newsletter;
}

export function NewsletterGalleryPage({
    newsletter,
}: NewsletterGalleryPageProps) {
    const images = [
        ...newsletter.activities
            .filter(
                (activity) => activity.image
            )
            .map((activity) => ({
                id: `activity-${activity.id}`,
                src: activity.image!,
                alt: activity.title,
            })),

        ...newsletter.articles
            .filter(
                (article) => article.image
            )
            .map((article) => ({
                id: `article-${article.id}`,
                src: article.image!,
                alt: article.title,
            })),
    ];

    return (
        <div>
            <div>
                <p
                    className="
                        text-sm
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-[var(--school-primary)]
                    "
                >
                    Moments
                </p>

                <h2
                    className="
                        mt-3
                        text-4xl
                        font-bold
                        tracking-tight
                        text-[var(--school-heading)]
                    "
                >
                    Photo Gallery
                </h2>
            </div>

            {images.length > 0 ? (
                <div
                    className="
                        mt-10
                        grid
                        grid-cols-2
                        gap-3
                        sm:grid-cols-3
                        lg:grid-cols-4
                    "
                >
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="
                                relative
                                aspect-square
                                overflow-hidden
                                rounded-xl
                                bg-[var(--school-surface)]
                            "
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="
                                    object-cover
                                    transition-transform
                                    duration-300
                                    hover:scale-105
                                "
                                sizes="
                                    (max-width: 640px) 50vw,
                                    (max-width: 1024px) 33vw,
                                    25vw
                                "
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="
                        mt-10
                        rounded-2xl
                        border
                        border-[var(--school-border)]
                        bg-[var(--school-surface)]
                        px-6
                        py-12
                        text-center
                    "
                >
                    <p
                        className="
                            text-sm
                            text-[var(--school-muted)]
                        "
                    >
                        No photographs were added
                        to this issue.
                    </p>
                </div>
            )}
        </div>
    );
}