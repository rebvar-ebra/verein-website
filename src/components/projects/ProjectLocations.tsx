import { LocationMap } from "./LocationMap";
export function ProjectLocations({ address, showMaps = true }: { address?: string | null; showMaps?: boolean }) {
  const locations = address?.split(/\r?\n\s*\r?\n/).map((value) => value.trim()).filter(Boolean) ?? [];

  if (!locations.length) {
    return <p>Die Adresse wird ergänzt, sobald der Projektstandort bestätigt ist.</p>;
  }

  return (
    <div className="space-y-6">
      {locations.map((location, index) => (
        <div key={`${index}-${location}`} className="space-y-4">
          {showMaps && <LocationMap address={location} />}

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.replace(/\s+/g, " "))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-pre-line rounded-sm hover:text-forest hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          >
            {location}
            <span className="sr-only"> (In Google Maps öffnen, neuer Tab)</span>
          </a>
        </div>
      ))}
    </div>
  );
}

export function ProjectMaps({ address }: { address?: string | null }) {
  const locations = address?.split(/\r?\n\s*\r?\n/).map((value) => value.trim()).filter(Boolean) ?? [];
  if (!locations.length) return <div className="flex min-h-64 items-center justify-center bg-paper p-6 text-center text-sm text-muted">Der bestätigte Projektstandort wird hier ergänzt.</div>;
  return <div className="space-y-4">{locations.map((location) => <LocationMap key={location} address={location} />)}</div>;
}
