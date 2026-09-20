import { ApplicationPreview } from "@/components/forms/ApplicationForm/ApplicationPreview";
import Link from "next/link";
import { getPage, getSettings, getArticles } from "@/lib/cms/content";
import { imageUrl } from "@/lib/cms/sanity.image";
import {
  PageBanner,
  PageIntro,
  SplitSection,
} from "@/components/sections/WireframeSections";
import { StatsSection } from "@/components/sections/StatsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { RichText } from "./RichText";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import {
  ActionCards,
  PageSections,
  PageFaqs,
  PageSponsors,
  CrossLink,
  ContactOptions,
} from "./StructureSections";
export async function EditorialPage({
  type,
  children,
}: {
  type: string;
  children?: React.ReactNode;
}) {
  const [page, settings] = await Promise.all([getPage(type), getSettings()]);
  if (!page)
    return (
      <main id="main-content" className="shell section-space">
        <h1>Inhalt wird vorbereitet</h1>
        <p className="mt-5">Diese Seite wurde noch nicht veröffentlicht.</p>
        {children}
      </main>
    );
  const body = (
    <div className="shell">
      <div className="mx-auto max-w-3xl">
        <RichText value={page.content} />
      </div>
    </div>
  );
  const stats = page.statistics.length > 0 && (
    <StatsSection
      values={page.statistics.map((s) => s.value)}
      labels={
        page.statistics.length ? page.statistics.map((s) => s.label) : undefined
      }
    />
  );
  const team = (
    <TeamSection
      title={type === "helpPage" ? "Deine Ansprechpersonen" : "Unser Team"}
      members={page.teamMembers}
    />
  );
  const sections = <PageSections sections={page.sections} />;
  const faqs = <PageFaqs faqs={page.faqs} />;
  let content;
  if (type === "homepage") {
    const latest = (await getArticles())[0];
    content = (
      <>
        {body}
        <section className="shell section-space">
          <h2 className="mb-10 text-center">Unsere Projekte</h2>
          <ProjectGrid />
        </section>
        {page.sections[0] && (
          <SplitSection
            title={page.sections[0].title}
            text={page.sections[0].text}
            image={imageUrl(page.sections[0].image)}
            alt={page.sections[0].image?.alt || ""}
            caption={page.sections[0].image?.caption || undefined}
          >
            <div className="mt-6">
              <h3>Du brauchst Beratung oder Hilfe?</h3>
              <Link
                className="button button-orange mt-4"
                href="/beratung-hilfe"
              >
                Zur Hilfeseite →
              </Link>
            </div>
          </SplitSection>
        )}
        {latest && (
          <SplitSection
            title="Stetig in Bewegung"
            text={latest.excerpt}
            image={latest.image}
            alt={latest.alt}
            href="/news"
            label="Zu den News"
            reverse
          />
        )}
        <ActionCards
          title="Unsere Unterstützung braucht auch dich:"
          actions={["/mitglied-werden", "/spenden"].map((href, i) =>
            page.actions.find((a) => a.link?.href === href)
              ? {
                  ...page.actions.find((a) => a.link?.href === href),
                  image:
                    page.actions.find((a) => a.link?.href === href)?.image ||
                    page.hero?.image,
                }
              : {
                  title: i === 0 ? "Mitglied werden" : "Spenden",
                  image: page.hero?.image,
                  link: {
                    href,
                    label: i === 0 ? "Mitglied werden" : "Spenden",
                  },
                },
          )}
        />
        {faqs}
        <PageSponsors images={settings?.sponsors || []} />
      </>
    );
  } else if (type === "aboutPage") {
    content = (
      <>
        {stats}
        {team}
        <section className="shell section-space">
          <h2 className="mb-8 text-center">Unsere Gründung</h2>
          <div className="mx-auto max-w-3xl">
            <RichText value={page.content} />
          </div>
        </section>
        {sections}
        <ActionCards
          title="Du willst uns unterstützen oder teilhaben?"
          actions={
            page.actions.length
              ? page.actions
              : [
                  {
                    title: "Mitglied werden",
                    image: page.hero?.image,
                    link: {
                      label: "Zur Mitgliedschaft",
                      href: "/mitglied-werden",
                    },
                  },
                  {
                    title: "Spenden",
                    image: page.hero?.image,
                    link: { label: "Zur Spendenseite", href: "/spenden" },
                  },
                  {
                    title: "Stellenangebote",
                    image: page.hero?.image,
                    link: { label: "Mitmachen", href: "/mitmachen" },
                  },
                ]
          }
        />
        {faqs}
      </>
    );
  } else if (type === "membershipPage") {
    content = (
      <>
        <section className="shell section-space">
          <h2 className="mb-8 text-center">
            Schritt für Schritt Mitglied werden
          </h2>
          <div className="mx-auto max-w-3xl">
            <RichText value={page.content} />
          </div>
        </section>
        {sections}
        <ActionCards
          title="Antrag und Kontakt"
          actions={
            page.actions.length
              ? page.actions
              : [
                  {
                    title: "Mitgliedsantrag",
                    text: "Ein freigegebener Antrag wird hier bereitgestellt.",
                    image: page.hero?.image,
                  },
                  {
                    title: "Uns kontaktieren",
                    image: page.hero?.image,
                    link: { label: "Zum Kontaktformular", href: "/kontakt" },
                  },
                ]
          }
        />
        <CrossLink
          href="/kontakt"
          title="Fragen zur Mitgliedschaft?"
          label="Uns kontaktieren"
        />
        <CrossLink
          href="/spenden"
          title="Oder unterstütze uns mit einer Spende"
          label="Zur Spendenseite"
        />
        {faqs}
      </>
    );
  } else if (type === "donationPage") {
    content = (
      <>
        {children && <div className="shell pb-12">{children}</div>}
        <section className="shell section-space">
          <h2 className="mb-8 text-center">Spendennachweis</h2>
          <div className="mx-auto max-w-3xl">
            <RichText value={page.content} />
          </div>
        </section>
        {team}
        {sections}
        <CrossLink
          href="/mitglied-werden"
          title="Oder werde Mitglied bei Neuer Tag"
          label="Mitglied werden"
        />
        {faqs}
      </>
    );
  } else if (type === "helpPage") {
    content = (
      <>
        <ContactOptions settings={settings} />
        {team}
        {sections}
        {body}
        <ActionCards title="Unser Beratungsangebot" actions={page.actions} />
        {faqs}
      </>
    );
  } else if (type === "applicationPage") {
    content = (
      <>
        <section className="shell section-space">
          <h2 className="mb-8 text-center">Was du erwarten kannst</h2>
          {stats}
        </section>
        {body}
        <ActionCards
          title="Klingt interessant? Unsere offenen Stellen:"
          actions={page.actions}
        />
        {!page.actions.length && (
          <p className="shell py-8 text-center text-muted">
            Aktuell sind keine Stellen veröffentlicht.
          </p>
        )}
        {sections}
        <ApplicationPreview
          roles={page.actions
            .map((action) => action.title || "")
            .filter(Boolean)}
        />
        {faqs}
      </>
    );
  } else {
    content = (
      <>
        {body}
        {sections}
        <ActionCards title="Mehr erfahren" actions={page.actions} />
        {page.teamMembers.length > 0 && team}
        {children && <div className="shell section-space">{children}</div>}
        {page.faqs.length > 0 && faqs}
      </>
    );
  }
  return (
    <main id="main-content">
      {type === "helpPage" && (
        <div className="border-b border-divider bg-paper">
          <div className="shell flex flex-wrap items-center gap-4 py-5">
            {children}
          </div>
        </div>
      )}
      {page.hero?.image && (
        <div className={type === "homepage" ? "" : "shell pt-10"}>
          <PageBanner
            image={imageUrl(page.hero.image)}
            alt={page.hero.image.alt || ""}
            caption={page.hero.image.caption || undefined}
            compact={type !== "homepage"}
          />
        </div>
      )}
      <PageIntro
        title={page.hero?.title || page.title}
        text={page.hero?.text || page.introduction}
        eyebrow={page.hero?.eyebrow || ""}
      />
      {content}
    </main>
  );
}
