import {render, screen, cleanup} from "@testing-library/react";
import {afterEach, expect, it} from "vitest";
import {JobList} from "./JobList";
afterEach(cleanup);
it("renders an empty state without an application form", () => {
  render(<JobList jobs={[]} />);
  expect(screen.getByText("Aktuell sind keine Stellen veröffentlicht.")).toBeTruthy();
  expect(screen.queryByRole("textbox")).toBeNull();
});
it("makes each position a detail link with type and publication date", () => {
  render(<JobList jobs={[{_id: "job-1", title: "Projektkoordination", slug: "projektkoordination", employmentType: "Teilzeit", location: "Berlin", excerpt: "Koordiniere unser Team.", content: [], publishedAt: "2026-10-04T12:00:00Z", seo: null}]} />);
  const link = screen.getByRole("link", {name: /Projektkoordination/});
  expect(link.getAttribute("href")).toBe("/mitmachen/projektkoordination");
  expect(link.textContent).toContain("Teilzeit");
  expect(link.textContent).toContain("4.10.2026");
  expect(link.querySelector("time")?.dateTime).toBe("2026-10-04T12:00:00Z");
});
