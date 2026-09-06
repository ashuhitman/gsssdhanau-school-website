import Image from "next/image";

import { getCurrentUser } from "@/lib/data/auth/authorization";

export default async function AdminHero() {
    const user = await getCurrentUser();

    const today = new Date();

    const date = today.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <section className="relative overflow-hidden bg-admin-page">
            <div className="relative flex min-h-[9rem] items-center px-4 py-4 sm:min-h-[10rem] sm:px-6 lg:min-h-[10.5rem] lg:px-8">
                {/* Hero image */}
                <div className="pointer-events-none absolute inset-0">
                    <Image
                        src="/images/admin/admin-hero.jpeg"
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />

                    {/* Left: solid background → gradual image reveal */}
                    <div
                        className="
                            absolute
                            inset-y-0
                            left-0
                            w-[42%]
                            bg-gradient-to-r
                            from-admin-page
                            from-0%
                            via-admin-page
                            via-45%
                            to-transparent
                        "
                    />

                    {/* Right: gradual image fade → solid background */}
                    <div
                        className="
                            absolute
                            inset-y-0
                            right-0
                            w-[42%]
                            bg-gradient-to-l
                            from-admin-page
                            from-0%
                            via-admin-page
                            via-45%
                            to-transparent
                        "
                    />

                    {/* Top transition */}
                    <div
                        className="
                            absolute
                            inset-x-0
                            top-0
                            h-[15%]
                            bg-gradient-to-b
                            from-admin-page/40
                            to-transparent
                        "
                    />

                    {/* Bottom transition */}
                    <div
                        className="
                            absolute
                            inset-x-0
                            bottom-0
                            h-[15%]
                            bg-gradient-to-t
                            from-admin-page/40
                            to-transparent
                        "
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 flex w-full items-center">
                    {/* Left content */}
                    <div className="min-w-0 max-w-[20rem] sm:max-w-[25rem] lg:max-w-[32rem]">
                        <p className="text-admin-muted text-[0.6875rem] font-medium sm:text-xs lg:text-sm">
                            Good morning,
                        </p>

                        <h1 className="text-admin-heading mt-0.5 text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
                            {user?.name || "Admin"}!{" "}
                            <span aria-hidden="true">👋</span>
                        </h1>

                        <p className="text-admin-muted mt-1 max-w-[25rem] text-[0.625rem] leading-4 sm:text-xs sm:leading-5 lg:text-sm">
                            Here’s what’s happening at PM SHRI GSSS Dhanau
                            today.
                        </p>
                    </div>

                    {/* Right content */}
                    <div className="ml-auto hidden w-[11rem] shrink-0 text-right sm:block lg:w-[13rem]">
                        <p className="text-admin-muted text-[0.625rem] font-medium lg:text-xs">
                            {date}
                        </p>

                        <p className="text-admin-heading mt-1.5 font-serif text-xs italic leading-4 lg:text-sm lg:leading-5">
                            “Discipline
                            <br />
                            Knowledge
                            <br />
                            Character”
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}