import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { DonationOptions } from "./DonationOptions";
import type { BetterplaceCampaign } from "@/features/donations/betterplace.server";
afterEach(cleanup);

const campaign: BetterplaceCampaign = {
  id: 147505,
  title: "Interkultureller Frauentreff DALIA",
  summary: "Beratung und Bildung für Frauen und Mädchen in Berlin.",
  city: "Berlin",
  imageUrl: "https://betterplace-assets.betterplace.org/dalia.jpg",
  donatedAmountInCents: 18500,
  openAmountInCents: 571500,
  donationsCount: 5,
  progressPercentage: 3,
  donationUrl: "https://www.betterplace.org/de/donate/platform/projects/147505",
  platformUrl: "https://www.betterplace.org/de/projects/147505-dalia",
  isDonationOpen: true,
};
it("updates the displayed transfer amount without initiating payment", () => {
  render(<DonationOptions details={{ iban: "DE74 4306 0967 1344 6001 00" }} />);
  fireEvent.click(screen.getByRole("radio", { name: "50 €" }));
  expect(screen.getByText("Gewählter Betrag:").textContent).toContain("50 €");
  expect(screen.queryByRole("link", { name: /PayPal/ })).toBeNull();
});
it("links only to the supplied PayPal destination", () => {
  render(
    <DonationOptions
      details={{ paypalUrl: "https://www.paypal.com/donate/example" }}
    />,
  );
  expect(
    screen.getByRole("link", { name: /Zu PayPal/ }).getAttribute("href"),
  ).toBe("https://www.paypal.com/donate/example");
});
it("opens the imported Betterplace campaign without inventing an amount parameter", () => {
  const url = "https://www.betterplace.org/de/donate/platform/projects/147505-ein-interkultureller-frauentreff-fuer-beratung-und-bildung";
  render(<DonationOptions details={{ betterplaceUrl: url }} />);
  fireEvent.click(screen.getByRole("radio", {name: "100 €"}));
  expect(screen.getByRole("link", {name: /Zu Betterplace/}).getAttribute("href")).toBe(url);
  expect(screen.getByText(/Wähle deinen Betrag von 100 €/)).toBeTruthy();
});

it("presents live Betterplace campaign details and its official checkout", () => {
  render(<DonationOptions details={{ betterplaceUrl: "https://www.betterplace.org/de/projects/147505-dalia" }} campaign={campaign} />);

  expect(screen.getByRole("heading", { name: campaign.title })).toBeTruthy();
  expect(screen.getByText(campaign.summary)).toBeTruthy();
  expect(screen.getByText("5 Spenden")).toBeTruthy();
  expect(screen.getByText("185 € gesammelt")).toBeTruthy();
  expect(screen.getByText("5.715 € fehlen")).toBeTruthy();
  expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("3");
  expect(
    screen.getByRole("link", { name: /Sicher auf Betterplace spenden/ }).getAttribute("href"),
  ).toBe(campaign.donationUrl);
});

it("keeps the configured Betterplace link when live campaign data is unavailable", () => {
  const fallbackUrl = "https://www.betterplace.org/de/donate/platform/projects/147505-dalia";
  render(<DonationOptions details={{ betterplaceUrl: fallbackUrl }} campaign={null} />);

  expect(
    screen.getByRole("link", { name: /Zu Betterplace/ }).getAttribute("href"),
  ).toBe(fallbackUrl);
  expect(screen.getByText(/Kampagnendaten konnten gerade nicht geladen werden/)).toBeTruthy();
});

it("does not offer online payment when Betterplace prohibits donations", () => {
  render(
    <DonationOptions
      details={{ betterplaceUrl: "https://www.betterplace.org/de/projects/147505-dalia" }}
      campaign={{ ...campaign, isDonationOpen: false }}
    />,
  );

  expect(screen.queryByRole("link", { name: /Betterplace spenden/ })).toBeNull();
  expect(screen.getByText(/nimmt diese Kampagne derzeit keine Online-Spenden an/)).toBeTruthy();
});

it("clamps campaign progress to an accessible percentage", () => {
  render(<DonationOptions details={{}} campaign={{ ...campaign, progressPercentage: 140 }} />);

  expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("100");
});
