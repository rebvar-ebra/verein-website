# Anahita folder structure

The public Next.js application now uses `src/`. This follows the maintainer's latest structure rather than the earlier proposed `apps/web` location. All application components, features, and libraries belong inside `src`; public images remain in `public/`, configuration remains at the repository root, and Sanity Studio will live in `apps/studio`.

## Implemented

- `src/app/layout.tsx`: document, fonts, global styles, and metadata.
- `src/app/(website)/layout.tsx`: preview notice, skip link, header, and footer.
- `src/app/(website)/page.tsx`: homepage composition.
- `src/app/(website)/kontakt/page.tsx`, `impressum/page.tsx`, `datenschutz/page.tsx`: explicit preview routes; contact now includes a locally validated form.
- `src/components/layout/Header/Header.tsx` and `Footer/Footer.tsx`: existing navigation and footer.
- `src/components/sections/`: HeroSection, IntroSection, ProjectSection, NewsSection, CTASection, HelpSection, and shared InfoSection.
- `src/components/ui/arrow.tsx`: existing vector assets.
- `src/lib/preview-content.ts` and `info-pages.ts`: draft content.
- `@/*`: resolves to `src/*` in TypeScript and Vitest.

## Approved expansion

Add these modules as their functionality is implemented; empty or nonfunctional route handlers are not part of the preview.

- Website routes: `projekte/[slug]`, `news/[slug]`, `ueber-uns`, `mitglied-werden`, `spenden`, `mitmachen`, `beratung-hilfe`.
- API routes: membership, contact, help, application, payments/stripe/checkout, payments/stripe/webhook, payments/paypal.
- App conventions: robots.ts, sitemap.ts, error.tsx, not-found.tsx.
- Layout: DesktopNavigation, MobileNavigation, NavigationDropdown, ContactBar, Container where used.
- Sections: StatsSection and TeamSection once approved content exists.
- Components: projects, news, forms, donations, help, and shared ui components following the supplied names.
- Features: membership, donations, projects, news, applications, help, plus contact when implementing its workflow.
- Libraries: cms (client, images, queries), database (Prisma, transactions), email (Resend, templates), stripe, paypal, security, seo, utils.
- Sanity: `apps/studio/schemaTypes/documents`, `objects`, and `index.ts`.

## CMS contract supplied by the maintainer

Project: title, slug, shortDescription, heroImage, content, startDate, target, achieved, status, teamMembers[], gallery[], featured, seo, publishedAt.

NewsArticle: title, slug, excerpt, coverImage, content, author, categories[], publishedAt, featured, seo.

SiteSettings: organisationName, logo, email, phone, address, donationInformation, socialLinks, navigation, footerNavigation, emergencyPhone, emergencyUrl, quickExitUrl, defaultSeo.

Document types: project, newsArticle, teamMember, homepage, aboutPage, membershipPage, donationPage, helpPage, siteSettings.

Shared objects: hero, seo, statistic, callToAction, contentBlock, imageWithCaption, link.

Public editorial content belongs to Sanity; private submissions and payment metadata belong to PostgreSQL. External integrations run in server-side application code.
