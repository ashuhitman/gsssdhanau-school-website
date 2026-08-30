
import { PublicFooter } from "@/components/common/PublicFooter";
import { PublicHeader } from "@/components/common/PublicHeader";


export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <PublicHeader subtitle="Newsletter Club" />

            <main>{children}</main>

            <PublicFooter />
        </div>
    );
}