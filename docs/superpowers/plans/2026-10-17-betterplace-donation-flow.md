# Betterplace Donation Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show the active Betterplace campaign and provide a safe, resilient handoff to its official donation checkout.

**Architecture:** A server-only adapter derives a Betterplace project ID from the Sanity URL, fetches and validates public API data with one-hour revalidation, and maps it to a small domain type. The server page passes that type into the existing client donation component, which owns amount selection but never handles payment credentials.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Zod, Tailwind CSS, Sanity, Vitest, React Testing Library

**Spec:** `docs/superpowers/specs/2026-10-17-betterplace-donation-flow.md`

## Global Constraints

- Payment credentials are handled only by Betterplace.
- Only HTTPS Betterplace campaign URLs and the official public Betterplace API are allowed.
- The existing bank-transfer option and Sanity content remain available.
- No new dependency is introduced.

## Review Focus

- Malicious or malformed campaign URLs must not cause an arbitrary server-side fetch.
- API downtime or malformed API JSON must preserve a usable fallback donation link.
- A prohibited or closed campaign must not expose an active payment action.
- Amount selection must not claim that the amount is transferred to Betterplace.
- Progress values outside the expected range must not break visual or accessible output.

---

### Task 1: Betterplace campaign adapter

**Files:**
- Create: `src/features/donations/betterplace.server.ts`
- Test: `src/features/donations/betterplace.server.test.ts`

**Interfaces:**
- Consumes: `betterplaceUrl: string | null | undefined` from CMS settings and an injectable `fetch` implementation.
- Produces: `getBetterplaceCampaign(url, fetcher?) -> Promise<BetterplaceCampaign | null>` and the `BetterplaceCampaign` type.

- [ ] Write failing tests for safe project-ID extraction, validated API mapping, API failure, malformed data, and prohibited campaigns.
- [ ] Run the focused tests and verify they fail because the adapter does not exist.
- [ ] Implement the server-only adapter with Zod validation and a one-hour `next.revalidate` fetch option.
- [ ] Run focused tests and the full suite.
- [ ] Commit the adapter.

### Task 2: Campaign-rich donation page

**Files:**
- Modify: `src/app/(website)/spenden/page.tsx`
- Modify: `src/components/donations/DonationOptions.tsx`
- Modify: `src/components/donations/DonationOptions.test.tsx`
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: `BetterplaceCampaign | null` from Task 1 and existing Sanity donation settings.
- Produces: responsive campaign details, safe online donation states, accessible progress, and the existing bank-transfer presentation.

- [ ] Add failing component tests for campaign details, fallback behavior, exact official checkout URL, prohibited state, and clamped progress.
- [ ] Run focused tests and verify the new assertions fail.
- [ ] Update the page to fetch the campaign server-side and pass it to the client component.
- [ ] Extend the component and remote image configuration with the campaign presentation and safe states.
- [ ] Run focused tests and the full suite.
- [ ] Commit the page experience.

### Task 3: CMS guidance and stale donation copy

**Files:**
- Modify: `apps/studio/schemaTypes/documents/siteSettings.ts`
- Modify: `src/components/sections/CTASection.tsx`
- Create: `src/components/sections/CTASection.test.tsx`
- Create: `docs/donations.md`

**Interfaces:**
- Consumes: the existing Sanity `donations.betterplaceUrl` field.
- Produces: editor guidance, a real `/spenden` call to action, and an operational guide for replacing the campaign.

- [ ] Add a failing CTA test proving the donation action links to `/spenden` and no preview-only warning remains.
- [ ] Run the focused test and verify it fails.
- [ ] Replace the stale disclosure with a link and add clear Sanity field descriptions and validation.
- [ ] Document how an editor adds or replaces a Betterplace campaign.
- [ ] Run unit tests, lint, typecheck, studio typecheck, and production build.
- [ ] Commit the CMS and documentation updates.
