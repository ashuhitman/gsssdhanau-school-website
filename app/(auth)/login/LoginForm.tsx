"use client";

import { useState } from "react";

import { login } from "@/lib/data/auth/login";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");
        setLoading(true);

        const result = await login(email, password);

        if (!result.success) {
            setError(result.error ?? "Unable to sign in.");
            setLoading(false);
        }
    }

    return (
        <main className="bg-surface flex min-h-screen items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md">
                <div className="bg-card border-default rounded-[1rem] border p-6 shadow-sm sm:p-8">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="bg-primary-soft text-primary mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-7 w-7"
                                aria-hidden="true"
                            >
                                <path
                                    d="M12 3 4 6v5c0 5.1 3.4 8.8 8 10 4.6-1.2 8-4.9 8-10V6l-8-3Z"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="m9 12 2 2 4-4"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <h1 className="text-heading text-2xl font-bold">
                            Sign in
                        </h1>

                        <p className="text-muted mt-2 text-sm">
                            Sign in to access your dashboard.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* Email */}
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
                                }}
                                required
                                autoComplete="email"
                                placeholder="Enter your email"
                                className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 w-full rounded-[0.625rem] border px-3 py-2.5 text-sm outline-none transition focus:ring-2"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="text-heading mb-2 block text-sm font-medium"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(
                                            event.target.value
                                        );
                                        setError("");
                                    }}
                                    required
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 w-full rounded-[0.625rem] border py-2.5 pl-3 pr-11 text-sm outline-none transition focus:ring-2"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (current) => !current
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    className="text-muted hover:text-heading absolute inset-y-0 right-0 flex w-11 items-center justify-center transition-colors"
                                >
                                    {showPassword ? (
                                        /* Eye off */
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M3 3l18 18"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                            />

                                            <path
                                                d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                            />

                                            <path
                                                d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5.2 0 8.5 4.1 9.5 7-.4 1.2-1.2 2.5-2.4 3.7M6.2 6.2C4.4 7.5 3.3 9.4 2.5 12c1 2.9 4.3 7 9.5 7 1.3 0 2.5-.3 3.6-.8"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    ) : (
                                        /* Eye */
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M2.5 12s3.2-6 9.5-6 9.5 6 9.5 6-3.2 6-9.5 6-9.5-6-9.5-6Z"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />

                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="2.5"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Reserved error space */}
                        <div className="min-h-10">
                            {error && (
                                <div
                                    role="alert"
                                    className="border-error/30 bg-error-soft text-error rounded-[0.625rem] border px-3 py-2.5 text-sm"
                                >
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-[0.625rem] bg-accent px-4 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-accent-hover disabled:cursor-wait disabled:opacity-80"
                        >
                            {/* Normal state */}
                            <span
                                className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-150 ${loading
                                        ? "opacity-0"
                                        : "opacity-100"
                                    }`}
                            >
                                <span>
                                    Continue to Dashboard
                                </span>

                                <svg
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M4 10h11"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                    />

                                    <path
                                        d="m11 6 4 4-4 4"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>

                            {/* Loading state */}
                            <span
                                className={`absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-150 ${loading
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                            >
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

                                <span>Signing in...</span>
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}