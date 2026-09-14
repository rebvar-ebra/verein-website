import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/wireframe-content";
export function ProjectGrid() {
  return (
    <div className="grid items-start gap-6 md:grid-cols-3">
      {projects.map((project) => (
        <article
          key={project.id}
          className="overflow-hidden rounded-2xl border border-forest/20 bg-white/50"
        >
          <Link
            href={`/projekte/${project.id}`}
            tabIndex={-1}
            aria-hidden="true"
            className="relative block overflow-hidden rounded-2xl aspect-[1.8]"
          >
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(max-width:768px) 90vw, 30vw"
              className="object-cover"
            />
          </Link>
          <div className="p-6 text-center">
            <p className="eyebrow mb-3 text-olive">{project.category}</p>
            <h3 className="text-xl font-medium">{project.title}</h3>
            <p className="mb-6 mt-3 text-sm leading-6 text-muted">
              {project.text}
            </p>
            <Link
              href={`/projekte/${project.id}`}
              className="button button-outline w-full"
              aria-label={`${project.title} – zum Projekt`}
            >
              Zum Projekt →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
