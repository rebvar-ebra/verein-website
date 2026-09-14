import { InfoSection } from "@/components/sections/InfoSection";
import { infoPages } from "@/lib/info-pages";
export const metadata = { title: infoPages.kontakt.title };
export default function Page() {
  return <InfoSection {...infoPages.kontakt} />;
}
