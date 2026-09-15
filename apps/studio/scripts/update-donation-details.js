import {getCliClient} from 'sanity/cli';
const client=getCliClient({apiVersion:'2026-03-01'});
await client.patch('siteSettings').setIfMissing({donations:{_type:'object'}}).set({'donations.iban':'DE74 4306 0967 1344 6001 00','donations.bic':'GENODEM1GLS','donations.bank':'GLS Bank'}).commit();
console.log('Supplied donation bank details saved.');
