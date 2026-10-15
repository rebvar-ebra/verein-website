import { PageSponsors } from "@/components/cms/StructureSections";
import { getProjects, getSettings } from "@/lib/cms/content";

export async function SponsorSection() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);
  const seen = new Set<string>();
  const images = [
    ...(settings?.sponsors ?? []),
    ...projects.flatMap((project) => project.sponsors),
  ].filter((image) => {
    const reference = image?.asset._ref;
    if (!reference || reference === settings?.logo?.asset._ref || seen.has(reference)) {
      return false;
    }
    seen.add(reference);
    return true;
  });

  if (!images.length) return null;
  return <PageSponsors images={images} title="Gemeinsam unterstützt" />;
}
