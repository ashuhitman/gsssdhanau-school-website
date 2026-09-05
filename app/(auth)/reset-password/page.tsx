import Link from "next/link";

import ResetPasswordForm from "./ResetPasswordForm";

interface ResetPasswordPageProps {
    searchParams: Promise<{
        userId?: string;
        secret?: string;
    }>;
}

export default async function ResetPasswordPage({
    searchParams,
}: ResetPasswordPageProps) {
    const { userId, secret } = await searchParams;

    const hasRecoveryParams = Boolean(userId && secret);

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
                                    d="M7 10V8a5 5 0 0 1 10 0v2"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />

                                <rect
                                    x="4"
                                    y="10"
                                    width="16"
                                    height="10"
                                    rx="2"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                />

                                <path
                                    d="M12 14v2"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <h1 className="text-heading text-2xl font-bold">
                            Reset password
                        </h1>

                        <p className="text-muted mt-2 text-sm">
                            Create a new password for your account.
                        </p>
                    </div>

                    {hasRecoveryParams ? (
                        <ResetPasswordForm
                            userId={userId!}
                            secret={secret!}
                        />
                    ) : (
                        <div
                            role="alert"
                            className="border-error/30 bg-error-soft text-error rounded-[0.625rem] border px-3 py-2.5 text-sm"
                        >
                            This password reset link is invalid or
                            incomplete.
                        </div>
                    )}

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