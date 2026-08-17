export function SocialLink({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            aria-label={label}
            title={label}
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-primary-400 hover:bg-primary-500 hover:text-white"
        >
            {children}
        </a>
    );
}