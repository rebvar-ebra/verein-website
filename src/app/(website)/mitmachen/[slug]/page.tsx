import Link from "next/link";
import {notFound} from "next/navigation";
import {getJobs} from "@/features/jobs/jobs";
import {RichText} from "@/components/cms/RichText";
import {siteUrl} from "@/lib/seo/site-url";
export const revalidate = 60;
export async function generateStaticParams() {
  return (await getJobs()).map(job => ({slug: job.slug}));
}
export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const job = (await getJobs()).find(job => job.slug === slug);
  if (!job) notFound();
  const title = job.seo?.title || job.title;
  const description = job.seo?.description || job.excerpt;
  return {title, description, alternates: {canonical: `${siteUrl()}/mitmachen/${encodeURIComponent(slug)}`}, openGraph: {title, description, type: "website"}};
}
export default async function JobPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const job = (await getJobs()).find(job => job.slug === slug);
  if (!job) notFound();
  return <main id="main-content" className="shell section-space">
    <article className="mx-auto max-w-3xl">
      <Link href="/mitmachen" className="underline underline-offset-4">← Alle Stellenangebote</Link>
      <div className="mb-6 mt-8 flex flex-wrap items-center gap-4 text-sm">
        <span className="rounded-full bg-paper px-4 py-2 font-semibold">{job.employmentType}</span>
        <span>Veröffentlicht am <time dateTime={job.publishedAt}>{new Date(job.publishedAt).toLocaleDateString("de-DE", {timeZone: "Europe/Berlin"})}</time></span>
        {job.location && <span>{job.location}</span>}
      </div>
      <h1>{job.title}</h1>
      <p className="mb-10 mt-6 text-lg text-muted">{job.excerpt}</p>
      <RichText value={job.content} />
    </article>
  </main>;
}
