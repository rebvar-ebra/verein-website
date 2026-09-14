import Image from "next/image";
import { homepage } from "@/lib/preview-content";
import { Arrow } from "../ui/arrow";

export function ProjectSection() {
  return (
    <section id="projekte" className="shell section-space pt-0!">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow mb-4">Was uns bewegt</p>
          <h2 className="section-title">
            Aus Ideen wird{" "}
            <span className="font-serif italic">Miteinander.</span>
          </h2>
        </div>
        <span className="rounded-full border border-forest/20 px-3 py-1 text-xs text-muted">
          Projektideen · Entwurf
        </span>
      </div>
      <div className="grid gap-7 md:grid-cols-3">
        {homepage.projects.map((project, i) => (
          <article key={project.id} className="group">
            <div className="relative mb-5 aspect-[1.4] overflow-hidden rounded-2xl bg-sage">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 768px) 90vw, 30vw"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-cream px-3 py-1.5 text-xs">
                {project.category}
              </span>
            </div>
            <p className="mb-3 text-xs text-muted">0{i + 1} / Projektidee</p>
            <h3 className="mb-3 text-2xl font-medium tracking-tight">
              {project.title}
            </h3>
            <p className="mb-4 text-sm leading-6 text-muted">{project.text}</p>
            <details className="border-b border-forest/20 pb-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                Mehr zur Idee <Arrow diagonal />
              </summary>
              <p className="mt-4 text-sm leading-6 text-muted">
                {project.detail}
              </p>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
