import { describe, expect, it } from "vitest";
import { buildHeaderNavigation } from "./navigation";

describe("buildHeaderNavigation", () => {
  it("shows Anahita first and renames the association link", () => {
    const menus = buildHeaderNavigation({
      projects: [
        { label: "DALIA", href: "/projekte/dalia" },
        { label: "Anahita", href: "/projekte/anahita" },
      ],
      legacyNavigation: [{ label: "Über uns", href: "/ueber-uns" }],
    });
    expect(menus[0].children?.map((link) => link.label)).toEqual([
      "Anahita",
      "DALIA",
      "Alle Projekte",
    ]);
    expect(menus[1]).toMatchObject({
      label: "Über uns",
      children: [{ label: "Verein", href: "/ueber-uns" }],
    });
  });

  it("uses editor-defined links and submenus in their saved order", () => {
    const menus = buildHeaderNavigation({
      projects: [],
      headerNavigation: [
        { label: "News", href: "/news" },
        {
          label: "Über uns",
          children: [
            { label: "Verein", href: "/ueber-uns" },
            { label: "Team", href: "/ueber-uns#team" },
          ],
        },
      ],
    });
    expect(menus.map((menu) => menu.label)).toEqual(["News", "Über uns"]);
    expect(menus[1].children?.[1].href).toBe("/ueber-uns#team");
  });
});
