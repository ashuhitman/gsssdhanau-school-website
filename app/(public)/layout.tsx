import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <PublicHeader />

            <main>{children}</main>

            <PublicFooter />
        </div>
    );
}