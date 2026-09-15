"use client";
import { useState } from "react";
type Details = {
  iban?: string | null;
  bic?: string | null;
  bank?: string | null;
  accountHolder?: string | null;
  paypalUrl?: string | null;
};
export function DonationOptions({ details }: { details: Details }) {
  const [amount, setAmount] = useState(20);
  return (
    <section aria-label="Spendenmöglichkeiten" className="space-y-10">
      <fieldset>
        <legend className="mb-5 text-xl font-semibold text-forest">
          Deinen Betrag wählen
        </legend>
        <div className="flex flex-wrap gap-3">
          {[10, 20, 50, 100].map((value) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                name="donation-amount"
                value={value}
                checked={amount === value}
                onChange={() => setAmount(value)}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-12 min-w-20 items-center justify-center rounded-full border-2 border-forest px-6 py-3 font-semibold text-forest peer-checked:bg-forest peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4">
                {value} €
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-divider bg-paper p-6 md:p-8">
          <h2>Per Banküberweisung</h2>
          <p className="my-5" aria-live="polite">
            Gewählter Betrag: <strong>{amount} €</strong>
          </p>
          <dl className="space-y-4">
            {[
              ["Kontoinhaber", details.accountHolder],
              ["IBAN", details.iban],
              ["BIC", details.bic],
              ["Bank", details.bank],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="break-words font-semibold">
                  {value || "Wird ergänzt"}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-muted">
            Bitte führe die Überweisung in deinem Onlinebanking aus. Die Auswahl
            hier löst keine Zahlung aus.
          </p>
        </section>
        <section className="rounded-2xl border border-divider bg-paper p-6 md:p-8">
          <h2>Per PayPal</h2>
          <p className="my-5">Unterstütze unsere Arbeit über PayPal.</p>
          {details.paypalUrl ? (
            <>
              <a
                className="button button-orange"
                href={details.paypalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Zu PayPal →
              </a>
              <p className="mt-4 text-sm text-muted">
                Gib bei PayPal deinen gewählten Betrag von {amount} € ein.
                PayPal öffnet sich in einem neuen Tab.
              </p>
            </>
          ) : (
            <p className="text-muted">Der PayPal-Spendenlink wird ergänzt.</p>
          )}
        </section>
      </div>
    </section>
  );
}
