import {afterEach, expect, it, vi} from "vitest";
vi.mock("@/lib/cms/sanity.client", () => ({fetchCms: vi.fn()}));
import {fetchCms} from "@/lib/cms/sanity.client";
import sitemap from "./sitemap";
import robots from "./robots";
afterEach(() => {vi.unstubAllEnvs(); vi.resetAllMocks();});
it("uses the configured origin for static pages, CMS details and robots", async () => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.org/");
  vi.mocked(fetchCms).mockResolvedValue([
    {_type: "project", slug: "dalia", _updatedAt: "2026-09-20T12:00:00Z"},
    {_type: "newsArticle", slug: "neue angebote", _updatedAt: "2026-09-21T12:00:00Z"},
  ]);
  const result = await sitemap();
  expect(result).toHaveLength(14);
  expect(result).toContainEqual({url: "https://example.org/satzung"});
  expect(result).toContainEqual({url: "https://example.org/projekte/dalia", lastModified: "2026-09-20T12:00:00Z"});
  expect(result).toContainEqual({url: "https://example.org/news/neue%20angebote", lastModified: "2026-09-21T12:00:00Z"});
  expect(robots().sitemap).toBe("https://example.org/sitemap.xml");
});
it("keeps static pages with an empty CMS and propagates outages instead of caching an incomplete sitemap", async () => {
  vi.mocked(fetchCms).mockResolvedValueOnce([]).mockRejectedValueOnce(new Error("CMS unavailable"));
  expect(await sitemap()).toHaveLength(12);
  await expect(sitemap()).rejects.toThrow("CMS unavailable");
});
