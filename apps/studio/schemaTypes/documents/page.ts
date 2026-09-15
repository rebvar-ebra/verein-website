import { defineArrayMember, defineField, defineType } from "sanity";
export function editorialPage(name: string, title: string) {
  return defineType({
    name,
    title,
    type: "document",
    fields: [
      defineField({
        name: "title",
        title: "Titel",
        type: "string",
        validation: (r) => r.required(),
      }),
      defineField({ name: "hero", title: "Kopfbereich", type: "hero" }),
      defineField({ name: "introduction", title: "Einleitung", type: "text" }),
      defineField({ name: "content", title: "Text", type: "contentBlock" }),
      defineField({
        name: "sections",
        title: "Bild-Text-Abschnitte",
        type: "array",
        of: [defineArrayMember({ type: "splitSection" })],
      }),
      defineField({
        name: "statistics",
        title: "Kennzahlen",
        type: "array",
        of: [defineArrayMember({ type: "statistic" })],
      }),
      defineField({
        name: "teamMembers",
        title: "Team",
        type: "array",
        of: [
          defineArrayMember({
            type: "reference",
            to: [{ type: "teamMember" }],
          }),
        ],
      }),
      defineField({
        name: "actions",
        title: "Aktionskarten",
        type: "array",
        of: [defineArrayMember({ type: "callToAction" })],
      }),
      defineField({
        name: "faqs",
        title: "Häufige Fragen",
        type: "array",
        of: [defineArrayMember({ type: "faq" })],
      }),
      defineField({ name: "seo", type: "seo" }),
    ],
  });
}
