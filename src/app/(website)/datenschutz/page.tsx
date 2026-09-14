import { InfoSection } from "@/components/sections/InfoSection";
import { infoPages } from "@/lib/info-pages";
export const metadata = { title: infoPages.datenschutz.title };
export default function Page() {
  return <InfoSection {...infoPages.datenschutz} />;
}
