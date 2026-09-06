"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/lib/data/auth/authorization";
import { USER_ROLE } from "@/lib/data/auth/constants";
import { deleteArticle } from "@/lib/data/article/delete";

export async function deleteArticleAction(
    id: string
): Promise<void> {
    await requireRole([USER_ROLE.ADMIN]);

    const articleId = id.trim();

    if (!articleId) {
        throw new Error("Invalid article ID.");
    }

    await deleteArticle(articleId);

    revalidatePath("/dashboard/admin/articles");
    revalidatePath("/articles");
}