import Link from "next/link";

import {
    ArrowUpRight,
    PenLine,
} from "lucide-react";

/* ============================================================
   Props
============================================================ */

interface SubmitContentCardProps {
    href: string;

    title?: string;

    description?: string;

    buttonLabel?: string;
}

/* ============================================================
   Submit Content Card
============================================================ */

export default function SubmitContentCard({
    href,
    title = "Have something to share?",
    description = "We would love to hear your ideas, experiences and perspectives.",
    buttonLabel = "Submit an Article",
}: SubmitContentCardProps) {
    return (
        <section
            className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-6
                    p-6
                    sm:p-8
                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >
                {/* ==================================================
                    Content
                ================================================== */}

                <div
                    className="
                        flex
                        items-start
                        gap-4
                    "
                >
                    {/* Icon */}

                    <div
                        className="
                            flex
                            size-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-amber-50
                            text-amber-600
                        "
                    >
                        <PenLine
                            className="
                                size-5
                            "
                        />
                    </div>

                    {/* Text */}

                    <div>
                        <p
                            className="
                                text-[9px]
                                font-black
                                uppercase
                                tracking-[0.18em]
                                text-amber-600
                            "
                        >
                            Share Your Voice
                        </p>

                        <h2
                            className="
                                mt-1
                                text-xl
                                font-black
                                tracking-tight
                                text-slate-950
                            "
                        >
                            {title}
                        </h2>

                        <p
                            className="
                                mt-1.5
                                max-w-xl
                                text-sm
                                leading-6
                                text-slate-500
                            "
                        >
                            {description}
                        </p>
                    </div>
                </div>

                {/* ==================================================
                    Button
                ================================================== */}

                <Link
                    href={href}
                    className="
                        group
                        inline-flex
                        w-fit
                        shrink-0
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

            {/* Bottom accent */}

            <div
                aria-hidden="true"
                className="
                    h-1
                    bg-amber-400
                "
            />
        </section>
    );
}