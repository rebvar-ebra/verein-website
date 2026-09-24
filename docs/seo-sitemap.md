# XML sitemap

Next.js serves `/sitemap.xml` and `/robots.txt`. The sitemap contains the twelve
public page routes and published, non-archived project and news detail routes.
CMS entries use their actual `_updatedAt` timestamps; static pages do not invent
last-modified dates. Content is revalidated every 60 seconds. CMS failures fail
the regeneration instead of replacing a complete sitemap with a partial one.

Set `NEXT_PUBLIC_SITE_URL` in Vercel to the canonical public origin and redeploy
when changing domains. Until configured, URLs use the current website origin,
`https://verein-website-jet.vercel.app`. No preview deployment host is inferred.

The existing root metadata still sets `noindex, nofollow`. Adding a sitemap does
not override this: enabling search indexing is a separate launch configuration
change. After indexing is enabled, submit the canonical `/sitemap.xml` URL in
Google Search Console.
