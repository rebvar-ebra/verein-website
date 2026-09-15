import { pageMetadata } from "@/lib/cms/metadata";
import { cmsEnabled } from "@/lib/cms/sanity.client";
import { EditorialPage } from "@/components/cms/EditorialPage";
import { InfoSection } from "@/components/sections/InfoSection";
import { infoPages } from "@/lib/info-pages";
export async function generateMetadata() {
  return pageMetadata("imprintPage", { title: infoPages.impressum.title });
}
export default function Page() {
  if (cmsEnabled) return <EditorialPage type="imprintPage"></EditorialPage>;
  return <InfoSection {...infoPages.impressum} />;
}
