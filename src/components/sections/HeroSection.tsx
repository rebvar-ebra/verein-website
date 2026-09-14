import Image from "next/image";
import { homepage } from "@/lib/preview-content";
import { Arrow, Flower } from "../ui/arrow";

export function HeroSection() {
  return (
    <section className="shell pb-14 pt-12 md:pb-20 md:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="relative py-3">
          <p className="eyebrow mb-7 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-orange" />
            {homepage.eyebrow}
          </p>
          <h1 className="text-[clamp(3.5rem,6.4vw,6rem)] font-medium leading-[1.02] tracking-[-0.065em]">
            {homepage.title.map((line, i) => (
              <span
                key={line}
                className={`block ${i === 2 ? "font-serif italic text-olive" : ""}`}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-muted">
            {homepage.introduction}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#mitmachen" className="button button-orange">
              Mach mit <Arrow />
            </a>
            <a href="#projekte" className="button button-outline">
              Unsere Projekte <Arrow />
            </a>
          </div>
          <div className="mt-9 flex items-center gap-3 text-xs text-muted">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full border border-forest/20 text-lg"
              aria-hidden="true"
            >
              ♡
            </span>
            Weil jede und jeder etwas bewegen kann.
          </div>
        </div>
        <div className="relative pb-6 pr-3 sm:pr-5">
          <div className="relative aspect-[1/1.06] overflow-hidden rounded-t-[45%] rounded-b-3xl bg-sage">
            <Image
              src="/images/friends.jpg"
              alt="Freunde stehen mit den Armen umeinander vor einer Berglandschaft"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 48vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
            <span className="absolute bottom-7 left-7 text-xs text-white/90">
              Zusammen ist ein guter Anfang.
            </span>
          </div>
          <div className="absolute -left-3 bottom-0 flex -rotate-3 items-center gap-4 rounded-2xl bg-sage px-6 py-5 shadow-sm sm:-left-6">
            <Flower className="h-10 w-10 text-forest" />
            <p className="text-lg font-medium leading-tight">
              Kleine Schritte.
              <br />
              Großes Miteinander.
            </p>
          </div>
          <Flower className="absolute right-3 top-8 h-20 w-20 rotate-12 text-orange sm:h-24 sm:w-24" />
        </div>
      </div>
      <div className="mt-14 grid gap-5 border-y border-forest/15 py-6 text-sm sm:grid-cols-3">
        <p className="flex items-center gap-3">
          <span className="text-olive" aria-hidden="true">
            ✳
          </span>
          Gemeinschaft leben
        </p>
        <p className="flex items-center gap-3 sm:justify-center">
          <span className="text-olive" aria-hidden="true">
            ↗
          </span>
          Perspektiven schaffen
        </p>
        <p className="flex items-center gap-3 sm:justify-end">
          <span className="text-olive" aria-hidden="true">
            ♡
          </span>
          Füreinander da sein
        </p>
      </div>
    </section>
  );
}
