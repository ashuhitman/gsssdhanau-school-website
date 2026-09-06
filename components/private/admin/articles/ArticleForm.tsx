"use client";

"use client";

import { useState } from "react";

import {
    ARTICLE_CATEGORY,
    ARTICLE_STATUS,
    ARTICLE_TYPE,
    type ArticleCategory,
    type ArticleStatus,
    type ArticleType,
} from "@/lib/data/article/constants";

import type { Article } from "@/lib/data/article/types";

interface ArticleFormProps {
    article?: Article;
    mode: "create" | "edit";
}

interface FormValues {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    authorBy: string;
    image: string;
    articleType: ArticleType | "";
    category: ArticleCategory[];
    featured: boolean;
    status: ArticleStatus;
}

export default function ArticleForm({
    article,
    mode,
}: ArticleFormProps) {
    const [values, setValues] = useState<FormValues>({
        title: article?.title ?? "",
        slug: article?.slug ?? "",
        excerpt: article?.excerpt ?? "",
        content: article?.content ?? "",
        authorBy: article?.authorBy ?? "",
        image: article?.image ?? "",
        articleType: article?.articleType ?? "",
        category: article?.category ?? [],
        featured: article?.featured ?? false,
        status: article?.status ?? ARTICLE_STATUS.DRAFT,
    });

    function updateValue<K extends keyof FormValues>(
        field: K,
        value: FormValues[K]
    ) {
        setValues((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function toggleCategory(category: ArticleCategory) {
        setValues((current) => ({
            ...current,
            category: current.category.includes(category)
                ? current.category.filter(
                    (item) => item !== category
                )
                : [...current.category, category],
        }));
    }

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        // Server action will be connected next.
        console.log(
            mode === "create" ? "Create" : "Update",
            values
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="min-w-0 space-y-5"
        >
            {/* Basic information */}
            <FormSection
                title="Basic Information"
                description="Add the main information for the article."
            >
                <div className="grid min-w-0 gap-4 lg:grid-cols-2">
                    <FormField
                        label="Title"
                        required
                        className="lg:col-span-2"
                    >
                        <input
                            type="text"
                            value={values.title}
                            onChange={(event) =>
                                updateValue(
                                    "title",
                                    event.target.value
                                )
                            }
                            placeholder="Enter article title"
                            className={inputClassName}
                            required
                        />
                    </FormField>

                    <FormField
                        label="Slug"
                        required
                    >
                        <input
                            type="text"
                            value={values.slug}
                            onChange={(event) =>
                                updateValue(
                                    "slug",
                                    event.target.value
                                )
                            }
                            placeholder="article-slug"
                            className={inputClassName}
                            required
                        />
                    </FormField>

                    <FormField label="Author">
                        <input
                            type="text"
                            value={values.authorBy}
                            onChange={(event) =>
                                updateValue(
                                    "authorBy",
                                    event.target.value
                                )
                            }
                            placeholder="Author name"
                            className={inputClassName}
                        />
                    </FormField>

                    <FormField
                        label="Excerpt"
                        className="lg:col-span-2"
                    >
                        <textarea
                            value={values.excerpt}
                            onChange={(event) =>
                                updateValue(
                                    "excerpt",
                                    event.target.value
                                )
                            }
                            placeholder="Write a short description of the article..."
                            rows={3}
                            className={textareaClassName}
                        />
                    </FormField>
                </div>
            </FormSection>

            {/* Article content */}
            <FormSection
                title="Article Content"
                description="Write the full article content."
            >
                <FormField
                    label="Content"
                    required
                >
                    <textarea
                        value={values.content}
                        onChange={(event) =>
                            updateValue(
                                "content",
                                event.target.value
                            )
                        }
                        placeholder="Write your article..."
                        rows={12}
                        className={textareaClassName}
                        required
                    />
                </FormField>
            </FormSection>

            {/* Classification */}
            <FormSection
                title="Classification"
                description="Choose how the article should be categorized."
            >
                <div className="grid min-w-0 gap-5 lg:grid-cols-2">
                    {/* Article type */}
                    <FormField label="Article Type">
                        <div className="relative">
                            <select
                                value={values.articleType}
                                onChange={(event) =>
                                    updateValue(
                                        "articleType",
                                        event.target.value as
                                        | ArticleType
                                        | ""
                                    )
                                }
                                className={selectClassName}
                            >
                                <option value="">
                                    Select article type
                                </option>

                                {Object.values(
                                    ARTICLE_TYPE
                                ).map((type) => (
                                    <option
                                        key={type}
                                        value={type}
                                    >
                                        {formatValue(type)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </FormField>

                    {/* Image */}
                    <FormField label="Image">
                        <input
                            type="text"
                            value={values.image}
                            onChange={(event) =>
                                updateValue(
                                    "image",
                                    event.target.value
                                )
                            }
                            placeholder="Appwrite image file ID"
                            className={inputClassName}
                        />

                        <p className="mt-1.5 text-xs text-admin-muted">
                            Image upload will be connected when we add
                            the server-side image handling.
                        </p>
                    </FormField>

                    {/* Categories */}
                    <FormField
                        label="Categories"
                        className="lg:col-span-2"
                    >
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {Object.values(
                                ARTICLE_CATEGORY
                            ).map((category) => {
                                const checked =
                                    values.category.includes(
                                        category
                                    );

                                return (
                                    <label
                                        key={category}
                                        className={[
                                            "flex min-w-0 cursor-pointer items-center gap-3",
                                            "rounded-[0.5rem] border border-admin",
                                            "bg-admin-card px-3 py-2.5",
                                            "transition-colors",
                                            checked
                                                ? "border-admin-primary bg-admin-blue-soft"
                                                : "hover:bg-admin-surface-hover",
                                        ].join(" ")}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() =>
                                                toggleCategory(
                                                    category
                                                )
                                            }
                                            className="h-4 w-4 shrink-0 rounded border-admin accent-admin-primary"
                                        />

                                        <span className="min-w-0 truncate text-sm text-admin">
                                            {formatValue(
                                                category
                                            )}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </FormField>
                </div>
            </FormSection>

            {/* Publishing */}
            <FormSection
                title="Publishing"
                description="Control the article's visibility on the website."
            >
                <div className="grid min-w-0 gap-5 lg:grid-cols-2">
                    <FormField label="Status">
                        <select
                            value={values.status}
                            onChange={(event) =>
                                updateValue(
                                    "status",
                                    event.target
                                        .value as ArticleStatus
                                )
                            }
                            className={selectClassName}
                        >
                            <option
                                value={
                                    ARTICLE_STATUS.DRAFT
                                }
                            >
                                Draft
                            </option>

                            <option
                                value={
                                    ARTICLE_STATUS.PUBLISHED
                                }
                            >
                                Published
                            </option>
                        </select>
                    </FormField>

                    <div className="flex items-end">
                        <label className="flex min-h-10 cursor-pointer items-center gap-3 rounded-[0.5rem] border border-admin bg-admin-card px-3 py-2.5">
                            <input
                                type="checkbox"
                                checked={values.featured}
                                onChange={(event) =>
                                    updateValue(
                                        "featured",
                                        event.target.checked
                                    )
                                }
                                className="h-4 w-4 shrink-0 rounded border-admin accent-admin-primary"
                            />

                            <div className="min-w-0">
                                <span className="block text-sm font-medium text-admin-heading">
                                    Featured article
                                </span>

                                <span className="block text-xs text-admin-muted">
                                    Show this article in featured
                                    sections.
                                </span>
                            </div>
                        </label>
                    </div>
                </div>
            </FormSection>

            {/* Actions */}
            <div
                className="
                    flex
                    flex-col-reverse
                    gap-2
                    sm:flex-row
                    sm:justify-end
                "
            >
                <button
                    type="button"
                    className="
                        admin-button-soft
                        w-full
                        rounded-[0.5rem]
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        sm:w-auto
                    "
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="
                        admin-button
                        w-full
                        rounded-[0.5rem]
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        sm:w-auto
                    "
                >
                    {mode === "create"
                        ? "Create Article"
                        : "Save Changes"}
                </button>
            </div>
        </form>
    );
}

function FormSection({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="admin-card min-w-0 rounded-[0.7rem] p-4 sm:p-5 lg:p-6">
            <div className="mb-5">
                <h2 className="text-base font-semibold text-admin-heading sm:text-lg">
                    {title}
                </h2>

                {description && (
                    <p className="mt-1 text-sm text-admin-muted">
                        {description}
                    </p>
                )}
            </div>

            {children}
        </section>
    );
}

function FormField({
    label,
    required = false,
    children,
    className = "",
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={["min-w-0", className].join(" ")}>
            <label className="mb-1.5 block text-sm font-medium text-admin-heading">
                {label}

                {required && (
                    <span className="ml-1 text-admin-danger">
                        *
                    </span>
                )}
            </label>

            {children}
        </div>
    );
}

const inputClassName = `
    h-10
    w-full
    min-w-0
    rounded-[0.5rem]
    border
    border-admin
    bg-admin-card
    px-3
    text-sm
    text-admin-heading
    outline-none
    placeholder:text-admin-subtle
    focus:border-admin-primary
`;

const selectClassName = `
    h-10
    w-full
    min-w-0
    rounded-[0.5rem]
    border
    border-admin
    bg-admin-card
    px-3
    text-sm
    text-admin-heading
    outline-none
    focus:border-admin-primary
`;

const textareaClassName = `
    w-full
    min-w-0
    resize-y
    rounded-[0.5rem]
    border
    border-admin
    bg-admin-card
    px-3
    py-2.5
    text-sm
    leading-relaxed
    text-admin-heading
    outline-none
    placeholder:text-admin-subtle
    focus:border-admin-primary
`;

function formatValue(value: string) {
    return value
        .split("-")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");
}