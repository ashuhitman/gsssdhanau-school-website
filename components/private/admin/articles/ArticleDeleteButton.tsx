"use client";

import { deleteArticleAction } from "@/app/(private)/dashboard/admin/articles/actions";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";



interface ArticleDeleteButtonProps {
    articleId: string;
    articleTitle: string;
}

export default function ArticleDeleteButton({
    articleId,
    articleTitle,
}: ArticleDeleteButtonProps) {
    const [pending, startTransition] = useTransition();

    function handleDelete() {
        const confirmed = window.confirm(
            `Delete "${articleTitle}"? This action cannot be undone.`
        );

        if (!confirmed) {
            return;
        }

        startTransition(async () => {
            await deleteArticleAction(articleId);
        });
    }

    return (
        <button
            type="button"
            disabled={pending}
            onClick={handleDelete}
            aria-label={`Delete ${articleTitle}`}
            className="admin-icon-button text-admin-danger"
        >
            <Trash2
                className={`h-4 w-4 ${pending ? "animate-pulse" : ""
                    }`}
            />
        </button>
    );
}