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
  return pageMetadata("membershipPage", { title: "Mitglied werden" });
}
export default function Page() {
  if (cmsEnabled) return <EditorialPage type="membershipPage"></EditorialPage>;
  return (
    <main id="main-content">
      <PageBanner
        image="/images/together.jpg"
        alt="Menschen stehen gemeinsam im Abendlicht"
      />
      <PageIntro
        title="Mitglied werden"
        text="Gemeinschaft lebt davon, dass Menschen sie mitgestalten. Hier findest du den vorgesehenen Weg zur Mitgliedschaft."
      />
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <ol className="space-y-10">
          {[
            {
              title: "Informieren",
              text: "Voraussetzungen, Mitgliedsbeiträge und Satzung werden nach Freigabe durch Verein veröffentlicht.",
            },
            {
              title: "Antrag vorbereiten",
              text: "Sobald der freigegebene Antrag verfügbar ist, findest du ihn hier. Aktuell können noch keine Anträge eingereicht werden.",
            },
            {
              title: "Rückmeldung erhalten",
              text: "Ein eingereichter Antrag wird vom Verein geprüft. Eine Mitgliedschaft wird durch das Ausfüllen eines Formulars nicht automatisch bestätigt.",
            },
          ].map((step, i) => (
            <li key={step.title} className="border-t border-forest/15 pt-7">
              <p className="eyebrow mb-3 text-olive">Schritt {i + 1}</p>
              <h2 className="text-2xl font-medium">{step.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <div className="shell grid gap-6 md:grid-cols-2">
        <PreviewPanel title="Antrag herunterladen">
          <p>Das freigegebene Antragsformular liegt noch nicht vor.</p>
          <span className="mt-5 inline-block border border-forest/20 px-4 py-2 text-xs">
            Download noch nicht verfügbar
          </span>
        </PreviewPanel>
        <PreviewPanel title="Uns kontaktieren">
          <p>
            Du hast Fragen zur Mitgliedschaft? Hier ist der geplante
            Kontaktbereich.
          </p>
          <Link href="/kontakt" className="button button-outline mt-5">
            Zum Kontaktformular →
          </Link>
        </PreviewPanel>
      </div>
      <SplitSection
        title="Oder unterstütze uns mit einer Spende"
        text="Auch Unterstützung ohne Mitgliedschaft kann Ideen voranbringen. Auf der Spendenseite findest du die vorgesehenen Möglichkeiten."
        image="/images/garden.jpg"
        alt="Frisch geerntetes Gemüse"
        href="/spenden"
        label="Zur Spendenseite"
      />
    </main>
  );
}
