"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import DeleteDialog from "@/components/private/ui/DeleteDialog";
import RowActions from "@/components/private/ui/RowActions";

import { deleteArticleAction } from "@/app/(private)/dashboard/admin/articles/actions";
import type { Article } from "@/lib/data/article/types";

interface ArticleActionsProps {
    article: Article;
}

export default function ArticleActions({
    article,
}: ArticleActionsProps) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    function handleDelete() {
        startTransition(async () => {
            try {
                await deleteArticleAction(article.id);
                setDeleteOpen(false);
            } catch (error) {
                console.error(
                    "Failed to delete article:",
                    error
                );
            }
        });
    }

    return (
        <>
            <RowActions
                ariaLabel={`More actions for ${article.title}`}
                actions={[
                    {
                        label: "View",
                        icon: Eye,
                        href: `/articles/${article.slug}`,
                        external: true,
                    },
                    {
                        label: "Edit",
                        icon: Pencil,
                        href: `/dashboard/admin/articles/${article.id}/edit`,
                    },
                    {
                        label: "Delete",
                        icon: Trash2,
                        variant: "danger",
                        onClick: () => {
                            setDeleteOpen(true);
                        },
                    },
                ]}
            />

            <DeleteDialog
                open={deleteOpen}
                title="Delete article?"
                description="Are you sure you want to delete this article? This action cannot be undone."
                itemName={article.title}
                onConfirm={handleDelete}
                onCancel={() => {
                    if (!isPending) {
                        setDeleteOpen(false);
                    }
                }}
                loading={isPending}
            />
        </>
    );
}