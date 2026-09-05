import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/data/auth/session";
import LoginForm from "./LoginForm";


export default async function AdminLoginPage() {
    const user = await getCurrentUser();

    if (user) {
        redirect("/admin");
    }

    return (
        <main className="min-h-screen bg-surface">
            <LoginForm />
        </main>
    );
}