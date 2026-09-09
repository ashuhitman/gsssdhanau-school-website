"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import DeleteDialog from "@/components/private/ui/DeleteDialog";
import RowActions from "@/components/private/ui/RowActions";

import { deleteArticleAction } from "@/app/(private)/dashboard/admin/articles/actions";

import type { Article } from "@/lib/data/article/types";

import { useSnackbar } from "../../ui/Snackbar/SnackbarProvider";

interface ArticleActionsProps {
    article: Article;
}

export default function ArticleActions({
    article,
}: ArticleActionsProps) {
    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const [isPending, startTransition] =
        useTransition();

    const { showSnackbar } =
        useSnackbar();

    function handleDelete() {
        startTransition(async () => {
            try {
                const result =
                    await deleteArticleAction(
                        article.id,
                        article.image,
                        article.slug
                    );

                if (result.success) {
                    showSnackbar({
                        message:
                            result.message ||
                            "Article deleted successfully.",
                        type: "success",
                    });

                    setDeleteOpen(false);

                    return;
                }

                showSnackbar({
                    message:
                        result.message ||
                        "Failed to delete article.",
                    type: "error",
                });
            } catch (error) {
                console.error(
                    "Failed to delete article:",
                    error
                );

                showSnackbar({
                    message:
                        "Something went wrong while deleting the article.",
                    type: "error",
                });
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