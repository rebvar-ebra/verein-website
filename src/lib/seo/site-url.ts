export function siteUrl(): string {
  const url = new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
      "https://verein-website-jet.vercel.app",
  );
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a public HTTP(S) URL.');
  }
  return url.origin;
}
