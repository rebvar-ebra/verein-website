"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { navigation } from "@/lib/preview-content";
import { Arrow, Flower } from "@/components/ui/arrow";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="relative z-20 border-b border-forest/10"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="shell flex h-24 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Verein – Startseite"
          className="flex items-center gap-2 text-4xl font-bold tracking-tighter"
        >
          <Flower className="h-9 w-9 text-orange" />
          verein<span className="text-orange">.</span>
        </Link>
        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-8 text-sm font-medium lg:flex"
        >
          {navigation.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <Link
            href="/#hilfe"
            className="hidden text-sm font-medium underline decoration-forest/30 underline-offset-4 sm:block"
          >
            Beratung & Hilfe
          </Link>
          <Link
            href="/#spenden"
            className="button button-orange hidden sm:inline-flex"
          >
            Spenden <span aria-hidden="true">♡</span>
          </Link>
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/30 lg:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d={open ? "m6 6 12 12M6 18 18 6" : "M4 7h16M4 12h16M4 17h16"}
              />
            </svg>
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile Navigation"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-forest/15 bg-cream px-6 py-6 shadow-lg lg:hidden"
      >
        {[
          ...navigation,
          { label: "Beratung & Hilfe", href: "/#hilfe" },
          { label: "Spenden", href: "/#spenden" },
        ].map((link) => (
          <Link
            onClick={() => setOpen(false)}
            key={link.href}
            href={link.href}
            className="flex items-center justify-between border-b border-forest/10 py-4 text-lg"
          >
            {link.label}
            <Arrow />
          </Link>
        ))}
      </nav>
    </header>
  );
}
