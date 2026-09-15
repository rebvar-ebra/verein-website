export function SponsorSection() {
  return (
    <section className="shell section-space text-center">
      <h2 className="text-2xl font-medium">Gemeinsam unterstützt</h2>
      <p className="mt-3 text-sm text-muted">
        Hier finden die freigegebenen Förderpartner ihren Platz.
      </p>
      <div
        className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-5"
        aria-label="Platzhalter für Förderpartner"
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="flex h-20 w-28 items-center justify-center rounded-full border border-dashed border-forest/20 bg-paper text-xs text-muted"
          >
            Logo folgt
          </div>
        ))}
      </div>
    </section>
  );
}
