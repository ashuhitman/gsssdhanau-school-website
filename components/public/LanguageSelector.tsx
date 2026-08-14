"use client";

import { ChevronDown, Globe2 } from "lucide-react";
import { useState } from "react";

const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "mr", label: "मारवाड़ी" },
];

export function LanguageSelector() {
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState("en");

    const currentLanguage =
        languages.find((item) => item.code === language) ??
        languages[0];

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-haspopup="menu"
                className="flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-white"
            >
                <Globe2 className="size-3.5" />

                <span>{currentLanguage.code.toUpperCase()}</span>

                <ChevronDown
                    className={`size-3 transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <>
                    <button
                        type="button"
                        aria-label="Close language menu"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setOpen(false)}
                    />

                    <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-lg border border-border bg-card p-1 shadow-lg">
                        {languages.map((item) => (
                            <button
                                key={item.code}
                                type="button"
                                onClick={() => {
                                    setLanguage(item.code);
                                    setOpen(false);
                                }}
                                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs font-semibold transition-colors ${language === item.code
                                        ? "bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-200"
                                        : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
                                    }`}
                            >
                                <span>{item.label}</span>

                                <span className="text-[10px] uppercase opacity-60">
                                    {item.code}
                                </span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}