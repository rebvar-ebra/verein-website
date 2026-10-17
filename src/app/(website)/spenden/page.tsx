import { pageMetadata } from "@/lib/cms/metadata";
import { getSettings } from "@/lib/cms/content";
import { EditorialPage } from "@/components/cms/EditorialPage";
import { DonationOptions } from "@/components/donations/DonationOptions";
import { getBetterplaceCampaign } from "@/features/donations/betterplace.server";
export async function generateMetadata() {
  return pageMetadata("donationPage", { title: "Spenden" });
}
export default async function Page() {
  const settings = await getSettings();
  const details = settings?.donations || {};
  const campaign = await getBetterplaceCampaign(details.betterplaceUrl);
  return (
    <EditorialPage type="donationPage">
      <DonationOptions details={details} campaign={campaign} />
    </EditorialPage>
  );
}
