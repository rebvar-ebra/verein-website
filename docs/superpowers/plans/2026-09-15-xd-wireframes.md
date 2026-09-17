# XD wireframe implementation

Source: https://xd.adobe.com/view/df2df6cb-764c-4ec2-8c58-6ffbee59c224-8a7e/
User requested implementation based on this design and confirmed continuation.

## Observed screens
1. Startseite: navigation with Projekte/Anahita dropdowns, News, membership/donation links; separate contact strip; full-width banner; centered introduction; three project cards; alternating help/news image sections; two support cards; FAQ; sponsors; multi-column footer.
2. Projekt: project image, introduction, three metrics, team, location/schedule cards, contact section.
3. News_Archiv: centered heading, three-column image grid.
4. News: wide image, centered title, two-column article body.
5. Mitglied Werden: banner, intro, steps, application download/contact cards, donation cross-link.
6. Spenden: banner, introduction, bank/PayPal cards, donation documentation contact, membership cross-link.
7. Über uns: banner, intro, three metrics, team grid, founding section.
8. Stellenangebote: banner, introduction, three benefits, two vacancy cards.
9. Hilfe_Beratung: prominent contact/safe-exit strip, banner, intro, direct-contact choices, named-contact area, supporting project links.

## Implementation
- Keep approved cream/green/orange palette and local illustrative photographs. Adopt XD proportions, ordering, rectangular cards, restrained typography.
- Replace homepage section anchors in navigation with dedicated routes; preserve existing anchors where practical.
- Use server-rendered shared banner, introduction, split section, card, team/metric preview components and fixture data isolated from components.
- Add keyboard-accessible navigation dropdowns and quick exit using location.replace. Do not fabricate hotline numbers, partner logos, payment details, jobs, metrics or member identities.
- Membership download and payment methods remain visibly unavailable pending approved assets/integrations; contact validation remains local only.
- Verify navigation, FAQ, dynamic detail routes/404s, responsive layouts, and required repository checks.
