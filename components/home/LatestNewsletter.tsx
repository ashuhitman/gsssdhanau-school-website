import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsletterCard } from "../newsletter/NewsletterCard";



export interface NewsletterItem {
    id: string;
    title: string;
    issue: string;
    date: string;
    description: string;
    coverImage?: string;
    href: string;
}

interface NewsletterProps {
    newsletter?: NewsletterItem;
    title?: string;
    href?: string;
}

const sampleNewsletter: NewsletterItem = {
    id: "4",
    title: "School Newsletter",
    issue: "Issue #04",
    date: "August 2026",
    description:
        "A collection of important moments, activities, achievements and stories from our school.",
    coverImage: "/images/newsletter/issue-04.jpg",
    href: "/newsletter/issue-04",
};

export function LatestNewsletter({
    newsletter = sampleNewsletter,
    title = "Latest Newsletter",
    href = "/newsletter",
}: NewsletterProps) {
    return (
        <section className="min-w-0 ">
            {/* Centered heading */}
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

            {/* Existing NewsletterCard */}
            <div className="flex justify-center">
                <NewsletterCard
                    title={newsletter.title}
                    issue={newsletter.issue}
                    date={newsletter.date}
                    description={newsletter.description}

                    href={newsletter.href}
                />
            </div>


        </section>
    );
}