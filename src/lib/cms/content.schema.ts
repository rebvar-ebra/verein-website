import { z } from "zod";
export const safeHref = z
  .string()
  .refine(
    (value) =>
      !/[\u0000-\u0020\\]/.test(value) &&
      (/^(https?:\/\/|mailto:|tel:)/i.test(value) ||
        /^\/(?!\/)/.test(value) ||
        /^#/.test(value)),
    "Unsafe link",
  );
export const imageSchema = z
  .object({
    asset: z.object({
      _ref: z.string().regex(/^image-[a-zA-Z0-9]+-\d+x\d+-[a-z0-9]+$/),
    }),
    alt: z.string().nullish(),
    caption: z.string().nullish(),
    crop: z
      .object({
        top: z.number(),
        bottom: z.number(),
        left: z.number(),
        right: z.number(),
      })
      .nullish(),
    hotspot: z
      .object({
        x: z.number(),
        y: z.number(),
        width: z.number(),
        height: z.number(),
      })
      .nullish(),
  })
  .nullish();
const span = z.object({
  _type: z.literal("span"),
  _key: z.string().optional(),
  text: z.string(),
  marks: z.array(z.string()).optional(),
});
const block = z.object({
  _type: z.literal("block"),
  _key: z.string().optional(),
  style: z.string().optional(),
  children: z.array(span),
  markDefs: z
    .array(
      z.object({
        _key: z.string(),
        _type: z.string(),
        href: z.string().optional(),
      }),
    )
    .optional(),
  listItem: z.string().optional(),
  level: z.number().optional(),
});
export const bodySchema = z.array(
  z.union([
    block,
    z.object({
      _type: z.literal("imageWithCaption"),
      _key: z.string().optional(),
      asset: z.object({ _ref: z.string() }),
      alt: z.string().nullish(),
      caption: z.string().nullish(),
    }),
  ]),
);
export const seoSchema = z
  .object({
    title: z.string().nullish(),
    description: z.string().nullish(),
    image: imageSchema,
  })
  .nullish();
export const linkSchema = z.object({ label: z.string(), href: safeHref });
export const teamSchema = z.object({
  _id: z.string(),
  name: z.string(),
  role: z.string().nullish(),
  email: z.string().nullish(),
  image: imageSchema,
});
export const projectSchema = z.object({
  _id: z.string(),
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  text: z.string(),
  category: z.string(),
  image: imageSchema,
  content: bodySchema,
  startDate: z.string().nullish(),
  target: z.string().nullish(),
  achieved: z.string().nullish(),
  status: z.string().nullish(),
  address: z.string().nullish(),
  schedule: z.string().nullish(),
  teamMembers: z.array(teamSchema),
  gallery: z.array(imageSchema),
  seo: seoSchema,
  featured: z.boolean(),
  publishedAt: z.string(),
});
export const articleSchema = z.object({
  _id: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  excerpt: z.string(),
  category: z.string(),
  image: imageSchema,
  content: bodySchema,
  author: teamSchema.nullish(),
  publishedAt: z.string(),
  seo: seoSchema,
});
export const pageSchema = z.object({
  title: z.string(),
  introduction: z.string(),
  hero: z
    .object({
      title: z.string().nullish(),
      text: z.string().nullish(),
      eyebrow: z.string().nullish(),
      image: imageSchema,
    })
    .nullish(),
  content: bodySchema,
  sections: z.array(
    z.object({
      title: z.string(),
      text: z.string(),
      image: imageSchema,
      link: linkSchema.nullish(),
      reverse: z.boolean().nullish(),
    }),
  ),
  statistics: z.array(z.object({ label: z.string(), value: z.string() })),
  teamMembers: z.array(teamSchema),
  actions: z.array(
    z.object({
      title: z.string().nullish(),
      text: z.string().nullish(),
      image: imageSchema,
      link: linkSchema.nullish(),
    }),
  ),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  seo: seoSchema,
});
export const settingsSchema = z.object({
  organisationName: z.string().min(1),
  tagline: z.string().nullish(),
  logo: imageSchema,
  email: z.string().nullish(),
  phone: z.string().nullish(),
  address: z.string().nullish(),
  navigation: z.array(linkSchema),
  footerNavigation: z.array(linkSchema),
  socialLinks: z.array(linkSchema),
  emergencyPhone: z.string().nullish(),
  emergencyUrl: safeHref.nullish(),
  quickExitUrl: z.url().refine((url) => url.startsWith("https://")),
  sponsors: z.array(imageSchema),
  donationInformation: bodySchema,
  defaultSeo: seoSchema,
});
export type CmsImage = z.infer<typeof imageSchema>;
export type CmsBody = z.infer<typeof bodySchema>;
export type CmsPage = z.infer<typeof pageSchema>;
export type CmsSettings = z.infer<typeof settingsSchema>;
export type CmsTeamMember = z.infer<typeof teamSchema>;
