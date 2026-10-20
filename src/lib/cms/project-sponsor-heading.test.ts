import { describe, expect, it } from "vitest";
import { projectSchema } from "./content.schema";
import { projectProjection } from "./queries/projects";

const project = {
  _id: "project-anahita",
  id: "anahita",
  title: "Anahita",
  text: "Kurzbeschreibung",
  category: "Projekt",
  image: null,
  logo: null,
  content: [],
  faqs: [],
  sponsors: [],
  sponsorsTitle: "Gefördert von",
  startDate: null,
  target: null,
  achieved: null,
  status: null,
  address: null,
  schedule: null,
  teamMembers: [],
  gallery: [],
  seo: null,
  featured: false,
  publishedAt: "2026-10-20T10:00:00.000Z",
};

describe("project sponsor heading", () => {
  it("preserves the heading supplied by an editor", () => {
    expect(projectSchema.parse(project).sponsorsTitle).toBe("Gefördert von");
  });

  it("provides the existing German heading for older project documents", () => {
    expect(projectProjection).toContain(
      '"sponsorsTitle":coalesce(sponsorsTitle,"Projekt gefördert durch:")',
    );
  });
});
