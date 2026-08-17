import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HomeHeroContent() {
    return (
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
                href="/about"
                className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-3
                    rounded-lg
                    bg-primary-600
                    px-5
                    text-sm
                    font-bold
                    text-white
                    shadow-sm
                    transition-all
                    hover:bg-primary-700
                    hover:shadow-md
                "
            >
                Learn More About Us

                <ArrowRight className="size-4" />
            </Link>

            <Link
                href="/academics"
                className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-3
                    rounded-lg
                    border
                    border-primary-400
                    bg-background
                    px-5
                    text-sm
                    font-bold
                    text-primary-700
                    transition-colors
                    hover:bg-primary-50
                    dark:text-primary-300
                    dark:hover:bg-primary-900
                "
            >
                Explore Academics

                <ArrowRight className="size-4" />
            </Link>
        </div>
    );
}