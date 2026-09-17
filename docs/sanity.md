# Sanity CMS

The public website reads published content from Sanity. Private submissions and payment records do not belong in this dataset. The Studio runs separately in `apps/studio`.

## Connect your project

1. Create or select a project at https://www.sanity.io/manage and a dataset (for example `production`). A public dataset is suitable for public editorial content.
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in the website's `.env.local`. For a private dataset only, add a server-side viewer token as `SANITY_API_TOKEN`. Never prefix that token with `NEXT_PUBLIC_`.
3. Copy `apps/studio/.env.example` to `apps/studio/.env.local`, then set `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` to the same public values.
4. In the Sanity project API settings, allow the Studio origin `http://localhost:3333` with credentials. Add your deployed Studio origin when hosting it.
5. Run `pnpm install`, `pnpm studio`, and sign in with an account that has access to the project. The website runs with `pnpm dev` on port 3000.
6. Publish **Website-Einstellungen** and the page documents from the Studio navigation. Create projects and articles with slugs and publication dates. Publish referenced team members too.
7. Restart the website after changing environment variables. Published edits are revalidated after 60 seconds; drafts and future-dated articles/projects are excluded.

Without website environment overrides, the website connects to the public project `x34rtnfv`, dataset `production`. A partial configuration fails explicitly. Once configured, empty collections remain empty and unpublished pages show a preparation message; CMS failures reach the Next.js error boundary instead of displaying fictional content.

## Editing

Page documents provide hero images, introduction, rich text, alternating image/text sections, statistics, team references, action links and FAQs. Projects and news have independent detail routes. Site settings supply the organization name and club navigation. The footer uses its original static content and layout, independently of Sanity. Image alternatives and captions are editable. Studio singletons use fixed document IDs matching their schema names.

The website remains marked as a design preview and excluded from indexing. Contact submission, membership, donations and payment processing are separate backend work; publishing CMS content does not activate them. Legal content must be supplied or approved by the organization.

## Checks and hosting

- `pnpm studio:typecheck`
- `pnpm studio:build` (requires Studio project settings)
- `pnpm --filter @Anahita/studio schema:extract`
- `pnpm lint && pnpm typecheck && pnpm test && pnpm build`

The Studio can be deployed with Sanity's CLI from `apps/studio` after configuring your project. No cloud project, account, dataset, token or deployment is created automatically by this integration.

## Hosted Studio configuration

Studio defaults to the public project `x34rtnfv` and dataset `production`, so a Vercel build does not depend on an uncommitted `.env.local`. Override these with `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` for another environment. Neither value is a secret. The website still uses its own `NEXT_PUBLIC_SANITY_*` settings. Never put an API token in a Studio environment variable.

Allow `https://Anahita-website-studio.vercel.app` as a credentialed CORS origin in Sanity project API settings so editors can sign in on that domain.

The website also defaults to the connected public project when both `NEXT_PUBLIC_SANITY_*` settings are absent. This prevents hosted builds from silently displaying fixture team profiles. Partial overrides remain invalid.
