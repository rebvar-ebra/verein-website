# Verein Website

A modern website for a German nonprofit organization , built with Next.js, React, TypeScript, and Tailwind CSS.

The project provides a responsive website structure with sections for projects, news, membership, donations, volunteering, information about the organization, and contact.

## Tech Stack

- [Next.js](https://nextjs.org/)
- React
- TypeScript
- Tailwind CSS
- Sanity CMS
- Vitest
- pnpm

## Features

- Responsive website layout
- Homepage with hero section and featured content
- Project overview and project detail pages
- News section
- Membership information
- Donation section
- Volunteer and support information
- FAQ section
- About page
- Vacancies page
- Contact page
- Impressum page
- Datenschutz page
- CMS integration with Sanity
- Form validation
- SEO and robots configuration
- Type checking, linting, testing, and production builds

## Project Structure

```text
.
├── apps/
│   └── studio/          # Sanity Studio
├── docs/                # Project documentation
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js application routes
│   ├── components/      # Reusable UI components
│   └── lib/             # Utilities and content
├── .gitignore
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json
└── README.md