import { pageMetadata } from "@/lib/cms/metadata";
import { getSettings } from "@/lib/cms/content";
import { EditorialPage } from "@/components/cms/EditorialPage";
import { DonationOptions } from "@/components/donations/DonationOptions";
export async function generateMetadata() {
  return pageMetadata("donationPage", { title: "Spenden" });
}
export default async function Page() {
  const settings = await getSettings();
  return (
    <EditorialPage type="donationPage">
      <DonationOptions details={settings?.donations || {}} />
    </EditorialPage>
  );
}
