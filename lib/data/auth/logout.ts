"use server";

import { cookies } from "next/headers";

import {
    createAccountClient,
    SESSION_COOKIE,
} from "@/lib/appwrite/server";

export async function logout() {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE)?.value;

    if (session) {
        try {
            const account = createAccountClient(session);
            await account.deleteSession({
                sessionId: "current",
            });
        } catch (error) {
            console.error("Admin logout failed:", error);
        }
    }

    cookieStore.delete(SESSION_COOKIE);
}