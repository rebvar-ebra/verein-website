import { PageFaqs, PageSponsors } from "@/components/cms/StructureSections";
import Image from "next/image";
import { imageUrl } from "@/lib/cms/sanity.image";
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

  return (
    <main id="main-content">
      <div className="shell pt-10">
        <PageBanner image={project.image} alt={project.alt} compact />
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
      <StatsSection
        values={[project.startDate, project.target, project.achieved]}
      />
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
          <div className="mb-5 flex aspect-[2/1] items-center justify-center border border-dashed border-forest/20 bg-sage/40">
            Standortkarte folgt
          </div>
          <p>
            {project.address ||
              "Die Adresse wird ergänzt, sobald der Projektstandort bestätigt ist."}
          </p>
        </PreviewPanel>
        <PreviewPanel title="Was es gibt">
          <div className="mb-5 flex aspect-[2/1] items-center justify-center border border-dashed border-forest/20 bg-sage/40">
            Wochenplan folgt
          </div>
          <p>
            {project.schedule ||
              "Termine und ein freigegebener Wochenplan sind noch nicht verfügbar."}
          </p>
        </PreviewPanel>
      </div>
      {project.gallery.length > 0 && (
        <div className="shell grid gap-6 pb-16 md:grid-cols-2">
          {project.gallery.map(
            (image, i) =>
              image && (
                <Image
                  key={i}
                  src={imageUrl(image)}
                  alt={image.alt || ""}
                  width={800}
                  height={600}
                  className="rounded-2xl"
                />
              ),
          )}
        </div>
      )}
      <SplitSection
        title="Wir freuen uns auf dich!"
        text="Die Kontaktdaten des Projektteams werden hier nach Freigabe ergänzt. Der Kontaktbereich zeigt bereits das vorgesehene Formular."
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
