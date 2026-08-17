import Image from "next/image";

interface GalleryItem {
    src: string;
    alt: string;
    title?: string;
}

interface ActivityGalleryProps {
    items: GalleryItem[];
}

export default function ActivityGallery({
    items,
}: ActivityGalleryProps) {
    return (
        <div
            className="
        grid
        grid-cols-2
        gap-[0.6rem]

        sm:grid-cols-3
        sm:gap-[0.8rem]

        lg:grid-cols-4
        lg:gap-[1rem]
      "
        >
            {items.map((item, index) => (
                <div
                    key={`${item.src}-${index}`}
                    className="
            group
            relative
            aspect-[4/3]
            overflow-hidden
            rounded-[0.8rem]
            bg-surface
          "
                >
                    <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="
              (max-width: 640px) 50vw,
              (max-width: 1024px) 33vw,
              25vw
            "
                        className="
              object-cover
              transition
              duration-500
              group-hover:scale-[1.05]
            "
                    />

                    {item.title && (
                        <div
                            className="
                absolute
                inset-x-0
                bottom-0
                bg-gradient-to-t
                from-black/70
                to-transparent
                p-[0.7rem]
                pt-[2rem]
              "
                        >
                            <p
                                className="
                  text-[0.7rem]
                  font-semibold
                  text-white

                  sm:text-[0.8rem]
                "
                            >
                                {item.title}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}