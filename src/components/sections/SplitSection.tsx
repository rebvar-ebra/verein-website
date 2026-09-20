import Image from "next/image";
import Link from "next/link";
export function SplitSection({
  title,
  text,
  image,
  alt,
  caption,
  href,
  label,
  reverse = false,
  children,
}: {
  title: string;
  text: string;
  image: string;
  alt: string;
  caption?: string;
  href?: string;
  label?: string;
  reverse?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="shell section-space">
      <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div
          className={`relative overflow-hidden rounded-2xl aspect-[1.55] bg-paper ${reverse ? "md:order-2" : ""}`}
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width:768px) 95vw, 50vw"
            className="object-cover"
          />
          {caption && <p className="absolute bottom-2 right-2 rounded bg-white/90 px-2 py-1 text-xs text-ink">{caption}</p>}
        </div>
        <div className={reverse ? "md:order-1" : ""}>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-5 whitespace-pre-line text-base leading-7 text-ink">{text}</p>
          {children}
          {href && label && (
            <Link href={href} className="button button-orange mt-6">
              {label}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
