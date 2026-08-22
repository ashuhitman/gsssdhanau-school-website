import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { getPrincipal } from "@/lib/data/primcipal";



export async function PrincipalMessage() {
    const principal = await getPrincipal();

    return (
        <section>
            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    bg-primary-950
                    py-5
                    shadow-school-card
                    sm:py-6
                "
            >
                <div
                    className="
                        flex
                        flex-col
                        lg:grid
                        lg:grid-cols-[auto_1fr]
                        lg:items-center
                    "
                >
                    {/* Principal */}
                    <div
                        className="
                            order-1
                            flex
                            items-center
                            justify-start
                            border-b
                            border-white/15
                            px-5
                            pb-5
                            lg:order-1
                            lg:border-b-0
                            lg:border-r
                            lg:px-7
                            lg:pb-0
                        "
                    >
                        <div className="flex min-w-0 items-center gap-4">
                            {/* Principal Image */}
                            <div
                                className="
                                    relative
                                    size-[4.5rem]
                                    shrink-0
                                    overflow-hidden
                                    rounded-full
                                    border-2
                                    border-white/80
                                    bg-white
                                    sm:size-20
                                "
                            >
                                <Image
                                    src={principal.image}
                                    alt={principal.imageAlt}
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                />
                            </div>

                            {/* Principal Details */}
                            <div className="min-w-0">
                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-accent-400
                                    "
                                >
                                    {principal.designation}
                                </p>

                                <h2
                                    className="
                                        mt-0.5
                                        overflow-hidden
                                        text-ellipsis
                                        whitespace-nowrap
                                        text-lg
                                        font-bold
                                        text-white
                                        sm:text-xl
                                    "
                                >
                                    {principal.name}
                                </h2>

                                {/* Qualifications */}
                                <div
                                    className="
                                        mt-1.5
                                        flex
                                        min-w-0
                                        items-center
                                        gap-2
                                        text-xs
                                        text-white/70
                                        sm:text-sm
                                    "
                                >
                                    <GraduationCap
                                        className="
                                            size-3.5
                                            shrink-0
                                            text-accent-400
                                            sm:size-4
                                        "
                                        strokeWidth={1.8}
                                    />

                                    <div className="flex min-w-0 items-center">
                                        {principal.qualification.map(
                                            (qualification, index) => (
                                                <span
                                                    key={qualification}
                                                    className={`
                                                        whitespace-nowrap
                                                        ${index > 0
                                                            ? "ml-2 border-l border-white/25 pl-2"
                                                            : ""
                                                        }
                                                    `}
                                                >
                                                    {qualification}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Principal Message */}
                    <div
                        className="
                            order-2
                            relative
                            min-w-0
                            px-5
                            pt-5
                            lg:order-2
                            lg:px-7
                            lg:pt-0
                        "
                    >
                        {/* Quote */}
                        <span
                            className="
                                absolute
                                left-5
                                top-3
                                font-serif
                                text-4xl
                                font-bold
                                leading-none
                                text-accent-400
                                lg:left-7
                                lg:top-[-8px]
                            "
                        >
                            “
                        </span>

                        <p
                            className="
                                pl-4
                                text-xs
                                leading-5
                                text-white/80
                                sm:text-sm
                                sm:leading-6
                            "
                        >
                            {principal.message}
                        </p>

                        <div className="mt-3 h-0.5 w-10 bg-accent-500" />
                    </div>
                </div>
            </div>
        </section>
    );
}