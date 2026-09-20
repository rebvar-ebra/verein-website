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
  return pageMetadata("applicationPage", {
    title: "Stellenangebote & Mitmachen",
  });
}
export default function Page() {
  if (cmsEnabled) return <EditorialPage type="applicationPage"></EditorialPage>;
  return (
    <main id="main-content">
      <PageBanner
        image="/images/community.jpg"
        alt="Eine ehrenamtliche Person bei einer Veranstaltung"
      />
      <PageIntro
        title="Du willst ein Teil unseres Teams werden?"
        text="Zeit, Ideen und Fähigkeiten einbringen. Hier entsteht der Überblick über ehrenamtliches Engagement und Stellenangebote bei Neuer Tag."
      />
      <section className="shell pb-16 text-center">
        <h2 className="text-3xl font-medium">Was du erwarten kannst</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            "Aufgaben & Verantwortung",
            "Zeiten & Rahmenbedingungen",
            "Team & Zusammenarbeit",
          ].map((title) => (
            <div key={title} className="border-t border-forest/20 py-6">
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="mt-3 text-sm text-muted">
                Details werden je Angebot ergänzt.
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="shell">
        <h2 className="mb-9 text-center text-3xl font-medium">
          Klingt interessant? Hier entsteht Platz für dich.
        </h2>
        <div className="grid items-start gap-6 md:grid-cols-2">
          <PreviewPanel title="Ehrenamtlich mitmachen">
            <p>
              Konkrete Aufgaben und Möglichkeiten werden vom Verein Neuer Tag ergänzt.
              Aktuell ist hier noch kein Einsatz ausgeschrieben.
            </p>
            <Link href="/kontakt" className="button button-outline mt-5">
              Zum Kontaktbereich →
            </Link>
          </PreviewPanel>
          <PreviewPanel title="Stellenangebote">
            <p>
              Freigegebene Stellen mit Anforderungen und Bewerbungsweg
              erscheinen hier. Es liegen noch keine bestätigten Ausschreibungen
              vor.
            </p>
            <p className="mt-5 text-xs">
              Bewerbungen werden in dieser Vorschau nicht angenommen.
            </p>
          </PreviewPanel>
        </div>
      </section>
      <SplitSection
        title="Lerne Neuer Tag kennen"
        text="Menschen machen den Unterschied. Auf unserer Über-uns-Seite zeigen wir, wo die Geschichte und Teamvorstellung künftig ihren Platz finden."
        image="/images/together.jpg"
        alt="Menschen im Abendlicht"
        href="/ueber-uns"
        label="Über uns"
      />
    </main>
  );
}
