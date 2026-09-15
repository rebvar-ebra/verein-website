import Image from "next/image";
import Link from "next/link";
import type { CmsPage, CmsImage, CmsSettings } from "@/lib/cms/content.schema";
import { imageUrl } from "@/lib/cms/sanity.image";
import { SplitSection } from "@/components/sections/SplitSection";

export function PageSections({ sections }: { sections: CmsPage["sections"] }) {
  return (
    <>
      {sections.map((section, i) => (
        <SplitSection
          key={i}
          title={section.title}
          text={section.text}
          image={imageUrl(section.image)}
          alt={section.image?.alt || ""}
          href={section.link?.href}
          label={section.link?.label}
          reverse={section.reverse ?? i % 2 === 1}
        />
      ))}
    </>
  );
}
export function ActionCards({
  actions,
  title,
}: {
  actions: CmsPage["actions"];
  title: string;
}) {
  if (!actions.length) return null;
  return (
    <section className="shell section-space">
      <h2 className="mb-10 text-center">{title}</h2>
      <div
        className={`mx-auto grid max-w-4xl gap-6 ${actions.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
      >
        {actions.map((action, i) => (
          <article
            key={i}
            className="overflow-hidden rounded-2xl border border-divider bg-white/50"
          >
            {action.image && (
              <Image
                src={imageUrl(action.image, 800)}
                alt={action.image.alt || ""}
                width={800}
                height={400}
                className="aspect-[2/1] w-full object-cover"
              />
            )}
            <div className="p-7 text-center">
              <h3>{action.title}</h3>
              <p className="my-4">{action.text}</p>
              {action.link && (
                <Link
                  className="button button-outline w-full"
                  href={action.link.href}
                >
                  {action.link.label} →
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function PageFaqs({ faqs }: { faqs: CmsPage["faqs"] }) {
  return (
    <section className="shell section-space">
      <h2 className="mb-8 text-center">Was wir oft gefragt werden</h2>
      <div className="mx-auto max-w-2xl space-y-3">
        {faqs.length ? (
          faqs.map((faq, i) => (
            <details
              key={i}
              className="rounded-lg border border-divider px-5 py-4"
            >
              <summary className="cursor-pointer font-semibold text-forest">
                {faq.question}
              </summary>
              <p className="pt-4">{faq.answer}</p>
            </details>
          ))
        ) : (
          <p className="text-center text-muted">
            Fragen und Antworten werden redaktionell ergänzt.
          </p>
        )}
      </div>
    </section>
  );
}
export function PageSponsors({
  images,
  title = "Wir werden gefördert durch:",
}: {
  images: CmsImage[];
  title?: string;
}) {
  if (!images.filter(Boolean).length)
    return (
      <section className="shell section-space text-center">
        <h2>Förderpartner</h2>
        <p className="mt-4 text-muted">
          Informationen zu Förderpartnern werden ergänzt.
        </p>
      </section>
    );
  return (
    <section className="shell section-space text-center">
      <h2>{title}</h2>
      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-8">
        {images.map(
          (image, i) =>
            image && (
              <Image
                key={i}
                src={imageUrl(image, 320)}
                alt={image.alt || ""}
                width={160}
                height={100}
                className="h-20 w-36 object-contain"
              />
            ),
        )}
      </div>
    </section>
  );
}
export function CrossLink({
  href,
  title,
  label,
}: {
  href: string;
  title: string;
  label: string;
}) {
  return (
    <section className="shell section-space text-center">
      <h2>{title}</h2>
      <Link className="button button-orange mt-6" href={href}>
        {label} →
      </Link>
    </section>
  );
}
export function ContactOptions({ settings }: { settings: CmsSettings | null }) {
  return (
    <section className="shell section-space">
      <h2 className="mb-10 text-center">Direkt Kontakt aufnehmen</h2>
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
        {[
          [
            "E-Mail",
            settings?.email,
            settings?.email ? `mailto:${settings.email}` : null,
          ],
          [
            "Telefon",
            settings?.phone,
            settings?.phone ? `tel:${settings.phone}` : null,
          ],
          ["Vor Ort", settings?.address, null],
        ].map(([label, value, href]) => (
          <div
            key={label}
            className="rounded-2xl border border-divider p-6 text-center"
          >
            <h3>{label}</h3>
            <p className="mt-4 break-words">
              {href ? (
                <a href={href} className="underline">
                  {value}
                </a>
              ) : (
                value || "Kontaktdaten werden ergänzt."
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
