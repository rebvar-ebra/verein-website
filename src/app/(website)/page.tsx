import Link from "next/link";
import {
  PageBanner,
  PageIntro,
  SplitSection,
  SupportSection,
  FAQSection,
  SponsorSection,
} from "@/components/sections/WireframeSections";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { homepage } from "@/lib/preview-content";
export default function Home() {
  return (
    <main id="main-content">
      <PageBanner />
      <PageIntro
        title="Wir sind Verein."
        text={homepage.introduction}
        eyebrow="Miteinander. Füreinander."
      />
      <section id="projekte" className="shell pb-12">
        <h2 className="mb-9 text-center text-3xl font-medium">
          Unsere Projekte
        </h2>
        <ProjectGrid />
      </section>
      <div id="ueber-uns">
        <SplitSection
          title="Was uns wichtig ist"
          text={homepage.about}
          image="/images/together.jpg"
          alt="Menschen stehen gemeinsam im Abendlicht"
          href="/beratung-hilfe"
          label="Zur Hilfeseite"
        >
          <h3 className="mt-7 text-xl font-medium">
            Du brauchst Beratung oder Hilfe?
          </h3>
          <Link
            href="/ueber-uns"
            className="mr-6 mt-3 inline-block text-sm underline underline-offset-4"
          >
            Mehr über Verein
          </Link>
        </SplitSection>
      </div>
      <div id="aktuelles">
        <SplitSection
          title="Stetig in Bewegung"
          text="Einblicke, Geschichten und neue Ideen. Hier entsteht der Platz für Nachrichten aus dem Vereinsleben."
          image="/images/community.jpg"
          alt="Ehrenamtliche Person bei einer Veranstaltung"
          href="/news"
          label="Zu den News"
          reverse
        />
      </div>
      <SupportSection />
      <FAQSection />
      <SponsorSection />
    </main>
  );
}
