import { Flower } from "@/components/ui/arrow";
import Link from "next/link";
export function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="shell py-12">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-4xl font-bold tracking-tighter"
            >
              <Flower className="h-8 w-8 text-sage" />
              verein.
            </Link>
            <p className="mt-4 text-sm text-cream/70">
              Miteinander. Füreinander.
            </p>
          </div>
          <nav
            aria-label="Footernavigation"
            className="flex flex-wrap gap-x-12 gap-y-5 text-sm"
          >
            <Link href="/#ueber-uns">Über uns</Link>
            <Link href="/#projekte">Projekte</Link>
            <Link href="/#mitmachen">Mitmachen</Link>
            <Link href="/kontakt">Kontakt</Link>
          </nav>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-5 border-t border-cream/20 pt-6 text-xs text-cream/65">
          <p>Verein · Designvorschau · Texte und Bilder zur Abstimmung</p>
          <div className="flex gap-6">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
