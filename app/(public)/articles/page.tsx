import ArticlesClient from "@/components/Articles/ArticlesClient";
import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import { PageLayout } from "@/components/layout/PageLayout";



import {
    getArticles,
    getFeaturedArticle,
} from "@/lib/data/article";

/* ============================================================
   Articles Page
============================================================ */

export default async function ArticlesPage() {
    const [
        articles,
        featuredArticle,
    ] = await Promise.all([
        getArticles(),
        getFeaturedArticle(),
    ]);

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
                    <SectionHeading
                        eyebrow="Ideas & Perspectives"
                        title="Stories from Our School"
                        description="Discover experiences, ideas and perspectives from our school community."
                    />

                    <ArticlesClient
                        articles={articles}
                        featuredArticle={
                            featuredArticle
                        }
                    />
                </div>
            </section>
        </PageLayout>
    );
}