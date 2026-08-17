import { Mail, Send, ShieldCheck } from "lucide-react";

interface NewsletterSubscribeProps {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonLabel?: string;
}

export default function NewsletterSubscribe({
    title = "Subscribe to Our Newsletter",
    description = "Get the latest school news, events and important announcements straight to your inbox.",
    placeholder = "Enter your email address",
    buttonLabel = "Subscribe",
}: NewsletterSubscribeProps) {
    return (
        <section
            className="
                rounded-2xl
                border
                border-default
                bg-primary-soft
                p-5
                shadow-school-card

                sm:p-6

                md:p-8

                lg:p-9
            "
        >
            <div
                className="
                    grid
                    grid-cols-1
                    items-center
                    gap-8

                    lg:grid-cols-[1fr_auto]
                    lg:gap-12
                "
            >
                {/* =====================================================
                    CONTENT
                ====================================================== */}

                <div>
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
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                icon-bg-primary
                                icon-primary
                            "
                        >
                            <Mail size={21} />
                        </div>

                        <h2
                            className="
                                text-[clamp(1.25rem,2vw,1.7rem)]
                                font-bold
                                leading-tight
                                text-heading
                            "
                        >
                            {title}
                        </h2>
                    </div>

                    <p
                        className="
                            mt-3
                            max-w-[38rem]
                            text-sm
                            leading-6
                            text-body

                            sm:text-base
                        "
                    >
                        {description}
                    </p>

                    {/* =================================================
                        FORM
                    ================================================== */}

                    <form
                        className="
                            mt-5
                            flex
                            flex-col
                            gap-2

                            sm:flex-row
                            sm:max-w-[34rem]
                        "
                    >
                        <label
                            htmlFor="newsletter-email"
                            className="sr-only"
                        >
                            Email address
                        </label>

                        <input
                            id="newsletter-email"
                            name="email"
                            type="email"
                            required
                            placeholder={placeholder}
                            className="
                                min-h-11
                                w-full
                                rounded-lg
                                border
                                border-default
                                bg-card
                                px-4
                                text-sm
                                text-body
                                outline-none
                                placeholder:text-muted
                                transition-colors

                                focus:border-primary
                                focus:ring-2
                                focus:ring-primary-soft
                            "
                        />

                        <button
                            type="submit"
                            className="
                                inline-flex
                                min-h-11
                                shrink-0
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                bg-primary
                                px-5
                                py-2
                                text-sm
                                font-semibold
                                text-white
                                shadow-school-button
                                transition-all

                                hover:bg-primary-hover
                            "
                        >
                            <span>{buttonLabel}</span>

                            <Send size={16} />
                        </button>
                    </form>

                    {/* =================================================
                        PRIVACY
                    ================================================== */}

                    <div
                        className="
                            mt-3
                            flex
                            items-center
                            gap-2
                            text-xs
                            text-muted
                        "
                    >
                        <ShieldCheck
                            size={14}
                            className="shrink-0 text-primary"
                        />

                        <span>
                            We respect your privacy. Unsubscribe at any
                            time.
                        </span>
                    </div>
                </div>

                {/* =====================================================
                    DECORATIVE ILLUSTRATION
                ====================================================== */}

                <div
                    aria-hidden="true"
                    className="
                        hidden
                        items-center
                        justify-center

                        lg:flex
                    "
                >
                    <div
                        className="
                            relative
                            flex
                            h-40
                            w-52
                            items-center
                            justify-center
                        "
                    >
                        {/* Envelope */}

                        <div
                            className="
                                relative
                                flex
                                h-24
                                w-36
                                items-center
                                justify-center
                                rounded-xl
                                bg-card
                                shadow-school-card
                            "
                        >
                            <Mail
                                size={52}
                                strokeWidth={1.4}
                                className="text-primary"
                            />

                            <span
                                className="
                                    absolute
                                    -right-4
                                    -top-5
                                    text-4xl
                                    font-bold
                                    text-accent
                                "
                            >
                                @
                            </span>
                        </div>

                        {/* Decorative circle */}

                        <span
                            className="
                                absolute
                                left-3
                                top-2
                                h-8
                                w-8
                                rounded-full
                                border
                                border-primary
                                opacity-30
                            "
                        />

                        {/* Decorative accent */}

                        <span
                            className="
                                absolute
                                bottom-3
                                right-1
                                h-6
                                w-6
                                rounded-full
                                bg-accent-soft
                            "
                        />

                        {/* Decorative paper */}

                        <div
                            className="
                                absolute
                                right-1
                                top-4
                                -z-10
                                h-12
                                w-16
                                rotate-12
                                rounded-md
                                bg-primary
                                opacity-10
                            "
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}