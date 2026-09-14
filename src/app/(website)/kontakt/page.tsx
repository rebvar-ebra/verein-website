import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm/ContactForm";
export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktformular von Verein – derzeit als Formularvorschau ohne Versand verfügbar.",
};
export default function Page() {
  return (
    <main id="main-content" className="shell section-space">
      <div className="grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-5">Kontakt</p>
          <h1 className="section-title">
            Ein guter Anfang:
            <br />
            <span className="font-serif italic">ins Gespräch kommen.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted">
            Ob Frage, Idee oder Interesse am Mitmachen – hier entsteht der
            Kontaktbereich von Verein.
          </p>
          <div className="mt-8 rounded-2xl bg-paper p-6">
            <h2 className="text-lg font-medium">Kontaktmöglichkeiten</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              E-Mail-Adresse, Telefonnummer und Anschrift werden nach
              Bestätigung durch Verein ergänzt. Aktuell ist über diese Seite
              noch keine Kontaktaufnahme möglich.
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
