import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest
) {
    const url =
        request.nextUrl.searchParams.get(
            "url"
        );

    if (!url) {
        return new Response(
            "Missing attachment URL",
            {
                status: 400,
            }
        );
    }

    try {
        const parsedUrl =
            new URL(url);

        /*
         * Only allow Google Drive URLs.
         */
        const allowedHosts = [
            "drive.google.com",
            "docs.google.com",
        ];

        if (
            !allowedHosts.includes(
                parsedUrl.hostname
            )
        ) {
            return new Response(
                "Invalid attachment URL",
                {
                    status: 400,
                }
            );
        }

        const response =
            await fetch(url);

        if (!response.ok) {
            return new Response(
                "Unable to download attachment",
                {
                    status: response.status,
                }
            );
        }

        const contentType =
            response.headers.get(
                "content-type"
            ) ||
            "application/pdf";

        const contentLength =
            response.headers.get(
                "content-length"
            );

        const headers =
            new Headers();

        headers.set(
            "Content-Type",
            contentType
        );

        headers.set(
            "Content-Disposition",
            'attachment; filename="notice.pdf"'
        );

        if (contentLength) {
            headers.set(
                "Content-Length",
                contentLength
            );
        }

        return new Response(
            response.body,
            {
                status: 200,
                headers,
            }
        );
    } catch (error) {
        console.error(
            "Notice download failed:",
            error
        );

        return new Response(
            "Failed to download attachment",
            {
                status: 500,
            }
        );
    }
}