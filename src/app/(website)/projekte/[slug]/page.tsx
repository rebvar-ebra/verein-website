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
  if (!project.isPreview)
    return (
      <main id="main-content">
        <div className="shell pt-10">
          <PageBanner image={project.image} alt={project.alt} compact />
        </div>
        <PageIntro
          title={project.title}
          text={project.text}
          eyebrow={project.category}
        />
        <div className="shell pb-16">
          <RichText value={project.content} />
          <dl className="my-8 grid gap-6 sm:grid-cols-3">
            {[
              ["Ziel", project.target],
              ["Erreicht", project.achieved],
              ["Status", project.status],
            ]
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
          </dl>
          {project.teamMembers.map((member) => (
            <section key={member._id} className="my-6">
              <h2>{member.name}</h2>
              <p>{member.role}</p>
              {member.image && (
                <Image
                  className="mb-4 aspect-square w-80 max-w-full rounded-full object-cover"
                  src={imageUrl(member.image)}
                  alt={member.image.alt || ""}
                  width={320}
                  height={320}
                />
              )}
            </section>
          ))}
          <div className="grid gap-6 md:grid-cols-2">
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
          {project.address && <p className="mt-6">{project.address}</p>}
          {project.schedule && <p>{project.schedule}</p>}
        </div>
      </main>
    );
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
