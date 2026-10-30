import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { RichText } from "./RichText";
import type { CmsBody } from "@/lib/cms/content.schema";
afterEach(cleanup);
it("makes a plain editorial email actionable without removing surrounding text", () => {
  const value: CmsBody = [{ _type: "block", _key: "a", children: [{ _type: "span", text: "Fragen? info@neuertag-ev.de kontaktieren.", marks: [] }] }];
  render(<RichText value={value} layout="section" />);
  expect(screen.getByRole("link", { name: "info@neuertag-ev.de" }).getAttribute("href")).toBe("mailto:info@neuertag-ev.de");
  expect(screen.getByText(/Fragen/).textContent).toContain("kontaktieren.");
});
