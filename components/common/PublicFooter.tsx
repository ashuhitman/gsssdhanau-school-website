import {
    Mail,
    MapPin,
    Phone,
    Sparkles,
} from "lucide-react";
import Link from "next/link";

import {
    siFacebook,
    siInstagram,
    siYoutube,
} from "simple-icons";

export function PublicFooter() {
    return (
        <footer className="border-t border-border bg-background">
            {/* Main footer */}
            <div className="bg-primary-50 dark:bg-primary-950">
                <div className="mx-auto max-w-[1450px] px-5 py-12 sm:px-8 lg:py-14">
                    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
                        {/* School identity */}
                        <div>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-4"
                            >
                                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-xl font-black text-primary-600 shadow-sm dark:bg-primary-900">
                                    G
                                </div>

                                <div>
                                    <h2 className="text-lg font-black tracking-tight text-primary-900 dark:text-primary-100">
                                        PM SHRI GSSS Dhanau
                                    </h2>

                                    <p className="mt-1 text-xs font-medium text-primary-700/70 dark:text-primary-300/70">
                                        Learning • Character • Excellence
                                    </p>
                                </div>
                            </Link>

                            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
                                PM SHRI Government Senior Secondary School,
                                Dhanau, Barmer, Rajasthan — committed to quality
                                education, strong values and the holistic
                                development of every student.
                            </p>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-sm font-black text-foreground">
                                Get in Touch
                            </h3>

                            <div className="mt-5 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-primary-500 shadow-sm dark:bg-primary-900">
                                        <MapPin className="size-4" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-foreground">
                                            School Address
                                        </p>

                                        <p className="mt-0.5 text-sm text-muted-foreground">
                                            Dhanau, Barmer, Rajasthan
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-primary-500 shadow-sm dark:bg-primary-900">
                                        <Phone className="size-4" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-foreground">
                                            Phone
                                        </p>

                                        <p className="mt-0.5 text-sm text-muted-foreground">
                                            01666-XXXXXX
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href="mailto:gsssdhanau@gmail.com"
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-primary-500 shadow-sm dark:bg-primary-900">
                                        <Mail className="size-4" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-foreground">
                                            Email
                                        </p>

                                        <p className="mt-0.5 text-sm text-muted-foreground">
                                            gsssdhanau@gmail.com
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Social */}
                        <div>
                            <h3 className="text-sm font-black text-foreground">
                                Connect With Us
                            </h3>

                            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
                                Follow our school activities, achievements and
                                important updates.
                            </p>

                            <div className="mt-5 flex gap-2.5">
                                <SocialLink
                                    href="#"
                                    label="Facebook"
                                    icon={siFacebook.path}
                                />

                                <SocialLink
                                    href="#"
                                    label="Instagram"
                                    icon={siInstagram.path}
                                />

                                <SocialLink
                                    href="#"
                                    label="YouTube"
                                    icon={siYoutube.path}
                                />
                            </div>

                            <div className="mt-6 rounded-xl border border-primary-100 bg-white/70 px-4 py-3 dark:border-primary-800 dark:bg-primary-900/50">
                                <p className="text-xs font-semibold text-primary-700 dark:text-primary-200">
                                    Learning • Character • Excellence
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-primary-600 text-white">
                <div className="mx-auto flex min-h-12 max-w-[1450px] flex-col items-center justify-center gap-2 px-5 py-3 text-xs sm:flex-row sm:justify-between sm:px-8">
                    <p className="text-white/80">
                        © {new Date().getFullYear()} PM SHRI GSSS Dhanau.
                        All Rights Reserved.
                    </p>

                    <p className="flex items-center gap-1.5 text-white/80">
                        <Sparkles className="size-3.5 text-amber-300" />

                        <span>Crafted by</span>

                        <span className="font-bold text-white">
                            Ashutosh Singh
                        </span>

                        <span className="text-white/40">•</span>

                        <span>Basic Computer Instructor</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({
    href,
    label,
    icon,
}: {
    href: string;
    label: string;
    icon: string;
}) {
    return (
        <a
            href={href}
            aria-label={label}
            title={label}
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-500 hover:bg-primary-500 hover:text-white"
        >
            <svg
                viewBox="0 0 24 24"
                className="size-[17px] fill-current"
                aria-hidden="true"
            >
                <path d={icon} />
            </svg>
        </a>
    );
}