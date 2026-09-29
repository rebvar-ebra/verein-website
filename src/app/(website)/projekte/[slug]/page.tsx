import { PageFaqs, PageSponsors } from "@/components/cms/StructureSections";
import Image from "next/image";
import { imageUrl, imageDownloadUrl } from "@/lib/cms/sanity.image";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/cms/content";
import { RichText } from "@/components/cms/RichText";
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
  const offersDownload = project.id === "dalia"
    ? imageDownloadUrl(project.gallery[0])
    : null;

  return (
    <main id="main-content">
      <div className="shell pt-10">
        {project.logo ? (
          <div className="mx-auto flex max-w-5xl justify-center rounded-2xl bg-white p-8">
            <Image src={imageUrl(project.logo, 1200)} alt={project.logo.alt || project.title} width={600} height={240} className="h-40 w-full object-contain sm:h-60" priority />
          </div>
        ) : <PageBanner image={project.image} alt={project.alt} compact />}
      </div>
      <PageIntro
        title={project.title}
        text={project.isPreview ? project.detail : project.text}
        eyebrow={
          project.isPreview
            ? `${project.category} · Projektentwurf`
            : project.category
        }
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
          <div className="mx-auto max-w-3xl">
            <RichText value={project.content} />
          </div>
        </div>
      )}
      <div className="shell grid gap-6 pb-10 md:grid-cols-2">
        <PreviewPanel title="Wo wir sind">
          <p className="whitespace-pre-line">
            {project.address ||
              "Die Adresse wird ergänzt, sobald der Projektstandort bestätigt ist."}
          </p>
        </PreviewPanel>
        <PreviewPanel title="Was es gibt">
          <p>
            {project.schedule ||
              "Termine und ein freigegebener Wochenplan sind noch nicht verfügbar."}
          </p>
          {offersDownload && (
            <a href={offersDownload} download className="button align-center button-orange mt-6">
              Unsere Angebote herunterladen <span aria-hidden="true">↓</span>
            </a>
          )}
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
        title="Projekt gefördert durch:"
        images={project.sponsors}
      />
    </main>
  );
}
