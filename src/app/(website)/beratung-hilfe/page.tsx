import { getSettings } from "@/lib/cms/content";
import { pageMetadata } from "@/lib/cms/metadata";
import { cmsEnabled } from "@/lib/cms/sanity.client";
import { EditorialPage } from "@/components/cms/EditorialPage";
import Link from "next/link";
import {
  PageBanner,
  PageIntro,
  SplitSection,
} from "@/components/sections/WireframeSections";
import { QuickExitButton } from "@/components/help/QuickExitButton";
export async function generateMetadata() {
  return pageMetadata("helpPage", { title: "Beratung & Hilfe" });
}
export default async function Page() {
  const settings = await getSettings();
  if (cmsEnabled)
    return (
      <EditorialPage type="helpPage">
        <QuickExitButton url={settings?.quickExitUrl} />
        {settings?.emergencyPhone && (
          <a
            className="button button-orange"
            href={`tel:${settings.emergencyPhone}`}
          >
            {settings.emergencyPhone}
          </a>
        )}
        {settings?.emergencyUrl && (
          <a className="button button-outline" href={settings.emergencyUrl}>
            Hilfeangebot öffnen
          </a>
        )}
        <p>Das schnelle Verlassen löscht nicht den Browserverlauf.</p>
      </EditorialPage>
    );
  return (
    <main id="main-content">
      <QuickExitButton />
      <div className="border-b border-forest/15 bg-sage/50">
        <div className="shell flex flex-wrap items-center gap-4 py-5 text-sm">
          <strong>Beratung & Hilfe</strong>
          <a href="#kontaktoptionen" className="underline underline-offset-4">
            Kontaktmöglichkeiten
          </a>
          <a href="#schnell-verlassen" className="underline underline-offset-4">
            Hinweis zum schnellen Verlassen
          </a>
        </div>
      </div>
      <PageBanner
        image="/images/together.jpg"
        alt="Menschen stehen Arm in Arm im Abendlicht"
      />
      <PageIntro
        title="Beratung & Hilfe"
        text="Hier entsteht ein übersichtlicher Zugang zu bestätigten Beratungsangeboten. Diese Vorschau bietet noch keine Beratung und nimmt keine Hilfeanfragen entgegen."
      />
      <section id="kontaktoptionen" className="shell pb-16">
        <h2 className="mb-9 text-center text-3xl font-medium">
          Direkt Kontakt aufnehmen
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {["Telefon", "E-Mail", "Vor Ort"].map((label) => (
            <div
              key={label}
              className="border border-forest/15 p-7 text-center"
            >
              <h3 className="text-xl font-medium">{label}</h3>
              <p className="mt-4 text-sm leading-6 text-muted">
                Bestätigte Kontaktdaten folgen. Noch kein Angebot verfügbar.
              </p>
            </div>
          ))}
        </div>
      </section>
      <SplitSection
        title="Deine Ansprechperson"
        text="Hier werden eine bestätigte Ansprechperson, Erreichbarkeit und Informationen zum Beratungsangebot vorgestellt. Name und Kontakt liegen noch nicht vor."
        image="/images/friends.jpg"
        alt="Eine Gruppe von Menschen vor einer Berglandschaft"
      />
      <section id="schnell-verlassen" className="shell pb-16">
        <div className="border border-forest/20 bg-paper p-6">
          <h2 className="text-xl font-medium">Seite schnell verlassen</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Der Button öffnet sofort Google im selben Tab. Er löscht weder den
            bisherigen Browserverlauf noch andere Spuren deines Besuchs.
          </p>
        </div>
      </section>
      <section className="shell pb-24">
        <h2 className="mb-6 text-center text-3xl font-medium">
          Bestärkt in den Alltag
        </h2>
        <p className="mx-auto max-w-xl text-center text-sm leading-7 text-muted">
          Entdecke die Vorschau unserer Projekte und die geplanten Räume für
          Gemeinschaft.
        </p>
        <div className="mt-6 text-center">
          <Link href="/projekte" className="button button-outline">
            Unsere Projekte →
          </Link>
        </div>
      </section>
    </main>
  );
}
