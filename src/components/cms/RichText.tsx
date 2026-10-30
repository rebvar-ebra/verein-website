import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { type CmsBody, imageSchema, safeHref } from "@/lib/cms/content.schema";
import { imageUrl } from "@/lib/cms/sanity.image";
export function RichText({ value, layout = "default" }: { value: CmsBody; layout?: "default" | "section" }) {
  const textLength = value.reduce((total, block) => total + ("children" in block ? block.children.map((span) => span.text).join("").length : 0), 0);
  const layoutClass = layout === "section" ? (textLength > 900 ? "editorial-copy-columns" : "editorial-copy-centered") : "";
  // Turn plain email addresses into accessible links while preserving editorial marks.
  const linkedValue = value.map((block) => {
    if (!("children" in block)) return block;
    const markDefs = [...(block.markDefs || [])];
    const children = block.children.flatMap((span, index) => {
      if (span.marks?.some((mark) => markDefs.some((def) => def._key === mark && def._type === "link"))) return [span];
      return span.text.split(/([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi).filter(Boolean).map((text, part) => {
        const key = `email-${index}-${part}`;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
          markDefs.push({ _key: key, _type: "link", href: `mailto:${text}` });
          return { ...span, _key: key, text, marks: [...(span.marks || []), key] };
        }
        return { ...span, _key: key, text };
      });
    });
    return { ...block, markDefs, children };
  });
  return (
    <div className={`editorial-copy ${layoutClass}`}>
      <PortableText
        value={linkedValue}
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
