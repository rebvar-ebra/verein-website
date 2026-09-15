import {getCliClient} from 'sanity/cli';
import {createReadStream} from 'node:fs';
import {resolve} from 'node:path';

// Run from apps/studio: sanity exec scripts/seed-examples.js --with-user-token
// Stable IDs and createIfNotExists preserve any subsequent editorial changes.
const client=getCliClient({apiVersion:'2026-03-01'}).withConfig({perspective:'published'});
const body=(...texts)=>texts.map((text,i)=>({_type:'block',_key:`p${i}`,style:'normal',markDefs:[],children:[{_type:'span',_key:`s${i}`,text,marks:[]}]}));
const link=(label,href,i)=>({_type:'link',_key:`link${i}`,label,href});
const notice='Beispielinhalt zur Gestaltung der Website. Angebote und Angaben müssen vor der Veröffentlichung als echtes Vereinsangebot bestätigt werden.';
const specs=[
 ['begegnung','Raum für Begegnung.','Gemeinschaft','Zusammenkommen, sich austauschen und neue Verbindungen knüpfen.','together.jpg','Menschen stehen Arm in Arm im Abendlicht'],
 ['garten','Zusammen wachsen.','Nachhaltigkeit','Die Hände in der Erde. Neue Ideen im Kopf. Gemeinsam für ein grüneres Miteinander.','garden.jpg','Eine bunte Auswahl frisch geernteten Gemüses'],
 ['engagement','Zeit, etwas zu bewegen.','Engagement','Eigene Stärken einbringen und dort anpacken, wo Gemeinschaft entsteht.','community.jpg','Eine Person in einem Volunteer-Shirt'],
];
const images={};
for(const [, , , ,file,alt] of specs){
 const filename=`verein-example-${file}`;
 let asset=await client.fetch('*[_type == "sanity.imageAsset" && originalFilename == $filename][0]',{filename});
 if(!asset)asset=await client.assets.upload('image',createReadStream(resolve('../../public/images',file)),{filename});
 images[file]={_type:'imageWithCaption',asset:{_type:'reference',_ref:asset._id},alt};
}
const docs=[];
const nav=[['Über uns','/ueber-uns'],['Mitmachen','/mitmachen'],['Beratung & Hilfe','/beratung-hilfe'],['Kontakt','/kontakt']];
docs.push({_id:'siteSettings',_type:'siteSettings',organisationName:'Verein',tagline:'Miteinander. Füreinander.',navigation:nav.map((x,i)=>link(...x,i)),footerNavigation:[...nav,['Projekte','/projekte'],['News','/news'],['Mitglied werden','/mitglied-werden'],['Spenden','/spenden'],['Impressum','/impressum'],['Datenschutz','/datenschutz']].map((x,i)=>link(...x,i)),quickExitUrl:'https://www.google.com/',defaultSeo:{_type:'seo',title:'Verein – Gemeinsam wird mehr möglich.',description:'Designvorschau mit Beispielinhalten für Gemeinschaft, Projekte und Engagement.'}});
for(const [slug,title,category,shortDescription,file] of specs)docs.push({_id:`example-project-${slug}`,_type:'project',title,slug:{_type:'slug',current:slug},category,shortDescription,heroImage:images[file],content:body(notice,shortDescription,'Hier kann der Verein das Projekt, seine Ziele und Möglichkeiten zur Teilnahme vorstellen. Bestätigte Termine und Ansprechpersonen folgen nach redaktioneller Freigabe.'),status:'geplant',featured:true,publishedAt:'2026-09-01T09:00:00Z',seo:{_type:'seo',title,description:shortDescription}});
const news=[['ein-blick-hinter-die-kulissen','Ein Blick hinter die Kulissen','Menschen, Ideen und das, was uns verbindet.'],['gute-ideen-beginnen-mit-dir','Gute Ideen beginnen mit dir','Zusammen denken. Gemeinsam etwas bewegen.'],['raum-fuer-gemeinschaft','Raum für Gemeinschaft','Kleine Schritte, die Menschen zusammenbringen.']];
news.forEach(([slug,title,excerpt],i)=>docs.push({_id:`example-news-${slug}`,_type:'newsArticle',title,slug:{_type:'slug',current:slug},excerpt,coverImage:images[specs[i][4]],categories:['Beispielbeitrag'],content:body('Dieser Beitrag ist ein redaktionelles Beispiel, keine aktuelle Vereinsmeldung.',excerpt,'Eine Gemeinschaft lebt von Menschen, die zuhören, Ideen teilen und gemeinsam etwas gestalten. An dieser Stelle können später freigegebene Geschichten aus dem Vereinsleben erscheinen.'),publishedAt:'2026-09-01T09:00:00Z',featured:true}));
const pages=[
 ['homepage','Gemeinsam wird mehr möglich.','Eine starke Gemeinschaft beginnt mit Menschen, die füreinander da sind. Entdecke Verein und die Möglichkeiten, gemeinsam etwas zu bewegen.'],
 ['aboutPage','Über uns','Wir glauben an das, was entsteht, wenn Menschen zusammenkommen. An kleine Schritte, offene Türen und Ideen, die gemeinsam wachsen.'],
 ['membershipPage','Gemeinschaft mitgestalten','Eine Mitgliedschaft kann viele Möglichkeiten eröffnen, den Verein zu unterstützen. Beiträge, Voraussetzungen und der verbindliche Antrag werden noch ergänzt.'],
 ['donationPage','Gemeinsam Gutes möglich machen','Deine Unterstützung kann Raum für Gemeinschaft schaffen. In dieser Vorschau ist noch keine Zahlung möglich. Bestätigte Spendenmöglichkeiten folgen.'],
 ['applicationPage','Zeit schenken. Ideen teilen.','Ob praktisch anpacken, zuhören oder neue Ideen entwickeln: Hier stellt der Verein künftig bestätigte Möglichkeiten zum Mitmachen vor.'],
 ['helpPage','Beratung & Hilfe','Hier entsteht ein Zugang zu bestätigten Beratungsangeboten. Diese Beispielseite bietet noch keine Beratung und nimmt keine Hilfeanfragen entgegen.'],
 ['contactPage','Ins Gespräch kommen','Ob Frage, Idee oder Interesse am Mitmachen: Hier entsteht der Kontaktbereich. Das Formular ist derzeit eine lokale Vorschau ohne Versand oder Speicherung.'],
 ['imprintPage','Impressum','Noch nicht für den öffentlichen Betrieb freigegeben. Die Organisation muss die erforderlichen Anbieterangaben vor dem Start ergänzen und prüfen.'],
 ['privacyPage','Datenschutz','Die verbindlichen Datenschutzhinweise werden von der Organisation bereitgestellt und vor dem öffentlichen Start geprüft.'],
];
for(const [type,title,introduction] of pages)docs.push({_id:type,_type:type,title,introduction,hero:{_type:'hero',title,text:introduction,eyebrow:'Verein · Beispielinhalt',...(!['imprintPage','privacyPage'].includes(type)?{image:images['together.jpg']}:{})},content:body(['imprintPage','privacyPage'].includes(type)?'Platzhalter – kein rechtlich freigegebener Text.':notice),sections:[],actions:[],faqs:[],statistics:[],teamMembers:[],seo:{_type:'seo',title,description:introduction}});
const home=docs.find(d=>d._id==='homepage');
home.sections=[{_type:'splitSection',_key:'about',title:'Miteinander. Füreinander.',text:pages[1][2],image:images['together.jpg'],link:link('Mehr über Verein','/ueber-uns',0)},{_type:'splitSection',_key:'join',title:'Deine Zeit macht einen Unterschied.',text:'Entdecke, wie deine Ideen und Fähigkeiten künftig das Vereinsleben bereichern können.',image:images['community.jpg'],reverse:true,link:link('Mitmachen entdecken','/mitmachen',1)}];
home.actions=[{_type:'callToAction',_key:'membership',title:'Mitglied werden',text:'Gemeinschaft dauerhaft unterstützen.',link:link('Zur Mitgliedschaft','/mitglied-werden',0)},{_type:'callToAction',_key:'help',title:'Beratung & Hilfe',text:'Informationen zum geplanten Hilfebereich.',link:link('Zur Hilfeseite','/beratung-hilfe',1)}];
home.faqs=[{_type:'faq',_key:'preview',question:'Sind diese Angebote bereits verfügbar?',answer:'Die Inhalte sind Beispiele für die Gestaltung. Verbindliche Angebote und Termine werden nach Freigabe ergänzt.'},{_type:'faq',_key:'contact',question:'Wird meine Kontaktanfrage gesendet?',answer:'Nein. Das Formular prüft aktuell nur Eingaben lokal und sendet oder speichert keine Nachricht.'}];
const existing=await client.fetch('*[_id in $ids]._id',{ids:docs.map(d=>d._id)});
let transaction=client.transaction();for(const doc of docs)transaction=transaction.createIfNotExists(doc);
await transaction.commit();
console.log(`Example content ready: ${docs.length-existing.length} created; ${existing.length} existing documents preserved.`);
