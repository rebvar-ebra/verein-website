import Image from "next/image";
import Link from "next/link";
import { getPage } from "@/lib/cms/content";
import { imageUrl } from "@/lib/cms/sanity.image";
import {
  PageBanner,
  PageIntro,
  SplitSection,
} from "@/components/sections/WireframeSections";
import { RichText } from "./RichText";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { NewsGrid } from "@/components/news/NewsGrid";
export async function EditorialPage({
  type,
  children,
}: {
  type: string;
  children?: React.ReactNode;
}) {
  const page = await getPage(type);
  if (!page)
    return (
      <main id="main-content" className="shell section-space">
        <h1 className="text-3xl">Inhalt wird vorbereitet</h1>
        <p className="mt-5">Diese Seite wurde noch nicht veröffentlicht.</p>
        {children}
      </main>
    );
  return (
    <main id="main-content">
      {page.hero?.image && (
        <PageBanner
          image={imageUrl(page.hero.image)}
          alt={page.hero.image.alt || ""}
        />
      )}
      <PageIntro
        title={page.hero?.title || page.title}
        text={page.hero?.text || page.introduction}
        eyebrow={page.hero?.eyebrow || ""}
      />
      <div className="shell">
        <RichText value={page.content} />
      </div>
      {type === "homepage" && (
        <section className="shell section-space">
          <h2 className="mb-8 text-3xl">Unsere Projekte</h2>
          <ProjectGrid />
        </section>
      )}
      {page.sections.map((section, i) => (
        <SplitSection
          key={i}
          title={section.title}
          text={section.text}
          image={imageUrl(section.image)}
          alt={section.image?.alt || ""}
          href={section.link?.href}
          label={section.link?.label}
          reverse={section.reverse || false}
        />
      ))}
      <div className="shell section-space space-y-8">
        {page.statistics.length > 0 && (
          <dl className="grid gap-6 sm:grid-cols-3">
            {page.statistics.map((stat, i) => (
              <div key={i}>
                <dt>{stat.label}</dt>
                <dd className="text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {page.teamMembers.map((member) => (
          <div key={member._id}>
            {member.image && (
              <Image
                className="mb-4 aspect-square w-80 max-w-full rounded-full object-cover"
                src={imageUrl(member.image)}
                alt={member.image.alt || ""}
                width={320}
                height={320}
              />
            )}
            <h2>{member.name}</h2>
            <p>{member.role}</p>
          </div>
        ))}
        {page.actions.map((action, i) => (
          <section key={i}>
            {action.image && (
              <Image
                src={imageUrl(action.image)}
                alt={action.image.alt || ""}
                width={800}
                height={500}
              />
            )}
            <h2 className="text-2xl">{action.title}</h2>
            <p>{action.text}</p>
            {action.link && (
              <Link
                className="button button-orange mt-5"
                href={action.link.href}
              >
                {action.link.label}
              </Link>
            )}
          </section>
        ))}
        {page.faqs.map((faq, i) => (
          <details key={i} className="border-b border-forest/20 py-4">
            <summary>{faq.question}</summary>
            <p className="pt-4">{faq.answer}</p>
          </details>
        ))}
        {children}
      </div>
      {type === "homepage" && (
        <section className="shell section-space">
          <h2 className="mb-8 text-3xl">News</h2>
          <NewsGrid />
        </section>
      )}
    </main>
  );
}
