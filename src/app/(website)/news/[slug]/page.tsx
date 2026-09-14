import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/wireframe-content";
import { PageBanner, PageIntro } from "@/components/sections/WireframeSections";
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  return {
    title: article?.title ?? "Beitrag nicht gefunden",
    description: article?.excerpt,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  return (
    <main id="main-content">
      <article>
        <div className="shell pt-10">
          <PageBanner image={article.image} alt={article.alt} compact />
        </div>
        <PageIntro
          title={article.title}
          text={article.excerpt}
          eyebrow={`${article.category} · Redaktioneller Entwurf`}
        />
        <div className="mx-auto max-w-4xl gap-12 px-6 pb-16 md:columns-2">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-6 text-base leading-8 text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
      <div className="shell pb-16 text-center">
        <Link href="/news" className="button button-outline">
          ← Alle News
        </Link>
      </div>
    </main>
  );
}
