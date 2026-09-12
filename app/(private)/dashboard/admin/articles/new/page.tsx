import ContentCreatePage, { ContentCreateValues } from "@/components/private/ui/ContentCreatePage";
import { ARTICLE_CATEGORY, ARTICLE_STATUS, ARTICLE_TAGS } from "@/lib/data/article/constants";


const categoryOptions = Object.values(ARTICLE_CATEGORY).map((category) => ({
    value: category,
    label: category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
}));

const tagOptions = Object.values(ARTICLE_TAGS).map((tag) => ({
    value: tag,
    label: tag
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
}));

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

export default function NewArticlePage() {


    return (
        <ContentCreatePage
            type="article"
            title="Add Article"
            description="Create a new article for your school website."
            contentLabel="Article Content"
            previewTitle="Article Preview"
            categories={categoryOptions}
            tags={tagOptions}
            statusOptions={statusOptions}
            draftStatus={ARTICLE_STATUS.DRAFT}
            publishedStatus={ARTICLE_STATUS.PUBLISHED}
            showTags
            showFeatured
            showAuthor
            showPublishedDate

        />
    );
}