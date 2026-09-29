import Image from "next/image";

export function NewsImage({
  src,
  alt,
  featured = false,
}: {
  src: string;
  alt: string;
  featured?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-paper ${featured ? "mx-auto aspect-[16/9] max-w-5xl md:aspect-[5/2]" : "aspect-video w-full"}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={featured}
        sizes={featured ? "(max-width: 1024px) 100vw, 1024px" : "(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"}
        className={featured ? "object-cover object-[50%_25%]" : "object-contain object-center"}
      />
    </div>
  );
}
