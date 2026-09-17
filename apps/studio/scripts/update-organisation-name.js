import {getCliClient} from 'sanity/cli';

const client = getCliClient({apiVersion: '2026-03-01'});
// Update published settings and any existing draft so publishing cannot restore the old name.
for (const id of ['siteSettings', 'drafts.siteSettings']) {
  const settings = await client.getDocument(id);
  if (!settings) continue;
  const title = settings.defaultSeo?.title?.replace(/\bVerein\b/g, 'Anahita') || 'Anahita – Gemeinsam wird mehr möglich.';
  await client.patch(id).ifRevisionId(settings._rev)
    .setIfMissing({defaultSeo: {_type: 'seo'}})
    .set({organisationName: 'Anahita', 'defaultSeo.title': title})
    .commit();
}
console.log('Organisation name and SEO title updated to Anahita.');
