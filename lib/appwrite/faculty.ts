import { Query } from "node-appwrite";

import {
    tablesDB,
    storage,
    DATABASE_ID,
    FACULTIES_TABLE_ID,
    APPWRITE_BUCKET_ID,
} from "@/lib/appwrite/server";

/* ============================================================
   Faculty Categories
   ============================================================ */

export type FacultyCategory =
    | "principal"
    | "lecturer"
    | "teacher"
    | "computer-anudeshak"
    | "lab-attendant"
    | "udc"
    | "vt"
    | "fourth-grade"
    | "panchayat-shikshak"
    | "other";

/* ============================================================
   Gender
   ============================================================ */

export type FacultyGender =
    | "male"
    | "female";

/* ============================================================
   Status
   ============================================================ */

export type FacultyStatus =
    | "draft"
    | "published";

/* ============================================================
   Faculty Member
   ============================================================ */

export interface FacultyMember {
    id: string;

    employeeId: string;

    name: string;

    gender: FacultyGender;

    designation: string;

    category: FacultyCategory;

    subjects: string[];

    qualifications: string[];

    /*
     * Final image URL.
     *
     * Appwrite Storage image if profileImage
     * exists.
     *
     * Otherwise:
     *
     * male:
     * /images/faculty/default-male.jpg
     *
     * female:
     * /images/faculty/default-female.jpg
     *
     * principal:
     * /images/faculty/principal.jpg
     */
    image: string;

    imageAlt: string;

    bio: string;

    message?: string;

    displayOrder: number;

    email: string;

    phone: string;

    firstJoiningDate?: string;

    currentPostJoiningDate?: string;

    currentSchoolJoiningDate?: string;

    status: FacultyStatus;
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
   Get Appwrite Storage Image
   ============================================================ */

export function getImageUrl(
    fileId: unknown,
    gender: FacultyGender,
    category: FacultyCategory
): string {
    /*
     * If File ID exists,
     * use Appwrite Storage.
     */
    if (
        fileId !== null &&
        fileId !== undefined
    ) {
        const id = String(
            fileId
        ).trim();

        if (id) {
            try {
                return storage
                    .getFileView({
                        bucketId:
                            APPWRITE_BUCKET_ID,

                        fileId: id,
                    })
                    .toString();
            } catch {
                /*
                 * If Appwrite File ID is invalid,
                 * fall back to default image.
                 */
            }
        }
    }

    /*
     * Principal default image.
     */
    if (
        category === "principal"
    ) {
        return DEFAULT_PRINCIPAL_IMAGE;
    }

    /*
     * Female default image.
     */
    if (gender === "female") {
        return DEFAULT_FEMALE_IMAGE;
    }

    /*
     * Male default image.
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

    const gender: FacultyGender =
        row.gender === "female"
            ? "female"
            : "male";

    const category =
        isFacultyCategory(
            row.category
        )
            ? row.category
            : "other";

    const profileImage =
        row.profileImage;

    return {
        id: row.$id,

        employeeId: String(
            row.employeeId ?? ""
        ),

        name,

        gender,

        designation: String(
            row.designation ?? ""
        ),

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

        image: getImageUrl(
            profileImage,
            gender,
            category
        ),

        imageAlt: `${name}, ${String(
            row.designation ?? ""
        )}`,

        bio: String(
            row.bio ?? ""
        ),

        message:
            row.message !==
                null &&
                row.message !==
                undefined
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
   Category Validation
   ============================================================ */

function isFacultyCategory(
    value: unknown
): value is FacultyCategory {
    return (
        value === "principal" ||
        value === "lecturer" ||
        value === "teacher" ||
        value ===
        "computer-anudeshak" ||
        value ===
        "lab-attendant" ||
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

                Query.limit(100),
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
    } catch {
        return null;
    }
}

/* ============================================================
   Get Faculty By Category
   ============================================================ */

export async function getFacultyByCategory(
    category: FacultyCategory
): Promise<FacultyMember[]> {
    const response =
        await tablesDB.listRows({
            databaseId:
                DATABASE_ID,

            tableId:
                FACULTIES_TABLE_ID,

            queries: [
                Query.equal(
                    "category",
                    category
                ),

                Query.equal(
                    "status",
                    "published"
                ),

                Query.orderAsc(
                    "displayOrder"
                ),

                Query.limit(100),
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