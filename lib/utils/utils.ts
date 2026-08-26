export function titleCase(text: string): string {
    return text
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}


export function getImageUrl(
    fileId: string | null | undefined,
    bucketId: string
): string | null {
    if (!fileId) {
        return null;
    }

    const id = fileId.trim();

    if (!id) {
        return null;
    }

    const endpoint =
        process.env.APPWRITE_ENDPOINT;

    const projectId =
        process.env.APPWRITE_PROJECT_ID;

    if (!endpoint || !projectId) {
        console.error(
            "Missing Appwrite endpoint or project ID."
        );

        return null;
    }

    const cleanEndpoint =
        endpoint.replace(/\/$/, "");

    return (
        `${cleanEndpoint}` +
        `/storage/buckets/${encodeURIComponent(
            bucketId
        )}` +
        `/files/${encodeURIComponent(
            id
        )}` +
        `/view?project=${encodeURIComponent(
            projectId
        )}`
    );
}


export function formatDate(
    date: string | Date
): string {
    const parsedDate =
        date instanceof Date
            ? date
            : new Date(date);

    if (
        Number.isNaN(
            parsedDate.getTime()
        )
    ) {
        return "";
    }

    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    ).format(parsedDate);
}