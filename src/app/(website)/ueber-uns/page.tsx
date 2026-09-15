import { pageMetadata } from "@/lib/cms/metadata";
import { cmsEnabled } from "@/lib/cms/sanity.client";
import { EditorialPage } from "@/components/cms/EditorialPage";
import {
  PageBanner,
  PageIntro,
  StatsSection,
  TeamSection,
  SplitSection,
} from "@/components/sections/WireframeSections";
import { homepage } from "@/lib/preview-content";
export async function generateMetadata() {
  return pageMetadata("aboutPage", { title: "Über uns" });
}
export default function Page() {
  if (cmsEnabled) return <EditorialPage type="aboutPage"></EditorialPage>;
  return (
    <main id="main-content">
      <PageBanner />
      <PageIntro
        title="Über uns"
        text={homepage.about}
        eyebrow="Das ist Verein"
      />
      <StatsSection />
      <TeamSection />
      <SplitSection
        title="Unsere Gründung"
        text="Jeder Verein beginnt mit einer Idee. Hier wird künftig die vom Verein freigegebene Gründungsgeschichte erzählt – mit den Menschen, Anfängen und Schritten, die ihn geprägt haben."
        image="/images/together.jpg"
        alt="Vier Menschen stehen Arm in Arm im Abendlicht"
        href="/mitmachen"
        label="Teil des Teams werden"
      />
    </main>
  );
}
