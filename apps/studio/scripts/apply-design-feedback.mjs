// Run from repository root using the existing Sanity CLI login; never prints credentials.
import { createClient } from '@sanity/client';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const { authToken } = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.config/sanity/config.json'), 'utf8'));
if (!authToken) throw new Error('Sanity login required');
const client = createClient({ projectId: 'x34rtnfv', dataset: 'production', apiVersion: '2026-10-30', token: authToken, useCdn: false });
const docs = await client.fetch('*[_type in ["project","homepage","aboutPage","helpPage","donationPage","membershipPage","applicationPage","siteSettings","teamMember"]]');
const backup = path.join(os.homedir(), '.codex', 'backups', `neuertag-design-${Date.now()}.json`);
fs.mkdirSync(path.dirname(backup), { recursive: true, mode: 0o700 });
fs.writeFileSync(backup, JSON.stringify(docs, null, 2), { mode: 0o600 });
console.log(`Saved CMS backup: ${backup}`);
for (const [id, filename, alt] of [
  ['project-anahita', '/home/rebvar/Downloads/Anahita_Kachel.webp', 'Anahita – interkulturelles Frauenzentrum für Teilhabe und Bildung'],
  ['project-dalia', '/home/rebvar/Downloads/Dalia_Kachel.webp', 'DALIA – Interkulturelles Frauenprojekt'],
]) {
  const asset = await client.assets.upload('image', fs.createReadStream(filename), { filename: path.basename(filename) });
  for (const doc of docs.filter(doc => doc._id === id || doc._id === `drafts.${id}`)) {
    await client.patch(doc._id).ifRevisionId(doc._rev).set({ logo: { _type: 'imageWithCaption', asset: { _type: 'reference', _ref: asset._id }, alt } }).commit();
    console.log(`Updated project artwork: ${doc._id}`);
  }
}
const replacements = [ ['psycho-soziale', 'psychosoziale'], ['Dr. habil ', 'Dr. habil. '], ['Potential', 'Potenzial'], ['so dass', 'sodass'], ['Zum Projeckt', 'Zum Projekt'] ];
function normalize(value) {
  if (typeof value === 'string') return replacements.reduce((text, [from,to]) => text.replaceAll(from,to), value);
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key,val]) => [key, ['_id','_rev','_ref','href','url'].includes(key) ? val : normalize(val)]));
  return value;
}
// Fetch again after logo patches so revision guards protect all concurrent edits.
for (const doc of await client.fetch('*[_type in ["project","homepage","aboutPage","helpPage","donationPage","membershipPage","applicationPage","siteSettings","teamMember"]]')) {
  const changes = {};
  for (const key of ['content','shortDescription','introduction','actions','sections','role','bio']) {
    if (!doc[key]) continue;
    const next = normalize(doc[key]);
    if (JSON.stringify(next) !== JSON.stringify(doc[key])) changes[key] = next;
  }
  if (doc._id === 'donationPage') changes.seo = { ...doc.seo, description: 'Unterstütze Neuer Tag e.V.: Mit deiner Spende stärkst du Beratung, Bildung und Begegnung für Frauen in Berlin. Sicher online oder per Überweisung.' };
  if (doc._id === 'project-dalia') changes.seo = { ...doc.seo, description: 'DALIA in Berlin: Beratung, Bildung und Begegnung für Frauen aus der Nachbarschaft. Entdecke mehrsprachige Angebote und neue Perspektiven.' };
  if (doc.sponsors?.length) changes.sponsors = doc.sponsors.map(image => ({ ...image, alt: image.alt || (image.caption?.includes('LOTTO') ? 'LOTTO-Stiftung Berlin' : image.caption || 'Förderpartner von Neuer Tag') }));
  if (Object.keys(changes).length) {
    await client.patch(doc._id).ifRevisionId(doc._rev).set(changes).commit();
    console.log(`Updated editorial content: ${doc._id}`);
  }
}
