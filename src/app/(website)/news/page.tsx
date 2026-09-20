import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PageIntro } from "@/components/sections/WireframeSections";
import { NewsGrid } from "@/components/news/NewsGrid";
export const metadata = { title: "Alle News" };
export default function Page() {
  return (
    <main id="main-content">
      <PageIntro
        title="Alle News"
        text="Neuigkeiten und Einblicke aus unseren Projekten und dem Vereinsleben."
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
