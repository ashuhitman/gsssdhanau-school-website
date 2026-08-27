"use client";

import {
    BookOpen,
    Check,
} from "lucide-react";

/* ============================================================
   Types
============================================================ */

export interface ContentTopic {
    value: string;
    label: string;
    count?: number;
}

interface ContentTopicsProps {
    topics: ContentTopic[];
    activeTopic?: string;
    onTopicChange: (
        value: string
    ) => void;
}

/* ============================================================
   Content Topics
============================================================ */

export default function ContentTopics({
    topics,
    activeTopic = "all",
    onTopicChange,
}: ContentTopicsProps) {
    return (
        <section
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                sm:p-6
            "
        >
            {/* ==================================================
                Heading
            ================================================== */}

            <div
                className="
                    flex
                    items-center
                    gap-3
                "
            >
                <div
                    className="
                        flex
                        size-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-blue-950
                    "
                >
                    <BookOpen
                        className="
                            size-5
                        "
                    />
                </div>

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
                        Explore
                    </p>

                    <h2
                        className="
                            text-lg
                            font-black
                            tracking-tight
                            text-slate-950
                        "
                    >
                        Explore by Topic
                    </h2>
                </div>
            </div>

            {/* ==================================================
                Topics
            ================================================== */}

            <nav
                aria-label="Article topics"
                className="
                    mt-5
                    flex
                    gap-2
                    overflow-x-auto
                    pb-1
                    scrollbar-none
                "
            >
                {topics.map((topic) => {
                    const isActive =
                        activeTopic ===
                        topic.value;

                    return (
                        <button
                            key={topic.value}
                            type="button"
                            onClick={() =>
                                onTopicChange(
                                    topic.value
                                )
                            }
                            aria-pressed={
                                isActive
                            }
                            className={`
                                inline-flex
                                shrink-0
                                items-center
                                gap-2
                                rounded-full
                                border
                                px-4
                                py-2
                                text-xs
                                font-semibold
                                transition-all
                                ${isActive
                                    ? "border-blue-950 bg-blue-950 text-white shadow-sm"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                                }
                            `}
                        >
                            {isActive && (
                                <Check
                                    className="
                                        size-3.5
                                    "
                                />
                            )}

                            <span>
                                {
                                    topic.label
                                }
                            </span>

                            {topic.count !==
                                undefined && (
                                    <span
                                        className={`
                                        rounded-full
                                        px-1.5
                                        py-0.5
                                        text-[9px]
                                        ${isActive
                                                ? "bg-white/15 text-white/70"
                                                : "bg-slate-100 text-slate-400"
                                            }
                                    `}
                                    >
                                        {
                                            topic.count
                                        }
                                    </span>
                                )}
                        </button>
                    );
                })}
            </nav>
        </section>
    );
}