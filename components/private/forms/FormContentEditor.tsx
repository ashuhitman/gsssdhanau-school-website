"use client";

import {
    type TextareaHTMLAttributes,
} from "react";

interface FormContentEditorProps
    extends Omit<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        "onChange"
    > {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export default function FormContentEditor({
    label,
    value,
    onChange,
    className,
    ...textareaProps
}: FormContentEditorProps) {
    return (
        <div className="min-w-0">
            <div
                className="
                    overflow-hidden
                    rounded-[0.5rem]
                    border
                    border-admin
                    bg-admin-card
                "
            >
                <label
                    htmlFor="content-editor"
                    className="
                        block
                        border-b
                        border-admin
                        bg-admin-surface
                        px-3
                        py-2
                        text-sm
                        font-medium
                        text-admin-heading
                        sm:px-4
                    "
                >
                    {label}
                </label>

                <textarea
                    {...textareaProps}
                    id="content-editor"
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    className={[
                        "block",
                        "min-h-[20rem]",
                        "w-full",
                        "min-w-0",

                        // Allow user to increase/decrease height
                        "resize-y",

                        "border-0",
                        "bg-admin-card",
                        "px-3",
                        "py-3",
                        "text-sm",
                        "leading-7",
                        "text-admin-heading",
                        "outline-none",
                        "placeholder:text-admin-muted",
                        "focus:ring-0",

                        "sm:min-h-60",
                        "sm:px-4",
                        "sm:py-4",

                        className ?? "",
                    ].join(" ")}
                />
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        border-t
                        border-admin
                        px-3
                        py-2
                        text-[0.6875rem]
                        text-admin-muted
                        sm:px-4
                    "
                >
                    <span>
                        Plain text
                    </span>

                    <span>
                        {value.length} characters
                    </span>
                </div>
            </div>
        </div>
    );
}