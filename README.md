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

The preview follows the nine Adobe XD wireframes: a full-width homepage banner, project cards, alternating content sections, support cards, FAQ, sponsor placeholders, dropdown navigation and dedicated project, news, membership, donation, about, vacancies and help pages. FAQ uses native disclosures; project and support cards link to their own pages. Contact has a locally validated form preview; Impressum and Datenschutz have explicit preview information pages. This is not a production launch: no message delivery, payments, real contact details, legal copy, or confirmed project offers are active. Robots metadata prevents preview indexing.

Editorial sample copy is isolated in `src/lib/preview-content.ts`. It must be replaced with validated Sanity content and approved organization information before launch. The application uses `src/app/(website)` with components and libraries under `src/`. See `docs/folder-structure.md` for the implemented structure and approved production expansion.

## Photography

Local illustrative images from Unsplash, not photographs of Verein or its members:

- https://images.unsplash.com/photo-1529156069898-49953e39b3ac (hero)
- https://images.unsplash.com/photo-1511632765486-a01980e01a18 (community)
- https://images.unsplash.com/photo-1464226184884-fa280b87c399 (garden)
- https://images.unsplash.com/photo-1559027615-cd4628902d4a (volunteering)

Replace illustrative photographs with organization-approved assets before publishing. Next.js serves optimized local copies; no image request goes directly to Unsplash from visitors.

## Wireframe implementation

See `docs/superpowers/plans/2026-09-15-xd-wireframes.md` for the observed Adobe XD layouts and `docs/xd-verification.md` for verification. Existing colors and illustrative photographs are retained. Placeholder metrics, team profiles, sponsors and contact/payment information await organization approval.
