"use server";

import { revalidatePath } from "next/cache";

import {
    createArticle,
    type CreateArticleData,
} from "@/lib/data/article/create";
import { deleteArticle } from "@/lib/data/article/delete";
import {
    deleteArticleImage,
    uploadArticleImage,
} from "@/lib/data/article/upload-image";
import { parseAppwriteError } from "@/lib/appwrite/errors";
import type { ArticleImage } from "@/lib/data/article/types";
import { ARTICLE_IMAGE_TYPE, ArticleCategory, ArticleImageType, ArticleStatus, ArticleTag } from "@/lib/data/article/constants";
import { USER_ROLE } from "@/lib/data/auth/constants";
import { requireRole } from "@/lib/data/auth/authorization";
import { updateArticle, UpdateArticleData } from "@/lib/data/article/update";

async function cleanupUploadedImage(fileId: string | null) {
    if (!fileId) {
        return true;
    }

    try {
        await deleteArticleImage(fileId);
        return true;
    } catch (error) {
        const parsedError = parseAppwriteError(error);

        if (parsedError.code === 404) {
            return true;
        }

        console.error("Failed to clean up article image:", parsedError);

        return false;
    }
}
export async function createArticleAction(
    data: CreateArticleData,
    file?: File | null,
) {
    let uploadedFileId: string | null = null;

    try {
        let image: ArticleImage | null = null;

        if (data.image?.type === "appwrite") {
            if (!file || !(file instanceof File) || file.size === 0) {
                return {
                    success: false,
                    message: "Please select an image to upload.",
                };
            }

            try {
                uploadedFileId = await uploadArticleImage(file);

                image = {
                    value: uploadedFileId,
                    type: "appwrite",
                    fileId: uploadedFileId,
                };
            } catch (error) {
                console.error("Article image upload failed:", error);

                const parsedError = parseAppwriteError(error);

                return {
                    success: false,
                    message: parsedError.message,
                };
            }
        }

        if (data.image?.type === "url") {
            const imageUrl = data.image.value?.trim();

            if (!imageUrl) {
                return {
                    success: false,
                    message: "Please provide an image URL.",
                };
            }

            image = {
                value: imageUrl,
                type: "url",
                fileId: null,
            };
        }

        if (!data.image) {
            image = null;
        }

        const article = await createArticle({
            ...data,
            image,
        });

        revalidatePath("/dashboard/admin/articles");


        if (article.slug) {
            revalidatePath(`/articles/${article.slug}`);
        }

        return {
            success: true,
            message: "Article created successfully.",
        };
    } catch (error) {
        console.error("Article creation failed:", error);

        await cleanupUploadedImage(uploadedFileId);

        const parsedError = parseAppwriteError(error);

        return {
            success: false,
            message: parsedError.message,
        };
    }
}

export async function deleteArticleAction(
    articleId: string,
    image?: ArticleImage | null,
    slug?: string | null,
) {
    const cleanArticleId = articleId.trim();

    if (!cleanArticleId) {
        return {
            success: false,
            message: "Article ID is required.",
        };
    }

    try {
        if (image?.type === "appwrite" && image.fileId?.trim()) {
            const imageDeleted = await cleanupUploadedImage(
                image.fileId.trim(),
            );

            if (!imageDeleted) {
                return {
                    success: false,
                    message:
                        "The article image could not be deleted. The article was not deleted.",
                };
            }
        }

        await deleteArticle(cleanArticleId);

        revalidatePath("/dashboard/admin/articles");

        if (slug?.trim()) {
            revalidatePath(`/articles/${slug.trim()}`);
        }

        return {
            success: true,
            message: "Article deleted successfully.",
        };
    } catch (error) {
        console.error("Article deletion failed:", error);

        const parsedError = parseAppwriteError(error);

        return {
            success: false,
            message: parsedError.message,
        };
    }
}


// update article action

export interface UpdateArticleActionData {
    fields: Partial<{
        title: string;
        slug: string;
        excerpt: string | null;
        content: string | null;
        authorBy: string | null;
        featured: boolean;
        status: ArticleStatus;
        publishedAt: string | null;
        publishedBy: string | null;
        category: ArticleCategory | null;
        articleTags: ArticleTag[] | null;
    }>;

    image?:
    | {
        type: "replace-appwrite";
        file: File;
        oldFileId: string | null;
    }
    | {
        type: "replace-url";
        url: string;
        oldFileId: string | null;
    }
    | {
        type: "remove";
        oldFileId: string | null;
    };
}

export async function updateArticleAction(
    articleId: string,
    data: UpdateArticleActionData,
) {
    const cleanArticleId = articleId.trim();

    if (!cleanArticleId) {
        return {
            success: false,
            message: "Article ID is required.",
        };
    }

    let uploadedFileId: string | null = null;

    try {
        let updateData: UpdateArticleData = {
            ...data.fields,
        };

        let oldFileId: string | null = null;

        if (data.image?.type === "replace-appwrite") {
            if (
                !(data.image.file instanceof File) ||
                data.image.file.size === 0
            ) {
                return {
                    success: false,
                    message: "Please select an image to upload.",
                };
            }

            uploadedFileId = await uploadArticleImage(data.image.file);

            updateData = {
                ...updateData,
                image: uploadedFileId,
                imageType: ARTICLE_IMAGE_TYPE.APPWRITE,
            };

            oldFileId = data.image.oldFileId;
        }

        if (data.image?.type === "replace-url") {
            const imageUrl = data.image.url.trim();

            if (!imageUrl) {
                return {
                    success: false,
                    message: "Please provide an image URL.",
                };
            }

            updateData = {
                ...updateData,
                image: imageUrl,
                imageType: ARTICLE_IMAGE_TYPE.URL,
            };

            oldFileId = data.image.oldFileId;
        }

        if (data.image?.type === "remove") {
            updateData = {
                ...updateData,
                image: null,
                imageType: null,
            };

            oldFileId = data.image.oldFileId;
        }

        await updateArticle(cleanArticleId, updateData);

        // Delete the old Appwrite image only after
        // the article update succeeds.
        if (oldFileId) {
            const deleted = await cleanupUploadedImage(oldFileId);

            if (!deleted) {
                console.error(
                    `Article ${cleanArticleId} was updated, but the old image ${oldFileId} could not be deleted.`,
                );
            }
        }

        revalidatePath("/dashboard/admin/articles");

        if (data.fields.slug?.trim()) {
            revalidatePath(
                `/articles/${data.fields.slug.trim()}`,
            );
        }

        return {
            success: true,
            message: "Article updated successfully.",
        };
    } catch (error) {
        console.error(
            "Article update failed:",
            error,
        );

        // If we uploaded a new Appwrite image but
        // the database update failed, remove it.
        if (uploadedFileId) {
            await cleanupUploadedImage(uploadedFileId);
        }

        const parsedError = parseAppwriteError(error);

        return {
            success: false,
            message: parsedError.message,
        };
    }
}