interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
}

export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = "center",
}: SectionHeadingProps) {
    return (
        <div
            className={`
                max-w-[52rem]
                ${align === "center"
                    ? "mx-auto text-center"
                    : "text-left"
                }
            `}
        >
            {/* =====================================================
                EYEBROW
            ====================================================== */}

            {eyebrow && (
                <p
                    className="
                        mb-2
                        text-sm
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-accent
                    "
                >
                    {eyebrow}
                </p>
            )}

            {/* =====================================================
                TITLE
            ====================================================== */}

            <h2
                className="
                    text-[clamp(1.5rem,3vw,2.25rem)]
                    font-bold
                    leading-tight
                    tracking-tight
                    text-heading
                "
            >
                {title}
            </h2>

            {/* =====================================================
                DESCRIPTION
            ====================================================== */}

            {description && (
                <p
                    className="
                        mt-3
                        text-sm
                        leading-6
                        text-muted

                        sm:text-base
                    "
                >
                    {description}
                </p>
            )}
        </div>
    );
}