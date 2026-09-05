import { redirect } from "next/navigation";

import {
    getCurrentUser,
} from "@/lib/data/auth/authorization";
import { USER_ROLE } from "@/lib/data/auth/constants";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    switch (user.role) {
        case USER_ROLE.ADMIN:
            redirect("/dashboard/admin");

        case USER_ROLE.FACULTY:
            redirect("/dashboard/faculty");

        case USER_ROLE.NEWSLETTER_INCHARGE:
        case USER_ROLE.STUDENT:
            redirect("/dashboard/newsletter");

        default:
            redirect("/login");
    }
}