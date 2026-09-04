"use client";

import { useMemo, useState } from "react";

import {
    BookOpen,
    ClipboardList,
    FlaskConical,
    GraduationCap,
    Laptop,
    UsersRound,
    Wrench,
} from "lucide-react";

import type { Faculty } from "@/lib/data/faculty/types";
import { FACULTY_CATEGORY } from "@/lib/data/faculty/constants";

import { FacultyCard } from "./FacultyCard";

/* ============================================================
   Filter Types
============================================================ */

type FilterId =
    | "all"
    | Faculty["category"];

/* ============================================================
   Filters
============================================================ */

const filters: {
    id: FilterId;
    label: string;
    icon: typeof GraduationCap;
}[] = [
        {
            id: "all",
            label: "All Staff",
            icon: UsersRound,
        },
        {
            id: FACULTY_CATEGORY.LECTURER,
            label: "Lecturers",
            icon: GraduationCap,
        },
        {
            id: FACULTY_CATEGORY.TEACHER,
            label: "Teachers",
            icon: BookOpen,
        },
        {
            id: FACULTY_CATEGORY.BCI,
            label: "Computer Anudeshak",
            icon: Laptop,
        },
        {
            id: FACULTY_CATEGORY.LAB_ATTENDANT,
            label: "Lab Attendants",
            icon: FlaskConical,
        },
        {
            id: FACULTY_CATEGORY.UDC,
            label: "UDC",
            icon: ClipboardList,
        },
        {
            id: FACULTY_CATEGORY.VT,
            label: "VT",
            icon: Wrench,
        },
        {
            id: FACULTY_CATEGORY.OTHER,
            label: "Other Staff",
            icon: UsersRound,
        },
    ];

/* ============================================================
   Faculty Directory
============================================================ */

export function FacultyDirectoryClient({
    faculty,
}: {
    faculty: Faculty[];
}) {
    /*
     * Principal is displayed separately
     * in FacultyPrincipal.
     */

    const staff = useMemo(
        () =>
            faculty.filter(
                (member) =>
                    member.category !==
                    FACULTY_CATEGORY.PRINCIPAL
            ),
        [faculty]
    );

    const [
        activeFilter,
        setActiveFilter,
    ] = useState<FilterId>("all");

    /* ========================================================
       Filter Faculty
    ======================================================== */

    const filteredFaculty = useMemo(() => {
        if (activeFilter === "all") {
            return staff;
        }

        return staff.filter(
            (member) =>
                member.category === activeFilter
        );
    }, [staff, activeFilter]);

    /* ========================================================
       Filter Count
    ======================================================== */

    const getFilterCount = (
        filterId: FilterId
    ) => {
        if (filterId === "all") {
            return staff.length;
        }

        return staff.filter(
            (member) =>
                member.category === filterId
        ).length;
    };

    /* ========================================================
       Render
    ======================================================== */

    return (
        <div>
            {/* ==================================================
                Filters
            ================================================== */}

            <div
                className="
                    mb-6
                    flex
                    gap-2
                    overflow-x-auto
                    pb-2
                    scrollbar-none
                "
            >
                {filters.map((filter) => {
                    const Icon = filter.icon;

                    const count =
                        getFilterCount(
                            filter.id
                        );

                    const active =
                        activeFilter ===
                        filter.id;

                    /*
                     * Don't show an empty
                     * category.
                     */

                    if (
                        filter.id !== "all" &&
                        count === 0
                    ) {
                        return null;
                    }

                    return (
                        <button
                            key={filter.id}
                            type="button"
                            onClick={() =>
                                setActiveFilter(
                                    filter.id
                                )
                            }
                            aria-pressed={
                                active
                            }
                            className={`
                                inline-flex
                                shrink-0
                                items-center
                                gap-2
                                rounded-full
                                border
                                px-3.5
                                py-2
                                text-xs
                                font-semibold
                                transition-all
                                duration-200
                                sm:text-sm
                                ${active
                                    ? "border-primary-600 bg-primary-600 text-white shadow-sm"
                                    : "border-border bg-card text-muted-foreground hover:border-primary-300 hover:text-foreground"
                                }
                            `}
                        >
                            <Icon className="size-4" />

                            <span>
                                {filter.label}
                            </span>

                            <span
                                className={`
                                    rounded-full
                                    px-1.5
                                    py-0.5
                                    text-[0.65rem]
                                    ${active
                                        ? "bg-white/15 text-white"
                                        : "bg-muted text-muted-foreground"
                                    }
                                `}
                            >
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* ==================================================
                Result Count
            ================================================== */}

            <div className="mb-4">
                <p
                    className="
                        text-xs
                        text-muted-foreground
                        sm:text-sm
                    "
                >
                    Showing{" "}
                    <span
                        className="
                            font-semibold
                            text-foreground
                        "
                    >
                        {
                            filteredFaculty.length
                        }
                    </span>{" "}
                    {filteredFaculty.length ===
                        1
                        ? "staff member"
                        : "staff members"}
                </p>
            </div>

            {/* ==================================================
                Faculty Cards
            ================================================== */}

            <div
                className="
                    grid
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                "
            >
                {filteredFaculty.map(
                    (member) => (
                        <FacultyCard
                            key={member.id}
                            member={member}
                        />
                    )
                )}
            </div>

            {/* ==================================================
                Empty State
            ================================================== */}

            {filteredFaculty.length ===
                0 && (
                    <div
                        className="
                            rounded-xl
                            border
                            border-dashed
                            border-border
                            bg-muted/30
                            px-6
                            py-12
                            text-center
                        "
                    >
                        <UsersRound
                            className="
                                mx-auto
                                size-8
                                text-muted-foreground
                            "
                        />

                        <p
                            className="
                                mt-3
                                text-sm
                                font-semibold
                                text-foreground
                            "
                        >
                            No staff members found
                        </p>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-muted-foreground
                            "
                        >
                            Try selecting another
                            category.
                        </p>
                    </div>
                )}
        </div>
    );
}