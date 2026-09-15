export function PreviewPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-forest/20 bg-paper/40 p-7">
      <h2 className="text-2xl font-medium">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-muted">{children}</div>
    </section>
  );
}
