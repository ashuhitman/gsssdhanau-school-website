"use client";

import {
    useMemo,
    useRef,
    useState,
} from "react";

import ContentDetails from "@/components/content/ContentDetails";

import {
    Edit2,
    RotateCcw,
    Save,
    Send,
} from "lucide-react";

import {
    ARTICLE_IMAGE_TYPE,
    type ArticleCategory,
    type ArticleImageType,
    type ArticleStatus,
    type ArticleTag,
} from "@/lib/data/article/constants";

import {
    updateArticleAction,
} from "@/app/(private)/dashboard/admin/articles/actions";

import {
    slugify,
} from "@/lib/utils/utils";

import {
    useSnackbar,
} from "../../ui/Snackbar/SnackbarProvider";

import PageHero from "../../ui/PageHero";
import FormSection from "../../forms/FormSection";
import FormField from "../../forms/FormField";
import FormInput from "../../forms/FormInput";
import FormTextarea from "../../forms/FormTextarea";
import FormSelect from "../../forms/FormSelect";
import FormCheckbox from "../../forms/FormCheckbox";
import FormImageUpload from "../../forms/FormImageUpload";
import FormContentEditor from "../../forms/FormContentEditor";
import FormActions from "../../forms/FormActions";

export interface ArticleEditImage {
    value: string;
    type: ArticleImageType;
    fileId: string | null;
}

export interface ArticleEditValues {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: ArticleCategory | "";
    tags: ArticleTag[];
    author: string;
    publishedAt: string;
    status: ArticleStatus;
    featured: boolean;
    image: ArticleEditImage | null;
    imageFile: File | null;
    removeImage: boolean;
}

export type ArticleEditImageChange =
    | {
        type: "replace-appwrite";
        file: File;
        oldFileId: string | null;
    }
    | {
        type: "replace-url";
        url: string;
        oldFileId: string | null;
    }
    | {
        type: "remove";
        oldFileId: string | null;
    };

export interface ArticleEditSubmitData {
    fields: Partial<{
        title: string;
        slug: string;
        excerpt: string | null;
        content: string | null;
        authorBy: string | null;
        featured: boolean;
        status: ArticleStatus;
        publishedAt: string | null;
        publishedBy: string | null;
        category: ArticleCategory | null;
        articleTags: ArticleTag[] | null;
    }>;
    image?: ArticleEditImageChange;
}

export type ArticleEditResult =
    | {
        success: true;
        message: string;
    }
    | {
        success: false;
        message: string;
    };

interface ArticleEditPageProps {
    id: string;
    title: string;
    description: string;

    contentLabel?: string;
    previewTitle?: string;
    fallbackImage?: string;

    categories: {
        value: ArticleCategory;
        label: string;
    }[];

    tags?: {
        value: ArticleTag;
        label: string;
    }[];

    statusOptions?: {
        value: ArticleStatus;
        label: string;
    }[];

    draftStatus: ArticleStatus;
    publishedStatus: ArticleStatus;

    showTags?: boolean;
    showFeatured?: boolean;
    showAuthor?: boolean;
    showPublishedDate?: boolean;
    showStatus?: boolean;

    initialValues: ArticleEditValues;
}

interface ResetButtonProps {
    onClick: () => void;
    disabled?: boolean;
    label?: string;
}

function ResetButton({
    onClick,
    disabled = false,
    label = "Reset",
}: ResetButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
            className="
                inline-flex
                h-10
                shrink-0
                cursor-pointer
                items-center
                justify-center
                gap-1.5
                rounded-md
                border
                border-admin
                bg-admin-card
                px-3
                text-xs
                font-medium
                text-admin-muted
                transition-colors
                hover:bg-admin-surface
                hover:text-admin-heading
                disabled:pointer-events-none
                disabled:opacity-40
            "
        >
            <RotateCcw className="size-4 shrink-0" />

            <span className="whitespace-nowrap">
                {label}
            </span>
        </button>
    );
}

export default function ArticleEditPage({
    id,
    title,
    description,
    contentLabel = "Content",
    previewTitle = "Article Preview",
    fallbackImage,
    categories,
    tags = [],
    statusOptions = [],
    draftStatus,
    publishedStatus,
    showTags = true,
    showFeatured = true,
    showAuthor = true,
    showPublishedDate = true,
    showStatus = false,
    initialValues,
}: ArticleEditPageProps) {
    const { showSnackbar } = useSnackbar();

    const formRef =
        useRef<HTMLFormElement>(null);

    const [values, setValues] =
        useState<ArticleEditValues>(
            initialValues,
        );

    const [saving, setSaving] =
        useState(false);

    const [publishing, setPublishing] =
        useState(false);

    const [slugEditing, setSlugEditing] =
        useState(false);

    function updateValue<
        K extends keyof ArticleEditValues,
    >(
        field: K,
        value: ArticleEditValues[K],
    ) {
        setValues((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function toggleTag(tag: ArticleTag) {
        setValues((current) => ({
            ...current,
            tags: current.tags.includes(tag)
                ? current.tags.filter(
                    (currentTag) =>
                        currentTag !== tag,
                )
                : [
                    ...current.tags,
                    tag,
                ],
        }));
    }

    function hasImageChanges() {
        if (values.removeImage) {
            return true;
        }

        if (values.imageFile) {
            return true;
        }

        const currentImage =
            values.image;

        const initialImage =
            initialValues.image;

        if (
            currentImage === null ||
            initialImage === null
        ) {
            return currentImage !== initialImage;
        }

        return (
            currentImage.type !==
            initialImage.type ||
            currentImage.value !==
            initialImage.value ||
            currentImage.fileId !==
            initialImage.fileId
        );
    }

    function hasFieldChanges(
        field: keyof ArticleEditValues,
    ) {
        if (field === "image") {
            return hasImageChanges();
        }

        if (field === "imageFile") {
            return values.imageFile !== null;
        }

        if (field === "removeImage") {
            return values.removeImage;
        }

        if (field === "tags") {
            return (
                values.tags.length !==
                initialValues.tags.length ||
                values.tags.some(
                    (tag, index) =>
                        tag !==
                        initialValues.tags[index],
                )
            );
        }

        return (
            values[field] !==
            initialValues[field]
        );
    }

    function resetField(
        field: keyof ArticleEditValues,
    ) {
        if (field === "image") {
            setValues((current) => ({
                ...current,
                image: initialValues.image,
                imageFile: null,
                removeImage: false,
            }));

            return;
        }

        if (
            field === "imageFile" ||
            field === "removeImage"
        ) {
            setValues((current) => ({
                ...current,
                imageFile: null,
                removeImage: false,
            }));

            return;
        }

        setValues((current) => ({
            ...current,
            [field]: initialValues[field],
        }));
    }

    function resetAll() {
        setValues({
            ...initialValues,
            imageFile: null,
            removeImage: false,
        });

        setSlugEditing(false);
    }

    const hasAnyChanges =
        Object.keys(
            buildChangedFields(values.status),
        ).length > 0 ||
        hasImageChanges();

    function handleImageChange(
        file: File | null,
        preview: string | null,
        imageType?: ArticleImageType,
    ) {
        if (!file && !preview) {
            setValues((current) => ({
                ...current,
                image: null,
                imageFile: null,
                removeImage: true,
            }));

            return;
        }

        if (
            file &&
            (imageType ??
                ARTICLE_IMAGE_TYPE.APPWRITE) ===
            ARTICLE_IMAGE_TYPE.APPWRITE
        ) {
            setValues((current) => ({
                ...current,
                image: {
                    value: preview ?? "",
                    type:
                        ARTICLE_IMAGE_TYPE.APPWRITE,
                    fileId: null,
                },
                imageFile: file,
                removeImage: false,
            }));

            return;
        }

        if (
            preview &&
            imageType ===
            ARTICLE_IMAGE_TYPE.URL
        ) {
            setValues((current) => ({
                ...current,
                image: {
                    value: preview,
                    type:
                        ARTICLE_IMAGE_TYPE.URL,
                    fileId: null,
                },
                imageFile: null,
                removeImage: false,
            }));
        }
    }

    function validateForm(
        requirePublishedAt = false,
    ) {
        const form =
            formRef.current;

        if (!form) {
            return false;
        }

        const publishDateInput =
            form.elements.namedItem(
                "article-published-at",
            ) as HTMLInputElement | null;

        if (publishDateInput) {
            publishDateInput.setCustomValidity(
                requirePublishedAt &&
                    !values.publishedAt
                    ? "Publish Date is required when publishing."
                    : "",
            );
        }

        const isValid =
            form.reportValidity();

        if (publishDateInput) {
            publishDateInput.setCustomValidity("");
        }

        return isValid;
    }

    function buildChangedFields(
        status: ArticleStatus,
    ): ArticleEditSubmitData["fields"] {
        const fields: ArticleEditSubmitData["fields"] =
            {};

        if (
            values.title !==
            initialValues.title
        ) {
            fields.title =
                values.title;
        }

        if (
            values.slug !==
            initialValues.slug
        ) {
            fields.slug =
                values.slug;
        }

        if (
            values.excerpt !==
            initialValues.excerpt
        ) {
            fields.excerpt =
                values.excerpt || null;
        }

        if (
            values.content !==
            initialValues.content
        ) {
            fields.content =
                values.content || null;
        }

        if (
            values.author !==
            initialValues.author
        ) {
            fields.authorBy =
                values.author || null;

            fields.publishedBy =
                values.author || null;
        }

        if (
            values.featured !==
            initialValues.featured
        ) {
            fields.featured =
                values.featured;
        }

        if (
            values.publishedAt !==
            initialValues.publishedAt
        ) {
            fields.publishedAt =
                values.publishedAt || null;
        }

        if (
            status !==
            initialValues.status
        ) {
            fields.status = status;
        }

        if (
            values.category !==
            initialValues.category
        ) {
            fields.category =
                values.category || null;
        }

        const tagsChanged =
            values.tags.length !==
            initialValues.tags.length ||
            values.tags.some(
                (tag, index) =>
                    tag !==
                    initialValues.tags[index],
            );

        if (tagsChanged) {
            fields.articleTags =
                values.tags;
        }

        return fields;
    }

    function buildImageChange():
        | ArticleEditImageChange
        | undefined {
        const initialImage =
            initialValues.image;

        if (values.removeImage) {
            return {
                type: "remove",
                oldFileId:
                    initialImage?.type ===
                        ARTICLE_IMAGE_TYPE.APPWRITE
                        ? initialImage.fileId
                        : null,
            };
        }

        if (
            values.imageFile &&
            values.image?.type ===
            ARTICLE_IMAGE_TYPE.APPWRITE
        ) {
            return {
                type: "replace-appwrite",
                file: values.imageFile,
                oldFileId:
                    initialImage?.type ===
                        ARTICLE_IMAGE_TYPE.APPWRITE
                        ? initialImage.fileId
                        : null,
            };
        }

        if (
            values.image?.type ===
            ARTICLE_IMAGE_TYPE.URL &&
            values.image.value.trim()
        ) {
            const currentUrl =
                values.image.value.trim();

            const initialUrl =
                initialImage?.type ===
                    ARTICLE_IMAGE_TYPE.URL
                    ? initialImage.value.trim()
                    : null;

            if (
                initialUrl ===
                currentUrl
            ) {
                return undefined;
            }

            return {
                type: "replace-url",
                url: currentUrl,
                oldFileId:
                    initialImage?.type ===
                        ARTICLE_IMAGE_TYPE.APPWRITE
                        ? initialImage.fileId
                        : null,
            };
        }

        if (
            values.image?.type ===
            ARTICLE_IMAGE_TYPE.APPWRITE &&
            initialImage?.type ===
            ARTICLE_IMAGE_TYPE.APPWRITE &&
            values.image.fileId ===
            initialImage.fileId
        ) {
            return undefined;
        }

        return undefined;
    }

    function buildSubmitData(
        status: ArticleStatus,
    ): ArticleEditSubmitData {
        const fields =
            buildChangedFields(status);

        const image =
            buildImageChange();

        return image
            ? {
                fields,
                image,
            }
            : {
                fields,
            };
    }

    async function submitArticle(
        data: ArticleEditSubmitData,
    ): Promise<ArticleEditResult> {
        return updateArticleAction(
            id,
            data,
        );
    }

    function showError(
        message: string,
    ) {
        showSnackbar({
            type: "error",
            message,
            position: {
                mobile: "top-center",
                tablet: "bottom-right",
                desktop: "bottom-right",
            },
            slideFrom: {
                mobile: "top",
                tablet: "right",
                desktop: "right",
            },
        });
    }

    function showSuccess(
        message: string,
    ) {
        showSnackbar({
            type: "success",
            message,
            position: {
                mobile: "top-center",
                tablet: "bottom-right",
                desktop: "bottom-right",
            },
            slideFrom: {
                mobile: "top",
                tablet: "right",
                desktop: "right",
            },
        });
    }

    async function handleSaveDraft() {
        if (!validateForm(false)) {
            return;
        }

        const data =
            buildSubmitData(
                draftStatus,
            );

        const hasFieldChanges =
            Object.keys(
                data.fields,
            ).length > 0;

        const hasImageChange =
            data.image !== undefined;

        if (
            !hasFieldChanges &&
            !hasImageChange
        ) {
            showSuccess(
                "No changes to save.",
            );

            return;
        }

        setSaving(true);

        try {
            const result =
                await submitArticle(
                    data,
                );

            if (!result.success) {
                showError(
                    result.message,
                );

                return;
            }

            setValues((current) => ({
                ...current,
                status: draftStatus,
            }));

            showSuccess(
                result.message,
            );
        } catch (error) {
            console.error(
                "Failed to update article:",
                error,
            );

            showError(
                "Article failed to save.",
            );
        } finally {
            setSaving(false);
        }
    }

    async function handlePublish() {
        if (!validateForm(true)) {
            return;
        }

        const data =
            buildSubmitData(
                publishedStatus,
            );

        const hasFieldChanges =
            Object.keys(
                data.fields,
            ).length > 0;

        const hasImageChange =
            data.image !== undefined;

        if (
            !hasFieldChanges &&
            !hasImageChange
        ) {
            showSuccess(
                "No changes to publish.",
            );

            return;
        }

        setPublishing(true);

        try {
            const result =
                await submitArticle(
                    data,
                );

            if (!result.success) {
                showError(
                    result.message,
                );

                return;
            }

            setValues((current) => ({
                ...current,
                status:
                    publishedStatus,
            }));

            showSuccess(
                result.message,
            );
        } catch (error) {
            console.error(
                "Failed to publish article:",
                error,
            );

            showError(
                "Article failed to publish.",
            );
        } finally {
            setPublishing(false);
        }
    }

    const previewImage =
        values.image?.value || null;

    const previewData =
        useMemo(
            () => ({
                title:
                    values.title ||
                    previewTitle,

                image:
                    previewImage,

                imageAlt:
                    values.title ||
                    previewTitle,

                category:
                    values.category ||
                    undefined,

                contentTags:
                    values.tags.length > 0
                        ? values.tags
                        : undefined,

                excerpt:
                    values.excerpt ||
                    "Your description will appear here.",

                content:
                    values.content ||
                    null,

                publishedAt:
                    values.publishedAt ||
                    undefined,

                publishedBy:
                    values.author ||
                    undefined,

                footerLabel: title,
                fallbackImage,
            }),
            [
                values,
                previewTitle,
                fallbackImage,
                title,
                previewImage,
            ],
        );

    const resetButton = (
        <ResetButton
            onClick={resetAll}
            disabled={
                !hasAnyChanges ||
                saving ||
                publishing
            }
            label="Reset"
        />
    );

    const saveDraftButton = (
        <button
            type="button"
            onClick={handleSaveDraft}
            disabled={
                saving ||
                publishing
            }
            className="
                inline-flex
                h-10
                min-w-0
                flex-1
                cursor-pointer
                items-center
                justify-center
                gap-2
                rounded-[0.375rem]
                border
                border-admin-primary/30
                bg-white
                px-3
                text-[0.8125rem]
                font-medium
                text-admin-heading
                transition-colors
                hover:bg-admin-surface
                disabled:pointer-events-none
                disabled:opacity-50
                sm:flex-none
                sm:px-4
            "
        >
            <Save className="size-4 shrink-0" />

            <span className="truncate">
                {saving
                    ? "Saving..."
                    : "Save as Draft"}
            </span>
        </button>
    );

    const publishButton = (
        <button
            type="button"
            onClick={handlePublish}
            disabled={
                saving ||
                publishing
            }
            className="
                inline-flex
                h-10
                min-w-0
                w-full
                cursor-pointer
                items-center
                justify-center
                gap-2
                rounded-md
                bg-admin-primary
                px-3
                text-[0.8125rem]
                font-semibold
                text-white
                transition-colors
                hover:bg-admin-primary-hover
                disabled:pointer-events-none
                disabled:opacity-50
                sm:w-auto
                sm:flex-none
                sm:px-4
            "
        >
            <Send className="size-4 shrink-0" />

            <span className="truncate">
                {publishing
                    ? "Publishing..."
                    : "Publish Article"}
            </span>
        </button>
    );

    return (
        <div
            className="
                min-w-0
                space-y-5
                pb-24
                sm:pb-0
            "
        >
            <PageHero
                breadcrumbs={[
                    "Dashboard",
                    title,
                ]}
                title={title}
                description={description}
                actions={
                    <div className="hidden items-center gap-2 sm:flex">
                        {resetButton}
                        {saveDraftButton}
                        {publishButton}
                    </div>
                }
            />

            <form
                ref={formRef}
                onSubmit={(event) => {
                    event.preventDefault();
                }}
            >
                <div
                    className="
                        grid
                        min-w-0
                        gap-5
                        xl:grid-cols-[minmax(0,1.55fr)_minmax(20rem,0.9fr)]
                        2xl:gap-6
                    "
                >
                    <div className="min-w-0 space-y-5">
                        <FormSection
                            title="Details"
                            description="Update the information."
                        >
                            <div
                                className="
                                    grid
                                    min-w-0
                                    gap-4
                                    md:grid-cols-2
                                "
                            >
                                <FormField
                                    label="Title"
                                    htmlFor="article-title"
                                    required
                                    className="md:col-span-2"
                                >
                                    <div className="flex min-w-0 gap-2">
                                        <div className="min-w-0 flex-1">
                                            <FormInput
                                                id="article-title"
                                                value={
                                                    values.title
                                                }
                                                onChange={(
                                                    event,
                                                ) => {
                                                    const newTitle =
                                                        event
                                                            .target
                                                            .value;

                                                    setValues(
                                                        (current) => ({
                                                            ...current,
                                                            title: newTitle,
                                                            slug: slugEditing
                                                                ? current.slug
                                                                : slugify(
                                                                    newTitle,
                                                                ),
                                                        }),
                                                    );
                                                }}
                                                placeholder="Enter title"
                                                required
                                            />
                                        </div>

                                        <ResetButton
                                            onClick={() =>
                                                resetField(
                                                    "title",
                                                )
                                            }
                                            disabled={
                                                !hasFieldChanges(
                                                    "title",
                                                )
                                            }
                                        />
                                    </div>
                                </FormField>

                                <FormField
                                    label="Slug"
                                    htmlFor="article-slug"
                                    description="The URL-friendly version of the title."
                                    className="md:col-span-2"
                                >
                                    <div className="relative">
                                        <FormInput
                                            id="article-slug"
                                            value={
                                                values.slug
                                            }
                                            disabled={
                                                !slugEditing
                                            }
                                            onChange={(
                                                event,
                                            ) =>
                                                updateValue(
                                                    "slug",
                                                    slugify(
                                                        event
                                                            .target
                                                            .value,
                                                    ),
                                                )
                                            }
                                            placeholder="enter-url-slug"
                                            className="pr-11"
                                        />

                                        {!slugEditing && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSlugEditing(
                                                        true,
                                                    )
                                                }
                                                aria-label="Edit slug"
                                                title="Edit slug"
                                                className="
                                                    absolute
                                                    right-2
                                                    top-1/2
                                                    flex
                                                    size-8
                                                    -translate-y-1/2
                                                    cursor-pointer
                                                    items-center
                                                    justify-center
                                                    rounded-md
                                                    text-admin-muted
                                                    transition-colors
                                                    hover:bg-admin-surface
                                                    hover:text-admin-heading
                                                "
                                            >
                                                <Edit2 className="size-4" />
                                            </button>
                                        )}

                                        {hasFieldChanges(
                                            "slug",
                                        ) && (
                                                <div className="absolute right-11 top-1/2 -translate-y-1/2">
                                                    <ResetButton
                                                        onClick={() =>
                                                            resetField(
                                                                "slug",
                                                            )
                                                        }
                                                        label="Reset slug"
                                                    />
                                                </div>
                                            )}
                                    </div>
                                </FormField>

                                <FormField
                                    label="Short Description"
                                    htmlFor="article-excerpt"
                                    required
                                    className="md:col-span-2"
                                >
                                    <div className="flex min-w-0 gap-2">
                                        <div className="min-w-0 flex-1">
                                            <FormTextarea
                                                id="article-excerpt"
                                                value={
                                                    values.excerpt
                                                }
                                                onChange={(
                                                    event,
                                                ) =>
                                                    updateValue(
                                                        "excerpt",
                                                        event
                                                            .target
                                                            .value,
                                                    )
                                                }
                                                placeholder="Write a short description..."
                                                rows={4}
                                                required
                                            />
                                        </div>

                                        <ResetButton
                                            onClick={() =>
                                                resetField(
                                                    "excerpt",
                                                )
                                            }
                                            disabled={
                                                !hasFieldChanges(
                                                    "excerpt",
                                                )
                                            }
                                        />
                                    </div>
                                </FormField>

                                <FormField
                                    label="Category"
                                    htmlFor="article-category"
                                    required
                                >
                                    <div className="flex min-w-0 gap-2">
                                        <div className="min-w-0 flex-1">
                                            <FormSelect
                                                id="article-category"
                                                value={
                                                    values.category
                                                }
                                                onChange={(
                                                    event,
                                                ) =>
                                                    updateValue(
                                                        "category",
                                                        event
                                                            .target
                                                            .value as ArticleCategory | "",
                                                    )
                                                }
                                                required
                                            >
                                                <option value="">
                                                    Select category
                                                </option>

                                                {categories.map(
                                                    (
                                                        category,
                                                    ) => (
                                                        <option
                                                            key={
                                                                category.value
                                                            }
                                                            value={
                                                                category.value
                                                            }
                                                        >
                                                            {
                                                                category.label
                                                            }
                                                        </option>
                                                    ),
                                                )}
                                            </FormSelect>
                                        </div>

                                        <ResetButton
                                            onClick={() =>
                                                resetField(
                                                    "category",
                                                )
                                            }
                                            disabled={
                                                !hasFieldChanges(
                                                    "category",
                                                )
                                            }
                                        />
                                    </div>
                                </FormField>

                                {showAuthor && (
                                    <FormField
                                        label="Author"
                                        htmlFor="article-author"
                                    >
                                        <div className="flex min-w-0 gap-2">
                                            <div className="min-w-0 flex-1">
                                                <FormInput
                                                    id="article-author"
                                                    value={
                                                        values.author
                                                    }
                                                    onChange={(
                                                        event,
                                                    ) =>
                                                        updateValue(
                                                            "author",
                                                            event
                                                                .target
                                                                .value,
                                                        )
                                                    }
                                                    placeholder="Enter author"
                                                />
                                            </div>

                                            <ResetButton
                                                onClick={() =>
                                                    resetField(
                                                        "author",
                                                    )
                                                }
                                                disabled={
                                                    !hasFieldChanges(
                                                        "author",
                                                    )
                                                }
                                            />
                                        </div>
                                    </FormField>
                                )}

                                {showPublishedDate && (
                                    <FormField
                                        label="Publish Date"
                                        htmlFor="article-published-at"
                                    >
                                        <div className="flex min-w-0 gap-2">
                                            <div className="min-w-0 flex-1">
                                                <FormInput
                                                    id="article-published-at"
                                                    name="article-published-at"
                                                    type="datetime-local"
                                                    value={
                                                        values.publishedAt
                                                    }
                                                    onChange={(
                                                        event,
                                                    ) =>
                                                        updateValue(
                                                            "publishedAt",
                                                            event
                                                                .target
                                                                .value,
                                                        )
                                                    }
                                                />
                                            </div>

                                            <ResetButton
                                                onClick={() =>
                                                    resetField(
                                                        "publishedAt",
                                                    )
                                                }
                                                disabled={
                                                    !hasFieldChanges(
                                                        "publishedAt",
                                                    )
                                                }
                                            />
                                        </div>
                                    </FormField>
                                )}

                                {showFeatured && (
                                    <div className="min-w-0">
                                        <FormCheckbox
                                            name="featured"
                                            checked={
                                                values.featured
                                            }
                                            onChange={(
                                                event,
                                            ) =>
                                                updateValue(
                                                    "featured",
                                                    event
                                                        .target
                                                        .checked,
                                                )
                                            }
                                            label="Featured"
                                            description="Show this article in featured sections."
                                        />

                                        <div className="mt-2 flex justify-end">
                                            <ResetButton
                                                onClick={() =>
                                                    resetField(
                                                        "featured",
                                                    )
                                                }
                                                disabled={
                                                    !hasFieldChanges(
                                                        "featured",
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                )}

                                {showStatus &&
                                    statusOptions.length >
                                    0 && (
                                        <FormField
                                            label="Status"
                                            htmlFor="article-status"
                                        >
                                            <div className="flex min-w-0 gap-2">
                                                <div className="min-w-0 flex-1">
                                                    <FormSelect
                                                        id="article-status"
                                                        value={
                                                            values.status
                                                        }
                                                        onChange={(
                                                            event,
                                                        ) =>
                                                            updateValue(
                                                                "status",
                                                                event
                                                                    .target
                                                                    .value as ArticleStatus,
                                                            )
                                                        }
                                                    >
                                                        {statusOptions.map(
                                                            (
                                                                option,
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </option>
                                                            ),
                                                        )}
                                                    </FormSelect>
                                                </div>

                                                <ResetButton
                                                    onClick={() =>
                                                        resetField(
                                                            "status",
                                                        )
                                                    }
                                                    disabled={
                                                        !hasFieldChanges(
                                                            "status",
                                                        )
                                                    }
                                                />
                                            </div>
                                        </FormField>
                                    )}

                                {showTags &&
                                    tags.length > 0 && (
                                        <FormField
                                            label="Tags"
                                            description="Choose one or more tags."
                                            className="md:col-span-2"
                                        >
                                            <div className="mb-2 flex justify-end">
                                                <ResetButton
                                                    onClick={() =>
                                                        resetField(
                                                            "tags",
                                                        )
                                                    }
                                                    disabled={
                                                        !hasFieldChanges(
                                                            "tags",
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div
                                                className="
                                                    grid
                                                    min-w-0
                                                    grid-cols-1
                                                    gap-2
                                                    sm:grid-cols-2
                                                    lg:grid-cols-3
                                                "
                                            >
                                                {tags.map(
                                                    (
                                                        tag,
                                                    ) => {
                                                        const selected =
                                                            values.tags.includes(
                                                                tag.value,
                                                            );

                                                        return (
                                                            <label
                                                                key={
                                                                    tag.value
                                                                }
                                                                className={[
                                                                    "flex min-w-0 cursor-pointer items-center gap-2.5",
                                                                    "rounded-[0.5rem] border border-admin",
                                                                    "px-3 py-2.5",
                                                                    "transition-colors",
                                                                    selected
                                                                        ? "bg-admin-blue-soft"
                                                                        : "bg-admin-card hover:bg-admin-surface-hover",
                                                                ].join(
                                                                    " ",
                                                                )}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        selected
                                                                    }
                                                                    onChange={() =>
                                                                        toggleTag(
                                                                            tag.value,
                                                                        )
                                                                    }
                                                                    className="
                                                                        h-4
                                                                        w-4
                                                                        shrink-0
                                                                        rounded
                                                                        border-admin
                                                                        accent-admin-primary
                                                                    "
                                                                />

                                                                <span className="min-w-0 truncate text-sm text-admin">
                                                                    {
                                                                        tag.label
                                                                    }
                                                                </span>
                                                            </label>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </FormField>
                                    )}
                            </div>
                        </FormSection>

                        <FormSection
                            title="Cover Image"
                            description="Upload an image for this article."
                        >
                            <div className="mb-3 flex justify-end">
                                <ResetButton
                                    onClick={() =>
                                        resetField(
                                            "image",
                                        )
                                    }
                                    disabled={
                                        !hasFieldChanges(
                                            "image",
                                        )
                                    }
                                />
                            </div>

                            <FormImageUpload
                                value={
                                    values.image?.value ??
                                    null
                                }
                                imageType={
                                    values.image?.type ??
                                    ARTICLE_IMAGE_TYPE.APPWRITE
                                }
                                onChange={(
                                    file,
                                    preview,
                                    imageType,
                                ) =>
                                    handleImageChange(
                                        file,
                                        preview,
                                        imageType,
                                    )
                                }
                            />
                        </FormSection>

                        <FormSection
                            title={contentLabel}
                            description="Write the full article content."
                        >
                            <div className="mb-3 flex justify-end">
                                <ResetButton
                                    onClick={() =>
                                        resetField(
                                            "content",
                                        )
                                    }
                                    disabled={
                                        !hasFieldChanges(
                                            "content",
                                        )
                                    }
                                />
                            </div>

                            <FormContentEditor
                                label={contentLabel}
                                value={
                                    values.content
                                }
                                onChange={(value) =>
                                    updateValue(
                                        "content",
                                        value,
                                    )
                                }
                                placeholder="Write your article here..."
                            />
                        </FormSection>

                        {/* Bottom actions on larger screens */}
                        <div
                            className="
                                hidden
                                border-t
                                border-admin
                                pt-5
                                sm:flex
                                sm:justify-center
                            "
                        >
                            <div className="flex items-center justify-center gap-2">
                                {resetButton}
                                {saveDraftButton}
                                {publishButton}
                            </div>
                        </div>
                    </div>

                    <aside className="min-w-0">
                        <div className="xl:sticky xl:top-5">
                            <section
                                className="
                                    min-w-0
                                    overflow-hidden
                                    rounded-[0.7rem]
                                    bg-admin-card
                                    shadow-admin-card
                                "
                            >
                                <div
                                    className="
                                        border-b
                                        border-admin
                                        px-3
                                        py-3
                                        sm:px-4
                                    "
                                >
                                    <h2 className="text-base font-semibold text-admin-heading">
                                        {previewTitle}
                                    </h2>

                                    <p className="mt-1 text-xs leading-relaxed text-admin-muted sm:text-sm">
                                        Live preview
                                    </p>
                                </div>

                                <div className="min-w-0 p-3 sm:p-4">
                                    <ContentDetails
                                        {...previewData}
                                    />
                                </div>
                            </section>
                        </div>
                    </aside>
                </div>
            </form>

            {/* Mobile fixed action bar */}
            <div
                className="
                    fixed
                    inset-x-0
                    bottom-0
                    z-40
                    border-t
                    border-admin
                    bg-admin-page/95
                    px-3
                    py-3
                    shadow-admin-card
                    backdrop-blur
                    sm:hidden
                "
            >
                <FormActions>
                    <div className="flex w-full flex-col gap-2">
                        <div className="flex w-full gap-2">
                            <div className="flex min-w-0 flex-1">
                                <div className="w-full [&>button]:w-full">
                                    {resetButton}
                                </div>
                            </div>

                            <div className="flex min-w-0 flex-1">
                                <div className="w-full">
                                    {saveDraftButton}
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            {publishButton}
                        </div>
                    </div>
                </FormActions>
            </div>
        </div>
    );
}