import { teamProjection } from "./projects";
export const pageQuery = `*[_id == $type && _type == $type][0]{title,"introduction":coalesce(introduction,""),hero,"content":coalesce(content,[]),"sections":coalesce(sections,[]),"statistics":coalesce(statistics,[]),"teamMembers":coalesce(teamMembers[]->${teamProjection},[]),"actions":coalesce(actions,[]),"faqs":coalesce(faqs,[]),seo}`;
