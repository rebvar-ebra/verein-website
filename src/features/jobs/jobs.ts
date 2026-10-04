import "server-only";
import {cache} from "react";
import {z} from "zod";
import {fetchCms} from "@/lib/cms/sanity.client";
import {bodySchema, seoSchema} from "@/lib/cms/content.schema";
const jobSchema = z.object({
  _id: z.string(), title: z.string(), slug: z.string().min(1),
  employmentType: z.string(), location: z.string().nullish(),
  excerpt: z.string(), content: bodySchema, publishedAt: z.iso.datetime(), seo: seoSchema,
});
export type Job = z.infer<typeof jobSchema>;
export const getJobs = cache(() => fetchCms(
  `*[_type == "jobPosting" && archived != true && !(_id in path("drafts.**")) && defined(slug.current) && defined(publishedAt) && dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc) {_id,title,"slug":slug.current,employmentType,location,excerpt,"content":coalesce(content,[]),publishedAt,seo}`,
  z.array(jobSchema),
));
