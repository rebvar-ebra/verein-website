"use client";
import Link from "next/link";
import { useId, useRef, useState } from "react";
export function NavigationDropdown({
  label,
  links,
}: {
  label: string;
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
        <span
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          ⌄
        </span>
      </button>
      <div
        id={id}
        hidden={!open}
        className="absolute left-0 top-full z-30 min-w-60 border border-forest/15 bg-cream p-2 shadow-lg"
      >
        {links.map((link) => (
          <Link
            key={link.href}
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
