import Link from "next/link";
import { Arrow } from "../ui/arrow";
export function HelpSection() {
  return (
    <section id="hilfe" className="shell pb-20">
      <div className="flex flex-col justify-between gap-7 rounded-2xl bg-sage/50 p-8 md:flex-row md:items-center md:p-10">
        <div>
          <p className="eyebrow mb-3">Beratung & Hilfe</p>
          <h2 className="text-3xl font-medium tracking-tight">
            Ein offenes Ohr. Ein nächster Schritt.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Dieser Bereich wird mit bestätigten Beratungsangeboten und
            Kontaktdaten ergänzt. Die Vorschau bietet noch keine Beratung oder
            Kontaktaufnahme.
          </p>
        </div>
        <Link href="/kontakt" className="button button-outline shrink-0">
          Zum Kontaktbereich <Arrow />
        </Link>
      </div>
    </section>
  );
}
