import FormActions from "@/components/private/forms/FormActions";

interface ArticleFormActionsProps {
    onSaveDraft?: () => void;
    onPublish?: () => void;
    saving?: boolean;
    publishing?: boolean;
}

export default function ArticleFormActions({
    onSaveDraft,
    onPublish,
    saving = false,
    publishing = false,
}: ArticleFormActionsProps) {
    return (
        <FormActions>
            <button
                type="button"
                onClick={onSaveDraft}
                disabled={saving || publishing}
                className="
                    w-full
                    rounded-[0.5rem]
                    bg-admin-surface
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-admin-heading
                    transition-colors
                    hover:bg-admin-surface-hover
                    disabled:pointer-events-none
                    disabled:opacity-50
                    sm:w-auto
                "
            >
                {saving ? "Saving..." : "Save Draft"}
            </button>

            <button
                type="button"
                onClick={onPublish}
                disabled={saving || publishing}
                className="
                    w-full
                    rounded-[0.5rem]
                    bg-admin-primary
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition-colors
                    hover:bg-admin-primary-hover
                    disabled:pointer-events-none
                    disabled:opacity-50
                    sm:w-auto
                "
            >
                {publishing
                    ? "Publishing..."
                    : "Publish Article"}
            </button>
        </FormActions>
    );
}