// Audit by default. Apply with SANITY_REPAIR_APPLY=1 and --with-user-token.
import {randomUUID} from 'node:crypto';
import {writeFileSync} from 'node:fs';
import {getCliClient} from 'sanity/cli';

const client = getCliClient({apiVersion: '2026-03-01'}).withConfig({useCdn: false, perspective: 'raw'});
const documents = await client.fetch('*[_type == "project" && defined(gallery)]');
const repairs = [];
for (const document of documents) {
  const seen = new Set();
  const reserved = new Set(document.gallery.map(item => item?._key).filter(Boolean));
  const fields = {};
  for (const [index, item] of document.gallery.entries()) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      throw new Error(`Unexpected gallery item: ${document._id}[${index}]`);
    }
    if (typeof item._key !== 'string' || !item._key.trim() || seen.has(item._key)) {
      let key;
      do { key = randomUUID(); } while (reserved.has(key));
      reserved.add(key);
      fields[`gallery[${index}]._key`] = key;
    }
    seen.add(item._key);
  }
  if (Object.keys(fields).length) repairs.push({document, fields});
}
console.log('Gallery documents needing repair:', repairs.map(({document, fields}) => ({id: document._id, keys: Object.keys(fields).length})));
if (process.env.SANITY_REPAIR_APPLY === '1' && repairs.length) {
  const backup = `/tmp/neuertag-gallery-backup-${Date.now()}.json`;
  writeFileSync(backup, JSON.stringify(repairs.map(({document}) => document), null, 2), {mode: 0o600});
  console.log('Backup saved:', backup);
  let transaction = client.transaction();
  for (const {document, fields} of repairs) {
    transaction = transaction.patch(document._id, patch => patch.ifRevisionId(document._rev).set(fields));
  }
  await transaction.commit();
  console.log('Repaired gallery keys only; draft content remains unpublished.');
}
