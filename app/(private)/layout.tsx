import { requireUser } from "@/lib/data/auth/authorization";

export default async function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await requireUser();

    return <>{children}</>;
}