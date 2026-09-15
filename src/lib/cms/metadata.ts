import type { Metadata } from "next";
import { getPage } from "./content";
import { imageUrl } from "./sanity.image";
export async function pageMetadata(
  type: string,
  fallback: Metadata,
): Promise<Metadata> {
  const page = await getPage(type);
  if (!page) return fallback;
  const title = page.seo?.title || page.title;
  const description = page.seo?.description || page.introduction;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(page.seo?.image ? { images: [imageUrl(page.seo.image)] } : {}),
    },
  };
}
