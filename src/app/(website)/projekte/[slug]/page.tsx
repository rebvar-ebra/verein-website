import { notFound } from "next/navigation";
import { projects } from "@/lib/wireframe-content";
import {
  PageBanner,
  PageIntro,
  StatsSection,
  TeamSection,
  PreviewPanel,
  SplitSection,
} from "@/components/sections/WireframeSections";
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  return {
    title: project?.title ?? "Projekt nicht gefunden",
    description: project?.text,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();
  return (
    <main id="main-content">
      <div className="shell pt-10">
        <PageBanner image={project.image} alt={project.alt} compact />
      </div>
      <PageIntro
        title={project.title}
        text={project.detail}
        eyebrow={`${project.category} · Projektentwurf`}
      />
      <StatsSection />
      <TeamSection title="Projektteam" count={3} />
      <div className="shell grid gap-6 pb-10 md:grid-cols-2">
        <PreviewPanel title="Wo wir sind">
          <div className="mb-5 flex aspect-[2/1] items-center justify-center border border-dashed border-forest/20 bg-sage/40">
            Standortkarte folgt
          </div>
          <p>
            Die Adresse wird ergänzt, sobald der Projektstandort bestätigt ist.
          </p>
        </PreviewPanel>
        <PreviewPanel title="Was es gibt">
          <div className="mb-5 flex aspect-[2/1] items-center justify-center border border-dashed border-forest/20 bg-sage/40">
            Wochenplan folgt
          </div>
          <p>
            Termine und ein freigegebener Wochenplan sind noch nicht verfügbar.
          </p>
        </PreviewPanel>
      </div>
      <SplitSection
        title="Wir freuen uns auf dich!"
        text="Die Kontaktdaten des Projektteams werden hier nach Freigabe ergänzt. Der Kontaktbereich zeigt bereits das vorgesehene Formular."
        image={project.image}
        alt={project.alt}
        href="/kontakt"
        label="Zum Kontaktbereich"
      />
    </main>
  );
}
