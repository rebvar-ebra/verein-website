import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;
if (!projectId || !dataset)
  throw new Error(
    "Sanity Studio: SANITY_STUDIO_PROJECT_ID und SANITY_STUDIO_DATASET in apps/studio/.env.local setzen.",
  );
const singletons = [
  "siteSettings",
  "homepage",
  "aboutPage",
  "membershipPage",
  "donationPage",
  "helpPage",
  "applicationPage",
  "contactPage",
  "imprintPage",
  "privacyPage",
];
export default defineConfig({
  name: "verein",
  title: "Verein – Redaktion",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Inhalte")
          .items([
            ...singletons.map((type) =>
              S.listItem()
                .id(type)
                .title(schemaTypes.find((s) => s.name === type)?.title || type)
                .child(S.document().schemaType(type).documentId(type)),
            ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !singletons.includes(item.getId() || ""),
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((t) => !singletons.includes(t.schemaType)),
  },
  document: {
    actions: (actions, context) =>
      singletons.includes(context.schemaType)
        ? actions.filter(
            (action) =>
              action.action !== "duplicate" && action.action !== "delete",
          )
        : actions,
  },
});
