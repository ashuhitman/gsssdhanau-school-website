import { BookOpen } from "lucide-react";

interface NewsletterEndPageProps {

    issueNumber: number;

    compact?: boolean;

}

export function NewsletterEndPage({

    issueNumber,

    compact = false,

}: NewsletterEndPageProps) {

    return (

        <div

            className="
                 relative rounded-[0.25rem] shadow-[0_0.5rem_1.25rem_rgba(0,0,0,0.14),0_0.15rem_0.35rem_rgba(0,0,0,0.08)]
                relative

                flex

                w-full

                aspect-[1/1.414]

                items-center

                justify-center

                overflow-hidden

                bg-blue-950

                text-center

                text-white

                [container-type:size]

            "

        >

            <div

                className={`

                    w-full

                    ${compact ? "px-5" : "px-8 sm:px-14"}

                `}

            >

                <BookOpen

                    className={`

                        mx-auto

                        text-amber-400

                        ${compact ? "size-5" : "size-7"}

                    `}

                />



                <p

                    className={`

                        font-bold

                        uppercase

                        tracking-[0.25em]

                        text-amber-400

                        ${compact

                            ? "mt-4 text-[7px]"

                            : "mt-6 text-[10px]"

                        }

                    `}

                >

                    End of Issue

                </p>



                <h2

                    className={`

                        font-serif

                        font-bold

                        ${compact

                            ? "mt-2 text-xl"

                            : "mt-4 text-3xl"

                        }

                    `}

                >

                    Thank You

                </h2>



                {!compact && (

                    <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/60">

                        Thank you for reading our school newsletter

                        and celebrating the stories and achievements

                        of our school community.

                    </p>

                )}



                <p

                    className={`

                        text-white/40

                        ${compact

                            ? "mt-4 text-[7px]"

                            : "mt-8 text-[10px]"

                        }

                    `}

                >

                    Issue #{String(issueNumber).padStart(2, "0")}

                </p>

            </div>

        </div>

    );

}