import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PageIntro } from "@/components/sections/WireframeSections";
import { NewsGrid } from "@/components/news/NewsGrid";
export const metadata = { title: "Alle News" };
export default function Page() {
  return (
    <main id="main-content">
      <PageIntro
        title="Alle News"
        text="Einblicke in das Anahitasleben. Die folgenden Beiträge zeigen die Gestaltung des künftigen News-Archivs."
        eyebrow="Einblicke & Geschichten"
      />
      <section className="shell pb-20">
        <NewsGrid />
      </section>
      <section className="shell section-space">
        <h2 className="mb-10 text-center">Unsere Projekte</h2>
        <ProjectGrid />
      </section>
    </main>
  );
}
