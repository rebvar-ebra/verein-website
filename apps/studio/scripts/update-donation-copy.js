import {getCliClient} from 'sanity/cli';
const client=getCliClient({apiVersion:'2026-03-01'});
const page=await client.fetch('*[_id=="donationPage"][0]{_rev,introduction,hero,content}');
const old='Deine Unterstützung kann Raum für Gemeinschaft schaffen. In dieser Vorschau ist noch keine Zahlung möglich. Bestätigte Spendenmöglichkeiten folgen.';
const text='Deine Unterstützung schafft Raum für Gemeinschaft. Wähle deinen Wunschbetrag und unterstütze unsere Arbeit per Banküberweisung.';
let patch=client.patch('donationPage').ifRevisionId(page._rev);
if(page.introduction===old)patch=patch.set({introduction:text});
if(page.hero?.text===old)patch=patch.set({'hero.text':text});
// Remove only the seeded generic example notice; preserve later editorial additions.
const content=(page.content||[]).filter(block=>!block.children?.some(span=>span.text==='Beispielinhalt zur Gestaltung der Website. Angebote und Angaben müssen vor der Veröffentlichung als echtes Vereinsangebot bestätigt werden.'));
if(content.length!==(page.content||[]).length)patch=patch.set({content});
await patch.commit();console.log('Outdated example donation copy updated.');
