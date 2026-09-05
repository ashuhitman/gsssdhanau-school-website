import Link from "next/link";

import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <main className="bg-surface flex min-h-screen items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md">
                <div className="bg-card border-default rounded-[1rem] border p-6 shadow-sm sm:p-8">
                    <div className="mb-8 text-center">
                        <div className="bg-primary-soft text-primary mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-7 w-7"
                                aria-hidden="true"
                            >
                                <path
                                    d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                />

                                <path
                                    d="m5 7 7 5 7-5"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <h1 className="text-heading text-2xl font-bold">
                            Forgot password?
                        </h1>

                        <p className="text-muted mt-2 text-sm">
                            Enter your email address and we’ll send you a
                            password reset link.
                        </p>
                    </div>

                    <ForgotPasswordForm />

                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
                        >
                            ← Back to sign in
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}