import { Home, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
            <div className="mx-auto max-w-lg text-center">
                <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                    <SearchX
                        className="size-10"
                        strokeWidth={1.6}
                    />
                </div>

                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-600">
                    Page Not Found
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    This page doesn't exist
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                    The page you are looking for  is currently under development.
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                    <Home className="size-4" />
                    Back to Home
                </Link>
            </div>
        </main>
    );
}