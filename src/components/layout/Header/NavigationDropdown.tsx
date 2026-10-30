"use client";
import Link from "next/link";
import { useId, useRef, useState } from "react";
export function NavigationDropdown({
  label,
  href,
  links,
}: {
  label: string;
  href?: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          trigger.current?.focus();
          event.stopPropagation();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="flex min-h-12 items-center gap-2 px-2 text-sm font-medium"
      >
        {label}
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </button>
      <div
        id={id}
        hidden={!open}
        className="absolute left-0 top-full z-30 min-w-60 border border-forest/15 bg-cream p-2 shadow-lg"
      >
        {href && (
          <Link href={href} onClick={() => setOpen(false)} className="block px-4 py-3 text-sm hover:bg-sage/50">
            {label} – Übersicht
          </Link>
        )}
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm hover:bg-sage/50"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
