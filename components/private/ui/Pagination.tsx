import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems?: number;
    itemsPerPage?: number;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
}: PaginationProps) {
    const firstItem =
        totalItems && totalItems > 0
            ? (currentPage - 1) * (itemsPerPage ?? 1) + 1
            : 0;

    const lastItem =
        totalItems && itemsPerPage
            ? Math.min(
                currentPage * itemsPerPage,
                totalItems
            )
            : 0;

    const pageNumbers = getPageNumbers(
        currentPage,
        totalPages
    );

    return (
        <div
            className="
                flex
                flex-col
                gap-3
                border-t
                border-admin
                px-3
                py-3
                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:px-4
                sm:py-4
                lg:px-5
            "
        >
            {/* Result information */}
            <p className="text-xs text-admin-muted sm:text-sm">
                {totalItems !== undefined ? (
                    <>
                        Showing{" "}
                        <span className="font-semibold text-admin-heading">
                            {firstItem}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold text-admin-heading">
                            {lastItem}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-admin-heading">
                            {totalItems}
                        </span>
                    </>
                ) : (
                    `Page ${currentPage} of ${totalPages}`
                )}
            </p>

            {/* Controls */}
            <div className="flex items-center justify-between gap-1 sm:justify-end">
                <PaginationButton
                    disabled={currentPage === 1}
                    onClick={() =>
                        onPageChange(currentPage - 1)
                    }
                    ariaLabel="Previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </PaginationButton>

                <div className="flex items-center gap-1">
                    {pageNumbers.map((page, index) =>
                        page === "ellipsis" ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="
                                    flex
                                    h-8
                                    min-w-8
                                    items-center
                                    justify-center
                                    px-1
                                    text-xs
                                    text-admin-muted
                                    sm:h-9
                                    sm:min-w-9
                                    sm:text-sm
                                "
                            >
                                …
                            </span>
                        ) : (
                            <PaginationButton
                                key={page}
                                active={
                                    page === currentPage
                                }
                                onClick={() =>
                                    onPageChange(page)
                                }
                                ariaLabel={`Page ${page}`}
                            >
                                {page}
                            </PaginationButton>
                        )
                    )}
                </div>

                <PaginationButton
                    disabled={currentPage === totalPages}
                    onClick={() =>
                        onPageChange(currentPage + 1)
                    }
                    ariaLabel="Next page"
                >
                    <ChevronRight className="h-4 w-4" />
                </PaginationButton>
            </div>
        </div>
    );
}

function PaginationButton({
    children,
    active = false,
    disabled = false,
    onClick,
    ariaLabel,
}: {
    children: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick: () => void;
    ariaLabel: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={[
                "flex h-8 min-w-8 shrink-0 items-center justify-center rounded-[0.4rem] border px-2 text-xs font-medium transition-colors sm:h-9 sm:min-w-9 sm:text-sm",
                active
                    ? "border-admin-primary bg-admin-primary text-white"
                    : "border-admin bg-admin-card text-admin-heading hover:bg-admin-surface-hover",
                disabled
                    ? "cursor-not-allowed opacity-40"
                    : "",
            ].join(" ")}
        >
            {children}
        </button>
    );
}

function getPageNumbers(
    currentPage: number,
    totalPages: number
): Array<number | "ellipsis"> {
    if (totalPages <= 5) {
        return Array.from(
            { length: totalPages },
            (_, index) => index + 1
        );
    }

    if (currentPage <= 3) {
        return [1, 2, 3, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
        return [
            1,
            "ellipsis",
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    return [
        1,
        "ellipsis",
        currentPage,
        "ellipsis",
        totalPages,
    ];
}