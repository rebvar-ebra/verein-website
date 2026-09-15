"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="shell section-space">
      <h1 className="text-3xl">Inhalte sind vorübergehend nicht verfügbar</h1>
      <p className="my-6">Bitte versuche es in einem Moment erneut.</p>
      <button className="button button-orange" onClick={reset}>
        Erneut versuchen
      </button>
    </main>
  );
}
