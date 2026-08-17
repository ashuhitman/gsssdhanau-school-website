import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { ImageCard } from "../ui/ImageCard";




interface Faculty {
    name: string;
    designation: string;
    subject: string;
    image: string;
}

const faculty: Faculty[] = [
    {
        name: "Mr. Ashutosh Singh",
        designation: "Basic Computer",
        subject: "Instructor",
        image: "/images/faculty/ashutosh-singh.jpg",
    },
    {
        name: "Mr. Satram Das",
        designation: "Lecturer",
        subject: "English",
        image: "/images/faculty/satram-das.jpg",
    },
    {
        name: "Mr. Rajesh Kumar",
        designation: "Lecturer",
        subject: "Physics",
        image: "/images/faculty/rajesh-kumar.jpg",
    },
    {
        name: "Mrs. Sunita Rani",
        designation: "Lecturer",
        subject: "Hindi",
        image: "/images/faculty/sunita-rani.jpg",
    },
];

export default function FacultyPreview() {
    return (
        <section className="mb-12 rounded-xl border border-border bg-background p-5 sm:p-7">
            <SectionHeading
                title="Our Faculty"
                href="/academics/faculty"
                linkLabel="View All Faculty"
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {faculty.map((person) => (
                    <ImageCard key={person.name} title={person.name} image="/images/school-building.jpg" description={person.subject} />

                ))}
            </div>
        </section>
    );
}