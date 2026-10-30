"use client";
import { useState } from "react";

export function LocationMap({ address }: { address: string }) {
  const [loaded, setLoaded] = useState(false);
  if (!address.trim()) return null;
  const params = new URLSearchParams({ q: address.replace(/\s+/g, " ").trim(), output: "embed" });
  return (
    <div className="map-preview">
      {loaded ? (
        <>
          <iframe
            title={`Google Maps: ${address.replace(/\s+/g, " ")}`}
            src={`https://www.google.com/maps?${params}`}
            className="h-64 w-full border-0"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <button type="button" className="mt-3 text-sm underline" onClick={() => setLoaded(false)}>Karte schließen</button>
        </>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center gap-4 bg-paper p-6 text-center">
          <p className="text-sm">Mit dem Laden der Karte wird eine Verbindung zu Google hergestellt. Dabei wird deine IP-Adresse an Google übertragen.</p>
          <button type="button" className="button button-outline" onClick={() => setLoaded(true)}>Google Maps laden</button>
          <a className="text-sm underline" href="/datenschutz">Datenschutzhinweise</a>
        </div>
      )}
    </div>
  );
}
