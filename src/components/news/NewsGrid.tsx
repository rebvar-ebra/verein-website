import Link from "next/link";
import { NewsImage } from "./NewsImage";
import { getArticles } from "@/lib/cms/content";
export async function NewsGrid({
  excludeSlug,
  limit,
}: { excludeSlug?: string; limit?: number } = {}) {
  const articles = (await getArticles())
    .filter((article) => article.slug !== excludeSlug)
    .slice(0, limit);
  if (!articles.length)
    return (
      <p className="shell py-10">
        Noch keine veröffentlichten Inhalte vorhanden.
      </p>
    );
  return (
    <div className="grid items-start gap-6 md:grid-cols-3">
      {articles.map((article) => (
        <article
          key={article.slug}
          className="overflow-hidden rounded-2xl border border-forest/20 bg-white/50"
        >
          <NewsImage src={article.image} alt={article.alt} />
          <div className="p-6">
            <p className="eyebrow mb-3 text-olive">
              {article.category}
              {article.isPreview ? " · Entwurf" : ""}
            </p>
            <h2 className="text-xl font-medium">
              <Link
                href={`/news/${article.slug}`}
                className="underline decoration-forest/20 underline-offset-4 hover:decoration-forest"
              >
                {article.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {article.excerpt}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
