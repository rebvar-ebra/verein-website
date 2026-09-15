import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/lib/cms/content";
export async function NewsGrid() {
  const articles = await getArticles();
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
          <div className="relative overflow-hidden rounded-2xl aspect-[1.8]">
            <Image
              src={article.image}
              alt={article.alt}
              fill
              sizes="(max-width:768px) 90vw, 30vw"
              className="object-cover"
            />
          </div>
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
