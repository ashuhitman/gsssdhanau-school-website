import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/data/auth/session";

export default async function AdminDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-surface">
            {children}
        </div>
    );
}