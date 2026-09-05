"use server";

import { cookies } from "next/headers";

import {
    account,
    SESSION_COOKIE,
} from "@/lib/appwrite/server";

export interface LoginResult {
    success: boolean;
    error?: string;
    message?: string;
}

export async function login(
    email: string,
    password: string
): Promise<LoginResult> {
    try {
        const session = await account.createEmailPasswordSession({
            email,
            password,
        });

        const cookieStore = await cookies();

        cookieStore.set(SESSION_COOKIE, session.secret, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: new Date(session.expire),
            path: "/",
        });

        return {
            success: true,
            message: "Login successful.",
        };
    } catch (error) {
        console.error("Login failed:", error);

        return {
            success: false,
            error: "Invalid email or password.",
        };
    }
}