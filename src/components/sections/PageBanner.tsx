import Image from "next/image";
export function PageBanner({
  image = "/images/friends.jpg",
  alt = "Freunde stehen gemeinsam vor einer Berglandschaft",
  compact = false,
}: {
  image?: string;
  alt?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-paper ${compact ? "mx-auto aspect-[3/1] max-w-5xl" : "h-60 sm:h-80 lg:h-[28rem]"}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-forest/10" />
    </div>
  );
}
