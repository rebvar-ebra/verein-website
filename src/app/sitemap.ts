import type { MetadataRoute } from "next";
import { z } from "zod";
import { fetchCms } from "@/lib/cms/sanity.client";
import { siteUrl } from "@/lib/seo/site-url";

export const revalidate = 60;

const publicRoutes = [
  "", "/projekte", "/news", "/ueber-uns", "/mitglied-werden", "/spenden",
  "/mitmachen", "/beratung-hilfe", "/kontakt", "/impressum", "/datenschutz", "/satzung",
];
const entriesSchema = z.array(z.object({
  _type: z.enum(["project", "newsArticle"]),
  slug: z.string().min(1),
  _updatedAt: z.iso.datetime(),
}));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  // Match the public listings, excluding drafts, archived and scheduled content.
  const entries = await fetchCms(
    `*[_type in ["project", "newsArticle"] && !(_id in path("drafts.**")) && archived != true && defined(slug.current) && defined(publishedAt) && dateTime(publishedAt) <= dateTime(now())]{_type,"slug":slug.current,_updatedAt}`,
    entriesSchema,
  );
  return [
    ...publicRoutes.map(path => ({url: `${base}${path || "/"}`})),
    ...entries.map(entry => ({
      url: `${base}/${entry._type === "project" ? "projekte" : "news"}/${encodeURIComponent(entry.slug)}`,
      lastModified: entry._updatedAt,
    })),
  ];
}
