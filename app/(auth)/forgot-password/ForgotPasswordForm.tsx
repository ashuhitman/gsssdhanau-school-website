"use client";

import { useState } from "react";

import { forgotPassword } from "@/lib/data/auth/forgot-password";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");
        setSuccess(false);
        setLoading(true);

        const result = await forgotPassword(email);

        if (!result.success) {
            setError(
                result.error ??
                "Unable to send the password reset link."
            );
            setLoading(false);
            return;
        }

        setSuccess(true);
        setLoading(false);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div>
                <label
                    htmlFor="email"
                    className="text-heading mb-2 block text-sm font-medium"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setError("");
                        setSuccess(false);
                    }}
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 w-full rounded-[0.625rem] border px-3 py-2.5 text-sm outline-none transition focus:ring-2"
                />
            </div>

            <div className="min-h-10">
                {error && (
                    <div
                        role="alert"
                        className="border-error/30 bg-error-soft text-error rounded-[0.625rem] border px-3 py-2.5 text-sm"
                    >
                        {error}
                    </div>
                )}

                {success && (
                    <div
                        role="status"
                        className="border-primary/20 bg-primary-soft text-primary rounded-[0.625rem] border px-3 py-2.5 text-sm"
                    >
                        If an account exists with this email, a password
                        reset link has been sent.
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="relative flex h-12 w-full items-center justify-center gap-2 rounded-[0.625rem] bg-accent px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-accent-hover disabled:cursor-wait disabled:opacity-80"
            >
                {loading ? (
                    <>
                        <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="9"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="opacity-30"
                            />

                            <path
                                d="M21 12a9 9 0 0 0-9-9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>

                        <span>Sending...</span>
                    </>
                ) : (
                    <span>Send Reset Link</span>
                )}
            </button>
        </form>
    );
}