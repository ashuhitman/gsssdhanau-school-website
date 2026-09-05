"use server";

import { account } from "@/lib/appwrite/server";

export interface ResetPasswordResult {
    success: boolean;
    error?: string;
}

export async function resetPassword(
    userId: string,
    secret: string,
    password: string
): Promise<ResetPasswordResult> {
    try {
        await account.updateRecovery({
            userId,
            secret,
            password,
        });

        return {
            success: true,
        };
    } catch (error) {
        console.error("Password reset failed:", error);

        return {
            success: false,
            error: "Unable to reset your password. The reset link may have expired.",
        };
    }
}