import { InfoSection } from "@/components/sections/InfoSection";
import { infoPages } from "@/lib/info-pages";
export const metadata = { title: infoPages.impressum.title };
export default function Page() {
  return <InfoSection {...infoPages.impressum} />;
}
