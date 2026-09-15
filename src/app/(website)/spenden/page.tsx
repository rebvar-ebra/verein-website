import { BrandMark } from "@/components/ui/arrow";
import { pageMetadata } from "@/lib/cms/metadata";
import { cmsEnabled } from "@/lib/cms/sanity.client";
import { EditorialPage } from "@/components/cms/EditorialPage";
import Link from "next/link";
import {
  PageBanner,
  PageIntro,
  PreviewPanel,
  SplitSection,
} from "@/components/sections/WireframeSections";
export async function generateMetadata() {
  return pageMetadata("donationPage", { title: "Spenden" });
}
export default function Page() {
  if (cmsEnabled) return <EditorialPage type="donationPage"></EditorialPage>;
  return (
    <main id="main-content">
      <PageBanner image="/images/garden.jpg" alt="Vielfältige Gemüseernte" />
      <PageIntro
        title="Spenden"
        text="Gemeinsam können Ideen wachsen. Die folgenden Spendenmöglichkeiten sind im Wireframe vorgesehen und werden nach Freigabe eingerichtet."
      />
      <div className="shell grid gap-6 md:grid-cols-2">
        <PreviewPanel title="Per Banküberweisung">
          <span aria-hidden="true" className="mb-6 block text-4xl">
            ↗
          </span>
          <p>
            Empfänger, IBAN und Verwendungszweck werden nach Bestätigung durch
            Verein ergänzt.
          </p>
          <p className="mt-4 font-medium text-forest">
            Bankverbindung noch nicht verfügbar
          </p>
        </PreviewPanel>
        <PreviewPanel title="Per PayPal">
          <span aria-hidden="true" className="mb-6 block text-4xl">
            <BrandMark className="h-6 w-6" />
          </span>
          <p>
            Der offizielle PayPal-Zugang wird hier verlinkt, sobald er
            eingerichtet und freigegeben ist.
          </p>
          <p className="mt-4 font-medium text-forest">
            PayPal noch nicht verfügbar
          </p>
        </PreviewPanel>
      </div>
      <section className="shell section-space text-center">
        <h2 className="text-3xl font-medium">Spendennachweis</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted">
          Informationen zu Nachweisen und die zuständige Ansprechperson werden
          vom Verein ergänzt. In dieser Vorschau werden keine Zahlungen
          entgegengenommen.
        </p>
        <Link href="/kontakt" className="button button-outline mt-6">
          Zum Kontaktbereich →
        </Link>
      </section>
      <SplitSection
        title="Langfristig dabei sein"
        text="Eine Mitgliedschaft ist ein weiterer Weg, Verein zu begleiten. Erfahre mehr über den vorgesehenen Ablauf."
        image="/images/together.jpg"
        alt="Menschen stehen gemeinsam im Abendlicht"
        href="/mitglied-werden"
        label="Mitglied werden"
        reverse
      />
    </main>
  );
}
