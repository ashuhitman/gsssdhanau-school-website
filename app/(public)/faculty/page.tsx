import {
    BookOpen,
    BriefcaseBusiness,
    GraduationCap,
    Laptop,
    Mail,
    Medal,
    School,
    Users,
    UserRound,
} from "lucide-react";
import Image from "next/image";

import { PageLayout } from "@/components/layout/PageLayout";
import PageHero from "@/components/common/PageHero";

import { FacultyStats } from "@/components/faculty/FacultyStats";
import { FacultyPrincipal } from "@/components/faculty/FacultyPrincipal";
import { FacultyDirectory } from "@/components/faculty/FacultyDirectory";

export const metadata = {
    title: "Faculty",
};
const staffStats = [
    {
        label: "Lecturers",
        value: "12",
        icon: GraduationCap,
    },
    {
        label: "2nd Grade Teachers",
        value: "07",
        icon: BookOpen,
    },
    {
        label: "3rd Grade Teachers",
        value: "04",
        icon: UserRound,
    },
    {
        label: "Computer Anudeshak",
        value: "01",
        icon: Laptop,
    },
    {
        label: "4th Grade Staff",
        value: "04",
        icon: BriefcaseBusiness,
    },
    {
        label: "Vocational Trainers",
        value: "02",
        icon: Medal,
    },
    {
        label: "Panchayat Shikshak",
        value: "01",
        icon: School,
    },
];

const seniorFaculty = [
    {
        name: "Rakesh Kumar",
        designation: "Sr. Teacher",
        subject: "Mathematics",
        qualification: "M.Sc., B.Ed.",
        image: "/images/faculty/rakesh-kumar.jpg",
    },
    {
        name: "Dharmendra Kumar",
        designation: "Sr. Teacher",
        subject: "Chemistry",
        qualification: "M.Sc., B.Ed.",
        image: "/images/faculty/dharmendra-kumar.jpg",
    },
    {
        name: "Manish Kumar",
        designation: "Sr. Teacher",
        subject: "Physics",
        qualification: "M.Sc., B.Ed.",
        image: "/images/faculty/manish-kumar.jpg",
    },
    {
        name: "Praveen Kumar",
        designation: "Sr. Teacher",
        subject: "Hindi",
        qualification: "M.A., B.Ed.",
        image: "/images/faculty/praveen-kumar.jpg",
    },
    {
        name: "Satram Das",
        designation: "Sr. Teacher",
        subject: "English",
        qualification: "M.A., B.Ed.",
        image: "/images/faculty/satram-das.jpg",
    },
    {
        name: "Mobtar Ram Chaudhary",
        designation: "Sr. Teacher",
        subject: "Sanskrit",
        qualification: "M.A., B.Ed.",
        image: "/images/faculty/mobtar-ram.jpg",
    },
];

const subjectFaculty = [
    {
        name: "Sunita Jakhad",
        subject: "Hindi",
        qualification: "M.A., B.Ed.",
        image: "/images/faculty/sunita-jakhad.jpg",
    },
    {
        name: "Bhomaram Jakhad",
        subject: "English",
        qualification: "M.A., B.Ed.",
        image: "/images/faculty/bhomaram-jakhad.jpg",
    },
    {
        name: "Rakesh Kumar",
        subject: "Mathematics",
        qualification: "M.Sc., B.Ed.",
        image: "/images/faculty/rakesh-kumar.jpg",
    },
    {
        name: "Manish Kumar",
        subject: "Physics",
        qualification: "M.Sc., B.Ed.",
        image: "/images/faculty/manish-kumar.jpg",
    },
    {
        name: "Dharmendra Kumar",
        subject: "Chemistry",
        qualification: "M.Sc., B.Ed.",
        image: "/images/faculty/dharmendra-kumar.jpg",
    },
    {
        name: "Ashutosh Singh",
        subject: "Computer",
        qualification: "M.Sc. (CS), B.Ed.",
        image: "/images/faculty/ashutosh-singh.jpg",
    },
];

const otherStaff = [
    {
        name: "4th Grade Staff",
        value: "04",
        description:
            "Supporting the smooth functioning of school operations.",
        icon: BriefcaseBusiness,
    },
    {
        name: "Vocational Trainers",
        value: "02",
        description:
            "Providing practical skills and vocational training to students.",
        icon: Medal,
    },
    {
        name: "Panchayat Shikshak",
        value: "01",
        description:
            "Supporting primary education and community learning initiatives.",
        icon: Users,
    },
];



export default function FacultyPage() {
    return (
        <PageLayout
            hero={
                <PageHero
                    title="Our Faculty"
                    description="Our dedicated and experienced educators are committed to nurturing young minds, inspiring excellence and building a brighter future."
                    image="/images/faculty/hero.jpg"
                    imageAlt="Faculty of PM SHRI GSSS Dhanau"
                    breadcrumb={[
                        {
                            label: "Faculty",
                        },
                    ]}
                    stats={[
                        {
                            value: "35+",
                            label: "Teaching Staff",
                            icon: <Users className="size-5" />,
                        },
                        {
                            value: "10+",
                            label: "Subjects",
                            icon: <GraduationCap className="size-5" />,
                        },
                        {
                            value: "Years",
                            label: "Years of Excellence",
                            icon: <Medal className="size-5" />,
                        },
                    ]}
                />
            }
        >
            {/* Faculty Stats */}
            <FacultyStats />

            {/* Principal Message */}
            <FacultyPrincipal />

            <FacultyDirectory />







        </PageLayout>
    );
}