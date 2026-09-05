"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { resetPassword } from "@/lib/data/auth/reset-password";

interface ResetPasswordFormProps {
    userId: string;
    secret: string;
}

export default function ResetPasswordForm({
    userId,
    secret,
}: ResetPasswordFormProps) {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        const result = await resetPassword(
            userId,
            secret,
            password
        );

        if (!result.success) {
            setError(
                result.error ??
                "Unable to reset your password."
            );
            setLoading(false);
            return;
        }

        router.push("/login");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {/* New Password */}
            <div>
                <label
                    htmlFor="password"
                    className="text-heading mb-2 block text-sm font-medium"
                >
                    New password
                </label>

                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                        setError("");
                    }}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="Enter new password"
                    className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 w-full rounded-[0.625rem] border px-3 py-2.5 text-sm outline-none transition focus:ring-2"
                />
            </div>

            {/* Confirm Password */}
            <div>
                <label
                    htmlFor="confirm-password"
                    className="text-heading mb-2 block text-sm font-medium"
                >
                    Confirm password
                </label>

                <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        setError("");
                    }}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="Confirm new password"
                    className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 w-full rounded-[0.625rem] border px-3 py-2.5 text-sm outline-none transition focus:ring-2"
                />
            </div>

            {/* Error */}
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

            {/* Reset Button */}
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
                    <span>Reset Password</span>

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

                    <span>Resetting...</span>
                </span>
            </button>
        </form>
    );
}