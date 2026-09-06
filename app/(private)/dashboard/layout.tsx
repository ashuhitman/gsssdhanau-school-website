import DashboardShell from "@/components/private/DashboardShell";
import { requireUser } from "@/lib/data/auth/authorization";



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