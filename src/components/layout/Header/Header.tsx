"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { Flower } from "@/components/ui/arrow";
import { clubLinks, projectLinks } from "@/lib/wireframe-content";
import { NavigationDropdown } from "./NavigationDropdown";
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const mobileLinks = [
    { label: "Projekte", href: "/projekte" },
    ...clubLinks,
    { label: "News", href: "/news" },
    { label: "Mitglied werden", href: "/mitglied-werden" },
    { label: "Spenden", href: "/spenden" },
  ];
  return (
    <header
      className="relative z-30 border-b border-forest/15 bg-cream"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="shell flex min-h-24 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Verein – Startseite"
          className="flex shrink-0 items-center gap-2 text-3xl font-bold tracking-tighter"
        >
          <Flower className="h-9 w-9 text-orange" />
          verein.
        </Link>
        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-8 lg:flex"
        >
          <NavigationDropdown label="Projekte" links={projectLinks} />
          <NavigationDropdown label="Verein" links={clubLinks} />
          <Link href="/news" className="nav-link text-sm">
            News
          </Link>
        </nav>
        <div className="flex items-center gap-5">
          <Link
            href="/mitglied-werden"
            className="hidden text-sm font-medium md:block"
          >
            Mitglied werden
          </Link>
          <Link
            href="/spenden"
            className="button button-orange hidden sm:inline-flex"
          >
            Spenden <span aria-hidden="true">♡</span>
          </Link>
          <button
            ref={toggle}
            type="button"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
            className="flex h-12 w-12 items-center justify-center border border-forest/25 lg:hidden"
          >
            <span aria-hidden="true" className="text-2xl">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile Navigation"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-8rem)] overflow-y-auto border-b border-forest/20 bg-cream px-6 py-3 shadow-lg lg:hidden"
      >
        {mobileLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="block border-b border-forest/10 py-4"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
