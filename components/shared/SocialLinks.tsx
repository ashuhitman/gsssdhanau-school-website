export function SocialLink({
    href,
    label,
    icon,
}: {
    href: string;
    label: string;
    icon: string;
}) {
    return (
        <a
            href={href}
            aria-label={label}
            title={label}
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-400 hover:bg-primary-500 hover:text-white"
        >
            <svg
                viewBox="0 0 24 24"
                className="size-[17px] fill-current"
                aria-hidden="true"
            >
                <path d={icon} />
            </svg>
        </a>
    );
}