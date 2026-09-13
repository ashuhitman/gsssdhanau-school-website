import { notFound } from "next/navigation";



import {
    getArticleById,
} from "@/lib/data/article/get";

import {
    ARTICLE_CATEGORY,
    ARTICLE_STATUS,
    ARTICLE_TAGS,
} from "@/lib/data/article/constants";
import ArticleEditPage from "@/components/private/admin/articles/ArticleEditPage";

interface EditArticlePageProps {
    params: Promise<{
        id: string;
    }>;
}

const categories = [
    {
        value: ARTICLE_CATEGORY.STORY,
        label: "Story",
    },
    {
        value: ARTICLE_CATEGORY.OPINION,
        label: "Opinion",
    },
    {
        value: ARTICLE_CATEGORY.EXPERIENCE,
        label: "Experience",
    },
    {
        value: ARTICLE_CATEGORY.GUIDE,
        label: "Guide",
    },
    {
        value: ARTICLE_CATEGORY.REFLECTION,
        label: "Reflection",
    },
    {
        value: ARTICLE_CATEGORY.ACHIEVEMENT,
        label: "Achievement",
    },
    {
        value: ARTICLE_CATEGORY.REPORT,
        label: "Report",
    },
];

const tags = [
    {
        value: ARTICLE_TAGS.ACADEMIC,
        label: "Academic",
    },
    {
        value: ARTICLE_TAGS.STUDENT_LIFE,
        label: "Student Life",
    },
    {
        value: ARTICLE_TAGS.SCHOOL_LIFE,
        label: "School Life",
    },
    {
        value: ARTICLE_TAGS.SPORTS,
        label: "Sports",
    },
    {
        value: ARTICLE_TAGS.EDUCATION,
        label: "Education",
    },
    {
        value: ARTICLE_TAGS.VALUES,
        label: "Values",
    },
    {
        value: ARTICLE_TAGS.INSPIRATION,
        label: "Inspiration",
    },
    {
        value: ARTICLE_TAGS.CREATIVITY,
        label: "Creativity",
    },
    {
        value: ARTICLE_TAGS.COMMUNITY,
        label: "Community",
    },
];

const statusOptions = [
    {
        value: ARTICLE_STATUS.DRAFT,
        label: "Draft",
    },
    {
        value: ARTICLE_STATUS.PUBLISHED,
        label: "Published",
    },
];

export default async function EditArticlePage({
    params,
}: EditArticlePageProps) {
    const { id } = await params;

    const article =
        await getArticleById(id);

    if (!article) {
        notFound();
    }

    return (
        <ArticleEditPage
            id={article.id}
            title="Edit Article"
            description="Update the article information."
            previewTitle="Article Preview"
            categories={categories}
            tags={tags}
            statusOptions={statusOptions}
            draftStatus={
                ARTICLE_STATUS.DRAFT
            }
            publishedStatus={
                ARTICLE_STATUS.PUBLISHED
            }
            initialValues={{
                title: article.title,
                slug: article.slug,
                excerpt:
                    article.excerpt ?? "",
                content:
                    article.content ?? "",
                category:
                    article.category ?? "",
                tags:
                    article.articleTags,
                author:
                    article.authorBy ?? "",
                publishedAt:
                    article.publishedAt
                        ? article.publishedAt.slice(
                            0,
                            16,
                        )
                        : "",
                status:
                    article.status,
                featured:
                    article.featured,
                image:
                    article.image,
                imageFile: null,
                removeImage: false,
            }}
        />
    );
}