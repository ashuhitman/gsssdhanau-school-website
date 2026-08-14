import {
    Mail,
    MapPin,
    Sparkles,
} from "lucide-react";
import Link from "next/link";

import {
    siFacebook,
    siInstagram,
    siYoutube,
} from "simple-icons";
import { SocialLink } from "../shared/SocialLinks";

export function PublicFooter() {
    return (
        <footer className="border-t border-border bg-surface text-foreground">
            <div className="mx-auto max-w-[1450px] px-5 py-10 sm:px-8 lg:py-12">
                {/* Main footer */}
                <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
                    {/* School identity */}
                    <div>
                        <Link
                            href="/"
                            className="flex w-fit items-center gap-3"
                        >
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg font-black text-white shadow-sm">
                                G
                            </div>

                            <div>
                                <p className="text-base font-black tracking-tight">
                                    PM SHRI GSSS Dhanau
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Learning • Character • Excellence
                                </p>
                            </div>
                        </Link>

                        <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
                            PM SHRI Government Senior Secondary School,
                            Dhanau, Barmer, Rajasthan.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="text-sm font-bold">
                            Contact Us
                        </h2>

                        <div className="mt-5 space-y-4">
                            <div className="flex gap-3">
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                                    <MapPin className="size-4" />
                                </div>

                                <p className="pt-1 text-sm leading-5 text-muted-foreground">
                                    Dhanau, Barmer,
                                    <br />
                                    Rajasthan
                                </p>
                            </div>

                            <a
                                href="mailto:gsssdhanau@gmail.com"
                                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary-600"
                            >
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                                    <Mail className="size-4" />
                                </div>

                                <span className="break-all">
                                    gsssdhanau@gmail.com
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Social media */}
                    <div>
                        <h2 className="text-sm font-bold">
                            Follow Us
                        </h2>

                        <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                            Stay connected with school activities,
                            achievements and announcements.
                        </p>

                        <div className="mt-5 flex items-center gap-2">
                            <SocialLink
                                label="Facebook"
                                href="#"
                                icon={siFacebook.path}
                            />

                            <SocialLink
                                label="Instagram"
                                href="#"
                                icon={siInstagram.path}
                            />

                            <SocialLink
                                label="YouTube"
                                href="#"
                                icon={siYoutube.path}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row">
                    <p className="text-center sm:text-left">
                        © {new Date().getFullYear()} PM SHRI GSSS Dhanau.
                        All Rights Reserved.
                    </p>

                    <p className="flex flex-wrap items-center justify-center gap-1.5">
                        <Sparkles className="size-3.5 text-primary-500" />

                        <span>Crafted by</span>

                        <span className="font-bold tracking-wide text-primary-600 dark:text-primary-400">
                            Ashutosh Singh
                        </span>

                        <span className="text-muted-foreground/50">
                            •
                        </span>

                        <span>
                            Basic Computer Instructor
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

