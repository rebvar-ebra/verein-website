import "server-only";
import { createClient } from "@sanity/client";
import { z } from "zod";
import { readCmsConfig } from "./config";
export const cmsConfig = readCmsConfig(process.env);
export const cmsEnabled = Boolean(cmsConfig);
const client = cmsConfig
  ? createClient({
      ...cmsConfig,
      perspective: "published",
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
      timeout: 10000,
      maxRetries: 1,
    })
  : null;
export async function fetchCms<T>(
  query: string,
  schema: z.ZodType<T>,
  params: Record<string, string> = {},
): Promise<T> {
  if (!client) throw new Error("CMS is not configured.");
  try {
    const data = await client.fetch<unknown>(query, params, {
      next: { revalidate: 60 },
    });
    return schema.parse(data);
  } catch {
    console.error("cms_content_read_failed");
    throw new Error("Inhalte sind vorübergehend nicht verfügbar.");
  }
}
