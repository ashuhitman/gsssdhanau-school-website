import { cookies } from "next/headers";

import {
    createAccountClient,
    SESSION_COOKIE,
} from "@/lib/appwrite/server";

export async function getSession(): Promise<string | null> {
    const cookieStore = await cookies();

    return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function getCurrentAccount() {
    const session = await getSession();

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