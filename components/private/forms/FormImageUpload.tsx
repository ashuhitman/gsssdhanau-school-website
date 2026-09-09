"use client";

import {
    ImagePlus,
    Link as LinkIcon,
    Trash2,
    Upload,
} from "lucide-react";
import {
    useEffect,
    useId,
    useRef,
    useState,
} from "react";

export type ImageSource =
    | "appwrite"
    | "url";

interface FormImageUploadProps {
    value?: string | null;

    imageType?: ImageSource;

    onChange?: (
        file: File | null,
        preview: string | null,
        imageType: ImageSource
    ) => void;

    label?: string;
    description?: string;
    accept?: string;
    error?: string;
}

export default function FormImageUpload({
    value = null,
    imageType = "appwrite",
    onChange,
    label = "Cover Image",
    description = "PNG, JPG or WEBP. Recommended image size: 1200 × 800.",
    accept = "image/png,image/jpeg,image/webp",
    error,
}: FormImageUploadProps) {
    const inputId = useId();
    const urlInputId = useId();

    const inputRef =
        useRef<HTMLInputElement>(null);

    const objectUrlRef =
        useRef<string | null>(null);

    const [source, setSource] =
        useState<ImageSource>(imageType);

    const [preview, setPreview] =
        useState<string | null>(value);

    const [urlValue, setUrlValue] =
        useState(
            imageType === "url"
                ? value ?? ""
                : ""
        );

    useEffect(() => {
        setSource(imageType);
    }, [imageType]);

    useEffect(() => {
        setPreview(value);

        if (imageType === "url") {
            setUrlValue(value ?? "");
        }
    }, [value, imageType]);

    useEffect(() => {
        return () => {
            revokeObjectUrl();
        };
    }, []);

    function revokeObjectUrl() {
        if (objectUrlRef.current) {
            URL.revokeObjectURL(
                objectUrlRef.current
            );

            objectUrlRef.current = null;
        }
    }

    function handleSourceChange(
        nextSource: ImageSource
    ) {
        if (nextSource === source) {
            return;
        }

        revokeObjectUrl();

        setSource(nextSource);
        setPreview(null);
        setUrlValue("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }

        onChange?.(
            null,
            null,
            nextSource
        );
    }

    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        revokeObjectUrl();

        const objectUrl =
            URL.createObjectURL(file);

        objectUrlRef.current =
            objectUrl;

        setPreview(objectUrl);

        onChange?.(
            file,
            objectUrl,
            "appwrite"
        );
    }

    function handleUrlChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const url =
            event.target.value;

        setSource("url");
        setUrlValue(url);
        setPreview(
            url.trim() || null
        );

        onChange?.(
            null,
            url.trim() || null,
            "url"
        );
    }

    function handleRemove() {
        revokeObjectUrl();

        setPreview(null);
        setUrlValue("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }

        onChange?.(
            null,
            null,
            source
        );
    }

    return (
        <div className="min-w-0">
            {/* Label */}

            <label
                htmlFor={inputId}
                className="
                    mb-1.5
                    block
                    text-sm
                    font-medium
                    text-admin-heading
                "
            >
                {label}
            </label>

            {/* Image source selector */}

            <div
                className="
                    mb-3
                    inline-flex
                    max-w-full
                    rounded-lg
                    border
                    border-admin
                    bg-admin-surface
                    p-1
                "
            >
                <button
                    type="button"
                    onClick={() =>
                        handleSourceChange(
                            "appwrite"
                        )
                    }
                    aria-pressed={
                        source ===
                        "appwrite"
                    }
                    className={[
                        "inline-flex",
                        "min-w-0",
                        "items-center",
                        "justify-center",
                        "gap-2",
                        "rounded-md",
                        "px-3",
                        "py-2",
                        "text-sm",
                        "font-medium",
                        "transition-colors",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-admin-primary",
                        source ===
                            "appwrite"
                            ? "bg-admin-card text-admin-heading shadow-sm"
                            : "text-admin-muted hover:text-admin-heading",
                    ].join(" ")}
                >
                    <Upload
                        className="size-4 shrink-0"
                        aria-hidden="true"
                    />

                    <span>
                        Upload Image
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() =>
                        handleSourceChange(
                            "url"
                        )
                    }
                    aria-pressed={
                        source === "url"
                    }
                    className={[
                        "inline-flex",
                        "min-w-0",
                        "items-center",
                        "justify-center",
                        "gap-2",
                        "rounded-md",
                        "px-3",
                        "py-2",
                        "text-sm",
                        "font-medium",
                        "transition-colors",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-admin-primary",
                        source === "url"
                            ? "bg-admin-card text-admin-heading shadow-sm"
                            : "text-admin-muted hover:text-admin-heading",
                    ].join(" ")}
                >
                    <LinkIcon
                        className="size-4 shrink-0"
                        aria-hidden="true"
                    />

                    <span>
                        Image URL
                    </span>
                </button>
            </div>

            {/* APPWRITE UPLOAD */}

            {source === "appwrite" && (
                <div
                    className="
                        flex
                        min-w-0
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:items-stretch
                    "
                >
                    <label
                        htmlFor={inputId}
                        className="
                            flex
                            min-h-[9rem]
                            min-w-0
                            flex-1
                            cursor-pointer
                            flex-col
                            items-center
                            justify-center
                            rounded-[0.6rem]
                            border
                            border-dashed
                            border-admin
                            bg-admin-surface
                            px-4
                            py-5
                            text-center
                            transition-colors
                            hover:bg-admin-surface-hover
                        "
                    >
                        <div
                            className="
                                flex
                                size-10
                                items-center
                                justify-center
                                rounded-full
                                bg-admin-blue-soft
                            "
                        >
                            <ImagePlus
                                className="
                                    size-5
                                    text-admin-primary
                                "
                                aria-hidden="true"
                            />
                        </div>

                        <p
                            className="
                                mt-2
                                text-sm
                                font-medium
                                text-admin-heading
                            "
                        >
                            {preview
                                ? "Click to change image"
                                : "Click to upload an image"}
                        </p>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-admin-muted
                            "
                        >
                            {description}
                        </p>

                        <input
                            ref={inputRef}
                            id={inputId}
                            type="file"
                            accept={accept}
                            onChange={
                                handleFileChange
                            }
                            className="sr-only"
                        />
                    </label>

                    <Preview
                        preview={preview}
                        onRemove={
                            handleRemove
                        }
                    />
                </div>
            )}

            {/* EXTERNAL URL */}

            {source === "url" && (
                <div
                    className="
                        min-w-0
                        space-y-3
                    "
                >
                    <label
                        htmlFor={urlInputId}
                        className="
                            block
                            text-sm
                            font-medium
                            text-admin-heading
                        "
                    >
                        Image URL
                    </label>

                    <div className="relative min-w-0">
                        <LinkIcon
                            className="
                                pointer-events-none
                                absolute
                                left-3
                                top-1/2
                                size-4
                                -translate-y-1/2
                                text-admin-muted
                            "
                            aria-hidden="true"
                        />

                        <input
                            id={urlInputId}
                            type="url"
                            value={urlValue}
                            onChange={
                                handleUrlChange
                            }
                            placeholder="https://example.com/image.jpg"
                            className="
                                block
                                min-w-0
                                w-full
                                rounded-[0.6rem]
                                border
                                border-admin
                                bg-admin-card
                                py-2.5
                                pl-9
                                pr-3
                                text-sm
                                text-admin-heading
                                outline-none
                                transition-colors
                                placeholder:text-admin-muted
                                focus:border-admin-primary
                                focus:ring-2
                                focus:ring-admin-primary/15
                            "
                        />
                    </div>

                    <div className="w-full sm:w-48">
                        <Preview
                            preview={preview}
                            onRemove={
                                handleRemove
                            }
                        />
                    </div>
                </div>
            )}

            {error && (
                <p
                    role="alert"
                    className="
                        mt-1.5
                        text-xs
                        leading-relaxed
                        text-admin-danger
                    "
                >
                    {error}
                </p>
            )}
        </div>
    );
}

interface PreviewProps {
    preview: string | null;
    onRemove: () => void;
}

function Preview({
    preview,
    onRemove,
}: PreviewProps) {
    return (
        <div
            className="
                relative
                w-full
                shrink-0
                sm:w-48
            "
        >
            {preview ? (
                <div
                    className="
                        relative
                        aspect-4/3
                        overflow-hidden
                        rounded-[0.6rem]
                        border
                        border-admin
                        bg-admin-surface
                    "
                >
                    <img
                        src={preview}
                        alt="Selected image preview"
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                        "
                    />

                    <button
                        type="button"
                        onClick={onRemove}
                        aria-label="Remove image"
                        className="
                            absolute
                            right-2
                            top-2
                            flex
                            size-8
                            items-center
                            justify-center
                            rounded-full
                            bg-black/55
                            text-white
                            backdrop-blur-sm
                            transition-colors
                            hover:bg-black/70
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-white
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-black/50
                        "
                    >
                        <Trash2
                            className="size-4"
                            aria-hidden="true"
                        />
                    </button>
                </div>
            ) : (
                <div
                    className="
                        flex
                        aspect-4/3
                        items-center
                        justify-center
                        rounded-[0.6rem]
                        border
                        border-admin
                        bg-admin-surface
                        px-3
                        text-center
                        text-xs
                        text-admin-muted
                    "
                >
                    No image selected
                </div>
            )}
        </div>
    );
}