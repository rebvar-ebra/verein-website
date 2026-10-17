import { z } from "zod";

type BetterplaceFetch = (
  input: string,
  init?: RequestInit & { next?: { revalidate: number } },
) => Promise<Response>;

const linkSchema = z.object({
  rel: z.string(),
  href: z.string().url(),
});

const apiProjectSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  summary: z.string(),
  city: z.string().nullable().optional(),
  donations_prohibited: z.boolean(),
  closed_at: z.string().nullable(),
  open_amount_in_cents: z.number().int().nonnegative(),
  donated_amount_in_cents: z.number().int().nonnegative(),
  donations_count: z.number().int().nonnegative(),
  progress_percentage: z.number().finite(),
  profile_picture: z
    .object({ links: z.array(linkSchema) })
    .nullable()
    .optional(),
  links: z.array(linkSchema),
});

export type BetterplaceCampaign = {
  id: number;
  title: string;
  summary: string;
  city: string | null;
  imageUrl: string | null;
  donatedAmountInCents: number;
  openAmountInCents: number;
  donationsCount: number;
  progressPercentage: number;
  donationUrl: string | null;
  platformUrl: string | null;
  isDonationOpen: boolean;
};

function isOfficialBetterplaceUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "www.betterplace.org";
  } catch {
    return false;
  }
}

function isBetterplaceAssetUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "betterplace-assets.betterplace.org"
    );
  } catch {
    return false;
  }
}

export function extractBetterplaceProjectId(value: string | null | undefined) {
  if (!value || !isOfficialBetterplaceUrl(value)) return null;

  const match = new URL(value).pathname.match(/\/projects\/(\d+)(?:[-/]|$)/);
  if (!match) return null;

  const id = Number(match[1]);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function getBetterplaceCampaign(
  betterplaceUrl: string | null | undefined,
  fetcher: BetterplaceFetch = fetch,
): Promise<BetterplaceCampaign | null> {
  const projectId = extractBetterplaceProjectId(betterplaceUrl);
  if (!projectId) return null;

  try {
    const response = await fetcher(
      `https://api.betterplace.org/de/api_v4/projects/${projectId}.json`,
      { next: { revalidate: 3600 } },
    );
    if (!response.ok) return null;

    const parsed = apiProjectSchema.safeParse(await response.json());
    if (!parsed.success || parsed.data.id !== projectId) return null;

    const data = parsed.data;
    const donationLink = data.links.find((link) => link.rel === "new_donation");
    const platformLink = data.links.find((link) => link.rel === "platform");
    const preferredImage = ["limit_1240x646", "fill_960x500", "original"]
      .map((rel) => data.profile_picture?.links.find((link) => link.rel === rel))
      .find(Boolean);
    const donationUrl =
      donationLink && isOfficialBetterplaceUrl(donationLink.href)
        ? donationLink.href
        : null;

    return {
      id: data.id,
      title: data.title,
      summary: data.summary,
      city: data.city ?? null,
      imageUrl:
        preferredImage && isBetterplaceAssetUrl(preferredImage.href)
          ? preferredImage.href
          : null,
      donatedAmountInCents: data.donated_amount_in_cents,
      openAmountInCents: data.open_amount_in_cents,
      donationsCount: data.donations_count,
      progressPercentage: data.progress_percentage,
      donationUrl,
      platformUrl:
        platformLink && isOfficialBetterplaceUrl(platformLink.href)
          ? platformLink.href
          : null,
      isDonationOpen:
        !data.donations_prohibited && data.closed_at === null && !!donationUrl,
    };
  } catch {
    return null;
  }
}
