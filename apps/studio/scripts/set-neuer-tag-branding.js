import {createReadStream} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {getCliClient} from 'sanity/cli';
const client = getCliClient({apiVersion: '2026-03-01'});
async function image(file, alt) {
  const filename = file.split('/').pop();
  const existing = await client.fetch('*[_type == "sanity.imageAsset" && originalFilename == $filename][0]', {filename});
  const asset = existing || await client.assets.upload('image', createReadStream(fileURLToPath(new URL(`../../../public/${file}`, import.meta.url))), {filename});
  return {_type:'imageWithCaption', asset:{_type:'reference', _ref:asset._id}, alt};
}
const associationLogo = await image('brand/neuer-tag.png', 'Neuer Tag');
for (const id of ['siteSettings', 'drafts.siteSettings']) {
  const settings = await client.getDocument(id);
  if (!settings) continue;
  await client.patch(id).ifRevisionId(settings._rev).setIfMissing({defaultSeo:{_type:'seo'}}).set({
    organisationName:'Neuer Tag', logo:associationLogo,
    'defaultSeo.title':'Neuer Tag – Miteinander. Füreinander.',
    sponsors:(settings.sponsors || []).filter(s => s._key !== 'neuer-tag' && s.alt !== 'Neuer Tag'),
  }).commit();
}
for (const [slug,title,description,file] of [
  ['anahita','Anahita','Interkulturelles Frauenzentrum für Teilhabe & Bildung. Ein Projekt von Neuer Tag.','brand/anahita-caption.webp'],
  ['dalia','DALIA','Interkulturelles Frauenprojekt. Ein Projekt von Neuer Tag.','brand/dalia-logo.webp'],
]) {
  const logo = await image(file, title);
  await client.createIfNotExists({_id:`project-${slug}`, _type:'project',title,slug:{_type:'slug',current:slug},shortDescription:description,category:'Ein Projekt von Neuer Tag',logo,featured:true,publishedAt:new Date().toISOString(),content:[],teamMembers:[]});
  await client.patch(`project-${slug}`).set({logo}).commit();
}
for (const id of ['example-project-begegnung','example-project-engagement','example-project-garten']) {
  if (await client.getDocument(id)) await client.patch(id).set({archived:true}).commit();
}
for (const id of ['homepage','drafts.homepage']) {
  const home = await client.getDocument(id);
  if (!home) continue;
  await client.patch(id).ifRevisionId(home._rev).set({'hero.eyebrow':'Neuer Tag', 'hero.text':'Neuer Tag ist der Verein hinter den Projekten Anahita und DALIA. Entdecke unsere Projekte und die Möglichkeiten, gemeinsam etwas zu bewegen.', introduction:'Neuer Tag ist der Verein hinter den Projekten Anahita und DALIA. Entdecke unsere Projekte und die Möglichkeiten, gemeinsam etwas zu bewegen.'}).commit();
}
console.log('Neuer Tag identity and Anahita / DALIA projects saved; example projects archived.');
