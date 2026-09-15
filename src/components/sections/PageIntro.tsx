export function PageIntro({
  title,
  text,
  eyebrow,
}: {
  title: string;
  text: string;
  eyebrow?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-12 pt-14 text-center md:pb-16 md:pt-16">
      {eyebrow && <p className="eyebrow mb-4 text-olive">{eyebrow}</p>}
      <h1 className="section-title">{title}</h1>
      <p className="mt-6 text-base leading-7 text-ink">{text}</p>
    </div>
  );
}
