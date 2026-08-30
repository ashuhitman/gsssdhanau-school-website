import Image from "next/image";
import Link from "next/link";
import type { FacultyMember } from "@/lib/data/faculty";

import {
    ArrowRight,
    GraduationCap,
    Quote,
} from "lucide-react";

interface PrincipalProps {
    principal?: FacultyMember
}

export function FacultyPrincipal({ principal }: PrincipalProps) {


    if (!principal) {
        return null;
    }

    return (
        <section className="py-5 sm:py-6">
            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-[#fcf8f1]
                    shadow-school-card
                    dark:bg-card
                "
            >
                <div
                    className="
                        grid
                        min-h-[17rem]
                        lg:grid-cols-[38%_62%]
                        xl:min-h-[18rem]
                    "
                >
                    {/* ==================================================
                        Principal Image
                    ================================================== */}

                    <div
                        className="
                            relative
                            min-h-[17rem]
                            overflow-hidden
                            lg:min-h-[18rem]
                        "
                    >
                        <div
                            className="
                                absolute
                                inset-0
                                overflow-hidden
                                lg:[clip-path:polygon(0_0,84%_0,100%_50%,84%_100%,0_100%)]
                            "
                        >
                            <Image
                                src={
                                    principal.image ||
                                    "/images/faculty/principal.jpg"
                                }
                                alt={
                                    principal.imageAlt ??
                                    `${principal.name}, ${principal.designation}`
                                }
                                fill
                                priority
                                sizes="(max-width: 1023px) 100vw, 38vw"
                                className="object-cover"
                            />
                        </div>

                        {/* Desktop image gradient */}
                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-y-0
                                right-0
                                hidden
                                w-20
                                bg-gradient-to-r
                                from-transparent
                                via-[#fcf8f1]/50
                                to-[#fcf8f1]
                                lg:block
                            "
                        />

                        {/* Mobile designation */}
                        <div
                            className="
                                absolute
                                bottom-4
                                left-4
                                rounded-md
                                bg-primary-950
                                px-4
                                py-2
                                text-xs
                                font-bold
                                uppercase
                                tracking-wide
                                text-white
                                lg:hidden
                            "
                        >
                            {
                                principal.designation
                            }
                        </div>
                    </div>

                    {/* ==================================================
                        Principal Content
                    ================================================== */}

                    <div
                        className="
                            relative
                            flex
                            min-w-0
                            flex-col
                            justify-center
                            px-5
                            py-6
                            sm:px-7
                            sm:py-7
                            lg:-ml-7
                            lg:px-7
                            lg:py-7
                            xl:-ml-8
                            xl:px-9
                        "
                    >
                        <div className="relative z-10">
                            {/* Heading */}

                            <p
                                className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wide
                                    text-accent-600
                                    dark:text-accent-400
                                    sm:text-sm
                                "
                            >
                                Principal&apos;s
                                Message
                            </p>

                            <div className="mt-2 flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                                <span className="h-0.5 w-5 bg-accent-500" />
                                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                            </div>

                            {/* ==================================================
                                Message
                            ================================================== */}

                            {principal.message && (
                                <div className="mt-4 flex gap-3 sm:mt-5">
                                    <Quote
                                        className="
                                            mt-0.5
                                            size-6
                                            shrink-0
                                            fill-accent-500
                                            text-accent-500
                                            sm:size-7
                                        "
                                        strokeWidth={
                                            1.5
                                        }
                                    />

                                    <p
                                        className="
                                            max-w-[43rem]
                                            text-xs
                                            leading-5
                                            text-foreground/80
                                            sm:text-sm
                                            sm:leading-6
                                        "
                                    >
                                        {
                                            principal.message
                                        }
                                    </p>
                                </div>
                            )}

                            {/* ==================================================
                                Principal Details
                            ================================================== */}

                            <div
                                className="
                                    mt-5
                                    flex
                                    flex-col
                                    gap-4
                                    sm:mt-6
                                    sm:flex-row
                                    sm:items-end
                                    sm:justify-between
                                    sm:gap-6
                                "
                            >
                                <div className="min-w-0">
                                    {/* Name */}

                                    <div className="flex items-center gap-2">
                                        <span
                                            className="
                                                font-serif
                                                text-2xl
                                                italic
                                                leading-none
                                                text-primary-800
                                                dark:text-primary-400
                                            "
                                        >
                                            S
                                        </span>

                                        <div className="min-w-0">
                                            <h3
                                                className="
                                                    whitespace-nowrap
                                                    text-sm
                                                    font-bold
                                                    text-primary-950
                                                    dark:text-white
                                                    sm:text-base
                                                "
                                            >
                                                {
                                                    principal.name
                                                }
                                            </h3>

                                            <p
                                                className="
                                                    mt-0.5
                                                    text-[0.65rem]
                                                    text-muted-foreground
                                                    sm:text-xs
                                                "
                                            >
                                                {
                                                    principal.designation
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {/* ==================================================
                                        Qualifications
                                    ================================================== */}

                                    {principal
                                        .qualifications
                                        .length >
                                        0 && (
                                            <div
                                                className="
                                                mt-2
                                                flex
                                                items-center
                                                gap-2
                                                pl-7
                                                text-[0.65rem]
                                                text-muted-foreground
                                            "
                                            >
                                                <GraduationCap
                                                    className="
                                                    size-3.5
                                                    shrink-0
                                                    text-primary-600
                                                    dark:text-primary-400
                                                "
                                                    strokeWidth={
                                                        1.8
                                                    }
                                                />

                                                <div className="flex items-center">
                                                    {principal.qualifications.map(
                                                        (
                                                            qualification,
                                                            index
                                                        ) => (
                                                            <span
                                                                key={`${qualification}-${index}`}
                                                                className={
                                                                    index >
                                                                        0
                                                                        ? "ml-2 border-l border-border pl-2"
                                                                        : ""
                                                                }
                                                            >
                                                                {
                                                                    qualification
                                                                }
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                    {/* School */}

                                    <p
                                        className="
                                            mt-1
                                            pl-7
                                            text-[0.6rem]
                                            text-muted-foreground
                                            sm:text-[0.65rem]
                                        "
                                    >
                                        PM SHRI Govt.
                                        Senior Secondary
                                        School, Dhanau
                                    </p>
                                </div>

                                {/* ==================================================
                                    Profile Button
                                ================================================== */}

                                <Link
                                    href="/faculty/principal"
                                    className="
                                        group
                                        inline-flex
                                        shrink-0
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-lg
                                        bg-primary-950
                                        px-5
                                        py-2.5
                                        text-xs
                                        font-semibold
                                        text-white
                                        transition-all
                                        duration-200
                                        hover:-translate-y-0.5
                                        hover:bg-primary-900
                                        hover:shadow-md
                                        dark:bg-primary-800
                                        dark:hover:bg-primary-700
                                        sm:text-sm
                                    "
                                >
                                    Read Full Profile

                                    <ArrowRight
                                        className="
                                            size-4
                                            transition-transform
                                            duration-200
                                            group-hover:translate-x-1
                                        "
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}