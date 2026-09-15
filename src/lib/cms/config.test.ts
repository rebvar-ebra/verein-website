import { describe, it, expect } from "vitest";
import { readCmsConfig } from "./config";
import { safeHref } from "./content.schema";
describe("CMS configuration", () => {
  it("uses the connected project when both public settings are absent", () => {
    expect(readCmsConfig({})).toMatchObject({projectId: "x34rtnfv", dataset: "production"});
    expect(() =>
      readCmsConfig({ NEXT_PUBLIC_SANITY_PROJECT_ID: "abc123" }),
    ).toThrow();
  });
  it("rejects invalid project configuration", () => {
    expect(() =>
      readCmsConfig({
        NEXT_PUBLIC_SANITY_PROJECT_ID: "../secret",
        NEXT_PUBLIC_SANITY_DATASET: "production",
      }),
    ).toThrow();
  });
  it("accepts a project and dataset", () => {
    expect(
      readCmsConfig({
        NEXT_PUBLIC_SANITY_PROJECT_ID: "abc123",
        NEXT_PUBLIC_SANITY_DATASET: "production",
      }),
    ).toMatchObject({ projectId: "abc123", dataset: "production" });
  });
});
describe("editorial links", () => {
  it.each([
    "javascript:alert(1)",
    "//evil.example",
    "/\\evil.example",
    "data:text/html,test",
    "java\nscript:alert(1)",
  ])("rejects unsafe href %s", (href) =>
    expect(safeHref.safeParse(href).success).toBe(false),
  );
  it.each([
    "/kontakt",
    "#kontakt",
    "https://example.org",
    "mailto:hello@example.org",
    "tel:+491234",
  ])("accepts safe href %s", (href) =>
    expect(safeHref.safeParse(href).success).toBe(true),
  );
});
