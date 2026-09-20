# Neuer Tag content import — 20 September 2026

Source: https://neuertag-ev.de/ and its linked Impressum, Datenschutz and Satzung pages. Public editorial content imported at the website owner's request.

## Imported
- Homepage mission, goals, original photography and supporting calls to action.
- Founding history and seven association team biographies with original portraits.
- DALIA description, two venues, three project contacts, languages, phone numbers, email and archived 2025 offer flyer.
- Anahita announcement and LOTTO Stiftung Berlin funding statement. No invented opening date, timetable or physical address.
- Contact information for the association, managing director and board; Instagram link.
- Account holder, existing bank details, receipt instructions and the exact Betterplace campaign URL linked by the source.
- Membership basics from the statutes, and the full statutes on /satzung.
- Source Impressum and privacy copy. No legal certification implied.
- Anahita announcement migrated as an article. The article explicitly states the migration date; source publication date is unknown.
- Example articles archived rather than deleted. Existing supplied project logos, branding, sponsor assets, footer layout and card alignment retained.

## Editorial review still required
- Source DALIA flyer was uploaded June 2025 and contains July/August dates. It is labeled archived; current times must be confirmed.
- Source calls Anahita “Coming soon”. Current opening status remains unconfirmed.
- Source imprint provides only Berlin, Marzahn, not a street address. Its historical legal reference is retained, not silently updated.
- Source privacy copy addresses association data processing and needs organization/legal review for the actual new hosting, CMS and future form/payment integrations before launch.
- No membership fee, emergency hotline or unconfirmed contact information was invented. General association telephone is not presented as an emergency hotline.
- Forms remain in their existing preview/non-sending state. This task does not activate private submissions or payments.
- No old cookie-consent scripts, analytics, tracking or embeds imported. Betterplace is a normal external link; amount selection is repeated there.
- Photo attribution from source filenames is preserved with the corresponding CMS images and displayed in image captions. Other source images have no explicit photographer credit in the source.

## Reproduction
Public source snapshot: `apps/studio/scripts/data/neuertag-source-2026-09-20.json`.
Import: from `apps/studio`, run `pnpm exec sanity exec scripts/import-neuertag-content.js --with-user-token`.
The script uses deterministic document IDs, reuses assets, saves a timestamped document backup in /tmp before writing, and checks document revisions. Re-running deliberately reapplies imported editorial fields, so review subsequent CMS edits before rerunning.
