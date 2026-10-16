"use client";
import { BrandMark } from "@/components/ui/arrow";
import Link from "next/link";
import { useRef, useState } from "react";
import Image from "next/image";
import { NavigationDropdown } from "./NavigationDropdown";
import { buildHeaderNavigation, type NavigationItem } from "./navigation";
export function Header({
  menus = buildHeaderNavigation(),
}: {
  menus?: NavigationItem[];
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const mobileActions = [
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
          aria-label="Neuer Tag – Startseite"
          className="flex shrink-0 items-center gap-2 text-3xl font-bold tracking-tighter"
        >
          <Image
            src="/brand/neuer-tag-caption.webp"
            alt="Neuer Tag"
            width={700}
            height={178}
            priority
            className="h-auto w-44 sm:w-56 lg:w-64"
          />
        </Link>
        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {menus.map((menu) => menu.children?.length ? (
            <NavigationDropdown key={menu.label} label={menu.label} href={menu.href} links={menu.children} />
          ) : menu.href ? (
            <Link key={menu.label} href={menu.href} className="nav-link text-sm">
              {menu.label}
            </Link>
          ) : null)}
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
            className="button button-orange hidden px-[22px] py-[10px] sm:inline-flex"
          >
            Spenden{" "}
            <span aria-hidden="true">
              <BrandMark className="h-6 w-6 brightness-0 invert" />
            </span>
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
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="h-6 w-6"
              >
                <path
                  d={open ? "M6 6l12 12M18 6 6 18" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
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
        {menus.map((menu) => menu.children?.length ? (
          <details key={menu.label} className="border-b border-forest/10 py-1">
            <summary className="cursor-pointer py-3 font-medium marker:text-orange">
              {menu.label}
            </summary>
            {menu.href && (
              <Link href={menu.href} onClick={() => setOpen(false)} className="block py-3 pl-5 text-sm">
                {menu.label} – Übersicht
              </Link>
            )}
            {menu.children.map((link) => (
              <Link key={`${link.href}-${link.label}`} href={link.href} onClick={() => setOpen(false)} className="block py-3 pl-5 text-sm">
                {link.label}
              </Link>
            ))}
          </details>
        ) : menu.href ? (
          <Link
            key={`${menu.href}-${menu.label}`}
            href={menu.href}
            onClick={() => setOpen(false)}
            className="block border-b border-forest/10 py-4"
          >
            {menu.label}
          </Link>
        ) : null)}
        {mobileActions.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-forest/10 py-4">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
