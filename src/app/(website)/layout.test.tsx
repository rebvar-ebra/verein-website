import {cleanup, render, screen} from "@testing-library/react";
import {afterEach, expect, it, vi} from "vitest";
vi.mock("@/lib/cms/content", () => ({getSettings: vi.fn().mockResolvedValue({quickExitUrl: "https://www.google.com/"}), getProjects: vi.fn().mockResolvedValue([])}));
vi.mock("@/lib/cms/sanity.client", () => ({cmsEnabled: true}));
vi.mock("@/components/layout/Header/Header", () => ({Header: () => null}));
vi.mock("@/components/layout/Footer/Footer", () => ({Footer: () => null}));
vi.mock("@/components/layout/ContactBar/ContactBar", () => ({ContactBar: () => null}));
import WebsiteLayout from "./layout";
afterEach(cleanup);
it.each(["Startseite", "Projekte", "Spenden", "Beratung & Hilfe"])("renders one quick exit beside %s page content", async title => {
  render(await WebsiteLayout({children: <main>{title}</main>}));
  expect(screen.getAllByRole("button", {name: "Seite schnell verlassen ↗"})).toHaveLength(1);
  expect(screen.getByRole("main").textContent).toBe(title);
});
