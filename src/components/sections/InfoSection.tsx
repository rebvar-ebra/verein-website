import Link from "next/link";
export function InfoSection({ title, text }: { title: string; text: string }) {
  return (
    <main id="main-content" className="shell min-h-[55vh] py-20">
      <p className="eyebrow mb-5">Designvorschau</p>
      <h1 className="section-title">{title}</h1>
      <p className="mt-7 max-w-xl text-lg leading-8 text-muted">{text}</p>
      <Link className="button button-outline mt-10" href="/">
        Zurück zur Startseite
      </Link>
    </main>
  );
}
