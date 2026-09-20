import { getSettings, getProjects } from "@/lib/cms/content";
import { cmsEnabled } from "@/lib/cms/sanity.client";
import { ContactBar } from "@/components/layout/ContactBar/ContactBar";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
export default async function WebsiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  const projects = cmsEnabled
    ? (await getProjects()).map((p) => ({
        label: p.title,
        href: `/projekte/${p.id}`,
      }))
    : undefined;
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-cream focus:p-4"
      >
        Zum Inhalt springen
      </a>
      <Header
        name={settings?.organisationName}
        navigation={cmsEnabled ? (settings?.navigation ?? []) : undefined}
        projects={projects}
      />
      <ContactBar />
      {children}
      <Footer />
    </>
  );
}
