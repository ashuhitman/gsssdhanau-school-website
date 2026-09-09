export type ParsedAppwriteError = {
    message: string;
    code?: number;
    type?: string;
};

export function parseAppwriteError(
    error: unknown,
): ParsedAppwriteError {
    if (isAppwriteError(error)) {
        return {
            message: getAppwriteErrorMessage(error),
            code: error.code,
            type: error.type,
        };
    }

    if (error instanceof Error) {
        if (isNetworkError(error)) {
            return {
                message:
                    "No internet connection. Please check your connection and try again.",
            };
        }

        return {
            message:
                error.message || "An unexpected error occurred.",
        };
    }

    if (typeof error === "string") {
        return {
            message: error,
        };
    }

    if (
        typeof error === "object" &&
        error !== null
    ) {
        const value =
            error as Record<string, unknown>;

        if (typeof value.message === "string") {
            if (isNetworkMessage(value.message)) {
                return {
                    message:
                        "No internet connection. Please check your connection and try again.",
                };
            }

            return {
                message: value.message,
                code:
                    typeof value.code === "number"
                        ? value.code
                        : undefined,
                type:
                    typeof value.type === "string"
                        ? value.type
                        : undefined,
            };
        }
    }

    return {
        message: "An unexpected error occurred.",
    };
}

function isAppwriteError(
    error: unknown,
): error is {
    message: string;
    code?: number;
    type?: string;
} {
    if (
        typeof error !== "object" ||
        error === null
    ) {
        return false;
    }

    const value =
        error as Record<string, unknown>;

    return (
        typeof value.message === "string" &&
        (typeof value.code === "number" ||
            typeof value.type === "string")
    );
}

function isNetworkError(
    error: Error,
): boolean {
    return (
        error.name === "TypeError" &&
        isNetworkMessage(error.message)
    );
}

function isNetworkMessage(
    message: string,
): boolean {
    const normalizedMessage =
        message.toLowerCase();

    return (
        normalizedMessage.includes(
            "failed to fetch",
        ) ||
        normalizedMessage.includes(
            "fetch failed",
        ) ||
        normalizedMessage.includes(
            "networkerror",
        ) ||
        normalizedMessage.includes(
            "network error",
        ) ||
        normalizedMessage.includes(
            "network request failed",
        ) ||
        normalizedMessage.includes(
            "connection refused",
        ) ||
        normalizedMessage.includes(
            "connection reset",
        ) ||
        normalizedMessage.includes(
            "connection aborted",
        ) ||
        normalizedMessage.includes(
            "internet disconnected",
        )
    );
}

function getAppwriteErrorMessage(
    error: {
        message: string;
        code?: number;
        type?: string;
    },
): string {
    switch (error.code) {
        case 400:
            return "The request contains invalid data.";

        case 401:
            return "You are not authorized to perform this action.";

        case 403:
            return "You do not have permission to perform this action.";

        case 404:
            return "The requested resource was not found.";

        case 409:
            return "This resource already exists.";

        case 429:
            return "Too many requests. Please try again later.";

        case 500:
        case 502:
        case 503:
        case 504:
            return "Appwrite is temporarily unavailable. Please try again later.";

        default:
            return (
                error.message ||
                "An Appwrite error occurred."
            );
    }
}