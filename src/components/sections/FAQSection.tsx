import { faqs } from "@/lib/wireframe-content";
export function FAQSection() {
  return (
    <section className="shell section-space">
      <h2 className="mb-9 text-center text-3xl font-medium">
        Was wir oft gefragt werden
      </h2>
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group border border-forest/20 bg-white/40"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-sm font-medium">
              {faq.question}
              <span aria-hidden="true" className="text-xl group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="border-t border-forest/10 px-5 py-5 text-sm leading-7 text-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
