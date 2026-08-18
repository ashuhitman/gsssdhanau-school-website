"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

interface TransitionLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
}

export default function TransitionLink({
    href,
    children,
    className,
}: TransitionLinkProps) {
    const router = useRouter();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        event.preventDefault();

        if (
            typeof document !== "undefined" &&
            "startViewTransition" in document
        ) {
            document.startViewTransition(() => {
                router.push(href);
            });
        } else {
            router.push(href);
        }
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={className}
        >
            {children}
        </Link>
    );
}