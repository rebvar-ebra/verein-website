import { PageFaqs, PageSponsors } from "@/components/cms/StructureSections";
import Image from "next/image";
import { imageUrl } from "@/lib/cms/sanity.image";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/cms/content";
import { RichText } from "@/components/cms/RichText";
import { ProjectLocations, ProjectMaps } from "@/components/projects/ProjectLocations";
import {
  PageBanner,
  PageIntro,
  StatsSection,
  TeamSection,
  PreviewPanel,
  SplitSection,
} from "@/components/sections/WireframeSections";
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.id === slug);
  return {
    title: project?.seo?.title || project?.title || "Projekt nicht gefunden",
    description: project?.seo?.description || project?.text,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();


  return (
    <main id="main-content">
      <div className="shell pt-10">
        {project.logo ? (
          <div className="mx-auto flex max-w-5xl justify-center rounded-2xl bg-white/30 p-8">
            <Image src={imageUrl(project.logo, 1200)} alt={project.logo.alt || project.title} width={600} height={240} className="h-40 w-full object-contain drop-shadow-sm sm:h-60" priority />
          </div>
        ) : <PageBanner image={project.image} alt={project.alt} compact />}
      </div>
      <PageIntro
        title={project.title}
        text={project.isPreview ? project.detail : project.text}
        eyebrow={project.isPreview ? "Projektentwurf" : undefined}
      />
      {[project.startDate, project.target, project.achieved].some(Boolean) && <StatsSection
        values={[project.startDate, project.target, project.achieved]}
      />}
      <TeamSection
        title="Projektteam"
        count={3}
        members={project.isPreview ? undefined : project.teamMembers}
      />
      {!project.isPreview && (
        <div className="shell pb-16">
          <div className="mx-auto max-w-5xl">
            <RichText value={project.content} layout="section" />
          </div>
        </div>
      )}
      <div className="shell grid gap-6 pb-10 md:grid-cols-2">
        <PreviewPanel title="Wo wir sind" media={<ProjectMaps address={project.address} />}>
          <ProjectLocations address={project.address} showMaps={false} />
        </PreviewPanel>
        <PreviewPanel title="Was es gibt" media={<>
          {project.schedulePreview && (
            <div className="bg-white">
              <a href={imageUrl(project.schedulePreview, 2400)} target="_blank" rel="noopener noreferrer" aria-label="Wochenplan groß ansehen (neuer Tab)" className="block cursor-zoom-in">
                <Image src={imageUrl(project.schedulePreview, 1000)} alt={project.schedulePreview.alt || "Wochenplan des Projekts"} width={1000} height={700} className="h-auto w-full object-contain" />
              </a>
            </div>
          )}
          {!project.schedulePreview && <div className="flex min-h-64 items-center justify-center bg-paper p-6 text-center text-sm text-muted">Die Vorschau des Wochenplans wird hier ergänzt.</div>}
        </>}>
          <p>
            {project.schedule ||
              "Termine und ein freigegebener Wochenplan sind noch nicht verfügbar."}
          </p>

        </PreviewPanel>
      </div>

      <SplitSection
        title="Wir freuen uns auf dich!"
        text="Bei Fragen zu unseren Projekten und Angeboten erreichst du uns über den Kontaktbereich."
        image={project.image}
        alt={project.alt}
        href="/kontakt"
        label="Zum Kontaktbereich"
      />
      <PageFaqs faqs={project.faqs} />
      <PageSponsors
        title={project.sponsorsTitle}
        images={project.sponsors}
      />
    </main>
  );
}
