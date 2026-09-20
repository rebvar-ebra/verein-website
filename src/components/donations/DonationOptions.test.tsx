import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { DonationOptions } from "./DonationOptions";
afterEach(cleanup);
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
