import ArticlesStats from "@/components/private/admin/articles/ArticlesStats";
import ArticleTableSection from "@/components/private/admin/articles/ArticleTableSection";
import PageHero from "@/components/private/ui/PageHero";
import { getAllArticles } from "@/lib/data/article/get";

export default async function AdminArticlesPage() {
    const articles = await getAllArticles();

    return (
        <div className="space-y-5">
            <PageHero
                breadcrumbs={["Dashboard", "Articles"]}
                title="Articles"
                description="Manage articles, stories and insights for your school website."
                action={{
                    label: "Add Article",
                    href: "/dashboard/admin/articles/new",
                }}
            />

            <ArticlesStats articles={articles} />

            <ArticleTableSection articles={articles} />
        </div>
    );
}