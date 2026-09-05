import { requireUser } from "@/lib/data/auth/authorization";

import DashboardShell from "./DashboardShell";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await requireUser();

    return (
        <DashboardShell user={user}>
            {children}
        </DashboardShell>
    );
}