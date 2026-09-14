import Link from "next/link";
import { Flower } from "@/components/ui/arrow";
import { clubLinks, projectLinks } from "@/lib/wireframe-content";
export function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="shell grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 text-3xl font-bold">
            <Flower className="h-9 w-9 text-sage" />
            verein.
          </Link>
          <p className="mt-4 text-sm text-cream/70">
            Miteinander.
            <br />
            Füreinander.
          </p>
        </div>
        {[
          { title: "Projekte", links: projectLinks.slice(1) },
          { title: "Verein", links: clubLinks },
          {
            title: "Unterstützen",
            links: [
              { label: "Mitglied werden", href: "/mitglied-werden" },
              { label: "Spenden", href: "/spenden" },
              { label: "News", href: "/news" },
            ],
          },
          {
            title: "Informationen",
            links: [
              { label: "Datenschutz", href: "/datenschutz" },
              { label: "Impressum", href: "/impressum" },
            ],
          },
        ].map((group) => (
          <nav key={group.title} aria-label={group.title + " im Footer"}>
            <h2 className="mb-5 text-sm font-semibold">{group.title}</h2>
            {group.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm text-cream/80 hover:text-white hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="shell border-t border-cream/15 py-5 text-xs text-cream/70">
        Verein · Designvorschau nach Adobe XD · Inhalte zur Abstimmung
      </div>
    </footer>
  );
}
