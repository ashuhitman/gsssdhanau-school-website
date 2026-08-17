import { NewsletterCard } from "./NewsletterCard";

export interface NewsletterItem {
    id: string;
    title: string;
    description: string;
    issue: string;
    date: string;
    href?: string;
}

interface NewsletterArchiveGridProps {
    newsletters: NewsletterItem[];
}

export default function NewsletterArchiveGrid({
    newsletters,
}: NewsletterArchiveGridProps) {
    return (
        <div
            className="
                grid
                grid-cols-1
                gap-x-6
                gap-y-10

                sm:grid-cols-2

                lg:grid-cols-3

                xl:grid-cols-4
            "
        >
            {newsletters.map((newsletter) => (
                <NewsletterCard
                    key={newsletter.id}
                    title={newsletter.title}
                    description={newsletter.description}
                    issue={newsletter.issue}
                    date={newsletter.date}
                    href={newsletter.href}
                />
            ))}
        </div>
    );
}