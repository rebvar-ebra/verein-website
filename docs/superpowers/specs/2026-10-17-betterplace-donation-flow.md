# Betterplace Donation Flow Design

## Goal

Complete the public donation experience for Neuer Tag by presenting the active DALIA campaign clearly on `/spenden` and handing all payment data to Betterplace's official checkout.

## User experience

- The donation page shows the active Betterplace campaign image, title, summary, location, confirmed donation count, donated amount, remaining amount, and progress.
- Campaign statistics come from Betterplace's public project API and are refreshed at most once per hour.
- The amount selector remains a non-payment preference aid. The page clearly says that the donor confirms the amount again in Betterplace.
- The primary action opens the official Betterplace donation URL in a new tab and identifies Betterplace before navigation.
- The bank-transfer option remains available with the association's existing bank details.
- The page explains that Neuer Tag never receives card or payment credentials through this website.

## Safety and failure behavior

- Only project URLs on `https://www.betterplace.org` are accepted from Sanity.
- The server extracts the numeric project ID from the configured campaign URL and calls only `https://api.betterplace.org`.
- Betterplace API data is validated before rendering.
- If the API is unavailable or returns malformed data, the configured donation link and bank transfer still render without live statistics.
- If Betterplace reports `donations_prohibited`, `closed_at`, or no official donation link, the online donation action is disabled and explains why.
- No card data, bank login, donor identity, or payment result is submitted to or stored by this website.

## CMS workflow

The active campaign is controlled in Sanity under **Website-Einstellungen → Spendenwege → Betterplace-Spendenlink**. An editor pastes the public Betterplace campaign or donation URL. The website derives the project ID and live presentation from that URL. Changing the URL switches the displayed campaign without a code change.

## Accessibility and responsive behavior

- Campaign progress has a textual value and accessible progressbar semantics.
- The amount selector uses a labelled radio group and visible keyboard focus.
- External navigation is disclosed in the link text and supporting copy.
- The layout stacks on mobile and uses two columns only at large widths.

## Out of scope

- Custom card processing, Stripe, PayPal API integration, and local payment records.
- Betterplace manager-only iframe code, because it is not available from the public campaign data.
- Claims about tax deductibility beyond content explicitly supplied by the organization or Betterplace.
