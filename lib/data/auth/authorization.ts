import { redirect } from "next/navigation";

import { USER_ROLE, type UserRole } from "./constants";
import type { AuthUser } from "./types";
import { getCurrentAccount } from "./session";

function resolveRole(labels: string[]): UserRole | null {
    if (labels.includes(USER_ROLE.ADMIN)) {
        return USER_ROLE.ADMIN;
    }

    if (labels.includes(USER_ROLE.NEWSLETTER_INCHARGE)) {
        return USER_ROLE.NEWSLETTER_INCHARGE;
    }

    if (labels.includes(USER_ROLE.FACULTY)) {
        return USER_ROLE.FACULTY;
    }

    if (labels.includes(USER_ROLE.STUDENT)) {
        return USER_ROLE.STUDENT;
    }

    return null;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
    const account = await getCurrentAccount();

    if (!account) {
        return null;
    }

    const role = resolveRole(account.labels ?? []);

    if (!role) {
        return null;
    }

    return {
        id: account.$id,
        email: account.email,
        name: account.name,
        role,
    };
}

export async function requireUser(): Promise<AuthUser> {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return user;
}

export async function requireRole(
    allowedRoles: UserRole[]
): Promise<AuthUser> {
    const user = await requireUser();

    if (!allowedRoles.includes(user.role)) {
        redirect("/dashboard");
    }

    return user;
}