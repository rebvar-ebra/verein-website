import Link from "next/link";
export function ContactBar() {
  return (
    <div className="border-b border-forest/10 bg-paper/50">
      <div className="shell flex min-h-10 flex-wrap items-center justify-end gap-x-6 gap-y-1 py-1 text-xs">
        <Link href="/beratung-hilfe" className="py-1 hover:underline">
          Beratung & Hilfe
        </Link>
        <Link href="/kontakt" className="py-1 underline underline-offset-4">
          Kontakt aufnehmen →
        </Link>
      </div>
    </div>
  );
}
