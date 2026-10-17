"use client";
import Image from "next/image";
import { useState } from "react";
import type { BetterplaceCampaign } from "@/features/donations/betterplace.server";
type Details = {
  iban?: string | null;
  bic?: string | null;
  bank?: string | null;
  accountHolder?: string | null;
  betterplaceUrl?: string | null;
  paypalUrl?: string | null;
};
function formatEuros(cents: number) {
  return `${new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 }).format(cents / 100)} €`;
}

export function DonationOptions({
  details,
  campaign,
}: {
  details: Details;
  campaign?: BetterplaceCampaign | null;
}) {
  const [amount, setAmount] = useState(20);
  const provider = details.betterplaceUrl ? "Betterplace" : "PayPal";
  const paymentUrl = campaign
    ? campaign.isDonationOpen
      ? campaign.donationUrl
      : null
    : details.betterplaceUrl || details.paypalUrl;
  const progress = campaign
    ? Math.min(100, Math.max(0, campaign.progressPercentage))
    : 0;

  return (
    <section aria-label="Spendenmöglichkeiten" className="mx-auto max-w-5xl">
      {campaign && (
        <article className="mb-8 overflow-hidden rounded-3xl border border-divider bg-white shadow-sm lg:grid lg:grid-cols-[1.05fr_1fr]">
          {campaign.imageUrl && (
            <div className="relative min-h-64 bg-paper lg:min-h-full">
              <Image
                src={campaign.imageUrl}
                alt={`Kampagnenbild: ${campaign.title}`}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6 sm:p-8">
            <p className="eyebrow mb-3">Aktuelle Betterplace-Kampagne</p>
            <h2 className="text-2xl font-semibold sm:text-3xl">{campaign.title}</h2>
            <p className="mt-4 leading-7 text-muted">{campaign.summary}</p>
            {campaign.city && <p className="mt-4 font-semibold">{campaign.city}</p>}
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
              <p><strong className="block text-lg text-ink">{campaign.donationsCount} Spenden</strong></p>
              <p><strong className="block text-lg text-ink">{formatEuros(campaign.donatedAmountInCents)} gesammelt</strong></p>
              <p className="col-span-2 sm:col-span-1"><strong className="block text-lg text-ink">{formatEuros(campaign.openAmountInCents)} fehlen</strong></p>
            </div>
            <div
              role="progressbar"
              aria-label="Finanzierungsfortschritt"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="mt-5 h-3 overflow-hidden rounded-full bg-paper"
            >
              <div className="h-full rounded-full bg-orange" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-sm text-muted">{progress} % des Kampagnenziels erreicht</p>
            {campaign.platformUrl && (
              <a className="mt-5 inline-flex font-semibold underline underline-offset-4" href={campaign.platformUrl} target="_blank" rel="noopener noreferrer">
                Kampagne auf Betterplace ansehen <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </article>
      )}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
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
                {campaign ? "Sicher auf Betterplace spenden" : `Zu ${provider}`} <span aria-hidden="true">↗</span>
              </a>
              <p className="mt-4 text-sm text-muted">
                Wähle deinen Betrag von {amount} € auf {provider} erneut aus. Dort legst du die Zahlungsart fest. Der Link öffnet einen neuen Tab.
              </p>
              {details.betterplaceUrl && !campaign && (
                <p className="mt-3 rounded-2xl bg-paper p-4 text-sm text-muted">
                  Kampagnendaten konnten gerade nicht geladen werden. Der sichere Spendenlink funktioniert weiterhin.
                </p>
              )}
              <p className="mt-4 text-sm">Die Zahlung erfolgt vollständig bei {provider}. Neuer Tag fragt auf dieser Website keine Karten- oder Zugangsdaten ab.</p>
            </>
          ) : campaign && !campaign.isDonationOpen ? (
            <p className="rounded-2xl bg-paper p-4 text-muted">
              Betterplace nimmt diese Kampagne derzeit keine Online-Spenden an. Bitte nutze die Banküberweisung oder versuche es später erneut.
            </p>
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
      </div>
    </section>
  );
}
