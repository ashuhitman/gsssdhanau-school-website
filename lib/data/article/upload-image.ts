import {
    storage,
    APPWRITE_BUCKET_ID,
} from "@/lib/appwrite/server";

export async function uploadArticleImage(
    file: File
): Promise<string> {
    const uploadedFile =
        await storage.createFile({
            bucketId:
                APPWRITE_BUCKET_ID,

            fileId: "unique()",

            file,
        });

    return uploadedFile.$id;
}

export async function deleteArticleImage(
    fileId: string
): Promise<void> {
    await storage.deleteFile({
        bucketId:
            APPWRITE_BUCKET_ID,

        fileId,
    });
}