"use client";

import { Edit2, Eye, Trash2 } from "lucide-react";
import RowActions from "@/components/private/ui/RowActions";
import type { Article } from "@/lib/data/article/types";

interface ArticleActionsProps {
    article: Article;
}

export default function ArticleActions({
    article,
}: ArticleActionsProps) {
    return (
        <RowActions
            actions={[
                {
                    label: "View",
                    icon: Eye,
                    href: `/articles/${article.slug}`,
                    external: true,
                },
                {
                    label: "Edit",
                    icon: Edit2,
                    href: `/dashboard/admin/articles/${article.id}/edit`,
                },
                {
                    label: "Delete",
                    icon: Trash2,
                    variant: "danger",
                    onClick: () => {
                        // delete dialog logic
                    },
                },
            ]}
        />
    );
}