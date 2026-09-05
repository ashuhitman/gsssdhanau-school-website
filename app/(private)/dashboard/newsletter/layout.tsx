import { requireRole } from "@/lib/data/auth/authorization";
import { USER_ROLE } from "@/lib/data/auth/constants";

export default async function NewsletterLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await requireRole([
        USER_ROLE.NEWSLETTER_INCHARGE,
        USER_ROLE.STUDENT,
    ]);

    return <>{children}</>;
}