# Verein Homepage Implementation Plan

> Execute inline in the current session, following the approved design.

**Goal:** Deliver a responsive German homepage design preview for Verein.
**Architecture:** Keep the existing Next.js app structure. Separate layout and homepage sections from typed editorial preview data. Use native HTML for simple disclosure interactions.
**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS.
**Spec:** docs/superpowers/specs/2026-09-14-verein-design.md

## Global Constraints
- Organization content remains explicitly draft pending approval and Sanity integration.
- No fabricated operational services, legal text, or transaction flows.
- Accessible navigation and mobile layout are required.

## Tasks
- [x] Build reusable layout, preview content, and homepage sections in components/ and lib/.
- [x] Replace starter branding and metadata; add a shared preview information route for legal links.
- [x] Add navigation tests and scripts; verify lint, typecheck, tests, build, and browser rendering.
- [x] Document preview limitations and content/image provenance.
