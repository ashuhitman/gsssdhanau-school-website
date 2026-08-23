import { NextRequest, NextResponse } from "next/server";

import { getFaculty } from "@/lib/appwrite/faculty";

export async function GET(
    request: NextRequest
) {
    try {
        const category =
            request.nextUrl.searchParams.get(
                "category"
            ) as
            | "principal"
            | "lecturer"
            | "teacher"
            | "bci"
            | "lab-attendant"
            | "udc"
            | "vt"
            | "other"
            | null;

        const faculty =
            await getFaculty(

            );

        return NextResponse.json({
            success: true,
            data: faculty,
        });
    } catch (error) {
        console.error(
            "Faculty API error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch faculty.",
            },
            { status: 500 }
        );
    }
}