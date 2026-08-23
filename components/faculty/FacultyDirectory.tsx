import { getFaculty } from "@/lib/data/faculty";
import { FacultyDirectoryClient } from "./FacultyDirectoryClient";




export async function FacultyDirectory() {
    const faculty =
        await getFaculty();

    return (
        <section className="py-5 sm:py-6">
            <div className="mb-6">
                <p
                    className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-accent-600
                        dark:text-accent-400
                    "
                >
                    Meet Our Team
                </p>

                <h2
                    className="
                        mt-1
                        text-xl
                        font-bold
                        text-foreground
                        sm:text-2xl
                    "
                >
                    Our Faculty & Staff
                </h2>

                <p
                    className="
                        mt-2
                        max-w-2xl
                        text-sm
                        leading-6
                        text-muted-foreground
                    "
                >
                    Meet the dedicated
                    teachers and staff members
                    who contribute to the
                    academic and overall
                    development of our
                    students.
                </p>
            </div>

            <FacultyDirectoryClient
                faculty={faculty}
            />
        </section>
    );
}