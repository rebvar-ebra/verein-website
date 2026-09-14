import { PageIntro } from "@/components/sections/WireframeSections";
import { NewsGrid } from "@/components/news/NewsGrid";
export const metadata = { title: "Alle News" };
export default function Page() {
  return (
    <main id="main-content">
      <PageIntro
        title="Alle News"
        text="Einblicke in das Vereinsleben. Die folgenden Beiträge zeigen die Gestaltung des künftigen News-Archivs."
        eyebrow="Einblicke & Geschichten"
      />
      <section className="shell pb-20">
        <NewsGrid />
      </section>
    </main>
  );
}
