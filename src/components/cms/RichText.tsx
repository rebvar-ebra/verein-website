import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { type CmsBody, imageSchema, safeHref } from "@/lib/cms/content.schema";
import { imageUrl } from "@/lib/cms/sanity.image";
export function RichText({ value }: { value: CmsBody }) {
  return (
    <div className="editorial-copy">
      <PortableText
        value={value}
        components={{
          marks: {
            link: ({ value, children }) =>
              safeHref.safeParse(value?.href).success ? (
                <a className="underline" href={value.href}>
                  {children}
                </a>
              ) : (
                <>{children}</>
              ),
          },
          types: {
            imageWithCaption: ({ value }) => {
              const parsed = imageSchema.safeParse(value);
              if (!parsed.success || !parsed.data) return null;
              return (
                <figure>
                  <Image
                    src={imageUrl(parsed.data)}
                    alt={parsed.data.alt || ""}
                    width={1200}
                    height={800}
                    className="h-auto w-full rounded-2xl"
                  />
                  {parsed.data.caption && (
                    <figcaption>{parsed.data.caption}</figcaption>
                  )}
                </figure>
              );
            },
          },
        }}
      />
    </div>
  );
}
