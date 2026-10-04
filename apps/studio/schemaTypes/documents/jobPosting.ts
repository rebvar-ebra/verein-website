import {defineField, defineType} from "sanity";
export const jobPosting = defineType({
  name: "jobPosting", title: "Stellenangebote", type: "document",
  fields: [
    defineField({name: "title", title: "Stellentitel", type: "string", validation: r => r.required()}),
    defineField({name: "slug", title: "URL", type: "slug", options: {source: "title"}, validation: r => r.required()}),
    defineField({name: "employmentType", title: "Art der Stelle", type: "string", options: {list: ["Vollzeit", "Teilzeit", "Minijob", "Honorarbasis", "Praktikum", "Ehrenamt"]}, validation: r => r.required()}),
    defineField({name: "location", title: "Arbeitsort", type: "string"}),
    defineField({name: "excerpt", title: "Kurzbeschreibung", type: "text", rows: 3, validation: r => r.required().max(300)}),
    defineField({name: "content", title: "Vollständige Stellenbeschreibung", description: "Aufgaben, Anforderungen, Rahmenbedingungen und Bewerbungsweg.", type: "contentBlock", validation: r => r.required().min(1)}),
    defineField({name: "publishedAt", title: "Veröffentlichungsdatum", type: "datetime", validation: r => r.required()}),
    defineField({name: "archived", title: "Stelle geschlossen / archiviert", type: "boolean", initialValue: false}),
    defineField({name: "seo", type: "seo"}),
  ],
  orderings: [{title: "Neueste zuerst", name: "publishedAtDesc", by: [{field: "publishedAt", direction: "desc"}]}],
  preview: {select: {title: "title", subtitle: "employmentType"}},
});
