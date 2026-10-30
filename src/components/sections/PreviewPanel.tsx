export function PreviewPanel({
  title,
  children,
  media,
}: {
  title: string;
  children: React.ReactNode;
  media?: React.ReactNode;
}) {
  return (
    <section className="border border-forest/20 overflow-hidden rounded-2xl bg-paper/40">
      {media}
      <div className="p-7">
      <h2 className="text-2xl font-medium">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-muted">{children}</div>
      </div>
    </section>
  );
}
