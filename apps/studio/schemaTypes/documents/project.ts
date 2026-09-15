import { defineArrayMember, defineField, defineType } from "sanity";
export const project = defineType({
  name: "project",
  title: "Projekt",
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
      name: "shortDescription",
      title: "Kurzbeschreibung",
      type: "text",
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", type: "string", title: "Kategorie" }),
    defineField({
      name: "heroImage",
      title: "Titelbild",
      type: "imageWithCaption",
    }),
    defineField({ name: "content", title: "Inhalt", type: "contentBlock" }),
    defineField({ name: "startDate", title: "Startdatum", type: "date" }),
    defineField({ name: "target", title: "Ziel", type: "string" }),
    defineField({ name: "achieved", title: "Erreicht", type: "string" }),
    defineField({
      name: "status",
      type: "string",
      title: "Status",
      options: { list: ["geplant", "aktiv", "abgeschlossen"] },
    }),
    defineField({
      name: "teamMembers",
      title: "Projektteam",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: [{ type: "teamMember" }] }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [defineArrayMember({ type: "imageWithCaption" })],
    }),
    defineField({ name: "address", title: "Standort", type: "text" }),
    defineField({
      name: "schedule",
      title: "Wochenplan / Angebot",
      type: "text",
    }),
    defineField({
      name: "featured",
      title: "Hervorheben",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "seo", type: "seo" }),
    defineField({
      name: "publishedAt",
      title: "Veröffentlichungsdatum",
      type: "datetime",
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title", media: "heroImage" } },
});
