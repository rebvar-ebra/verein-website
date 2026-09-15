import { defineArrayMember, defineField, defineType } from "sanity";
export const newsArticle = defineType({
  name: "newsArticle",
  title: "News",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kurzbeschreibung",
      type: "text",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Titelbild",
      type: "imageWithCaption",
    }),
    defineField({ name: "content", title: "Inhalt", type: "contentBlock" }),
    defineField({
      name: "author",
      title: "Autor/in",
      type: "reference",
      to: [{ type: "teamMember" }],
    }),
    defineField({
      name: "categories",
      title: "Kategorien",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "publishedAt",
      title: "Veröffentlichungsdatum",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Hervorheben",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "title", media: "coverImage" } },
});
