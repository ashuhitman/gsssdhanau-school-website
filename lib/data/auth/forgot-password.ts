"use server";

import { account } from "@/lib/appwrite/server";

export interface ForgotPasswordResult {
    success: boolean;
    error?: string;
}

export async function forgotPassword(
    email: string
): Promise<ForgotPasswordResult> {
    try {
        await account.createRecovery({
            email,
            url: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
        });

        return {
            success: true,
        };
    } catch (error) {
        console.error("Password recovery failed:", error);

        return {
            success: false,
            error: "Unable to send the password reset link.",
        };
    }
}