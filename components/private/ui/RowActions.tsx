"use client";

import { MoreVertical, type LucideIcon } from "lucide-react";
import { useState } from "react";

import Action, { ActionProps } from "./Action";



interface RowActionsProps {
    actions: ActionProps[];
    ariaLabel?: string;
}

export default function RowActions({
    actions,
    ariaLabel = "More actions",
}: RowActionsProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="relative flex items-center justify-end">
            {/* sm and larger */}
            <div className="hidden items-center justify-end gap-1.5 sm:flex">
                {actions.map((action) => (
                    <Action
                        key={action.label}
                        label={action.label}
                        icon={action.icon}
                        href={action.href}
                        onClick={action.onClick}
                        variant={action.variant}
                        external={action.external}
                    />
                ))}
            </div>

            {/* Mobile */}
            <div className="relative sm:hidden">
                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={ariaLabel}
                    aria-expanded={menuOpen}
                    className="
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-[0.4rem]
                        text-admin-muted
                        transition-colors
                        hover:bg-admin-surface-hover
                        hover:text-admin-heading
                    "
                >
                    <MoreVertical className="h-5 w-5" />
                </button>

                {menuOpen && (
                    <>
                        {/* Outside click */}
                        <button
                            type="button"
                            aria-label="Close actions menu"
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 z-30 cursor-default"
                        />

                        {/* Mobile actions */}
                        <div
                            className="
                                absolute
                                right-full
                                top-1/2
                                z-40
                                w-32
                                overflow-hidden
                                rounded-[0.5rem]
                                border border-admin
                                bg-admin-card
                                p-1.5
                                shadow-admin-card-hover
                            "
                        >
                            <div className="flex flex-col gap-0.5">
                                {actions.map((action) => (
                                    <Action
                                        key={action.label}
                                        label={action.label}
                                        icon={action.icon}
                                        href={action.href}
                                        onClick={() => {
                                            setMenuOpen(false);
                                            action.onClick?.();
                                        }}
                                        variant={action.variant}
                                        external={action.external}

                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}