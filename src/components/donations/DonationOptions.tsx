"use client";
import { useState } from "react";
type Details = {
  iban?: string | null;
  bic?: string | null;
  bank?: string | null;
  accountHolder?: string | null;
  betterplaceUrl?: string | null;
  paypalUrl?: string | null;
};
export function DonationOptions({ details }: { details: Details }) {
  const [amount, setAmount] = useState(20);
  const provider = details.betterplaceUrl ? "Betterplace" : "PayPal";
  const paymentUrl = details.betterplaceUrl || details.paypalUrl;
  return (
    <section aria-label="Spendenmöglichkeiten" className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-start">
      <div className="overflow-hidden rounded-3xl border border-divider bg-white shadow-sm">
        <div className="bg-paper p-6 sm:p-8">
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest">Deine Unterstützung</p>
          <div className="relative isolate overflow-hidden rounded-2xl bg-orange p-6 text-white sm:p-8">
            <div aria-hidden="true" className="absolute -right-12 -top-20 -z-10 size-64 rounded-full border-[32px] border-white/15" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-12 -z-10 size-56 rounded-full border-[32px] border-white/15" />
            <div className="flex items-center justify-between gap-4">
              <span className="text-xl font-bold">Neuer Tag e.V.</span>
              <span aria-hidden="true" className="text-3xl">♡</span>
            </div>
            <p className="my-8 text-5xl font-bold tabular-nums" aria-live="polite">{amount} €</p>
            <p className="text-xl font-bold">Gemeinsam etwas bewegen.</p>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <fieldset>
            <legend className="mb-4 text-lg font-semibold">Deinen Betrag wählen</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[10, 20, 50, 100].map(value => (
                <label key={value} className="cursor-pointer">
                  <input type="radio" name="donation-amount" value={value} checked={amount === value}
                    onChange={() => setAmount(value)} className="peer sr-only" />
                  <span className="flex min-h-12 items-center justify-center rounded-xl border-2 border-divider px-3 py-3 font-semibold peer-checked:border-forest peer-checked:bg-forest peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4">
                    {value} €
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="my-6 flex items-center justify-between gap-4 border-y border-divider py-5">
            <span>Dein Spendenbetrag</span>
            <strong className="text-2xl tabular-nums">{amount} €</strong>
          </div>
          {paymentUrl ? (
            <>
              <a className="button button-orange w-full" href={paymentUrl} target="_blank" rel="noopener noreferrer">
                Zu {provider} <span aria-hidden="true">→</span>
              </a>
              <p className="mt-4 text-sm text-muted">
                Wähle deinen Betrag von {amount} € auf {provider} erneut aus. Dort legst du die Zahlungsart fest. Der Link öffnet einen neuen Tab.
              </p>
              {details.betterplaceUrl && <p className="mt-3 text-sm text-muted">Deine Online-Spende unterstützt das Projekt DALIA.</p>}
              <p className="mt-4 text-sm">Die Zahlung erfolgt beim Anbieter. Auf dieser Website werden keine Kartendaten abgefragt.</p>
            </>
          ) : (
            <p className="text-muted">Online-Spenden sind noch nicht eingerichtet. Du kannst uns per Banküberweisung unterstützen.</p>
          )}
        </div>
      </div>
      <section className="rounded-3xl border border-divider bg-white p-6 sm:p-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Direkt unterstützen</p>
        <h2>Per Banküberweisung</h2>
        <p className="my-5" aria-live="polite">Gewählter Betrag: <strong>{amount} €</strong></p>
        <dl className="divide-y divide-divider">
          {[
            ["Kontoinhaber", details.accountHolder],
            ["IBAN", details.iban],
            ["BIC", details.bic],
            ["Bank", details.bank],
          ].map(([label, value]) => (
            <div key={label} className="py-4">
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="mt-1 break-words font-semibold">{value || "Wird ergänzt"}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 rounded-2xl bg-paper p-4 text-sm text-muted">
          Bitte führe die Überweisung in deinem Onlinebanking aus. Die Auswahl hier löst keine Zahlung aus.
        </p>
      </section>
    </section>
  );
}
