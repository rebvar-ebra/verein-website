import { EditorialPage } from "@/components/cms/EditorialPage";
import { pageMetadata } from "@/lib/cms/metadata";
export async function generateMetadata() {
  return pageMetadata("statutesPage", { title: "Satzung" });
}
export default function Page() {
  return <EditorialPage type="statutesPage" />;
}
