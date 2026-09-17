# Adobe XD preview verification — 2026-09-15

Source: https://xd.adobe.com/view/df2df6cb-764c-4ec2-8c58-6ffbee59c224-8a7e/

All nine artboards inspected in Adobe XD. Desktop layout structure applied using existing cream/green/orange styling. This is a layout adaptation, not a claim of pixel-identical reproduction or production service availability.

Implemented: homepage with wide hero, centered intro, projects, alternating help/news sections, membership/donation cards, FAQ and sponsor placeholders; project listing/detail, news listing/detail, about/team, membership steps, bank/PayPal donation preview, vacancies/engagement, help and quick exit. Contact form retained. Header now has Projects/Anahita dropdowns and a contact strip; footer links to dedicated routes.

Verification:
- Required lint, typecheck, five tests and production build pass.
- Browser checked 11 distinct page layouts at widths 320, 768, 1440: no horizontal overflow and exactly one H1 on each.
- Visually checked desktop homepage/project/article and mobile homepage/news archive.
- Dropdown project link opens detail page; mobile menu selection opens news archive and closes menu; news article link opens the correct article.
- Quick exit tested in browser: immediately navigates from help page to https://www.google.com/. Code uses location.replace and does not claim to erase history.
- Code review found no blocking issues in navigation, routes or quick exit.

Remaining content/integrations: approved CMS content and schemas, team identities, real metrics, sponsor logos, contact channels, application download, real jobs, bank/PayPal configuration, private submissions, payments and legal text. These areas are visibly labeled pending and do not pretend to be live services. Contact form still validates locally only.
