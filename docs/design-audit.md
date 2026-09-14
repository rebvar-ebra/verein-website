# Design interaction audit

## Corrected

- Participation cards: opening one native disclosure previously stretched all cards in the grid row. Changed grid alignment to start. Browser measurements: before, every card grew from 293px to 381px; after, the opened card grows from 301px to 389px while both neighbors stay at 301px.
- Project and participation disclosures now use plus/minus indicators and at least 44px-high controls. Native keyboard behavior is retained.
- Contact page now contains a responsive form with Name, E-Mail, Betreff, and Nachricht. Zod validates local test input. Errors are associated with fields, first invalid field receives focus, valid input is retained, and editing clears the stale confirmation.
- Contact form explicitly does not send or persist input. Controls remain disabled before hydration so no unhandled native submission can include field data.
- Added Kontakt to desktop/mobile navigation. Desktop navigation switches at the larger breakpoint to accommodate it. Mobile navigation scrolls on short viewports.

## Verified

- All existing homepage fragment links resolve to an element.
- All six native disclosures respond to Enter; each toggles independently.
- Mobile Spenden navigation reaches the correct section and closes the menu at 390×400.
- Homepage and contact page have no horizontal overflow at viewport widths 320, 390, 768, 1024, 1440.
- Contact page visually checked on desktop and mobile. Empty input exposes field errors and focuses Name. Valid test data explicitly reports that no message was sent.
- Contact, Impressum, Datenschutz, and return-home links navigate successfully in the browser.
- Unit tests: mobile navigation closes on selection/Escape, focus restoration, contact validation/error association, no fetch on valid preview input, preservation of input, and revalidation after editing.
- pnpm lint, pnpm typecheck, pnpm test (4 tests), pnpm build passed.

## Remaining implementation, not active services

Contact delivery, membership applications, donations, help requests, Sanity integration, approved contact details, and legal copy are not implemented. The contact form is a local design preview and must not be described as a working message-delivery flow. Server validation, database persistence, spam protection, rate limiting, and email integration are required before enabling real submission. Project/news detail pages are also not yet implemented; current navigation intentionally uses homepage sections.
