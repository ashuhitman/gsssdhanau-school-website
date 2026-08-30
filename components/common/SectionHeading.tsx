interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
    icon?: React.ReactNode;
}

export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = "center",
    icon,
}: SectionHeadingProps) {
    return (
        <div
            className={`
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
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-[clamp(1.5rem,3vw,2.25rem)]
                    font-bold
                    leading-tight
                    tracking-tight
                    text-heading
                "
            >
                {icon && (
                    <span className="shrink-0">
                        {icon}
                    </span>
                )}

                <span>{title}</span>
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