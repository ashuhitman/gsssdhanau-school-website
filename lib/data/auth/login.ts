"use server";

import { cookies } from "next/headers";
import { createAdminAccountClient, SESSION_COOKIE } from "@/lib/appwrite/server";

export interface LoginResult {
    success: boolean;
    error?: string;
}

export async function login(
    email: string,
    password: string
): Promise<LoginResult> {
    try {
        const account = createAdminAccountClient();

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
        };
    } catch (error) {
        console.error("Admin login failed:", error);

        return {
            success: false,
            error: "Invalid email or password.",
        };
    }
}