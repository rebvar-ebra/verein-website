import "server-only";
import { cache } from "react";
import { z } from "zod";
import {
  projects as previewProjects,
  articles as previewArticles,
} from "@/lib/wireframe-content";
import { fetchCms, cmsEnabled } from "./sanity.client";
import {
  projectSchema,
  articleSchema,
  pageSchema,
  settingsSchema,
  type CmsBody,
} from "./content.schema";
import { projectsQuery } from "./queries/projects";
import { newsQuery } from "./queries/news";
import { pageQuery } from "./queries/pages";
import { settingsQuery } from "./queries/settings";
import { imageUrl } from "./sanity.image";
const paragraphs = (items: string[]): CmsBody =>
  items.map((text, i) => ({
    _type: "block",
    _key: String(i),
    style: "normal",
    children: [{ _type: "span", text, marks: [] }],
    markDefs: [],
  }));
export const getProjects = cache(async () => {
  if (!cmsEnabled)
    return previewProjects.map((p) => ({
      ...p,
      _id: p.id,
      content: paragraphs([p.detail]),
      startDate: null,
      target: null,
      achieved: null,
      status: null,
      address: null,
      schedule: null,
      teamMembers: [],
      gallery: [],
      faqs: [],
      sponsors: [],
      seo: null,
      featured: true,
      publishedAt: "",
      isPreview: true,
    }));
  return (await fetchCms(projectsQuery, z.array(projectSchema))).map((p) => ({
    ...p,
    image: imageUrl(p.image),
    alt: p.image?.alt || "",
    detail: "",
    isPreview: false,
  }));
});
export const getArticles = cache(async () => {
  if (!cmsEnabled)
    return previewArticles.map((a) => ({
      ...a,
      _id: a.slug,
      content: paragraphs(a.paragraphs),
      author: null,
      publishedAt: "",
      seo: null,
      isPreview: true,
    }));
  return (await fetchCms(newsQuery, z.array(articleSchema))).map((a) => ({
    ...a,
    image: imageUrl(a.image),
    alt: a.image?.alt || "",
    paragraphs: [],
    isPreview: false,
  }));
});
export const getSettings = cache(async () =>
  cmsEnabled ? fetchCms(settingsQuery, settingsSchema.nullable()) : null,
);
export const getPage = cache(async (type: string) =>
  cmsEnabled ? fetchCms(pageQuery, pageSchema.nullable(), { type }) : null,
);
export type Project = Awaited<ReturnType<typeof getProjects>>[number];
export type Article = Awaited<ReturnType<typeof getArticles>>[number];
