import { homepage } from "@/lib/preview-content";
import { BrandMark } from "../ui/arrow";
export function IntroSection() {
  return (
    <section id="ueber-uns" className="bg-forest text-cream">
      <div className="shell section-space grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
        <div>
          <p className="eyebrow text-sage">Das ist Neuer Tag</p>
          <BrandMark className="mt-10 h-28 w-28 text-sage" />
        </div>
        <div>
          <h2 className="section-title">
            Nicht allein.
            <br />
            Sondern{" "}
            <span className="font-serif italic text-sage">zusammen.</span>
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-cream/80">
            {homepage.about}
          </p>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-cream/20 pt-6 text-sm">
            <span>Offen für Menschen</span>
            <span>Offen für Ideen</span>
            <span>Offen für dich</span>
          </div>
          <p className="mt-6 text-xs text-cream/60">
            Entwurf unseres Selbstverständnisses · zur Abstimmung
          </p>
        </div>
      </div>
    </section>
  );
}
