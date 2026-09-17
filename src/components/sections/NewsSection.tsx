import { homepage } from "@/lib/preview-content";
export function NewsSection() {
  return (
    <section
      id="aktuelles"
      className="shell section-space border-t border-forest/15"
    >
      <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="eyebrow mb-4">Einblicke & Geschichten</p>
          <h2 className="section-title">
            Was gibt’s
            <br />
            <span className="font-serif italic">Neues?</span>
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-6 text-muted">
            Hier wächst der Platz für Neuigkeiten aus unserem Anahitasleben.
          </p>
        </div>
        <div>
          {homepage.news.map((item) => (
            <article
              key={item.title}
              className="border-b border-forest/20 py-6 first:pt-0"
            >
              <div className="mb-3 flex gap-3 text-xs text-muted">
                <span>{item.category}</span>
                <span>·</span>
                <span>Redaktioneller Entwurf</span>
              </div>
              <h3 className="text-2xl font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
