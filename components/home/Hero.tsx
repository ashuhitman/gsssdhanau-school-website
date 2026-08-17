import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

interface HeroProps {
    image: string;
    imageAlt?: string;

    eyebrow?: string;
    title: string;
    description?: string;

    primaryText?: string;
    primaryHref?: string;

    secondaryText?: string;
    secondaryHref?: string;

    showDots?: boolean;
    totalSlides?: number;
    activeSlide?: number;
}

export function Hero({
    image,
    imageAlt = "",
    eyebrow = "Welcome to",
    title,
    description,
    primaryText,
    primaryHref,
    secondaryText,
    secondaryHref,
    showDots = true,
    totalSlides = 4,
    activeSlide = 0,
}: HeroProps) {
    return (
        <section className="w-full">
            <div className="relative w-full overflow-hidden bg-primary-950">
                <div
                    className="
                        grid
                        min-h-[20rem]
                        grid-cols-1
                        lg:min-h-[23rem]
                        lg:grid-cols-[0.9fr_1.1fr]
                        2xl:min-h-[24rem]
                    "
                >
                    {/* Left content */}
                    <div
                        className="
                            relative
                            z-10
                            flex
                            items-center
                            overflow-hidden
                            px-6
                            py-8
                            sm:px-8
                            lg:px-10
                            xl:px-12
                        "
                    >
                        {/* Decorative dots */}
                        <div
                            className="
                                pointer-events-none
                                absolute
                                bottom-0
                                left-0
                                h-24
                                w-24
                                opacity-20
                            "
                            aria-hidden="true"
                        >
                            <div
                                className="
                                    h-full
                                    w-full
                                    bg-[radial-gradient(circle,_rgba(255,255,255,0.4)_0.075rem,_transparent_0.075rem)]
                                    [background-size:0.625rem_0.625rem]
                                "
                            />
                        </div>

                        <div className="relative max-w-xl">
                            {/* Eyebrow */}
                            {eyebrow && (
                                <div
                                    className="
                                        mb-2
                                        flex
                                        items-center
                                        gap-2
                                        text-[clamp(0.625rem,0.7vw,0.8rem)]
                                        font-bold
                                        uppercase
                                        tracking-[0.12em]
                                        text-primary-300
                                    "
                                >
                                    <Building2 className="size-4 shrink-0" />

                                    <span>{eyebrow}</span>
                                </div>
                            )}

                            {/* Title */}
                            <h1
                                className="
                                    max-w-[32rem]
                                    text-[clamp(1.5rem,3vw,2.5rem)]
                                    font-extrabold
                                    leading-[1.08]
                                    tracking-tight
                                    text-white
                                "
                            >
                                {title}
                            </h1>

                            {/* Accent */}
                            <div
                                className="
                                    mt-3
                                    h-[0.2rem]
                                    w-[3rem]
                                    rounded-full
                                    bg-primary-400
                                "
                            />

                            {/* Description */}
                            {description && (
                                <p
                                    className="
                                        mt-3
                                        max-w-[32rem]
                                        text-[clamp(0.7rem,1vw,0.9rem)]
                                        leading-[1.5]
                                        text-white/80
                                    "
                                >
                                    {description}
                                </p>
                            )}

                            {/* Buttons */}
                            {(primaryText && primaryHref) ||
                                (secondaryText && secondaryHref) ? (
                                <div
                                    className="
                                        mt-5
                                        flex
                                        flex-wrap
                                        gap-2
                                    "
                                >
                                    {primaryText && primaryHref && (
                                        <Link
                                            href={primaryHref}
                                            className="
                                                inline-flex
                                                items-center
                                                gap-1.5
                                                rounded-lg
                                                bg-primary-400
                                                px-3.5
                                                py-2
                                                text-[clamp(0.65rem,0.8vw,0.8rem)]
                                                font-bold
                                                text-primary-950
                                                transition
                                                hover:bg-primary-300
                                            "
                                        >
                                            {primaryText}

                                            <ArrowRight className="size-[0.9rem]" />
                                        </Link>
                                    )}

                                    {secondaryText && secondaryHref && (
                                        <Link
                                            href={secondaryHref}
                                            className="
                                                inline-flex
                                                items-center
                                                gap-1.5
                                                rounded-lg
                                                border
                                                border-white/50
                                                bg-white/5
                                                px-3.5
                                                py-2
                                                text-[clamp(0.65rem,0.8vw,0.8rem)]
                                                font-semibold
                                                text-white
                                                transition
                                                hover:bg-white/10
                                            "
                                        >
                                            {secondaryText}

                                            <ArrowRight className="size-[0.9rem]" />
                                        </Link>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* Right image */}
                    <div
                        className="
                            relative
                            min-h-[12rem]
                            overflow-hidden
                            sm:min-h-[14rem]
                            lg:min-h-0
                        "
                    >
                        <Image
                            src={image}
                            alt={imageAlt || title}
                            fill
                            priority
                            sizes="(max-width: 64rem) 100vw, 55vw"
                            className="object-cover object-center"
                        />

                        {/* Main smooth transition */}
                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-y-0
                                left-0
                                hidden
                                w-[48%]
                                bg-gradient-to-r
                                from-primary-950
                                via-primary-950/90
                                to-transparent
                                lg:block
                            "
                        />

                        {/* Additional soft blend */}
                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-y-0
                                left-0
                                hidden
                                w-[30%]
                                bg-gradient-to-r
                                from-primary-950/45
                                to-transparent
                                lg:block
                            "
                        />

                        {/* Bottom image fade */}
                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-x-0
                                bottom-0
                                h-12
                                bg-gradient-to-t
                                from-black/20
                                to-transparent
                            "
                        />
                    </div>
                </div>

                {/* Slider dots */}
                {showDots && totalSlides > 1 && (
                    <div
                        className="
                            absolute
                            bottom-3
                            left-1/2
                            z-20
                            flex
                            -translate-x-1/2
                            items-center
                            gap-2
                            lg:left-[52%]
                        "
                    >
                        {Array.from({
                            length: totalSlides,
                        }).map((_, index) => (
                            <span
                                key={index}
                                className={`
                                    block
                                    rounded-full
                                    transition-all
                                    duration-200
                                    ${index === activeSlide
                                        ? "size-[0.6rem] bg-primary-400"
                                        : "size-[0.45rem] bg-white/80"
                                    }
                                `}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}