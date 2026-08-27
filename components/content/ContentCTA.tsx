import Link from "next/link";

import {
    ArrowUpRight,
    BookOpen,
} from "lucide-react";

/* ============================================================
   Props
============================================================ */

interface ContentCTAProps {
    href: string;

    eyebrow?: string;

    title?: string;

    description?: string;

    buttonLabel?: string;
}

/* ============================================================
   Content CTA
============================================================ */

export default function ContentCTA({
    href,
    eyebrow = "Keep Exploring",
    title = "Ideas worth sharing.",
    description = "Discover more stories, experiences and perspectives from our school community.",
    buttonLabel = "Explore Articles",
}: ContentCTAProps) {
    return (
        <aside
            className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                sm:p-7
            "
        >
            {/* Decorative Icon */}

            <div
                aria-hidden="true"
                className="
                    absolute
                    -right-6
                    -top-6
                    flex
                    size-24
                    items-center
                    justify-center
                    rounded-full
                    bg-amber-50
                "
            >
                <BookOpen
                    className="
                        size-9
                        text-amber-200
                    "
                />
            </div>

            {/* Content */}

            <div
                className="
                    relative
                "
            >
                <p
                    className="
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-amber-600
                    "
                >
                    {eyebrow}
                </p>

                <h2
                    className="
                        mt-2
                        max-w-[220px]
                        text-xl
                        font-black
                        leading-tight
                        tracking-tight
                        text-slate-950
                    "
                >
                    {title}
                </h2>

                <p
                    className="
                        mt-3
                        text-xs
                        leading-5
                        text-slate-500
                    "
                >
                    {description}
                </p>

                <Link
                    href={href}
                    className="
                        group
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-blue-950
                        px-4
                        py-2.5
                        text-xs
                        font-bold
                        text-white
                        transition-colors
                        hover:bg-blue-900
                    "
                >
                    {buttonLabel}

                    <ArrowUpRight
                        className="
                            size-3.5
                            transition-transform
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                        "
                    />
                </Link>
            </div>

            {/* Bottom Accent */}

            <div
                aria-hidden="true"
                className="
                    absolute
                    bottom-0
                    left-0
                    h-1
                    w-16
                    bg-amber-400
                "
            />
        </aside>
    );
}