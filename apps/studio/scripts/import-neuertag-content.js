import {readFileSync, writeFileSync} from 'node:fs';
import {getCliClient} from 'sanity/cli';
const source = JSON.parse(readFileSync(new URL('./data/neuertag-source-2026-09-20.json', import.meta.url), 'utf8'));
const client = getCliClient({apiVersion:'2026-03-01'});
const body = (...paragraphs) => paragraphs.flat().filter(Boolean).map((text,i)=>({_type:'block',_key:`p${i}`,style:'normal',children:[{_type:'span',_key:`s${i}`,text,marks:[]}],markDefs:[]}));
const link = (label,href,key='link') => ({_type:'link',_key:key,label,href});
const ref = id => ({_type:'reference',_ref:id,_key:id});
const sourceLink = (label,href) => ({_type:'block',_key:'source-link',style:'normal',children:[{_type:'span',_key:'s',text:label,marks:['source']}],markDefs:[{_type:'link',_key:'source',href}]});
const backup = await client.fetch('*[_type in ["homepage","aboutPage","contactPage","donationPage","helpPage","membershipPage","applicationPage","imprintPage","privacyPage","statutesPage","siteSettings","project","teamMember","newsArticle"]]');
const backupPath = `/tmp/neuertag-before-content-import-${Date.now()}.json`;
writeFileSync(backupPath,JSON.stringify(backup,null,2),{mode:0o600});
console.log('Backup saved:',backupPath);
async function patch(id,type,fields) {
  const doc=await client.getDocument(id);
  if(doc) await client.patch(id).ifRevisionId(doc._rev).set(fields).commit();
  else await client.create({_id:id,_type:type,...fields});
}
async function image(url,alt) {
  const filename='import-'+url.split('/').pop();
  let asset=await client.fetch('*[_type=="sanity.imageAsset" && originalFilename==$filename][0]',{filename});
  if(!asset){const response=await fetch(url);if(!response.ok)throw new Error(`Image download failed: ${response.status}`);asset=await client.assets.upload('image',Buffer.from(await response.arrayBuffer()),{filename,source:{name:'neuertag-ev.de',id:url,url}});}
  return {_type:'imageWithCaption',asset:{_type:'reference',_ref:asset._id},alt,...(url.includes('Mielke')?{caption:'Foto: Magdalena Luise Mielke, 2024'}:{})};
}
const heroImage=await image(source.images['14'],'Einblicke in die Arbeit von Neuer Tag');
const aboutImage=await image(source.images['33'],'Gemeinschaft bei Neuer Tag');
const goalImage=await image(source.images['18'],'Begegnung und Austausch bei Neuer Tag');
const teamRefs=[];
for(const member of source.team){
  const id='import-team-'+member.id;const photo=await image(member.image,member.name);
  await patch(id,'teamMember',{name:member.name,role:member.role,image:photo,bio:body(member.bio),...(member.id==='kurda-nejad'?{email:'kurda.nejad@neuertag-ev.de',phone:'0162 4020221',languages:'Deutsch, Englisch, Kurdisch, Persisch'}:{})});teamRefs.push(ref(id));
}
const betterplace='https://www.betterplace.org/de/donate/platform/projects/147505-ein-interkultureller-frauentreff-fuer-beratung-und-bildung';
const settings=await client.getDocument('siteSettings');
await patch('siteSettings','siteSettings',{organisationName:'Neuer Tag e.V.',tagline:'Gemeinsam stark für eine bunte Gesellschaft.',email:'info@neuertag-ev.de',phone:'0162 4020221',address:'Berlin, Marzahn',socialLinks:[link('Instagram','https://www.instagram.com/neuertag_ev/','instagram')],donations:{...settings.donations,accountHolder:'Neuer Tag e.V.',iban:'DE74 4306 0967 1344 6001 00',bic:'GENODEM1GLS',bank:'GLS Bank',betterplaceUrl:betterplace},defaultSeo:{...settings.defaultSeo,title:'Neuer Tag e.V. – Gemeinsam stark für eine bunte Gesellschaft.',description:source.texts['13'].slice(0,160)}});
const page = async (id,title,introduction,content,extra={}) => {
  const fields={title,introduction,hero:{_type:'hero',title,text:introduction,eyebrow:'Neuer Tag e.V.'},content:body(content),sections:[],statistics:[],teamMembers:[],actions:[],faqs:[],seo:{_type:'seo',title,description:introduction.slice(0,160)},...extra};
  await patch(id,id,fields);
  // Keep existing drafts aligned without deleting unrelated document fields.
  if(await client.getDocument('drafts.'+id)) await patch('drafts.'+id,id,fields);
};
await page('homepage','Gemeinsam stark für eine bunte Gesellschaft.',source.texts['13'],[],{hero:{_type:'hero',title:'Gemeinsam stark für eine bunte Gesellschaft.',text:source.texts['13'],eyebrow:'Neuer Tag e.V.',image:heroImage},sections:[{_type:'splitSection',_key:'goals',title:'Unsere Ziele',text:source.texts['19'],image:goalImage,link:link('Über uns','/ueber-uns')}],actions:[{_type:'callToAction',_key:'membership',title:'Mitglied werden',text:'Engagiere dich für eine solidarische und vielfältige Gesellschaft.',image:aboutImage,link:link('Zur Mitgliedschaft','/mitglied-werden')},{_type:'callToAction',_key:'donate',title:'Spenden',text:source.texts['74'],image:heroImage,link:link('Spenden','/spenden')}]});
await page('aboutPage','Über uns',source.texts['13'],[source.texts['34']],{teamMembers:teamRefs,hero:{_type:'hero',title:'Über uns',text:source.texts['13'],image:aboutImage},sections:[{_type:'splitSection',_key:'goals',title:'Unsere Ziele',text:source.texts['19'],image:goalImage},{_type:'splitSection',_key:'motivation',title:'Unsere Motivation und Angebote',text:source.texts['20'].replace(/^\+ mehr\s*Unsere Motivation\s*/,'').replace(' Umsetzung ', '\n\nUmsetzung\n').replaceAll(' • ', '\n• '),image:heroImage,reverse:true}]});
await patch('import-team-rabaa-zarefah','teamMember',{name:'Rabaa Zarefah',role:'Projektmitarbeiterin DALIA',phone:'0157 3452 8387',languages:'Arabisch, Deutsch, Englisch',bio:[]});
await patch('import-team-anja-pachel','teamMember',{name:'Anja Pachel',role:'Kooperationspartnerin · Mobile Bildungsberaterin für zugewanderte und geflüchtete Frauen',email:'a.pachel@frauenzentrum-marie.de',phone:'0157 5015 9820',languages:'Deutsch, Englisch, Spanisch',bio:body('Frauenzentrum Marie e.V.')});
// Keep the association role distinct from Kurda's role in DALIA.
const kurda=source.team.find(t=>t.id==='kurda-nejad');
await patch('import-team-kurda-dalia','teamMember',{name:'Kurda Nejad',role:'Projektleiterin DALIA',email:'dalia@neuertag-ev.de',phone:'0162 4020 221',languages:'Deutsch, Englisch, Kurdisch, Persisch',image:await image(kurda.image,kurda.name),bio:[]});
const historicalFlyer = await image(source.images['25'], 'DALIA-Angebotsflyer der bisherigen Website, hochgeladen im Juni 2025');
historicalFlyer.caption = 'Archiv: Angebotsflyer der bisherigen Website (Upload Juni 2025). Bitte aktuelle Termine beim Projektteam erfragen.';
const daliaTeam=[ref('import-team-kurda-dalia'),ref('import-team-rabaa-zarefah'),ref('import-team-anja-pachel')];
await patch('project-dalia','project',{gallery:[{...historicalFlyer,_key:"dalia-flyer-2025"}],schedule:'Sprachcafé, interkultureller Frauenkreis, Einzelberatung und weitere Bildungs- und Bewegungsangebote. Der bisherige Flyer stammt aus 2025. Aktuelle Termine und Beratungszeiten bitte beim Projektteam erfragen.',shortDescription:source.texts['24'],content:[...body(source.texts['24'],'Kontakt: dalia@neuertag-ev.de',source.texts['27'].replace('Deutschsch','Deutsch'),source.texts['28']),sourceLink('E-Mail an DALIA','mailto:dalia@neuertag-ev.de')],address:'BENN Wartenberg\nSchweriner Ring 27\n13059 Berlin\n\nStadtteilzentrum Welsekiosk\nFalkenberger Chaussee 136\n13057 Berlin',teamMembers:daliaTeam,heroImage:goalImage,seo:{_type:'seo',title:'DALIA – Interkulturelles Frauenprojekt',description:source.texts['24'].slice(0,160)}});
await patch('project-anahita','project',{shortDescription:'Interkulturelles Frauenzentrum in Hohenschönhausen. Gefördert durch die LOTTO Stiftung Berlin.',content:body('Die bisherige Website von Neuer Tag kündigt das Interkulturelle Frauenzentrum ANAHITA in Hohenschönhausen an.',source.texts['7'],'Für aktuelle Informationen zum Start und den Angeboten kontaktiere Neuer Tag unter info@neuertag-ev.de.'),heroImage:heroImage,seo:{_type:'seo',title:'Anahita – Interkulturelles Frauenzentrum',description:'Interkulturelles Frauenzentrum in Hohenschönhausen. Gefördert durch die LOTTO Stiftung Berlin.'}});
await page('contactPage','Kontakt','So erreichst du Neuer Tag e.V.', ['Neuer Tag e.V. · Berlin','E-Mail: info@neuertag-ev.de · Telefon: 0162 4020221','Geschäftsführerin: Kurda Nejad · kurda.nejad@neuertag-ev.de · 0162 4020221','Vorstand: Minoo Heidari Tabar, Cathleen Mann und Iulia Dondorici · vorstand@neuertag-ev.de'],{actions:[{_type:'callToAction',_key:'email',title:'Allgemeine Anfragen',link:link('E-Mail schreiben','mailto:info@neuertag-ev.de')},{_type:'callToAction',_key:'board',title:'Vorstand',link:link('Vorstand kontaktieren','mailto:vorstand@neuertag-ev.de')},{_type:'callToAction',_key:'instagram',title:'Instagram',link:link('Neuer Tag auf Instagram','https://www.instagram.com/neuertag_ev/')}]});
const receipt='Sofern Du eine Spendenquittung wünschst, gib im Verwendungszweck bitte unbedingt Deinen vollständigen Namen und Adresse an.';
await page('donationPage','Spenden',source.texts['74'],[receipt,'Wenn Du Fragen rund um Deine Spende hast, schreib uns gerne an info@neuertag-ev.de.']);
await page('helpPage','Beratung & Hilfe','Niedrigschwellige Bildungs-, Beratungs- und Kulturangebote für Menschen mit und ohne Flucht- und Zuwanderungsgeschichte.',[source.texts['19'],'Unsere Angebote umfassen allgemeine Sozialberatung, psychosoziale Beratung in Muttersprache, Beratung zu Bildung, Beruf und Qualifizierung, Sprachförderung sowie Raum für Austausch und Begegnung.'],{teamMembers:daliaTeam,actions:[{_type:'callToAction',_key:'dalia',title:'DALIA',text:source.texts['24'],link:link('Zum Projekt','/projekte/dalia')}]});
await page('membershipPage','Mitglied werden','Gemeinsam für eine solidarische und vielfältige Gesellschaft.', ['Ordentliches Mitglied können natürliche Personen werden. Fördermitglieder können natürliche und juristische Personen sein.','Der Mitgliedsantrag erfolgt schriftlich gegenüber dem Vorstand. Über die Aufnahme entscheidet der Vorstand; eine Anfrage allein begründet keine Mitgliedschaft.','Informationen zu Beiträgen und zur Antragstellung erhältst du unter vorstand@neuertag-ev.de.'],{actions:[{_type:'callToAction',_key:'request',title:'Mitgliedschaft anfragen',link:link('Vorstand kontaktieren','mailto:vorstand@neuertag-ev.de')},{_type:'callToAction',_key:'statutes',title:'Satzung',link:link('Satzung lesen','/satzung')} ]});
await page('applicationPage','Mitmachen','Engagiere dich mit Neuer Tag für Teilhabe, Gleichstellung und gesellschaftlichen Zusammenhalt.',['Du möchtest dich einbringen? Kontaktiere Neuer Tag unter info@neuertag-ev.de.']);
await page('statutesPage','Satzung','Satzung Neuer Tag e.V. · Beschlossen am 05.12.2023',source.statutes.flatMap(t=>t.split('\n').filter(Boolean)));
await page('imprintPage','Impressum','Neuer Tag e.V.',source.imprint.flatMap(t=>t.split('\n').filter(Boolean)));
await page('privacyPage','Datenschutz','Datenschutzhinweise gemäß Art. 13 DSGVO',source.privacy.flatMap(t=>t.split('\n').filter(Boolean)));
const announcementImage=await image(source.images['5'],'Neuer Tag bei einer Veranstaltung');
await patch('import-news-anahita','newsArticle',{title:'Anahita in Hohenschönhausen',slug:{_type:'slug',current:'anahita-hohenschoenhausen'},excerpt:'Neuer Tag kündigt das Interkulturelle Frauenzentrum ANAHITA an. Das Projekt wird durch die LOTTO Stiftung Berlin gefördert.',coverImage:announcementImage,categories:['Projekte'],publishedAt:'2026-09-20T12:00:00Z',content:[...body('Übernommen von der bisherigen Website am 20. September 2026. Ein ursprüngliches Veröffentlichungsdatum ist dort nicht angegeben.',source.texts['6'],source.texts['7'],'Bitte kontaktiere Neuer Tag für den aktuellen Stand.'),sourceLink('Quelle: bisherige Website','https://neuertag-ev.de/')],featured:true});
for(const doc of backup.filter(d=>d._type==='newsArticle'&&d._id.startsWith('example-'))) await client.patch(doc._id).set({archived:true}).commit();
console.log('Imported association pages, 7 biographies, DALIA contacts, projects, announcement, legal copy and donation details.');
