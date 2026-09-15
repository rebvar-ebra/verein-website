export function ApplicationPreview({ roles }: { roles: string[] }) {
  const field =
    "mt-2 block w-full rounded-lg border border-divider bg-white px-4 py-3";
  return (
    <section className="shell section-space">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-6 text-center">Bewirb dich jetzt</h2>
        <p className="mb-8 text-muted">
          Formularvorschau: Der Bewerbungsversand ist noch nicht eingerichtet.
        </p>
        <fieldset
          disabled
          aria-label="Bewerbungsformular – noch nicht verfügbar"
          className="space-y-5"
        >
          <label className="block">
            Welche Stelle
            <select className={field} defaultValue="">
              <option value="">
                {roles.length
                  ? "Stelle auswählen"
                  : "Noch keine Stellen veröffentlicht"}
              </option>
              {roles.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </label>
          <label className="block">
            Dein Name
            <input className={field} name="name" autoComplete="name" />
          </label>
          <label className="block">
            Deine E-Mail
            <input
              className={field}
              name="email"
              type="email"
              autoComplete="email"
            />
          </label>
          <label className="block">
            Kurzer Hallo-Text
            <textarea className={field} name="message" rows={5} />
          </label>
          <button type="button" className="button button-outline opacity-60">
            Versand noch nicht verfügbar
          </button>
        </fieldset>
      </div>
    </section>
  );
}
