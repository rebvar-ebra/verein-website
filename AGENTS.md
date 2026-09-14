# AGENT.md

## 1. Project Purpose

This repository contains the public website and supporting backend services for a German nonprofit / association-style organization.

The website includes:

- Homepage
- Projects overview and project detail pages
- News overview and news detail pages
- About page
- Membership application page
- Donation page
- Join-the-team / volunteer page
- Advice & help page
- Contact page
- Legal pages such as Impressum and Datenschutz

The primary goal is to ship a secure, accessible, maintainable, SEO-friendly production website within a 4-week delivery window.

Agents working in this repository must optimize for:

1. Correctness
2. Simplicity
3. Security
4. Accessibility
5. Maintainability
6. Fast delivery
7. Minimal unnecessary infrastructure

Do not introduce complexity unless it solves a real requirement.

---

## 2. Approved Technology Stack

Use the following stack unless a repository maintainer explicitly changes it.

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### CMS
- Sanity

### Database
- PostgreSQL
- Neon or another managed PostgreSQL provider

### ORM
- Prisma

### Validation
- Zod

### Email
- Resend

### Payments
- Stripe
- PayPal only where explicitly required

### Bot / Spam Protection
- Cloudflare Turnstile

### Hosting
- Vercel

### DNS / Edge Security
- Cloudflare

### Testing
- Vitest
- React Testing Library
- Playwright

### Monitoring
- Sentry

### Package Manager
- pnpm

Do not add Express, NestJS, GraphQL, Redis, Kafka, RabbitMQ, Kubernetes, or additional backend services unless a requirement clearly justifies them.

This is a content-driven website, not a distributed systems research project.

---

## 3. Repository Architecture

Expected top-level structure:

```text
verein-website/
├── apps/
│   ├── web/
│   └── studio/
├── packages/
│   ├── config/
│   ├── types/
│   ├── ui/
│   └── validation/
├── infrastructure/
├── docs/
├── .github/
│   └── workflows/
├── .env.example
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

### apps/web
Contains the public Next.js application.

### apps/studio
Contains Sanity Studio and CMS schema definitions.

### packages/ui
Contains reusable cross-feature UI components only when they are genuinely shared.

### packages/types
Contains shared TypeScript domain types.

### packages/validation
Contains reusable Zod schemas.

### packages/config
Contains shared configuration where appropriate.

---

## 4. Next.js Route Structure

Preferred application routes:

```text
/
├── projekte/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── news/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── ueber-uns/page.tsx
├── mitglied-werden/page.tsx
├── spenden/page.tsx
├── spenden/erfolgreich/page.tsx
├── spenden/abgebrochen/page.tsx
├── mitmachen/page.tsx
├── beratung-hilfe/page.tsx
├── kontakt/page.tsx
├── impressum/page.tsx
└── datenschutz/page.tsx
```

API routes may include:

```text
/api/
├── membership/
├── contact/
├── help/
├── application/
└── payments/
    ├── stripe/
    │   ├── checkout/
    │   └── webhook/
    └── paypal/
```

Prefer Next.js server routes and server actions where appropriate.

Do not create a separate backend application unless required by a real limitation.

---

## 5. Component Architecture

Components must be organized by responsibility.

Preferred structure:

```text
components/
├── layout/
├── sections/
├── projects/
├── news/
├── forms/
├── donations/
├── help/
└── ui/
```

### Rules

- Do not create giant page components.
- Do not put business logic inside generic UI components.
- Do not create abstractions before at least two real use cases exist.
- Prefer composition over prop-heavy mega-components.
- Keep page-level components readable.
- Avoid ambiguous names such as `Card2`, `ComponentNew`, `FinalSection`, `TestButton`, or `NewNewHeader`.

Names must describe responsibility.

Good examples:

```text
ProjectCard
NewsGrid
MembershipForm
EmergencyBar
QuickExitButton
DonationSelector
```

---

## 6. Feature Layer

Business logic should be isolated from presentation where practical.

Preferred structure:

```text
features/
├── membership/
├── donations/
├── projects/
├── news/
├── applications/
└── help/
```

A feature may contain:

```text
feature-name/
├── feature-name.service.ts
├── feature-name.schema.ts
├── feature-name.types.ts
└── feature-name.repository.ts
```

Do not force every feature to contain every file. Use only what is useful.

---

## 7. CMS Rules

Sanity is the source of truth for public editorial content.

CMS content includes:

- Homepage sections
- Projects
- News articles
- About content
- Team members
- Help page content
- Donation page copy
- Membership page copy
- Contact details
- Navigation
- Footer
- SEO defaults

Do not hardcode editable organization content into React components unless it is clearly static application behavior.

### Recommended Sanity document types

```text
project
newsArticle
teamMember
homepage
aboutPage
membershipPage
donationPage
helpPage
siteSettings
```

### Recommended shared object types

```text
hero
seo
statistic
callToAction
contentBlock
imageWithCaption
link
```

---

## 8. Data Ownership

Use the correct storage system.

### Sanity
Use for public content, for example:

- project descriptions
- article content
- page copy
- hero images
- public team profiles
- navigation labels

### PostgreSQL
Use for private or transactional data, for example:

- membership applications
- volunteer applications
- contact requests
- help requests
- donation references
- audit information

Never store sensitive form submissions in Sanity unless explicitly approved.

---

## 9. Database Rules

Use Prisma for database access.

Never query PostgreSQL directly from client-side code.

All private data access must occur server-side.

Do not store:

- raw payment card numbers
- CVV codes
- bank credentials
- payment provider secrets

Payment providers must handle payment credentials.

Store only required transaction metadata.

Example donation fields:

```text
id
provider
providerTransactionId
amount
currency
frequency
donorEmail
status
createdAt
updatedAt
```

Minimize personal data retention.

---

## 10. Form Rules

All user-submitted forms must include:

1. Client-side validation for user experience
2. Server-side validation for security
3. Zod schema validation
4. Spam protection where appropriate
5. Rate limiting
6. Clear success state
7. Clear error state
8. Accessible validation messages

Never trust client-side validation.

Forms include:

- Membership application
- Contact request
- Help request
- Team / volunteer application
- Donation initiation

Do not log full sensitive form bodies.

---

## 11. Membership Flow

Expected flow:

```text
Visitor
→ /mitglied-werden
→ form
→ client validation
→ server validation
→ spam / rate-limit checks
→ save to PostgreSQL
→ send confirmation email
→ notify organization
→ success state
```

Membership submission must not be treated as automatically approved unless business requirements explicitly say so.

---

## 12. Donation Flow

Preferred Stripe flow:

```text
/spenden
→ select amount
→ select one-time or recurring
→ create Stripe Checkout session
→ redirect to Stripe
→ payment
→ Stripe webhook
→ verify webhook signature
→ persist transaction metadata
→ send confirmation
→ success page
```

Rules:

- Never mark a donation as paid based only on a browser redirect.
- Webhook verification is mandatory.
- Never trust payment amount values sent directly by the client.
- Validate allowed donation values server-side.
- Keep secrets server-side only.
- Never expose Stripe secret keys in browser code.

---

## 13. Help Page Rules

The `/beratung-hilfe` page is safety-sensitive.

Prioritize:

- clarity
- accessibility
- fast access to contact options
- privacy
- mobile usability

The quick-exit control must:

- be easy to find
- work immediately
- not show a confirmation dialog
- redirect to a neutral destination using `window.location.replace(...)`

Do not claim that the quick-exit feature erases browser history.

Do not use manipulative analytics or excessive tracking on the help page.

---

## 14. Security Requirements

All code must follow secure-by-default behavior.

Minimum requirements:

- HTTPS in production
- secure environment variable handling
- server-side validation
- rate limiting
- anti-spam protection
- secure headers
- Stripe webhook signature verification
- least-privilege database credentials
- no secrets in logs
- no secrets in client bundles
- no secrets committed to Git
- safe error messages
- dependency updates
- sanitized user-controlled output where needed

Never add a secret to `NEXT_PUBLIC_*` unless it is intentionally public.

Do not suppress TypeScript errors to make code compile.

Avoid `any` unless there is a documented reason.

---

## 15. Environment Variables

Keep `.env.example` updated.

Expected values may include:

```env
NEXT_PUBLIC_SITE_URL=

NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

DATABASE_URL=

RESEND_API_KEY=
CONTACT_EMAIL=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=

TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=

SENTRY_DSN=
```

Rules:

- `.env.example` contains names only, never real secrets.
- `.env.local` must not be committed.
- production secrets belong in cloud secret management / hosting settings.

---

## 16. TypeScript Rules

Use strict TypeScript.

Prefer explicit domain types.

Bad:

```ts
const data: any = ...
```

Good:

```ts
const project: Project = ...
```

Do not duplicate types across multiple folders without reason.

Prefer shared types for stable domain concepts.

Use generated types where tooling supports it.

---

## 17. Styling Rules

Use Tailwind CSS.

Prefer reusable layout primitives for:

- containers
- spacing
- typography
- buttons
- cards
- forms
- responsive breakpoints

Avoid large custom CSS files unless necessary.

Do not use arbitrary pixel values everywhere.

Prefer consistent design tokens for:

```text
container widths
spacing scale
font sizes
border radius
shadows
breakpoints
```

The wireframes are desktop-first, but the implementation must be fully responsive.

---

## 18. Responsive Design

Every page must support at minimum:

- mobile
- tablet
- desktop

Do not wait until the end of the project to make pages responsive.

Check responsive behavior while implementing each page.

Navigation must have a mobile version.

Card grids must collapse cleanly.

Long article text must remain readable.

Forms must work comfortably on small screens.

---

## 19. Accessibility

Accessibility is a project requirement, not optional polish.

Minimum expectations:

- semantic HTML
- keyboard navigation
- visible focus indicators
- accessible labels
- form error associations
- adequate color contrast
- meaningful alt text
- logical heading hierarchy
- buttons for actions
- links for navigation
- no interaction that requires hover only

Images that are decorative must use empty alt text.

Test important flows with keyboard-only navigation.

---

## 20. SEO

Every public page must define appropriate metadata.

Support:

- page title
- meta description
- canonical URL
- Open Graph metadata
- social preview image
- robots metadata

Dynamic pages:

```text
/news/[slug]
/projekte/[slug]
```

must generate metadata from CMS content.

The project must include:

```text
sitemap.xml
robots.txt
```

Use structured data where useful.

---

## 21. Performance

Optimize for good Core Web Vitals.

Prefer:

- Next.js Image
- optimized CMS image URLs
- static generation where appropriate
- server components by default
- minimal client-side JavaScript
- lazy loading
- font optimization
- caching

Do not mark components with `"use client"` unless required.

Do not ship large libraries for trivial functionality.

---

## 22. Server vs Client Components

Use React Server Components by default.

Use Client Components only when needed for:

- browser APIs
- local interactive state
- event handlers
- interactive forms
- payment UI
- menus requiring local state

Keep client boundaries small.

Do not make entire pages client components just because one button needs state.

---

## 23. Error Handling

Do not silently swallow errors.

Every external integration should have explicit failure handling.

Examples:

- Sanity unavailable
- database query fails
- email provider fails
- Stripe API fails
- invalid webhook
- malformed form input

User-facing errors must be understandable and must not expose stack traces or secrets.

Use structured server logging.

---

## 24. Logging

Logs must help debugging without leaking personal data.

Allowed examples:

```text
membership request created: <request-id>
stripe webhook processed: <event-id>
email sending failed: <request-id>
```

Avoid:

```text
full membership form payload
full help request message
payment credentials
authorization headers
API keys
```

---

## 25. Email Rules

Email sending must happen server-side.

Use reusable templates.

Possible templates:

```text
membership-confirmation
membership-admin-notification
contact-confirmation
contact-admin-notification
application-confirmation
help-request-notification
donation-confirmation
```

Do not block successful database writes solely because an email provider temporarily failed.

Record or log enough information to retry critical emails.

---

## 26. Testing Requirements

Prioritize critical flows.

### Unit tests
Use for:

- validation schemas
- utility functions
- pricing / amount validation
- domain logic

### Integration tests
Use for:

- membership submission
- contact submission
- donation session creation
- webhook handling

### E2E tests
At minimum cover:

```text
homepage loads
navigation works
news listing opens article
project page loads
membership form submits
donation flow starts
help page quick exit works
mobile navigation works
```

Do not pursue arbitrary 100% coverage.

Test risk, not vanity metrics.

---

## 27. Code Quality

Before considering work complete, run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If Playwright is configured:

```bash
pnpm test:e2e
```

Do not commit code with known lint or type errors.

Do not disable ESLint rules merely to silence legitimate issues.

---

## 28. Git Workflow

Preferred branches:

```text
main
develop
feature/*
fix/*
```

Use small, focused commits.

Good examples:

```text
feat: add news article page
feat: add membership form validation
fix: correct mobile navigation overflow
chore: configure sentry
```

Avoid commit messages such as:

```text
update
fix stuff
final
final2
working version
```

Pull requests should describe:

- what changed
- why it changed
- how it was tested
- any deployment/configuration changes

---

## 29. CI/CD

Pull requests should run:

```text
install
→ lint
→ typecheck
→ tests
→ build
```

`develop` should deploy to staging.

`main` should deploy to production after approval.

Never bypass failing CI for production unless explicitly authorized and documented.

---

## 30. Environments

Use:

```text
local
staging
production
```

Recommended domains:

```text
localhost
staging.example.de
example.de
```

Do not use production databases or production payment credentials during local development.

Stripe test mode must be used outside production.

---

## 31. Deployment Architecture

Preferred production architecture:

```text
User
→ Cloudflare DNS
→ Vercel
→ Next.js

Next.js
├── Sanity
├── Neon PostgreSQL
├── Resend
├── Stripe
├── PayPal
└── Sentry
```

Keep deployment stateless wherever possible.

Do not rely on local filesystem persistence in Vercel functions.

---

## 32. Content and Legal Pages

German production launch should account for at least:

- Impressum
- Datenschutz

Cookie consent must only be added if required by the tracking / cookie behavior actually implemented.

Do not add intrusive cookie banners for technologies that do not require them.

Legal copy must be supplied or approved by the organization.

Agents must not invent legal claims.

---

## 33. Analytics

Analytics are optional unless explicitly requested.

If analytics are added:

- prefer privacy-conscious configuration
- avoid unnecessary tracking
- respect consent requirements
- avoid collecting sensitive help-page behavior

Do not add Facebook Pixel, Google Ads tracking, Hotjar, session replay, or similar tools without explicit approval.

---

## 34. File Uploads

If volunteer/job applications require uploads:

- validate file type
- validate size
- rename files safely
- use managed object storage
- never trust file extensions alone
- never store uploads in the application repository
- restrict access appropriately

Do not implement uploads until the feature is confirmed.

---

## 35. Do Not Overbuild

For this 4-week project, agents must actively avoid unnecessary architecture.

Do not introduce:

- microservices
- event buses
- custom authentication
- custom CMS
- custom payment processing
- complex state management
- GraphQL without a real requirement
- Kubernetes
- custom Docker orchestration for Vercel
- premature caching layers

Prefer the smallest reliable solution.

---

## 36. Four-Week Delivery Priorities

### Week 1

- repository setup
- CI
- deployment skeleton
- design tokens
- header
- navigation
- footer
- Sanity setup
- database connection
- homepage
- news listing
- news detail

### Week 2

- projects listing
- project detail
- about page
- join/team page
- responsive implementation
- CMS integration
- SEO foundations

### Week 3

- membership workflow
- donation workflow
- help page
- contact flow
- email integration
- validation
- spam protection

### Week 4

- accessibility
- responsive QA
- browser testing
- integration tests
- E2E tests
- security review
- SEO
- performance
- staging review
- bug fixes
- production release

When forced to choose, protect the launch-critical scope first.

---

## 37. Agent Working Rules

Before modifying code:

1. Read this file.
2. Inspect existing architecture.
3. Reuse existing patterns.
4. Understand the requested feature.
5. Identify impacted routes, types, validation, CMS, database, and tests.

Before creating a new dependency:

1. Check whether the repository already solves the problem.
2. Prefer platform/native functionality.
3. Verify the dependency is maintained.
4. Avoid adding large packages for tiny utilities.

Before changing shared components:

1. Check all current usages.
2. Avoid unintended design regressions.
3. Preserve accessibility.
4. Update tests where appropriate.

---

## 38. Agent Decision Order

When several implementations are possible, prefer in this order:

1. Existing project pattern
2. Next.js built-in feature
3. Standard browser/platform capability
4. Existing dependency
5. Small, well-maintained dependency
6. Custom implementation

Do not install software simply because writing six lines of code feels emotionally difficult.

---

## 39. Definition of Done

A task is not complete merely because the page visually appears correct.

A feature is complete when relevant items below are satisfied:

- implementation complete
- types correct
- validation implemented
- mobile layout works
- accessibility checked
- errors handled
- loading states handled
- empty states handled
- security implications considered
- tests added or updated
- lint passes
- typecheck passes
- build passes
- environment variables documented
- CMS schema updated if necessary
- deployment impact documented

---

## 40. Final Principle

Build for the current requirements while leaving clean extension points for future phases.

Do not optimize for imaginary future scale at the cost of shipping the current product.

The architecture should remain understandable to a developer who opens the repository six months later and has no desire to solve a puzzle created by their predecessors.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
