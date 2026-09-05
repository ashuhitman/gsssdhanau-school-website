"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/lib/data/auth/login";

export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setLoading(true);

        const result = await login(email, password);

        if (!result.success) {
            setError(result.error ?? "Unable to sign in.");
            setLoading(false);
            return;
        }

        router.push("/admin");
        router.refresh();
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
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
                            Admin Login
                        </h1>

                        <p className="text-muted mt-2 text-sm">
                            Sign in to manage the school website.
                        </p>
                    </div>

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
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                                autoComplete="email"
                                placeholder="admin@example.com"
                                className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 w-full rounded-[0.625rem] border px-3 py-2.5 text-sm outline-none transition focus:ring-2"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="text-heading mb-2 block text-sm font-medium"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                required
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                className="border-default bg-surface text-heading placeholder:text-muted focus:border-primary focus:ring-primary/20 w-full rounded-[0.625rem] border px-3 py-2.5 text-sm outline-none transition focus:ring-2"
                            />
                        </div>

                        {error && (
                            <div className="border-default bg-primary-soft text-primary rounded-[0.625rem] border px-3 py-2.5 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-primary-foreground hover:bg-primary-hover disabled:bg-muted w-full rounded-[0.625rem] px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>
                </div>

                <p className="text-muted mt-6 text-center text-xs">
                    School Website Administration
                </p>
            </div>
        </div>
    );
}