import { describe, expect, it, vi } from "vitest";
import {
  extractBetterplaceProjectId,
  getBetterplaceCampaign,
} from "./betterplace.server";

const donationUrl =
  "https://www.betterplace.org/de/donate/platform/projects/147505-ein-interkultureller-frauentreff";

const apiProject = {
  id: 147505,
  title: "Interkultureller Frauentreff DALIA",
  summary: "Beratung und Bildung für Frauen und Mädchen in Berlin.",
  city: "Berlin",
  donations_prohibited: false,
  closed_at: null,
  open_amount_in_cents: 571500,
  donated_amount_in_cents: 18500,
  donations_count: 5,
  progress_percentage: 3,
  profile_picture: {
    links: [
      {
        rel: "limit_1240x646",
        href: "https://betterplace-assets.betterplace.org/project.jpg",
      },
    ],
  },
  links: [
    {
      rel: "platform",
      href: "https://www.betterplace.org/de/projects/147505-dalia",
    },
    { rel: "new_donation", href: donationUrl },
  ],
};

describe("extractBetterplaceProjectId", () => {
  it.each([
    donationUrl,
    "https://www.betterplace.org/de/projects/147505-dalia",
  ])("extracts the project id from an official Betterplace URL", (url) => {
    expect(extractBetterplaceProjectId(url)).toBe(147505);
  });

  it.each([
    "https://evil.example/de/projects/147505-dalia",
    "http://www.betterplace.org/de/projects/147505-dalia",
    "https://www.betterplace.org/de/organisations/62581",
    "not-a-url",
  ])("rejects an unsafe or unrelated URL: %s", (url) => {
    expect(extractBetterplaceProjectId(url)).toBeNull();
  });
});

describe("getBetterplaceCampaign", () => {
  it("maps validated public campaign data and uses one-hour revalidation", async () => {
    const fetcher = vi.fn(async () =>
      new Response(JSON.stringify(apiProject), { status: 200 }),
    );

    const campaign = await getBetterplaceCampaign(donationUrl, fetcher);

    expect(fetcher).toHaveBeenCalledWith(
      "https://api.betterplace.org/de/api_v4/projects/147505.json",
      { next: { revalidate: 3600 } },
    );
    expect(campaign).toMatchObject({
      id: 147505,
      title: "Interkultureller Frauentreff DALIA",
      city: "Berlin",
      donationUrl,
      platformUrl: "https://www.betterplace.org/de/projects/147505-dalia",
      imageUrl: "https://betterplace-assets.betterplace.org/project.jpg",
      donatedAmountInCents: 18500,
      openAmountInCents: 571500,
      donationsCount: 5,
      progressPercentage: 3,
      isDonationOpen: true,
    });
  });

  it("marks a prohibited campaign as unavailable", async () => {
    const fetcher = vi.fn(async () =>
      new Response(
        JSON.stringify({ ...apiProject, donations_prohibited: true }),
        { status: 200 },
      ),
    );

    await expect(
      getBetterplaceCampaign(donationUrl, fetcher),
    ).resolves.toMatchObject({ isDonationOpen: false });
  });

  it("returns null without fetching for an unsafe campaign URL", async () => {
    const fetcher = vi.fn();

    await expect(
      getBetterplaceCampaign(
        "https://evil.example/de/projects/147505-dalia",
        fetcher,
      ),
    ).resolves.toBeNull();
    expect(fetcher).not.toHaveBeenCalled();
  });

  it.each([
    new Response("service unavailable", { status: 503 }),
    new Response(JSON.stringify({ id: "wrong" }), { status: 200 }),
  ])("returns null when the public API cannot provide valid data", async (response) => {
    const fetcher = vi.fn(async () => response);

    await expect(
      getBetterplaceCampaign(donationUrl, fetcher),
    ).resolves.toBeNull();
  });
});
