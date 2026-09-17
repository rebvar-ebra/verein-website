import {
  PageIntro,
  SponsorSection,
} from "@/components/sections/WireframeSections";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
export const metadata = { title: "Unsere Projekte" };
export default function Page() {
  return (
    <main id="main-content">
      <PageIntro
        title="Unsere Projekte"
        text="Räume für Begegnung, gemeinsame Ideen und Engagement. Entdecke die Projektvorschau von Anahita."
        eyebrow="Gemeinsam gestalten"
      />
      <section className="shell pb-16">
        <ProjectGrid />
      </section>
      <SponsorSection />
    </main>
  );
}
