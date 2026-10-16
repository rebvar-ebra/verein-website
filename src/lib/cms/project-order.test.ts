import { expect, test } from "vitest";
import { orderProjects } from "./project-order";

test("Anahita precedes DALIA without changing the remaining CMS order", () => {
  const projects = [
    { id: "dalia" },
    { id: "another" },
    { id: "anahita" },
    { id: "last" },
  ];
  expect(orderProjects(projects).map((project) => project.id)).toEqual([
    "anahita",
    "dalia",
    "another",
    "last",
  ]);
  expect(projects.map((project) => project.id)[0]).toBe("dalia");
});
