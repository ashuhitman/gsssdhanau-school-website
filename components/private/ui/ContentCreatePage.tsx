"use client";

import {
    useMemo,
    useRef,
    useState,
} from "react";

import PageHero from "./PageHero";
import FormSection from "../forms/FormSection";
import FormField from "../forms/FormField";
import FormInput from "../forms/FormInput";
import FormTextarea from "../forms/FormTextarea";
import FormSelect from "../forms/FormSelect";
import FormCheckbox from "../forms/FormCheckbox";
import FormImageUpload from "../forms/FormImageUpload";
import FormContentEditor from "../forms/FormContentEditor";
import FormActions from "../forms/FormActions";

import ContentDetails from "@/components/content/ContentDetails";

import { Save, Send } from "lucide-react";

import { useSnackbar } from "./Snackbar/SnackbarProvider";
import { titleCase } from "@/lib/utils/utils";

import type {
    ArticleImage,
} from "@/lib/data/article/types";

import type {
    ArticleCategory,
    ArticleStatus,
    ArticleTag,
} from "@/lib/data/article/constants";

import { createArticleAction } from "@/app/(private)/dashboard/admin/articles/actions";

interface ContentCreatePageProps {
    type: string;
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
}

export interface ContentCreateValues {
    title: string;
    excerpt: string;
    content: string;
    category: ArticleCategory | "";
    tags: ArticleTag[];
    author: string;
    publishedAt: string;
    status: ArticleStatus;
    featured: boolean;

    // Preview URL
    image: string | null;

    // Selected file for Appwrite upload
    imageFile: File | null;
}

export default function ContentCreatePage({
    type = "article",
    title,
    description,
    contentLabel = "Content",
    previewTitle = "Content Preview",
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
}: ContentCreatePageProps) {
    const { showSnackbar } = useSnackbar();

    const formRef =
        useRef<HTMLFormElement>(null);

    const [values, setValues] =
        useState<ContentCreateValues>({
            title: "",
            excerpt: "",
            content: "",
            category: "",
            tags: [],
            author: "",
            publishedAt: "",
            status: draftStatus,
            featured: false,
            image: null,
            imageFile: null,
        });

    const [saving, setSaving] =
        useState(false);

    const [publishing, setPublishing] =
        useState(false);

    function updateValue<
        K extends keyof ContentCreateValues,
    >(
        field: K,
        value: ContentCreateValues[K]
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
                        currentTag !== tag
                )
                : [...current.tags, tag],
        }));
    }

    function handleImageChange(
        file: File | null,
        preview: string | null
    ) {
        updateValue(
            "imageFile",
            file
        );

        updateValue(
            "image",
            preview
        );
    }

    function validateForm(
        requirePublishedAt = false
    ) {
        const form =
            formRef.current;

        if (!form) {
            return false;
        }

        const publishDateInput =
            form.elements.namedItem(
                "content-published-at"
            ) as HTMLInputElement | null;

        if (publishDateInput) {
            publishDateInput.setCustomValidity(
                requirePublishedAt &&
                    !values.publishedAt
                    ? "Publish Date is required when publishing."
                    : ""
            );
        }

        const isValid =
            form.reportValidity();

        if (publishDateInput) {
            publishDateInput.setCustomValidity(
                ""
            );
        }

        return isValid;
    }

    /**
     * Build the image object used by the application.
     *
     * Appwrite image:
     * - The actual file ID is assigned by the server action
     *   after upload.
     * - The client only knows that this is an Appwrite image.
     *
     * URL image:
     * - value contains the external URL.
     * - fileId is null.
     */
    function getArticleImage(): ArticleImage | null {
        if (values.imageFile) {
            return {
                value: "",
                type: "appwrite",
                fileId: null,
            };
        }

        if (values.image) {
            return {
                value: values.image,
                type: "url",
                fileId: null,
            };
        }

        return null;
    }

    function getArticleData(
        status: ArticleStatus
    ) {
        return {
            title: values.title,

            slug: values.title
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-"),

            excerpt:
                values.excerpt,

            content:
                values.content,

            authorBy:
                values.author || null,

            image:
                getArticleImage(),

            featured:
                values.featured,

            status,

            publishedAt:
                values.publishedAt ||
                null,

            publishedBy:
                values.author ||
                null,

            category:
                values.category ||
                null,

            articleTags:
                values.tags,
        };
    }

    async function handleSaveDraft() {
        if (!validateForm(false)) {
            return;
        }

        setSaving(true);

        try {
            const result =
                await createArticleAction(
                    getArticleData(
                        draftStatus
                    ),
                    values.imageFile
                );

            if (!result.success) {
                showSnackbar({
                    type: "error",
                    message: result.message,
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

                return;
            }

            setValues((current) => ({
                ...current,
                status: draftStatus,
            }));

            showSnackbar({
                type: "success",
                message: result.message,
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
        } catch (error) {
            console.error(
                "Failed to save article:",
                error
            );

            showSnackbar({
                type: "error",
                message:
                    `${titleCase(type)} failed to save.`,
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
        } finally {
            setSaving(false);
        }
    }

    async function handlePublish() {
        if (!validateForm(true)) {
            return;
        }

        setPublishing(true);

        try {
            const result =
                await createArticleAction(
                    getArticleData(
                        publishedStatus
                    ),
                    values.imageFile
                );

            if (!result.success) {
                showSnackbar({
                    type: "error",
                    message: result.message,
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

                return;
            }

            setValues((current) => ({
                ...current,
                status: publishedStatus,
            }));

            showSnackbar({
                type: "success",
                message: result.message,
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
        } catch (error) {
            console.error(
                `Failed to publish ${type}:`,
                error
            );

            showSnackbar({
                type: "error",
                message:
                    `${titleCase(type)} failed to publish.`,
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
        } finally {
            setPublishing(false);
        }
    }

    const previewData = useMemo(
        () => ({
            title:
                values.title ||
                previewTitle,

            image:
                values.image,

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

            footerLabel:
                title,

            fallbackImage,
        }),
        [
            values,
            previewTitle,
            fallbackImage,
            title,
        ]
    );

    const actionButtons = (
        <>
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
                        : "Save Draft"}
                </span>
            </button>

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
                    flex-1
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
                    sm:flex-none
                    sm:px-4
                "
            >
                <Send className="size-4 shrink-0" />

                <span className="truncate">
                    {publishing
                        ? `Publishing ${type
                            .charAt(0)
                            .toUpperCase() +
                        type.slice(1)
                        }...`
                        : `Publish ${type
                            .charAt(0)
                            .toUpperCase() +
                        type.slice(1)
                        }`}
                </span>
            </button>
        </>
    );

    return (
        <div
            className="
                min-w-0
                space-y-5
                pb-20
                sm:pb-0
            "
        >
            {/* PAGE HERO */}

            <PageHero
                breadcrumbs={[
                    "Dashboard",
                    title,
                ]}
                title={title}
                description={
                    description
                }
                actions={
                    <div className="hidden gap-2 sm:flex">
                        {actionButtons}
                    </div>
                }
            />

            {/* MAIN FORM */}

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
                    {/* FORM */}

                    <div className="min-w-0 space-y-5">
                        <FormSection
                            title="Details"
                            description="Add the basic information."
                        >
                            <div
                                className="
                                    grid
                                    min-w-0
                                    gap-4
                                    md:grid-cols-2
                                "
                            >
                                {/* Title */}

                                <FormField
                                    label="Title"
                                    htmlFor="content-title"
                                    required
                                    className="md:col-span-2"
                                >
                                    <FormInput
                                        id="content-title"
                                        value={
                                            values.title
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            updateValue(
                                                "title",
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        placeholder="Enter title"
                                        required
                                    />
                                </FormField>

                                {/* Short Description */}

                                <FormField
                                    label="Short Description"
                                    htmlFor="content-excerpt"
                                    required
                                    className="md:col-span-2"
                                >
                                    <FormTextarea
                                        id="content-excerpt"
                                        value={
                                            values.excerpt
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            updateValue(
                                                "excerpt",
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        placeholder="Write a short description..."
                                        rows={4}
                                        required
                                    />
                                </FormField>

                                {/* Category */}

                                <FormField
                                    label="Category"
                                    htmlFor="content-category"
                                    required
                                >
                                    <FormSelect
                                        id="content-category"
                                        value={
                                            values.category
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            updateValue(
                                                "category",
                                                event
                                                    .target
                                                    .value as ArticleCategory
                                            )
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select category
                                        </option>

                                        {categories.map(
                                            (
                                                category
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
                                            )
                                        )}
                                    </FormSelect>
                                </FormField>

                                {/* Author */}

                                {showAuthor && (
                                    <FormField
                                        label="Author"
                                        htmlFor="content-author"
                                    >
                                        <FormInput
                                            id="content-author"
                                            value={
                                                values.author
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                updateValue(
                                                    "author",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="Enter author"
                                        />
                                    </FormField>
                                )}

                                {/* Publish Date */}

                                {showPublishedDate && (
                                    <FormField
                                        label="Publish Date"
                                        htmlFor="content-published-at"
                                    >
                                        <FormInput
                                            id="content-published-at"
                                            name="content-published-at"
                                            type="datetime-local"
                                            value={
                                                values.publishedAt
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                updateValue(
                                                    "publishedAt",
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                        />
                                    </FormField>
                                )}

                                {/* Featured */}

                                {showFeatured && (
                                    <div className="min-w-0">
                                        <FormCheckbox
                                            name="featured"
                                            checked={
                                                values.featured
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                updateValue(
                                                    "featured",
                                                    event
                                                        .target
                                                        .checked
                                                )
                                            }
                                            label="Featured"
                                            description="Show this content in featured sections."
                                        />
                                    </div>
                                )}

                                {/* Status */}

                                {showStatus &&
                                    statusOptions.length >
                                    0 && (
                                        <FormField
                                            label="Status"
                                            htmlFor="content-status"
                                        >
                                            <FormSelect
                                                id="content-status"
                                                value={
                                                    values.status
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    updateValue(
                                                        "status",
                                                        event
                                                            .target
                                                            .value as ArticleStatus
                                                    )
                                                }
                                            >
                                                {statusOptions.map(
                                                    (
                                                        option
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
                                                    )
                                                )}
                                            </FormSelect>
                                        </FormField>
                                    )}

                                {/* Tags */}

                                {showTags &&
                                    tags.length >
                                    0 && (
                                        <FormField
                                            label="Tags"
                                            description="Choose one or more tags."
                                            className="md:col-span-2"
                                        >
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
                                                        tag
                                                    ) => {
                                                        const selected =
                                                            values.tags.includes(
                                                                tag.value
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
                                                                    " "
                                                                )}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        selected
                                                                    }
                                                                    onChange={() =>
                                                                        toggleTag(
                                                                            tag.value
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
                                                    }
                                                )}
                                            </div>
                                        </FormField>
                                    )}
                            </div>
                        </FormSection>

                        {/* COVER IMAGE */}

                        <FormSection
                            title="Cover Image"
                            description="Upload an image for this content."
                        >
                            <FormImageUpload
                                value={
                                    values.image
                                }
                                onChange={
                                    handleImageChange
                                }
                            />
                        </FormSection>

                        {/* CONTENT */}

                        <FormSection
                            title={
                                contentLabel
                            }
                            description="Write the full content."
                        >
                            <FormContentEditor
                                label={
                                    contentLabel
                                }
                                value={
                                    values.content
                                }
                                onChange={(
                                    value
                                ) =>
                                    updateValue(
                                        "content",
                                        value
                                    )
                                }
                                placeholder="Write your content here..."
                            />
                        </FormSection>
                    </div>

                    {/* PREVIEW */}

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
                                        {
                                            previewTitle
                                        }
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

            {/* MOBILE STICKY ACTIONS */}

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
                    <div className="flex w-full flex-row gap-2">
                        {actionButtons}
                    </div>
                </FormActions>
            </div>
        </div>
    );
}