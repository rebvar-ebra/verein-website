import { NewsGrid } from "@/components/news/NewsGrid";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles } from "@/lib/cms/content";
import { RichText } from "@/components/cms/RichText";
import { PageBanner, PageIntro } from "@/components/sections/WireframeSections";
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === slug);
  return {
    title: article?.seo?.title || article?.title || "Beitrag nicht gefunden",
    description: article?.seo?.description || article?.excerpt,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getArticles();
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
          eyebrow={`${article.category}${article.isPreview ? " · Redaktioneller Entwurf" : ""}`}
        />
        <div className="mx-auto max-w-4xl gap-12 px-6 pb-16 md:columns-2">
          <RichText value={article.content} />
        </div>
      </article>
      <section className="shell section-space">
        <h2 className="mb-10 text-center">Weitere News</h2>
        <NewsGrid excludeSlug={article.slug} limit={3} />
      </section>
      <div className="shell pb-16 text-center">
        <Link href="/news" className="button button-outline">
          ← Alle News
        </Link>
      </div>
    </main>
  );
}
