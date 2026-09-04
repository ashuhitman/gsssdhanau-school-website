import Link from "next/link";
import { ArrowDownToLine, ArrowRight } from "lucide-react";

import type { Newsletter } from "@/lib/data/newsletter/types";
import { NewsletterCard } from "../newsletters/NewsletterCard";
import { formatDate } from "@/lib/utils/utils";

interface LatestNewsletterProps {
    newsletter: Newsletter | null;
}

export function LatestNewsletter({
    newsletter,
}: LatestNewsletterProps) {
    return (
        <section className="home-grid-card">
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
                <h2
                    className="
                        font-serif
                        text-[1.15rem]
                        font-bold
                        text-heading
                    "
                >
                    Latest Newsletter
                </h2>

                <Link
                    href="/newsletters"
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

            {/* Newsletter */}
            {newsletter && (
                <div
                    className="
                        mt-4
                        flex
                        min-w-0
                        flex-1
                        gap-4
                    "
                >
                    {/* NewsletterCard */}
                    <div
                        className="
                            relative
                            h-[9rem]
                            w-[6.5rem]
                            shrink-0
                            overflow-hidden
                        "
                    >
                        <NewsletterCard
                            title={newsletter.title}
                            description={newsletter.description ?? ""}
                            issue={String(newsletter.issue)}
                            date={formatDate(newsletter.publishedAt ?? "")}
                            coverImage={newsletter.coverImage}
                            href={`/newsletters/${newsletter.slug}`}
                            showInfo={false}

                        />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                        <p
                            className="
                                text-[0.62rem]
                                font-semibold
                                uppercase
                                tracking-wider
                                text-accent
                            "
                        >
                            Issue #{newsletter.issue} &middot;{" "}
                        </p>

                        <h3
                            className="
                                mt-1
                                text-[0.85rem]
                                font-bold
                                leading-snug
                                text-heading
                            "
                        >
                            {newsletter.title}
                        </h3>

                        <p
                            className="
                                mt-2
                                line-clamp-4
                                text-[0.68rem]
                                leading-relaxed
                                text-body
                            "
                        >
                            {newsletter.description}
                        </p>

                        <Link
                            href={`/newsletters/${newsletter.slug}`}
                            className="
                                mt-auto
                                inline-flex
                                w-fit
                                items-center
                                gap-2
                                rounded-lg
                                bg-primary
                                px-3
                                py-2
                                text-[0.65rem]
                                font-semibold
                                text-white
                                transition-colors
                                hover:bg-primary-hover
                            "
                        >
                            Read Newsletter

                            <ArrowRight
                                className="size-[0.75rem]"
                                strokeWidth={2}
                            />
                        </Link>
                    </div>
                </div>
            )}

            {/* Download */}
            <Link
                href={
                    newsletter?.pdfUrl ??
                    `/newsletters/${newsletter?.slug ?? ""}`
                }
                target={newsletter?.pdfUrl ? "_blank" : undefined}
                rel={
                    newsletter?.pdfUrl
                        ? "noopener noreferrer"
                        : undefined
                }
                className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-2
                    border-t
                    border-default
                    pt-3
                    text-[0.65rem]
                    font-semibold
                    text-primary
                "
            >
                Download Latest Issue

                <ArrowDownToLine
                    className="size-[0.8rem]"
                    strokeWidth={1.8}
                />
            </Link>
        </section>
    );
}