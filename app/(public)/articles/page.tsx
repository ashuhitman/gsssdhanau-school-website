import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import { PageLayout } from "@/components/layout/PageLayout";

import ContentTopics from "@/components/content/ContentTopics";
import FeaturedContent from "@/components/content/FeaturedContent";
import ContentTimeline from "@/components/content/ContentTimeline";
import ContentQuoteCard from "@/components/content/ContentQuoteCard";
import ContentCTA from "@/components/content/ContentCTA";



import {
    getArticles,
    getFeaturedArticle,
} from "@/lib/data/article";
import Pagination from "@/components/content/Pagination";

/* ============================================================
   Page Props
============================================================ */

interface ArticlesPageProps {
    searchParams: Promise<{
        category?: string;
        page?: string;
    }>;
}

/* ============================================================
   Articles Page
============================================================ */

export default async function ArticlesPage({
    searchParams,
}: ArticlesPageProps) {
    const params =
        await searchParams;

    const category =
        params.category ?? "all";

    const currentPage = Math.max(
        1,
        Number(params.page ?? "1") || 1
    );

    /* ========================================================
       Fetch Data
    ======================================================== */

    const [
        articles,
        featuredArticle,
    ] = await Promise.all([
        getArticles(),
        getFeaturedArticle(),
    ]);

    /* ========================================================
       Filter Articles
    ======================================================== */

    const filteredArticles =
        category === "all"
            ? articles
            : articles.filter(
                (article) =>
                    article.category.includes(
                        category as never
                    )
            );

    /* ========================================================
       Featured Article
    ======================================================== */

    const filteredFeatured =
        category === "all"
            ? featuredArticle
            : featuredArticle &&
                featuredArticle.category.includes(
                    category as never
                )
                ? featuredArticle
                : null;

    /* ========================================================
       Remove Featured From Latest
    ======================================================== */

    const latestArticles =
        filteredFeatured
            ? filteredArticles.filter(
                (article) =>
                    article.id !==
                    filteredFeatured.id
            )
            : filteredArticles;

    /* ========================================================
       Pagination
    ======================================================== */

    const ARTICLES_PER_PAGE = 4;

    const totalPages = Math.max(
        1,
        Math.ceil(
            latestArticles.length /
            ARTICLES_PER_PAGE
        )
    );

    const safePage = Math.min(
        currentPage,
        totalPages
    );

    const startIndex =
        (safePage - 1) *
        ARTICLES_PER_PAGE;

    const paginatedArticles =
        latestArticles.slice(
            startIndex,
            startIndex +
            ARTICLES_PER_PAGE
        );

    /* ========================================================
       Topics
    ======================================================== */

    const topics = [
        {
            value: "all",
            label: "All Articles",
            count: articles.length,
        },
        {
            value: "academic",
            label: "Academic",
        },
        {
            value: "student-life",
            label: "Student Life",
        },
        {
            value: "school-life",
            label: "School Life",
        },
        {
            value: "sports",
            label: "Sports",
        },
        {
            value: "education",
            label: "Education",
        },
        {
            value: "values",
            label: "Values",
        },
        {
            value: "inspiration",
            label: "Inspiration",
        },
        {
            value: "creativity",
            label: "Creativity",
        },
        {
            value: "community",
            label: "Community",
        },
    ];

    return (
        <PageLayout
            hero={
                <PageHero
                    title="Articles"
                    description="Thoughtful stories, experiences and ideas from our school community."
                    image="/images/articles/hero.jpeg"
                    imageAlt="Students of PM SHRI GSSS Dhanau"
                    breadcrumb={[
                        {
                            label: "Articles",
                        },
                    ]}
                />
            }
        >
            <section
                className="
                    py-10
                    sm:py-12
                    lg:py-14
                "
            >
                <div
                    className="
                        mx-auto
                        max-w-7xl
                       
                       
                    "
                >
                    {/* ==================================================
                        Section Heading
                    ================================================== */}

                    <SectionHeading
                        eyebrow="Ideas & Perspectives"
                        title="Stories from Our School"
                        description="Discover experiences, ideas and perspectives from our school community."
                    />

                    <div
                        className="
                            mt-8
                            space-y-8
                            sm:mt-10
                        "
                    >
                        {/* ==================================================
                            Topic Filter
                        ================================================== */}

                        <ContentTopics
                            topics={topics}
                            activeTopic={
                                category
                            }
                            basePath="/articles"
                        />

                        {/* ==================================================
                            Featured Article
                        ================================================== */}

                        {filteredFeatured && (
                            <FeaturedContent
                                href={`/articles/${filteredFeatured.id}`}
                                image={
                                    filteredFeatured.image
                                }
                                imageAlt={
                                    filteredFeatured.imageAlt
                                }
                                category={
                                    filteredFeatured.category[0]
                                }
                                articleType={
                                    filteredFeatured.articleType
                                }
                                title={
                                    filteredFeatured.title
                                }
                                description={
                                    filteredFeatured.excerpt
                                }
                                publishedAt={
                                    filteredFeatured.publishedAt
                                }
                                author={
                                    filteredFeatured.authorBy
                                }
                            />
                        )}

                        {/* ==================================================
                            Latest + Sidebar
                        ================================================== */}

                        <div
                            className="
                                grid
                                items-start
                                gap-8
                                lg:grid-cols-[minmax(0,1fr)_280px]
                            "
                        >
                            {/* ==================================================
                                Latest Articles
                            ================================================== */}

                            <section>
                                <div
                                    className="
                                        mb-5
                                        flex
                                        items-end
                                        justify-between
                                        gap-4
                                    "
                                >
                                    <div>
                                        <p
                                            className="
                                                text-[9px]
                                                font-black
                                                uppercase
                                                tracking-[0.2em]
                                                text-amber-600
                                            "
                                        >
                                            Fresh Perspectives
                                        </p>

                                        <h2
                                            className="
                                                mt-1
                                                text-2xl
                                                font-black
                                                tracking-tight
                                                text-slate-950
                                            "
                                        >
                                            Latest Articles
                                        </h2>
                                    </div>
                                </div>

                                <ContentTimeline
                                    items={paginatedArticles.map(
                                        (
                                            article
                                        ) => ({
                                            id:
                                                article.id,

                                            href:
                                                `/articles/${article.id}`,

                                            image:
                                                article.image,

                                            imageAlt:
                                                article.imageAlt,

                                            title:
                                                article.title,

                                            category:
                                                article.category[0],

                                            articleType:
                                                article.articleType,

                                            excerpt:
                                                article.excerpt,

                                            publishedAt:
                                                article.publishedAt,

                                            author:
                                                article.authorBy,
                                        })
                                    )}
                                    emptyMessage={
                                        category ===
                                            "all"
                                            ? "No articles have been published yet."
                                            : "No articles found for this topic."
                                    }
                                />

                                {/* Pagination */}

                                <Pagination
                                    currentPage={
                                        safePage
                                    }
                                    totalPages={
                                        totalPages
                                    }
                                    basePath="/articles"
                                    searchParams={{
                                        category:
                                            category ===
                                                "all"
                                                ? undefined
                                                : category,
                                    }}
                                />
                            </section>

                            {/* ==================================================
                                Sidebar
                            ================================================== */}

                            <aside
                                className="
                                    space-y-6
                                "
                            >
                                <ContentQuoteCard
                                    quote="Good articles don't just inform, they inspire."
                                    author="School Principal"
                                    role="PM SHRI GSSS Dhanau"
                                />

                                <ContentCTA
                                    href="/articles/submit"
                                    eyebrow="Share Your Voice"
                                    title="Have an idea worth sharing?"
                                    description="Share your experiences, ideas and perspectives with our school community."
                                    buttonLabel="Submit an Article"
                                />
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}