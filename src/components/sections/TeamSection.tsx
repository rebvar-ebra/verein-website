
export function TeamSection({
  title = "Unser Team",
  count = 6,
}: {
  title?: string;
  count?: number;
}) {
  return (
    <section className="shell section-space text-center">
      <h2 className="text-3xl font-medium">{title}</h2>
      <p className="mt-3 text-sm text-muted">
        Teamprofile werden nach Freigabe ergänzt.
      </p>
      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3">
        {Array.from({ length: count }, (_, i) => (
          <div key={i}>
            <div
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sage/60"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-10 w-10 text-olive"
              >
                <circle cx="12" cy="8" r="3" />
                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
              </svg>
            </div>
            <p className="mt-4 font-medium">Profil {i + 1}</p>
            <p className="mt-1 text-xs text-muted">Name und Funktion folgen</p>
          </div>
        ))}
      </div>
    </section>
  );
}
