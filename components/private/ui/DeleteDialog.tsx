"use client";

import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteDialogProps {
    open: boolean;
    title?: string;
    description?: string;
    itemName?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteDialog({
    open,
    title = "Delete item?",
    description = "This action cannot be undone.",
    itemName,
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
    loading = false,
    onConfirm,
    onCancel,
}: DeleteDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-5 md:p-6">
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close dialog"
                onClick={onCancel}
                className="absolute inset-0 bg-black/40 backdrop-blur-[0.125rem]"
            />

            {/* Dialog */}
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
                className="
                    relative z-10 w-full max-w-md overflow-hidden
                    rounded-[0.75rem] border border-admin
                    bg-admin-card shadow-admin-card-hover
                "
            >
                {/* Header */}
                <div
                    className="
                        flex items-start gap-3 p-4
                        sm:gap-3.5 sm:p-5
                        md:gap-4
                    "
                >
                    {/* Warning Icon */}
                    <div
                        className="
                            flex h-9 w-9 shrink-0 items-center justify-center
                            rounded-full bg-admin-stat-rose-soft
                            sm:h-10 sm:w-10
                        "
                    >
                        <AlertTriangle
                            className="
                                h-4 w-4 text-admin-danger
                                sm:h-5 sm:w-5
                            "
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        {/* Title */}
                        <h2
                            id="delete-dialog-title"
                            className="
                                break-words text-[0.9375rem]
                                font-semibold leading-snug
                                text-admin-heading
                                sm:text-base
                                md:text-[1.0625rem]
                                lg:text-lg
                            "
                        >
                            {title}
                        </h2>

                        {/* Description */}
                        <p
                            id="delete-dialog-description"
                            className="
                                mt-1 break-words
                                text-[0.8125rem] leading-relaxed
                                text-admin-muted
                                sm:text-sm
                                md:text-[0.9375rem]
                            "
                        >
                            {description}
                        </p>

                        {/* Item Name */}
                        {itemName && (
                            <p
                                className="
                                    mt-2 break-words
                                    rounded-[0.4rem]
                                    bg-admin-surface
                                    px-3 py-2
                                    text-[0.8125rem]
                                    font-medium leading-relaxed
                                    text-admin-heading
                                    sm:text-sm
                                    md:text-[0.9375rem]
                                "
                            >
                                {itemName}
                            </p>
                        )}
                    </div>

                    {/* Close */}
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        aria-label="Close dialog"
                        className="
                            flex h-7 w-7 shrink-0 items-center justify-center
                            rounded-[0.4rem]
                            text-admin-muted
                            transition-colors
                            hover:bg-admin-surface-hover
                            hover:text-admin-heading
                            disabled:pointer-events-none
                            disabled:opacity-50
                            sm:h-8 sm:w-8
                        "
                    >
                        <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                </div>

                {/* Actions */}
                <div
                    className="
                        flex flex-col-reverse gap-2
                        border-t border-admin p-4
                        sm:flex-row sm:justify-end sm:p-5
                        md:gap-2.5
                    "
                >
                    {/* Cancel */}
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="
                            admin-button-soft
                            w-full rounded-[0.45rem]
                            px-4 py-2.5
                            text-[0.8125rem]
                            font-medium leading-normal
                            disabled:pointer-events-none
                            disabled:opacity-50
                            sm:w-auto sm:text-sm
                            md:text-[0.9375rem]
                        "
                    >
                        {cancelLabel}
                    </button>

                    {/* Confirm */}
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="
                            inline-flex w-full items-center justify-center
                            gap-2 rounded-[0.45rem]
                            bg-admin-danger
                            px-4 py-2.5
                            text-[0.8125rem]
                            font-semibold leading-normal
                            text-white
                            transition-colors
                            hover:opacity-90
                            disabled:pointer-events-none
                            disabled:opacity-50
                            sm:w-auto sm:text-sm
                            md:text-[0.9375rem]
                        "
                    >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

                        <span>
                            {loading ? "Deleting..." : confirmLabel}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}