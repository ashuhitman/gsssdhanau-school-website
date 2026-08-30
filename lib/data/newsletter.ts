import { Query } from "node-appwrite";

import {
    tablesDB,
    DATABASE_ID,
    NEWSLETTERS_TABLE_ID,
    NEWSLETTER_MEMBERS_TABLE_ID,
} from "@/lib/appwrite/server";

import { getArticles } from "./article";
import { getActivities } from "./activity";
import { getFacultyById } from "./faculty";

/* ============================================================
   TYPES
============================================================ */

export type NewsletterClubMember = {
    id: string;
    name: string;
    role: string;
    memberType: "student" | "teacher";
    className?: string;
    image: string | null;
    sortOrder: number;
};

/* ============================================================
   NEWSLETTER PAGE
============================================================ */

export type NewsletterPage = {
    pageNumber: number;

    type:
    | "cover"
    | "contents"
    | "intro"
    | "activities"
    | "articles"
    | "gallery"
    | "club"
    | "end";

    title: string;

    /*
     * Used for identifying the exact activity/article
     * represented by this page.
     */
    contentId?: string;
};

/* ============================================================
   NEWSLETTER SUMMARY
   Used by /newsletters
============================================================ */

export type NewsletterSummary = {
    id: string | null;

    title: string;
    subtitle: string;

    month: number;
    year: number;

    issueNumber: number;

    href: string;

    description: string;

    coverImage: string;

    articleCount: number;
    activityCount: number;
    memberCount: number;
};

/* ============================================================
   COMPLETE NEWSLETTER
   Used by individual newsletter page
============================================================ */

export type Newsletter = {
    id: string | null;

    title: string;
    subtitle: string;

    month: number;
    year: number;

    issueNumber: number;

    href: string;

    description: string;

    coverImage: string;

    clubMembers: NewsletterClubMember[];

    articles: Awaited<
        ReturnType<typeof getArticles>
    >;

    activities: Awaited<
        ReturnType<typeof getActivities>
    >;

    pages: NewsletterPage[];

    pageCount: number;
};

/* ============================================================
   APPWRITE NEWSLETTER ROW
============================================================ */

type NewsletterRow = {
    $id: string;

    title?: unknown;
    subtitle?: unknown;

    month?: unknown;
    year?: unknown;

    description?: unknown;

    coverImage?: unknown;

    status?: unknown;
};

/* ============================================================
   APPWRITE NEWSLETTER MEMBER ROW
============================================================ */

type NewsletterMemberRow = {
    $id: string;

    newsletterId?: unknown;

    memberType?: unknown;

    facultyId?: unknown;

    name?: unknown;

    role?: unknown;

    className?: unknown;

    image?: unknown;

    sortOrder?: unknown;
};

/* ============================================================
   DEFAULT VALUES
============================================================ */

const DEFAULT_NEWSLETTER_TITLE =
    "Campus Chronicles";

const DEFAULT_NEWSLETTER_SUBTITLE =
    "Stories • Ideas • Voices";

const DEFAULT_NEWSLETTER_DESCRIPTION =
    "A collection of stories, activities, achievements and memorable moments from PM SHRI GSSS Dhanau.";

const DEFAULT_NEWSLETTER_COVER_IMAGE =
    "/images/newsletter/default-newsletter.jpeg";

/* ============================================================
   GET MONTH NAME
============================================================ */

function getMonthName(month: number) {
    return new Date(
        2000,
        month - 1
    ).toLocaleString(
        "en-US",
        {
            month: "long",
        }
    );
}

/* ============================================================
   GET NEWSLETTER HREF
============================================================ */

function getNewsletterHref(
    month: number,
    year: number
) {
    return `/newsletters/${year}/${month}`;
}

/* ============================================================
   MAP NEWSLETTER METADATA
============================================================ */

function mapNewsletterMetadata(
    row: NewsletterRow | null,
    month: number,
    year: number
) {
    return {
        id: row?.$id ?? null,

        title:
            row?.title &&
                String(row.title).trim()
                ? String(row.title).trim()
                : DEFAULT_NEWSLETTER_TITLE,

        subtitle:
            row?.subtitle &&
                String(row.subtitle).trim()
                ? String(row.subtitle).trim()
                : DEFAULT_NEWSLETTER_SUBTITLE,

        month,

        year,

        href: getNewsletterHref(
            month,
            year
        ),

        description:
            row?.description &&
                String(row.description).trim()
                ? String(row.description).trim()
                : DEFAULT_NEWSLETTER_DESCRIPTION,

        coverImage:
            row?.coverImage &&
                String(row.coverImage).trim()
                ? String(row.coverImage).trim()
                : DEFAULT_NEWSLETTER_COVER_IMAGE,
    };
}

/* ============================================================
   FILTER ARTICLES BY MONTH
============================================================ */

function filterArticlesByMonth(
    articles: Awaited<
        ReturnType<typeof getArticles>
    >,
    month: number,
    year: number
) {
    return articles.filter((article) => {
        if (!article.publishedAt) {
            return false;
        }

        const date =
            new Date(
                article.publishedAt
            );

        return (
            date.getMonth() + 1 === month &&
            date.getFullYear() === year
        );
    });
}

/* ============================================================
   FILTER ACTIVITIES BY MONTH
============================================================ */

function filterActivitiesByMonth(
    activities: Awaited<
        ReturnType<typeof getActivities>
    >,
    month: number,
    year: number
) {
    return activities.filter((activity) => {
        if (!activity.activityDate) {
            return false;
        }

        const date =
            new Date(
                activity.activityDate
            );

        return (
            date.getMonth() + 1 === month &&
            date.getFullYear() === year
        );
    });
}

/* ============================================================
   GET ALL NEWSLETTER MEMBERS
   Used when building complete newsletter
============================================================ */

export async function getNewsletterMembers(
    newsletterId: string
): Promise<NewsletterClubMember[]> {
    try {
        const response =
            await tablesDB.listRows({
                databaseId: DATABASE_ID,

                tableId:
                    NEWSLETTER_MEMBERS_TABLE_ID,

                queries: [
                    Query.equal(
                        "id",
                        newsletterId
                    ),

                    Query.orderAsc(
                        "sortOrder"
                    ),
                ],
            });

        const members:
            NewsletterClubMember[] = [];

        for (
            const rawRow of response.rows
        ) {
            const row =
                rawRow as NewsletterMemberRow;

            const memberType =
                row.memberType === "teacher"
                    ? "teacher"
                    : "student";

            const role =
                String(
                    row.role ?? ""
                ).trim();

            const sortOrder =
                Number(
                    row.sortOrder ?? 0
                );

            /* ==================================================
               TEACHER
            ================================================== */

            if (
                memberType === "teacher"
            ) {
                const facultyId =
                    row.facultyId
                        ? String(
                            row.facultyId
                        ).trim()
                        : "";

                if (!facultyId) {
                    continue;
                }

                const faculty =
                    await getFacultyById(
                        facultyId
                    );

                if (!faculty) {
                    continue;
                }

                members.push({
                    id: row.$id,

                    name: faculty.name,

                    role,

                    memberType: "teacher",

                    image: faculty.image,

                    sortOrder,
                });

                continue;
            }

            /* ==================================================
               STUDENT
            ================================================== */

            const name =
                String(
                    row.name ?? ""
                ).trim();

            if (!name) {
                continue;
            }

            members.push({
                id: row.$id,

                name,

                role,

                memberType: "student",

                className:
                    row.className &&
                        String(
                            row.className
                        ).trim()
                        ? String(
                            row.className
                        ).trim()
                        : undefined,

                image:
                    row.image &&
                        String(
                            row.image
                        ).trim()
                        ? String(
                            row.image
                        ).trim()
                        : null,

                sortOrder,
            });
        }

        return members;
    } catch (error) {
        console.error(
            "Failed to get newsletter members:",
            error
        );

        return [];
    }
}

/* ============================================================
   BUILD NEWSLETTER PAGES
============================================================ */

function buildNewsletterPages({
    month,
    year,
    articles,
    activities,
    clubMembers,
}: {
    month: number;
    year: number;

    articles: Awaited<
        ReturnType<typeof getArticles>
    >;

    activities: Awaited<
        ReturnType<typeof getActivities>
    >;

    clubMembers: NewsletterClubMember[];
}): NewsletterPage[] {
    const monthName =
        getMonthName(month);

    const pages: NewsletterPage[] = [];

    /* ==========================================================
       COVER
    ========================================================== */

    pages.push({
        pageNumber:
            pages.length + 1,

        type: "cover",

        title:
            `${monthName} ${year}`,
    });

    /* ==========================================================
       CONTENTS
    ========================================================== */

    pages.push({
        pageNumber:
            pages.length + 1,

        type: "contents",

        title: "Contents",
    });

    /* ==========================================================
       INTRO
    ========================================================== */

    pages.push({
        pageNumber:
            pages.length + 1,

        type: "intro",

        title:
            "From the Newsletter Club",
    });

    /* ==========================================================
       ACTIVITIES

       Every activity gets its own page.
    ========================================================== */

    for (
        const activity of activities
    ) {
        pages.push({
            pageNumber:
                pages.length + 1,

            type: "activities",

            title:
                activity.title,

            contentId:
                activity.id,
        });
    }

    /* ==========================================================
       ARTICLES

       Every article gets its own page.
    ========================================================== */

    for (
        const article of articles
    ) {
        pages.push({
            pageNumber:
                pages.length + 1,

            type: "articles",

            title:
                article.title,

            contentId:
                article.id,
        });
    }

    /* ==========================================================
       GALLERY

       Gallery is still one additional page.
    ========================================================== */

    const hasGallery =
        activities.length > 0 ||
        articles.length > 0;

    if (hasGallery) {
        pages.push({
            pageNumber:
                pages.length + 1,

            type: "gallery",

            title: "Photo Gallery",
        });
    }

    /* ==========================================================
       CLUB
    ========================================================== */

    if (
        clubMembers.length > 0
    ) {
        pages.push({
            pageNumber:
                pages.length + 1,

            type: "club",

            title:
                "The People Behind the Issue",
        });
    }

    /* ==========================================================
       END
    ========================================================== */

    pages.push({
        pageNumber:
            pages.length + 1,

        type: "end",

        title: "Thank You",
    });

    return pages;
}

/* ============================================================
   BUILD COMPLETE NEWSLETTER
============================================================ */

async function buildNewsletter(
    month: number,
    year: number,

    articles: Awaited<
        ReturnType<typeof getArticles>
    >,

    activities: Awaited<
        ReturnType<typeof getActivities>
    >,

    issueNumber: number,

    newsletterRow:
        | NewsletterRow
        | null
): Promise<Newsletter> {
    /* ==========================================================
       MONTHLY ARTICLES
    ========================================================== */

    const monthlyArticles =
        filterArticlesByMonth(
            articles,
            month,
            year
        );

    /* ==========================================================
       MONTHLY ACTIVITIES
    ========================================================== */

    const monthlyActivities =
        filterActivitiesByMonth(
            activities,
            month,
            year
        );

    /* ==========================================================
       CLUB MEMBERS
    ========================================================== */

    let clubMembers:
        NewsletterClubMember[] = [];

    if (newsletterRow) {
        clubMembers =
            await getNewsletterMembers(
                newsletterRow.$id
            );
    }

    /* ==========================================================
       METADATA
    ========================================================== */

    const metadata =
        mapNewsletterMetadata(
            newsletterRow,
            month,
            year
        );

    /* ==========================================================
       PAGES
    ========================================================== */

    const pages =
        buildNewsletterPages({
            month,
            year,

            articles:
                monthlyArticles,

            activities:
                monthlyActivities,

            clubMembers,
        });

    /* ==========================================================
       RETURN
    ========================================================== */

    return {
        ...metadata,

        issueNumber,

        clubMembers,

        articles:
            monthlyArticles,

        activities:
            monthlyActivities,

        pages,

        pageCount:
            pages.length,
    };
}

/* ============================================================
   GET ALL NEWSLETTERS
   Used by /newsletters

   Returns lightweight summaries.
============================================================ */

export async function getAllNewsletters():
    Promise<NewsletterSummary[]> {
    try {
        const [
            articles,
            activities,
            newsletterResponse,
            memberResponse,
        ] = await Promise.all([
            getArticles(),

            getActivities(),

            tablesDB.listRows({
                databaseId: DATABASE_ID,

                tableId:
                    NEWSLETTERS_TABLE_ID,

                queries: [
                    Query.equal(
                        "status",
                        "published"
                    ),

                    Query.limit(100),
                ],
            }),

            tablesDB.listRows({
                databaseId: DATABASE_ID,

                tableId:
                    NEWSLETTER_MEMBERS_TABLE_ID,

                queries: [
                    Query.limit(1000),
                ],
            }),
        ]);

        /* ======================================================
           NEWSLETTER ROWS
        ====================================================== */

        const newsletterRows =
            newsletterResponse.rows as NewsletterRow[];

        /* ======================================================
           MEMBER COUNTS
        ====================================================== */

        const memberCounts =
            new Map<string, number>();

        for (
            const rawMember of
            memberResponse.rows
        ) {
            const member =
                rawMember as NewsletterMemberRow;

            const newsletterId =
                member.newsletterId
                    ? String(
                        member.newsletterId
                    ).trim()
                    : "";

            if (!newsletterId) {
                continue;
            }

            memberCounts.set(
                newsletterId,

                (
                    memberCounts.get(
                        newsletterId
                    ) ?? 0
                ) + 1
            );
        }

        /* ======================================================
           AVAILABLE MONTHS
        ====================================================== */

        const months = new Map<
            string,
            {
                month: number;
                year: number;
            }
        >();

        /* ======================================================
           ARTICLE MONTHS
        ====================================================== */

        for (
            const article of articles
        ) {
            if (!article.publishedAt) {
                continue;
            }

            const date =
                new Date(
                    article.publishedAt
                );

            const month =
                date.getMonth() + 1;

            const year =
                date.getFullYear();

            months.set(
                `${year}-${month}`,
                {
                    month,
                    year,
                }
            );
        }

        /* ======================================================
           ACTIVITY MONTHS
        ====================================================== */

        for (
            const activity of activities
        ) {
            if (!activity.activityDate) {
                continue;
            }

            const date =
                new Date(
                    activity.activityDate
                );

            const month =
                date.getMonth() + 1;

            const year =
                date.getFullYear();

            months.set(
                `${year}-${month}`,
                {
                    month,
                    year,
                }
            );
        }

        /* ======================================================
           NEWSLETTER MONTHS
        ====================================================== */

        for (
            const row of newsletterRows
        ) {
            const month =
                Number(row.month);

            const year =
                Number(row.year);

            if (!month || !year) {
                continue;
            }

            months.set(
                `${year}-${month}`,
                {
                    month,
                    year,
                }
            );
        }

        /* ======================================================
           CHRONOLOGICAL ORDER
        ====================================================== */

        const chronologicalMonths =
            [...months.values()].sort(
                (a, b) => {
                    if (
                        a.year !==
                        b.year
                    ) {
                        return (
                            a.year -
                            b.year
                        );
                    }

                    return (
                        a.month -
                        b.month
                    );
                }
            );

        /* ======================================================
           CREATE SUMMARIES
        ====================================================== */

        const newsletters =
            chronologicalMonths.map(
                (
                    {
                        month,
                        year,
                    },
                    index
                ) => {
                    const monthlyArticles =
                        filterArticlesByMonth(
                            articles,
                            month,
                            year
                        );

                    const monthlyActivities =
                        filterActivitiesByMonth(
                            activities,
                            month,
                            year
                        );

                    const newsletterRow =
                        newsletterRows.find(
                            (row) =>
                                Number(
                                    row.month
                                ) === month &&
                                Number(
                                    row.year
                                ) === year
                        );

                    const metadata =
                        mapNewsletterMetadata(
                            newsletterRow ??
                            null,
                            month,
                            year
                        );

                    const memberCount =
                        newsletterRow
                            ? (
                                memberCounts.get(
                                    newsletterRow.$id
                                ) ?? 0
                            )
                            : 0;

                    return {
                        ...metadata,

                        /*
                         * Oldest available newsletter
                         * is Issue #1.
                         */
                        issueNumber:
                            index + 1,

                        articleCount:
                            monthlyArticles.length,

                        activityCount:
                            monthlyActivities.length,

                        memberCount,
                    };
                }
            );

        /* ======================================================
           NEWEST FIRST
        ====================================================== */

        return newsletters.reverse();
    } catch (error) {
        console.error(
            "Failed to get newsletters:",
            error
        );

        return [];
    }
}

/* ============================================================
   GET NEWSLETTER BY MONTH
   Used by individual newsletter SSR page
============================================================ */

export async function getNewsletterByMonth(
    month: number,
    year: number
): Promise<Newsletter | null> {
    try {
        const [
            articles,
            activities,
            newsletterResponse,
        ] = await Promise.all([
            getArticles(),

            getActivities(),

            tablesDB.listRows({
                databaseId: DATABASE_ID,

                tableId:
                    NEWSLETTERS_TABLE_ID,

                queries: [
                    Query.equal(
                        "status",
                        "published"
                    ),

                    Query.limit(100),
                ],
            }),
        ]);

        const newsletterRows =
            newsletterResponse.rows as NewsletterRow[];

        /* ======================================================
           AVAILABLE MONTHS
        ====================================================== */

        const months = new Map<
            string,
            {
                month: number;
                year: number;
            }
        >();

        /* ======================================================
           ARTICLE MONTHS
        ====================================================== */

        for (
            const article of articles
        ) {
            if (!article.publishedAt) {
                continue;
            }

            const date =
                new Date(
                    article.publishedAt
                );

            const articleMonth =
                date.getMonth() + 1;

            const articleYear =
                date.getFullYear();

            months.set(
                `${articleYear}-${articleMonth}`,
                {
                    month:
                        articleMonth,

                    year:
                        articleYear,
                }
            );
        }

        /* ======================================================
           ACTIVITY MONTHS
        ====================================================== */

        for (
            const activity of activities
        ) {
            if (!activity.activityDate) {
                continue;
            }

            const date =
                new Date(
                    activity.activityDate
                );

            const activityMonth =
                date.getMonth() + 1;

            const activityYear =
                date.getFullYear();

            months.set(
                `${activityYear}-${activityMonth}`,
                {
                    month:
                        activityMonth,

                    year:
                        activityYear,
                }
            );
        }

        /* ======================================================
           NEWSLETTER MONTHS
        ====================================================== */

        for (
            const row of newsletterRows
        ) {
            const newsletterMonth =
                Number(row.month);

            const newsletterYear =
                Number(row.year);

            if (
                !newsletterMonth ||
                !newsletterYear
            ) {
                continue;
            }

            months.set(
                `${newsletterYear}-${newsletterMonth}`,
                {
                    month:
                        newsletterMonth,

                    year:
                        newsletterYear,
                }
            );
        }

        /* ======================================================
           REQUESTED MONTH
        ====================================================== */

        const requestedKey =
            `${year}-${month}`;

        if (
            !months.has(
                requestedKey
            )
        ) {
            return null;
        }

        /* ======================================================
           CHRONOLOGICAL ORDER
        ====================================================== */

        const chronologicalMonths =
            [...months.values()].sort(
                (a, b) => {
                    if (
                        a.year !==
                        b.year
                    ) {
                        return (
                            a.year -
                            b.year
                        );
                    }

                    return (
                        a.month -
                        b.month
                    );
                }
            );

        /* ======================================================
           ISSUE NUMBER
        ====================================================== */

        const issueIndex =
            chronologicalMonths.findIndex(
                (item) =>
                    item.month ===
                    month &&
                    item.year ===
                    year
            );

        if (
            issueIndex === -1
        ) {
            return null;
        }

        const issueNumber =
            issueIndex + 1;

        /* ======================================================
           FIND METADATA
        ====================================================== */

        const newsletterRow =
            newsletterRows.find(
                (row) =>
                    Number(
                        row.month
                    ) === month &&
                    Number(
                        row.year
                    ) === year
            ) ?? null;

        /* ======================================================
           BUILD COMPLETE NEWSLETTER
        ====================================================== */

        return buildNewsletter(
            month,

            year,

            articles,

            activities,

            issueNumber,

            newsletterRow
        );
    } catch (error) {
        console.error(
            "Failed to get newsletter:",
            error
        );

        return null;
    }
}


export async function getAllNewsletterMembers(): Promise<
    NewsletterClubMember[]
> {
    try {
        const response =
            await tablesDB.listRows({
                databaseId: DATABASE_ID,

                tableId:
                    NEWSLETTER_MEMBERS_TABLE_ID,

                queries: [
                    Query.orderAsc(
                        "sortOrder"
                    ),
                ],
            });

        const members:
            NewsletterClubMember[] = [];

        for (
            const rawRow of response.rows
        ) {
            const row =
                rawRow as NewsletterMemberRow;

            const memberType =
                row.memberType === "teacher"
                    ? "teacher"
                    : "student";

            const role =
                String(
                    row.role ?? ""
                ).trim();

            const sortOrder =
                Number(
                    row.sortOrder ?? 0
                );

            /* ==================================================
               TEACHER
            ================================================== */

            if (
                memberType === "teacher"
            ) {
                const facultyId =
                    row.facultyId
                        ? String(
                            row.facultyId
                        ).trim()
                        : "";

                if (!facultyId) {
                    continue;
                }

                const faculty =
                    await getFacultyById(
                        facultyId
                    );

                if (!faculty) {
                    continue;
                }

                members.push({
                    id: row.$id,

                    name: faculty.name,

                    role,

                    memberType: "teacher",

                    image: faculty.image,

                    sortOrder,
                });

                continue;
            }

            /* ==================================================
               STUDENT
            ================================================== */

            const name =
                String(
                    row.name ?? ""
                ).trim();

            if (!name) {
                continue;
            }

            members.push({
                id: row.$id,

                name,

                role,

                memberType: "student",

                className:
                    row.className &&
                        String(
                            row.className
                        ).trim()
                        ? String(
                            row.className
                        ).trim()
                        : undefined,

                image:
                    row.image &&
                        String(
                            row.image
                        ).trim()
                        ? String(
                            row.image
                        ).trim()
                        : null,

                sortOrder,
            });
        }

        return members;
    } catch (error) {
        console.error(
            "Failed to get newsletter members:",
            error
        );

        return [];
    }
}