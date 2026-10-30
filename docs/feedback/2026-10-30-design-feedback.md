# Design feedback — 30 October 2026

Source: neuer-tag-feedback-checkliste.pdf (31 items), supplied by the maintainer.

## Execution order
1. Header: icon size, aligned chevrons, consistent hover/focus, supplied project tile artwork.
2. Compact team contact groups (preserve About biographies), consent-gated maps, schedule image/download, short centered/long two-column editorial copy.
3. Consistent intro branding, SEO indexing and complete descriptions, meaningful image alternatives, email links, arrow spacing, telephone presentation, lowercase du.
4. Verify mobile/desktop, keyboard and consent behavior, CMS configuration, lint, types, tests, builds, production deployment.

## Decisions and supplied-content limits
- 1.1: retain quick exit on all pages until the organization decides scope; location.replace already implemented.
- 4.7: Studio341's external style guide is not in this repository. Record the short-centered/long-columns rule here.
- 5.1: the no-claim association logo must be supplied by Studio341; do not fabricate a brand variant.
- 6.9: normalize unambiguous spelling only. Staff roles, gendering policy and whether Anahita is already operating require editorial decisions.
- 6.10: amount selection already works locally; make the provider re-selection notice prominent beside the selector.
- 6.11: membership PDF and contribution amounts are not supplied; preserve the current request flow.
- 6.12: show the existing publication date on news cards and articles.

## Editorial layout rule
Short sections under centered headings: centered, maximum 40rem. Longer sections (approximately more than ten desktop lines): two left-aligned columns on desktop, one column on mobile. About biography disclosures remain left aligned.

## Checkpoint — pushed implementation, review still pending
- Implemented header icon/chevron/interaction styling, compact team groups, editorial layouts/email links, consent-gated maps, CMS schedule preview, intro branding consistency, robots metadata, publication dates, and a prominent donation selection notice.
- Uploaded the supplied project tile artwork to Sanity and updated project logo references. Backed up affected CMS content outside the repository before edits.
- Corrected unambiguous editorial spelling and complete donation/DALIA meta descriptions.
- Checks: lint, web/studio TypeScript, 68 unit/integration tests, web build and Studio build passed.
- Not a completed design audit: responsive visual review, remaining checklist details (including telephone display normalization and all button arrows), and organization decisions above remain. Browser review was interrupted after the browser connection failed.
- This checkpoint is pushed on the feature branch; it has not been merged to master.
