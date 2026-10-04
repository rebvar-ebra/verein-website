export function ProjectLocations({ address }: { address?: string | null }) {
  const locations = address?.split(/\r?\n\s*\r?\n/).map((value) => value.trim()).filter(Boolean) ?? [];

  if (!locations.length) {
    return <p>Die Adresse wird ergänzt, sobald der Projektstandort bestätigt ist.</p>;
  }

  return (
    <p className="whitespace-pre-line">
      {locations.map((location, index) => (
        <span key={`${index}-${location}`}>
          {index > 0 ? "\n\n" : null}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.replace(/\s+/g, " "))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm hover:text-forest hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          >
            {location}
            <span className="sr-only"> (In Google Maps öffnen, neuer Tab)</span>
          </a>
        </span>
      ))}
    </p>
  );
}
