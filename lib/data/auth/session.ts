import { cookies } from "next/headers";

import {
    createAccountClient,
    SESSION_COOKIE,
} from "@/lib/appwrite/server";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE)?.value;

    if (!session) {
        return null;
    }

    try {
        const account = createAccountClient(session);

        return await account.get();
    } catch {
        return null;
    }
}