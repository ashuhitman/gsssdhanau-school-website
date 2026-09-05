import { requireRole } from "@/lib/data/auth/authorization";
import { USER_ROLE } from "@/lib/data/auth/constants";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await requireRole([USER_ROLE.ADMIN]);

    return <>{children}</>;
}