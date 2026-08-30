
import Image from "next/image";

interface NewsletterCoverPageProps {
    title?: string;
    coverImage?: string | null;
    schoolName?: string;
    issue?: string;
    date?: string;
    subtitle?: string;
}

export default function NewsletterCoverPage({
    title = "CAMPUS CHRONICLES",
    coverImage,
    schoolName = "PM SHRI GSSS DHANAU",
    issue = "Issue #01",
    date = "AUGUST 2026",
    subtitle = "STUDENT LIFE • ACTIVITIES • ACHIEVEMENTS • STORIES",
}: NewsletterCoverPageProps) {
    const titleParts = title.trim().split(/\s+/);

    const firstLine =
        titleParts.length > 1
            ? titleParts.slice(0, -1).join(" ")
            : title;

    const secondLine =
        titleParts.length > 1
            ? titleParts[titleParts.length - 1]
            : "";

    return (
        <div className="w-full">
            <div
                className="
                    relative
                    mx-auto
                    w-full
                    overflow-hidden
                  
                    bg-[#162556]
                    shadow-[0_1rem_2.5rem_rgba(0,0,0,0.25)]
                    aspect-[210/297]
                    [container-type:size]
                "
            >
                {/* ============================================================
                    COVER
                ============================================================ */}

                <div className="absolute inset-0 bg-[#162556]">

                    {/* ========================================================
                        TOP PUBLICATION BAR
                    ======================================================== */}

                    <div
                        className="
                            absolute
                            inset-x-0
                            top-0
                            z-30
                            flex
                            items-start
                            justify-between
                            px-[4.8cqw]
                            pt-[3.1cqw]
                        "
                    >
                        {/* School name */}

                        <div
                            className="
                                min-w-0
                                max-w-[30%]
                                truncate
                                text-[1.55cqw]
                                font-semibold
                                uppercase
                                leading-none
                                tracking-[0.15em]
                                text-white/75
                            "
                        >
                            {schoolName}
                        </div>

                        {/* Center label */}

                        <div
                            className="
                                absolute
                                left-1/2
                                max-w-[35%]
                                -translate-x-1/2
                                truncate
                                text-[1.4cqw]
                                font-medium
                                uppercase
                                leading-none
                                tracking-[0.12em]
                                text-white/60
                            "
                        >
                            SCHOOL NEWSLETTER
                        </div>

                        {/* Issue */}

                        <div
                            className="
                                max-w-[30%]
                                truncate
                                text-right
                                text-[1.55cqw]
                                font-bold
                                uppercase
                                leading-none
                                tracking-[0.12em]
                                text-white/80
                            "
                        >
                            {issue}
                        </div>
                    </div>

                    {/* ========================================================
                        VERTICAL SIDE TEXT
                    ======================================================== */}

                    <div
                        className="
                            absolute
                            left-[0.95cqw]
                            top-[18.5cqw]
                            z-30
                            origin-top-left
                            -rotate-90
                            whitespace-nowrap
                            text-[1.3cqw]
                            font-semibold
                            uppercase
                            leading-none
                            tracking-[0.18em]
                            text-white/50
                        "
                    >
                        STUDENT VOICE • CAMPUS LIFE
                    </div>

                    <div
                        className="
                            absolute
                            right-[0.95cqw]
                            top-[20cqw]
                            z-30
                            origin-top-right
                            rotate-90
                            whitespace-nowrap
                            text-[1.3cqw]
                            font-semibold
                            uppercase
                            leading-none
                            tracking-[0.18em]
                            text-white/45
                        "
                    >
                        INSPIRE • CREATE • LEARN
                    </div>

                    {/* ========================================================
                        TITLE AREA
                    ======================================================== */}

                    <div
                        className="
                            absolute
                            inset-x-0
                            top-[7%]
                            z-20
                            flex
                            flex-col
                            items-center
                            px-[7cqw]
                            text-center
                            text-white
                        "
                    >
                        {/* School name above title */}

                        <div
                            className="
                                mb-[1.4cqw]
                                max-w-[80%]
                                truncate
                                text-[clamp(0.55rem,2.2cqw,1rem)]
                                font-semibold
                                uppercase
                                leading-none
                                tracking-[0.18em]
                                text-white/70
                            "
                        >
                            {schoolName}
                        </div>

                        <h1
                            className="
                                flex
                                w-full
                                max-w-full
                                flex-col
                                items-center
                                text-[clamp(1.5rem,8.8cqw,4.5rem)]
                                font-black
                                uppercase
                                leading-[0.86]
                                tracking-[-0.045em]
                                [text-wrap:balance]
                            "
                        >
                            <span className="block max-w-full break-words">
                                {firstLine}
                            </span>

                            {secondLine && (
                                <span className="block max-w-full break-words">
                                    {secondLine}
                                </span>
                            )}
                        </h1>

                        {/* Divider */}

                        <div
                            className="
                                mt-[2.7cqw]
                                h-[0.22cqw]
                                w-[14cqw]
                                max-w-[4rem]
                                bg-white/70
                            "
                        />

                        {/* Subtitle */}

                        <p
                            className="
                                mt-[1.8cqw]
                                max-w-[75%]
                                text-[clamp(0.42rem,1.7cqw,0.85rem)]
                                font-medium
                                uppercase
                                leading-[1.4]
                                tracking-[0.15em]
                                text-white/70
                                [text-wrap:balance]
                            "
                        >
                            {subtitle}
                        </p>
                    </div>

                    {/* ========================================================
                        IMAGE
                    ======================================================== */}

                    <div
                        className="
                            absolute
                            inset-x-0
                            bottom-0
                            top-[27%]
                        "
                    >
                        {coverImage ? (
                            <Image
                                src={coverImage}
                                alt={title}
                                fill
                                priority
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 40rem"
                                className="object-cover object-center"
                            />
                        ) : (
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-[#314675]
                                "
                            >
                                <div
                                    className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        text-[2cqw]
                                        uppercase
                                        tracking-[0.15em]
                                        text-white/50
                                    "
                                >
                                    Cover Image
                                </div>
                            </div>
                        )}

                        {/* Image top blend */}

                        <div
                            className="
                                absolute
                                inset-x-0
                                top-0
                                h-[25%]
                                bg-gradient-to-b
                                from-[#162556]
                                via-[#162556]/85
                                to-transparent
                            "
                        />

                        {/* Image bottom blend */}

                        <div
                            className="
                                absolute
                                inset-x-0
                                bottom-0
                                h-[30%]
                                bg-gradient-to-t
                                from-[#091735]
                                via-[#091735]/65
                                to-transparent
                            "
                        />

                        {/* Slight overall contrast */}

                        <div className="absolute inset-0 bg-black/[0.04]" />
                    </div>

                    {/* ========================================================
                        ISSUE / STORY LABEL
                    ======================================================== */}

                    <div
                        className="
                            absolute
                            left-[10%]
                            top-[29%]
                            z-20
                            max-w-[35%]
                        "
                    >
                        <p
                            className="
                                text-[1.55cqw]
                                font-bold
                                uppercase
                                leading-none
                                tracking-[0.13em]
                                text-white
                            "
                        >
                            IN THIS ISSUE
                        </p>

                        <div
                            className="
                                mt-[1.2cqw]
                                h-[0.22cqw]
                                w-[9cqw]
                                max-w-[2rem]
                                bg-white/80
                            "
                        />

                        <p
                            className="
                                mt-[1.4cqw]
                                text-[1.35cqw]
                                font-medium
                                uppercase
                                leading-[1.5]
                                tracking-[0.08em]
                                text-white/80
                            "
                        >
                            STUDENT STORIES
                            <br />
                            CAMPUS HIGHLIGHTS
                        </p>
                    </div>

                    {/* ========================================================
                        BOTTOM TAGLINE
                    ======================================================== */}

                    <div
                        className="
                            absolute
                            inset-x-0
                            bottom-[4.5%]
                            z-30
                            flex
                            justify-center
                            px-[5cqw]
                        "
                    >
                        <div
                            className="
                                flex
                                max-w-full
                                items-center
                                gap-[2.6cqw]
                                text-[clamp(0.5rem,2.1cqw,1rem)]
                                font-bold
                                uppercase
                                leading-none
                                tracking-[0.13em]
                                text-white
                            "
                        >
                            <span>INSPIRE</span>

                            <span className="text-white/60">•</span>

                            <span>EXPRESS</span>

                            <span className="text-white/60">•</span>

                            <span>IMPACT</span>
                        </div>
                    </div>

                    {/* ========================================================
                        DATE
                    ======================================================== */}

                    <div
                        className="
                            absolute
                            bottom-[1.7%]
                            left-1/2
                            z-30
                            max-w-[70%]
                            -translate-x-1/2
                            truncate
                            whitespace-nowrap
                            text-[1.3cqw]
                            font-medium
                            uppercase
                            leading-none
                            tracking-[0.16em]
                            text-white/55
                        "
                    >
                        {date}
                    </div>

                    {/* ========================================================
                        INNER BORDER
                    ======================================================== */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-[1.35cqw]
                            z-50
                            rounded-[0.4rem]
                            border
                            border-white/[0.09]
                        "
                    />

                    {/* ========================================================
                        SPINE / EDGE
                    ======================================================== */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-y-0
                            left-0
                            z-50
                            w-[0.85cqw]
                            bg-white/[0.08]
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-y-0
                            right-0
                            z-50
                            w-[0.55cqw]
                            bg-black/[0.15]
                        "
                    />
                </div>
            </div>
        </div>
    );
}
