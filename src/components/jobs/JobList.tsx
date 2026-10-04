import Link from "next/link";
import type {Job} from "@/features/jobs/jobs";
export function JobList({jobs}: {jobs: Job[]}) {
  return <section className="shell section-space" aria-labelledby="jobs-title">
    <h2 id="jobs-title" className="mb-8 text-center">Unsere offenen Stellen</h2>
    {jobs.length ? <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
      {jobs.map(job => <li key={job._id}>
        <Link href={`/mitmachen/${encodeURIComponent(job.slug)}`} className="flex h-full flex-col rounded-2xl border border-divider bg-white p-6 transition-colors hover:border-orange focus-visible:outline-2 focus-visible:outline-offset-4 sm:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="rounded-full bg-paper px-3 py-1 font-semibold">{job.employmentType}</span>
            <time dateTime={job.publishedAt} className="text-muted">{new Date(job.publishedAt).toLocaleDateString("de-DE", {timeZone: "Europe/Berlin"})}</time>
          </div>
          <h3>{job.title}</h3>
          {job.location && <p className="mt-2 text-sm text-muted">{job.location}</p>}
          <p className="my-5 text-muted">{job.excerpt}</p>
          <span className="mt-auto font-semibold underline underline-offset-4">Stelle ansehen <span aria-hidden="true">→</span></span>
        </Link>
      </li>)}
    </ul> : <p className="text-center text-muted">Aktuell sind keine Stellen veröffentlicht.</p>}
  </section>;
}
