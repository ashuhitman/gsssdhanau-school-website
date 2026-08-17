import { Quote } from "lucide-react";

interface ActivityQuoteProps {
    quote: string;
    author?: string;
}

export default function ActivityQuote({
    quote,
    author,
}: ActivityQuoteProps) {
    return (
        <section
            className="
        relative
        overflow-hidden
        rounded-[1.25rem]
        bg-primary
        px-[1.25rem]
        py-[2rem]
        text-white

        sm:px-[2rem]
        sm:py-[2.5rem]

        lg:px-[3rem]
        lg:py-[3rem]
      "
        >
            {/* Decorative circle */}

            <div
                className="
          pointer-events-none
          absolute
          -right-[5rem]
          -top-[5rem]
          h-[12rem]
          w-[12rem]
          rounded-full
          bg-white/10
        "
            />

            <Quote
                className="
          mb-[0.8rem]
          text-accent
        "
                size="2rem"
            />

            <blockquote
                className="
          relative
          max-w-[48rem]
          text-[1.2rem]
          font-semibold
          leading-[1.45]

          sm:text-[1.5rem]

          lg:text-[1.75rem]
        "
            >
                “{quote}”
            </blockquote>

            {author && (
                <p
                    className="
            relative
            mt-[1rem]
            text-[0.8rem]
            font-medium
            text-white/75
          "
                >
                    — {author}
                </p>
            )}
        </section>
    );
}