import { defineArrayMember, defineField, defineType } from "sanity";
export const project = defineType({
  name: "project",
  title: "Projekt",
  type: "document",
  fields: [
    defineField({name: "logo", title: "Projektlogo", type: "imageWithCaption"}),
    defineField({name: "archived", title: "Archiviert (nicht auf der Website anzeigen)", type: "boolean", initialValue: false}),
    defineField({
      name: "faqs",
      title: "Häufige Fragen",
      type: "array",
      of: [defineArrayMember({ type: "faq" })],
    }),
    defineField({
      name: "sponsorsTitle",
      title: "Überschrift der Projektförderer",
      description: "Diese Überschrift wird über den Förderlogos angezeigt.",
      type: "string",
      initialValue: "Projekt gefördert durch:",
      validation: (r) => r.max(120),
    }),
    defineField({
      name: "sponsors",
      title: "Projektförderer",
      type: "array",
      of: [defineArrayMember({ type: "imageWithCaption" })],
    }),
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
    defineField({
      name: "address",
      title: "Standort / Adresse",
      description:
        "Die Adresse wird im Kasten „Wo wir sind“ angezeigt und öffnet Google Maps. Mehrere Standorte mit einer Leerzeile trennen.",
      type: "text",
    }),
    defineField({
      name: "schedule",
      title: "Beschreibung im Kasten „Was es gibt“",
      description:
        "Kurze Informationen zu Angeboten, Terminen oder dem Wochenplan.",
      type: "text",
    }),
    defineField({
      name: "scheduleFile",
      title: "Programm / Wochenplan hochladen",
      description:
        "Nach dem Hochladen erscheint automatisch ein Download-Button auf der Projektseite.",
      type: "file",
      options: { accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png" },
    }),
    defineField({
      name: "scheduleDownloadLabel",
      title: "Text des Download-Buttons",
      type: "string",
      initialValue: "Unsere Angebote herunterladen",
      validation: (r) => r.max(80),
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
