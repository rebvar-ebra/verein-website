import { BrandMark } from "@/components/ui/arrow";
export function CTASection() {
  return (
    <section id="mitmachen" className="shell section-space">
      <div className="mb-10 text-center">
        <p className="eyebrow mb-4">Dein Platz ist hier</p>
        <h2 className="section-title">
          Es beginnt <span className="font-serif italic">mit dir.</span>
        </h2>
        <p className="mt-5 text-ink">
          Zeit, Ideen oder Unterstützung. Es gibt viele Wege, dabei zu sein.
        </p>
      </div>
      <div className="grid items-start gap-5 md:grid-cols-3">
        {[
          {
            title: "Zeit schenken",
            text: "Bring deine Fähigkeiten ein und gestalte das Miteinander aktiv mit.",
            label: "Ehrenamt entdecken",
            id: "ehrenamt",
            detail:
              "Konkrete Einsatzmöglichkeiten und Ansprechpersonen werden vor dem Start ergänzt.",
          },
          {
            title: "Mitglied werden",
            text: "Werde Teil der Gemeinschaft und begleite Anahita auf seinem Weg.",
            label: "Zur Mitgliedschaft",
            id: "mitglied-werden",
            detail:
              "Informationen zu Beiträgen, Voraussetzungen und dem Mitgliedsantrag folgen. Hier wird noch kein Antrag übermittelt.",
          },
          {
            title: "Gutes ermöglichen",
            text: "Unterstützung kann Ideen weiterbringen und neue Möglichkeiten eröffnen.",
            label: "Über Spenden",
            id: "spenden",
            detail:
              "Die Spendenfunktion ist noch nicht eingerichtet. In dieser Vorschau werden keine Zahlungen angenommen.",
          },
        ].map((item, i) => (
          <article
            key={item.id}
            id={item.id}
            className={`rounded-2xl p-7 ${i === 2 ? "bg-sage" : "bg-paper"}`}
          >
            <span
              className="mb-8 flex h-11 w-11 items-center justify-center rounded-full border border-forest/25 text-xl"
              aria-hidden="true"
            >
              <BrandMark className="h-10 w-10" />
            </span>
            <h3 className="text-2xl font-medium tracking-tight">
              {item.title}
            </h3>
            <p className="mb-7 mt-3 text-sm leading-6 text-muted">
              {item.text}
            </p>
            <details className="group/disclosure">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between border-t border-forest/15 pt-5 text-sm font-medium">
                {item.label}
                <span aria-hidden="true" className="shrink-0 text-xl">
                  <span className="group-open/disclosure:hidden">+</span>
                  <span className="hidden group-open/disclosure:inline">−</span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-6">{item.detail}</p>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
