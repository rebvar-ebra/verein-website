import { editorialPage } from "./documents/page";
import { objects } from "./objects";
import { project } from "./documents/project";
import { newsArticle } from "./documents/newsArticle";
import { teamMember } from "./documents/teamMember";
import { homepage } from "./documents/homepage";
import { aboutPage } from "./documents/aboutPage";
import { membershipPage } from "./documents/membershipPage";
import { donationPage } from "./documents/donationPage";
import { helpPage } from "./documents/helpPage";
import { applicationPage } from "./documents/applicationPage";
import { contactPage } from "./documents/contactPage";
import { imprintPage } from "./documents/imprintPage";
import { privacyPage } from "./documents/privacyPage";
import { siteSettings } from "./documents/siteSettings";
export const schemaTypes = [
  ...objects,
  project,
  newsArticle,
  teamMember,
  homepage,
  aboutPage,
  membershipPage,
  donationPage,
  helpPage,
  applicationPage,
  contactPage,
  imprintPage,
  privacyPage,
  siteSettings,
  editorialPage("statutesPage", "Satzung"),
];
