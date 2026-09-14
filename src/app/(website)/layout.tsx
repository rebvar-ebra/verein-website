import { ContactBar } from "@/components/layout/ContactBar/ContactBar";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
export default function WebsiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-cream focus:p-4"
      >
        Zum Inhalt springen
      </a>
      <div className="bg-forest px-4 py-2 text-center text-[11px] tracking-wide text-cream">
        DESIGNVORSCHAU{" "}
        <span aria-hidden="true" className="mx-2">
          ·
        </span>{" "}
        Beispielinhalte zur Abstimmung
      </div>
      <Header />
      <ContactBar />
      {children}
      <Footer />
    </>
  );
}
