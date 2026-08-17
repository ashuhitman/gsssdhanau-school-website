import { Archive, Search } from "lucide-react";

interface NewsletterArchiveToolbarProps {
    totalIssues?: number;
    searchPlaceholder?: string;
}

export default function NewsletterArchiveToolbar({
    totalIssues,
    searchPlaceholder = "Search newsletters...",
}: NewsletterArchiveToolbarProps) {
    return (
        <div
            className="
                flex
                flex-col
                gap-4

                sm:flex-row
                sm:items-center
                sm:justify-between
            "
        >
            {/* =====================================================
                ISSUE COUNT
            ====================================================== */}

            <div
                className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-muted
                "
            >
                <div
                    className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        icon-bg-primary
                        icon-primary
                    "
                >
                    <Archive size={17} />
                </div>

                <span>
                    {totalIssues ?? 0}{" "}
                    {totalIssues === 1
                        ? "newsletter"
                        : "newsletters"}{" "}
                    available
                </span>
            </div>

            {/* =====================================================
                SEARCH
            ====================================================== */}

            <div
                className="
                    relative
                    w-full

                    sm:w-[18rem]

                    lg:w-[20rem]
                "
            >
                <Search
                    size={17}
                    className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-muted
                    "
                />

                <input
                    type="search"
                    placeholder={searchPlaceholder}
                    aria-label="Search newsletters"
                    className="
                        min-h-10
                        w-full
                        rounded-lg
                        border
                        border-default
                        bg-card
                        pl-9
                        pr-3
                        text-sm
                        text-body
                        outline-none
                        placeholder:text-muted
                        transition-colors

                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary-soft
                    "
                />
            </div>
        </div>
    );
}