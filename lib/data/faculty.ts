import { Query } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    FACULTIES_TABLE_ID,
    APPWRITE_BUCKET_ID,
} from "@/lib/appwrite/server";

/* ============================================================
   Faculty Category
   ============================================================ */

export type FacultyCategory =
    | "principal"
    | "lecturer"
    | "teacher"
    | "bci"
    | "lab-attendant"
    | "udc"
    | "vt"
    | "fourth-grade"
    | "panchayat-shikshak"
    | "other";

/* ============================================================
   Faculty Member
   ============================================================ */

export interface FacultyMember {
    id: string;

    employeeId: string;

    name: string;

    gender: "male" | "female";

    designation: string;

    category: FacultyCategory;

    subjects: string[];

    qualifications: string[];

    /*
     * Always contains a usable image URL.
     *
     * Appwrite image if profileImage exists.
     * Otherwise appropriate default image.
     */
    image: string;

    imageAlt?: string;

    bio: string;

    message?: string;

    displayOrder: number;

    email: string;

    phone: string;

    firstJoiningDate?: string;

    currentPostJoiningDate?: string;

    currentSchoolJoiningDate?: string;

    status: "draft" | "published";

    prefix?: string;
}

/* ============================================================
   Default Images
   ============================================================ */

const DEFAULT_MALE_IMAGE =
    "/images/faculty/default-male.jpg";

const DEFAULT_FEMALE_IMAGE =
    "/images/faculty/default-female.jpg";

const DEFAULT_PRINCIPAL_IMAGE =
    "/images/faculty/principal.jpg";

/* ============================================================
   Appwrite Image URL
   ============================================================ */

/*
 * profileImage contains the Appwrite Storage File ID.
 *
 * This function does NOT call storage.getFileView().
 *
 * getFileView() is asynchronous in your Appwrite SDK,
 * so instead we construct the Storage view URL directly.
 */
export function getImageUrl(
    fileId: string | null | undefined
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
            APPWRITE_BUCKET_ID
        )}` +
        `/files/${encodeURIComponent(
            id
        )}` +
        `/view?project=${encodeURIComponent(
            projectId
        )}`
    );
}

/* ============================================================
   Default Image
   ============================================================ */

function getDefaultImage(
    gender: "male" | "female",
    category: FacultyCategory
): string {
    /*
     * Principal
     */
    if (
        category === "principal"
    ) {
        return DEFAULT_PRINCIPAL_IMAGE;
    }

    /*
     * Female
     */
    if (gender === "female") {
        return DEFAULT_FEMALE_IMAGE;
    }

    /*
     * Male
     */
    return DEFAULT_MALE_IMAGE;
}

/* ============================================================
   Map Appwrite Row
   ============================================================ */

function mapFacultyRow(
    row: Record<string, unknown> & {
        $id: string;
    }
): FacultyMember {
    const name = String(
        row.name ?? ""
    );

    const designation = String(
        row.designation ?? ""
    );

    /*
     * Gender
     */
    const gender: "male" | "female" =
        row.gender === "female"
            ? "female"
            : "male";

    /*
     * Category
     */
    const category =
        isFacultyCategory(
            row.category
        )
            ? row.category
            : "other";

    /*
     * Appwrite Storage File ID
     */
    const profileImage =
        row.profileImage
            ? String(
                row.profileImage
            ).trim()
            : null;

    /*
     * Try Appwrite image first.
     *
     * If there is no File ID,
     * use the appropriate default image.
     */
    const image =
        getImageUrl(
            profileImage
        ) ??
        getDefaultImage(
            gender,
            category
        );

    return {
        id: row.$id,

        employeeId: String(
            row.employeeId ?? ""
        ),

        name,

        gender,

        designation,

        category,

        subjects:
            Array.isArray(
                row.subjects
            )
                ? row.subjects.map(
                    String
                )
                : [],

        qualifications:
            Array.isArray(
                row.qualifications
            )
                ? row.qualifications.map(
                    String
                )
                : [],

        /*
         * Always a valid string now.
         *
         * Client does NOT need to
         * provide another fallback.
         */
        image,

        imageAlt:
            `${name}, ${designation}`,

        bio: String(
            row.bio ?? ""
        ),

        message:
            row.message !==
                null &&
                row.message !==
                undefined &&
                String(
                    row.message
                ).trim()
                ? String(
                    row.message
                )
                : undefined,

        displayOrder: Number(
            row.displayOrder ?? 0
        ),

        email: String(
            row.email ?? ""
        ),

        phone: String(
            row.phone ?? ""
        ),

        firstJoiningDate:
            row.firstJoiningDate
                ? String(
                    row.firstJoiningDate
                )
                : undefined,

        currentPostJoiningDate:
            row.currentPostJoiningDate
                ? String(
                    row.currentPostJoiningDate
                )
                : undefined,

        currentSchoolJoiningDate:
            row.currentSchoolJoiningDate
                ? String(
                    row.currentSchoolJoiningDate
                )
                : undefined,

        status:
            row.status ===
                "published"
                ? "published"
                : "draft",
    };
}

/* ============================================================
   Validate Faculty Category
   ============================================================ */

function isFacultyCategory(
    value: unknown
): value is FacultyCategory {
    return (
        value === "principal" ||
        value === "lecturer" ||
        value === "teacher" ||
        value === "bci" ||
        value === "lab-attendant" ||
        value === "udc" ||
        value === "vt" ||
        value ===
        "fourth-grade" ||
        value ===
        "panchayat-shikshak" ||
        value === "other"
    );
}

/* ============================================================
   Get All Published Faculty
   ============================================================ */

export async function getFaculty(): Promise<
    FacultyMember[]
> {
    const response =
        await tablesDB.listRows({
            databaseId:
                DATABASE_ID,

            tableId:
                FACULTIES_TABLE_ID,

            queries: [
                Query.equal(
                    "status",
                    "published"
                ),

                Query.orderAsc(
                    "displayOrder"
                ),
            ],
        });

    return response.rows.map(
        (row) =>
            mapFacultyRow(
                row as Record<
                    string,
                    unknown
                > & {
                    $id: string;
                }
            )
    );
}

/* ============================================================
   Get Principal
   ============================================================ */

export async function getPrincipal(): Promise<
    FacultyMember | null
> {
    const response =
        await tablesDB.listRows({
            databaseId:
                DATABASE_ID,

            tableId:
                FACULTIES_TABLE_ID,

            queries: [
                Query.equal(
                    "category",
                    "principal"
                ),

                Query.equal(
                    "status",
                    "published"
                ),

                Query.orderAsc(
                    "displayOrder"
                ),

                Query.limit(1),
            ],
        });

    if (
        response.rows.length === 0
    ) {
        return null;
    }

    return mapFacultyRow(
        response.rows[0] as Record<
            string,
            unknown
        > & {
            $id: string;
        }
    );
}

/* ============================================================
   Get Faculty By ID
   ============================================================ */

export async function getFacultyById(
    id: string
): Promise<FacultyMember | null> {
    try {
        const row =
            await tablesDB.getRow({
                databaseId:
                    DATABASE_ID,

                tableId:
                    FACULTIES_TABLE_ID,

                rowId: id,
            });

        if (
            row.status !==
            "published"
        ) {
            return null;
        }

        return mapFacultyRow(
            row as Record<
                string,
                unknown
            > & {
                $id: string;
            }
        );
    } catch (error) {
        console.error(
            "Failed to get faculty:",
            error
        );

        return null;
    }
}