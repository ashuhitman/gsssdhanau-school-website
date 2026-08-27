import {
    Quote,
} from "lucide-react";

/* ============================================================
   Props
============================================================ */

interface ContentQuoteCardProps {
    quote: string;

    author?: string;

    role?: string;
}

/* ============================================================
   Content Quote Card
============================================================ */

export default function ContentQuoteCard({
    quote,
    author,
    role,
}: ContentQuoteCardProps) {
    return (
        <aside
            className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-blue-950
                p-6
                shadow-sm
                sm:p-7
            "
        >
            {/* Decorative Quote */}

            <Quote
                aria-hidden="true"
                className="
                    absolute
                    -right-2
                    -top-2
                    size-24
                    rotate-180
                    text-white/[0.06]
                "
            />

            {/* Content */}

            <div
                className="
                    relative
                "
            >
                <div
                    className="
                        flex
                        size-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-white/10
                        text-amber-400
                    "
                >
                    <Quote
                        className="
                            size-4
                        "
                    />
                </div>

                <p
                    className="
                        mt-5
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-amber-400
                    "
                >
                    A Thought to Carry
                </p>

                <blockquote
                    className="
                        mt-3
                        font-serif
                        text-xl
                        font-medium
                        leading-relaxed
                        tracking-tight
                        text-white
                    "
                >
                    “{quote}”
                </blockquote>

                {(author || role) && (
                    <footer
                        className="
                            mt-6
                            border-t
                            border-white/10
                            pt-4
                        "
                    >
                        {author && (
                            <p
                                className="
                                    text-xs
                                    font-bold
                                    text-white
                                "
                            >
                                {author}
                            </p>
                        )}

                        {role && (
                            <p
                                className="
                                    mt-0.5
                                    text-[10px]
                                    text-white/45
                                "
                            >
                                {role}
                            </p>
                        )}
                    </footer>
                )}
            </div>

            {/* Accent */}

            <div
                aria-hidden="true"
                className="
                    absolute
                    bottom-0
                    left-0
                    h-1
                    w-20
                    bg-amber-400
                "
            />
        </aside>
    );
}