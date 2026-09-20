import { RichText } from "@/components/cms/RichText";
import Image from "next/image";
import { imageUrl } from "@/lib/cms/sanity.image";
import type { CmsTeamMember } from "@/lib/cms/content.schema";
export function TeamSection({
  title = "Unser Team",
  count = 6,
  members,
}: {
  title?: string;
  count?: number;
  members?: CmsTeamMember[];
}) {
  if (members && !members.length) return null;
  return (
    <section className="shell section-space text-center">
      <h2 className="text-3xl font-medium">{title}</h2>
      {(!members || members.length === 0) && (
        <p className="mt-3 text-sm text-muted">
          Teamprofile werden nach Freigabe ergänzt.
        </p>
      )}
      {members && members.length > 0 ? (
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-12">
          {members.map((member) => (
            <div key={member._id} className="w-full sm:w-52">
              {member.image ? (
                <Image
                  src={imageUrl(member.image, 320)}
                  alt={member.image.alt || member.name}
                  width={160}
                  height={160}
                  className="mx-auto h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="mx-auto h-24 w-24 rounded-full bg-sage"
                />
              )}
              {member.image?.caption && <p className="mt-2 text-xs text-muted">{member.image.caption}</p>}
              <p className="mt-4 font-medium">{member.name}</p>
              <p className="mt-1 text-sm text-muted">{member.role}</p>
              {member.languages && <p className="mt-2 text-sm text-muted">{member.languages}</p>}
              {member.phone && <a className="mt-2 block text-sm underline" href={`tel:${member.phone.replace(/[^+0-9]/g, "")}`}>{member.phone}</a>}
              {member.bio.length > 0 && <details className="mt-3 text-left text-sm"><summary className="cursor-pointer text-center underline">Mehr über {member.name}</summary><div className="mt-3"><RichText value={member.bio} /></div></details>}
              {member.email && (
                <a
                  className="mt-3 inline-block text-sm underline"
                  href={`mailto:${member.email}`}
                >
                  E-Mail
                </a>
              )}
            </div>
          ))}
        </div>
      ) : members ? null : (
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3">
          {Array.from({ length: count }, (_, i) => (
            <div key={i}>
              <div
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sage/60"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-10 w-10 text-olive"
                >
                  <circle cx="12" cy="8" r="3" />
                  <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                </svg>
              </div>
              <p className="mt-4 font-medium">Profil {i + 1}</p>
              <p className="mt-1 text-xs text-muted">
                Name und Funktion folgen
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
