import { defineArrayMember, defineField, defineType } from "sanity";
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  fields: [
    defineField({
      name: "organisationName",
      title: "Vereinsname",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "tagline", title: "Leitsatz", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "imageWithCaption" }),
    defineField({
      name: "email",
      title: "Öffentliche E-Mail-Adresse",
      type: "string",
      validation: (r) => r.email(),
    }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "address", title: "Adresse", type: "text" }),
    defineField({
      name: "donationInformation",
      title: "Spendeninformationen",
      type: "contentBlock",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
    }),
    defineField({
      name: "navigation",
      title: "Verein-Menü",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
    }),
    defineField({
      name: "footerNavigation",
      title: "Weitere Footer-Links",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
    }),
    defineField({
      name: "emergencyPhone",
      title: "Bestätigte Hilfetelefonnummer",
      type: "string",
    }),
    defineField({
      name: "emergencyUrl",
      title: "Externe Hilfeseite",
      type: "url",
      validation: (r) => r.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "quickExitUrl",
      title: "Neutrales Schnell-verlassen-Ziel",
      type: "url",
      validation: (r) => r.required().uri({ scheme: ["https"] }),
      initialValue: "https://www.google.com/",
    }),
    defineField({
      name: "sponsors",
      title: "Förderpartner",
      type: "array",
      of: [defineArrayMember({ type: "imageWithCaption" })],
    }),
    defineField({ name: "defaultSeo", title: "SEO-Standard", type: "seo" }),
  ],
});
