import { requireRole } from "@/lib/data/auth/authorization";
import { USER_ROLE } from "@/lib/data/auth/constants";

export default async function FacultyLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await requireRole([USER_ROLE.FACULTY]);

    return <>{children}</>;
}