import PageHero from "@/components/private/ui/PageHero";
import ArticleForm from "@/components/private/admin/articles/ArticleForm";

export default function NewArticlePage() {
    return (
        <div className="space-y-5">
            <PageHero
                breadcrumbs={["Dashboard", "Articles", "New Article"]}
                title="Add Article"
                description="Create a new article for your school website."
            />

            <ArticleForm mode="create" />
        </div>
    );
}