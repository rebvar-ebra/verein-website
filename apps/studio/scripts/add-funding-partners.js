import {createReadStream} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {getCliClient} from 'sanity/cli';
const client = getCliClient({apiVersion: '2026-03-01'});
const partners = [
  ['neuer-tag.png', 'Neuer Tag'],
  ['berlin-lichtenberg.png', 'Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen und Bezirksamt Lichtenberg – Berlin'],
  ['abriporta.png', 'abri porta – Wir öffnen Augen, Herzen, Horizonte'],
];
const additions = [];
for (const [filename, alt] of partners) {
  let asset = await client.fetch('*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}', {filename});
  if (!asset) asset = await client.assets.upload('image', createReadStream(fileURLToPath(new URL(`../../../public/partners/${filename}`, import.meta.url))), {filename});
  additions.push({_type: 'imageWithCaption', _key: filename.replace('.png', ''), asset: {_type: 'reference', _ref: asset._id}, alt});
}
const settings = await client.getDocument('siteSettings');
if (!settings) throw new Error('Site settings missing');
const sponsors = [...(settings.sponsors || [])];
for (const partner of additions) {
  if (!sponsors.some(item => item.asset?._ref === partner.asset._ref)) sponsors.push(partner);
}
await client.patch(settings._id).ifRevisionId(settings._rev).set({sponsors}).commit();
console.log(`Saved ${sponsors.length} funding partner logos.`);
