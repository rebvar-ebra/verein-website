import { defineField, defineType } from "sanity";
export const teamMember = defineType({
  name: "teamMember",
  title: "Teammitglied",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Öffentliches Telefon", type: "string" }),
    defineField({ name: "languages", title: "Sprachen", type: "string" }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", title: "Funktion", type: "string" }),
    defineField({ name: "image", title: "Foto", type: "imageWithCaption" }),
    defineField({
      name: "email",
      title: "Öffentliche E-Mail-Adresse",
      type: "string",
      validation: (r) => r.email(),
    }),
    defineField({ name: "bio", title: "Vorstellung", type: "contentBlock" }),
  ],
});
