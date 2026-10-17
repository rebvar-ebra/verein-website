import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { CTASection } from "./CTASection";

afterEach(cleanup);

it("links the donation action to the configured donation page", () => {
  render(<CTASection />);

  expect(
    screen.getByRole("link", { name: "Über Spenden" }).getAttribute("href"),
  ).toBe("/spenden");
  expect(
    screen.queryByText(/Spendenfunktion ist noch nicht eingerichtet/),
  ).toBeNull();
});
