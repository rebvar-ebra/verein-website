# Verein website

German nonprofit website design preview built with Next.js, React, TypeScript, and Tailwind CSS.

## Development

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Preview scope

The homepage contains responsive navigation, projects, about, participation, news, and help sections. Project and participation details use native disclosures. Contact, Impressum, and Datenschutz have explicit preview information pages. This is not a production launch: no forms, payments, real contact details, legal copy, or confirmed project offers are active. Robots metadata prevents preview indexing.

Editorial sample copy is isolated in `src/lib/preview-content.ts`. It must be replaced with validated Sanity content and approved organization information before launch. The application uses `src/app/(website)` with components and libraries under `src/`. See `docs/folder-structure.md` for the implemented structure and approved production expansion.

## Photography

Local illustrative images from Unsplash, not photographs of Verein or its members:

- https://images.unsplash.com/photo-1529156069898-49953e39b3ac (hero)
- https://images.unsplash.com/photo-1511632765486-a01980e01a18 (community)
- https://images.unsplash.com/photo-1464226184884-fa280b87c399 (garden)
- https://images.unsplash.com/photo-1559027615-cd4628902d4a (volunteering)

Replace illustrative photographs with organization-approved assets before publishing. Next.js serves optimized local copies; no image request goes directly to Unsplash from visitors.
