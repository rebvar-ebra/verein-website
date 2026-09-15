import { beforeEach, expect, it, vi } from "vitest";
import { z } from "zod";
const { fetch, createClient } = vi.hoisted(() => {
  const fetch = vi.fn();
  return { fetch, createClient: vi.fn(() => ({ fetch })) };
});
vi.mock("server-only", () => ({}));
vi.mock("@sanity/client", () => ({ createClient }));
beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "abc123");
  vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
});
it("reads published content with bounded cache and preserves empty results", async () => {
  fetch.mockResolvedValue([]);
  const { fetchCms } = await import("./sanity.client");
  expect(await fetchCms("*[]", z.array(z.string()))).toEqual([]);
  expect(createClient).toHaveBeenCalledWith(
    expect.objectContaining({ perspective: "published", useCdn: false }),
  );
  expect(fetch).toHaveBeenCalledWith(
    "*[]",
    {},
    expect.objectContaining({ next: { revalidate: 60 } }),
  );
});
it("rejects malformed CMS responses without exposing provider errors", async () => {
  const log = vi.spyOn(console, "error").mockImplementation(() => {});
  fetch.mockResolvedValue({ secret: "private" });
  const { fetchCms } = await import("./sanity.client");
  await expect(fetchCms("*[]", z.array(z.string()))).rejects.toThrow(
    "Inhalte sind vorübergehend nicht verfügbar.",
  );
  expect(log).toHaveBeenCalledWith("cms_content_read_failed");
  log.mockRestore();
});
