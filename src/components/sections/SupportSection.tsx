import Image from "next/image";
import Link from "next/link";
export function SupportSection() {
  return (
    <section id="mitmachen" className="shell section-space">
      <h2 className="mb-10 text-center text-3xl font-medium tracking-tight">
        Unsere Unterstützung braucht auch dich.
      </h2>
      <div className="mx-auto grid max-w-3xl items-start gap-6 sm:grid-cols-2">
        {[
          {
            title: "Mitglied werden",
            text: "Gemeinschaft mitgestalten und Verein begleiten.",
            image: "/images/together.jpg",
            href: "/mitglied-werden",
          },
          {
            title: "Spenden",
            text: "Ideen unterstützen und Möglichkeiten eröffnen.",
            image: "/images/garden.jpg",
            href: "/spenden",
          },
        ].map((item) => (
          <article
            key={item.href}
            id={item.href.slice(1)}
            className="overflow-hidden rounded-2xl border border-forest/20 bg-white/50"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[2/1]">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width:640px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="p-7 text-center">
              <h3 className="text-2xl font-medium">{item.title}</h3>
              <p className="my-4 text-sm leading-6 text-muted">{item.text}</p>
              <Link href={item.href} className="button button-outline w-full">
                {item.title} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
