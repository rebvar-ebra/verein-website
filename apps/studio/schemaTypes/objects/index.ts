import { defineArrayMember, defineField, defineType } from "sanity";
const linkFields = [
  defineField({
    name: "label",
    title: "Beschriftung",
    type: "string",
    validation: (r) => r.required(),
  }),
  defineField({
    name: "href",
    title: "Ziel",
    type: "url",
    validation: (r) =>
      r
        .required()
        .uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        })
        .custom((value) =>
          !value || /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(value)
            ? true
            : "Links müssen mit /, # oder einem erlaubten Protokoll beginnen.",
        ),
  }),
];
export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: linkFields,
});
export const imageWithCaption = defineType({
  name: "imageWithCaption",
  title: "Bild",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternativtext",
      type: "string",
      description:
        "Beschreibt das Bild. Für rein dekorative Bilder leer lassen.",
    }),
    defineField({ name: "caption", title: "Bildunterschrift", type: "string" }),
  ],
});
export const seo = defineType({
  name: "seo",
  title: "Suchmaschinen & Vorschau",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "SEO-Titel" }),
    defineField({
      name: "description",
      type: "text",
      title: "Beschreibung",
      validation: (r) => r.max(200),
    }),
    defineField({
      name: "image",
      type: "imageWithCaption",
      title: "Vorschaubild",
    }),
  ],
});
export const hero = defineType({
  name: "hero",
  title: "Kopfbereich",
  type: "object",
  fields: [
    defineField({ name: "image", type: "imageWithCaption", title: "Bild" }),
    defineField({ name: "eyebrow", type: "string", title: "Dachzeile" }),
    defineField({ name: "title", type: "string", title: "Titel" }),
    defineField({ name: "text", type: "text", title: "Einleitung" }),
  ],
});
export const statistic = defineType({
  name: "statistic",
  title: "Kennzahl",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Beschriftung",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "value",
      type: "string",
      title: "Wert",
      validation: (r) => r.required(),
    }),
  ],
});
export const callToAction = defineType({
  name: "callToAction",
  title: "Aktion",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Titel" }),
    defineField({ name: "text", type: "text", title: "Text" }),
    defineField({ name: "image", type: "imageWithCaption", title: "Bild" }),
    defineField({ name: "link", type: "link", title: "Link" }),
  ],
});
export const contentBlock = defineType({
  name: "contentBlock",
  title: "Textinhalt",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Text", value: "normal" },
        { title: "Überschrift", value: "h2" },
        { title: "Zwischenüberschrift", value: "h3" },
        { title: "Zitat", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Fett", value: "strong" },
          { title: "Kursiv", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                validation: (r) =>
                  r
                    .required()
                    .uri({
                      allowRelative: true,
                      scheme: ["http", "https", "mailto", "tel"],
                    })
                    .custom((value) =>
                      !value ||
                      /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(value)
                        ? true
                        : "Links müssen mit /, # oder einem erlaubten Protokoll beginnen.",
                    ),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "imageWithCaption" }),
  ],
});
export const splitSection = defineType({
  name: "splitSection",
  title: "Bild und Text",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titel",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "text",
      type: "text",
      title: "Text",
      validation: (r) => r.required(),
    }),
    defineField({ name: "image", type: "imageWithCaption", title: "Bild" }),
    defineField({ name: "link", type: "link", title: "Aktion" }),
    defineField({ name: "reverse", type: "boolean", title: "Bild rechts" }),
  ],
});
export const faq = defineType({
  name: "faq",
  type: "object",
  title: "Frage und Antwort",
  fields: [
    defineField({
      name: "question",
      type: "string",
      title: "Frage",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      type: "text",
      title: "Antwort",
      validation: (r) => r.required(),
    }),
  ],
});
export const objects = [
  link,
  imageWithCaption,
  seo,
  hero,
  statistic,
  callToAction,
  contentBlock,
  splitSection,
  faq,
];
