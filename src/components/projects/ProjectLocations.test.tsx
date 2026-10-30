import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ProjectLocations } from "./ProjectLocations";

afterEach(cleanup);

it("opens each CMS location separately and preserves special characters in the map query", () => {
  render(<ProjectLocations address={"BENN Wartenberg\r\nSchweriner Ring 27\r\n13059 Berlin\r\n \r\nBeratung & Begegnung\nFalkenberger Chaussee 136\n13057 Berlin"} />);
  const links = screen.getAllByRole("link", { name: /In Google Maps öffnen/ });
  expect(links).toHaveLength(2);
  expect(new URL(links[0].getAttribute("href")!).searchParams.get("query")).toBe("BENN Wartenberg Schweriner Ring 27 13059 Berlin");
  expect(new URL(links[1].getAttribute("href")!).searchParams.get("query")).toBe("Beratung & Begegnung Falkenberger Chaussee 136 13057 Berlin");
  expect(links[0].getAttribute("target")).toBe("_blank");
  expect(links[0].textContent).toContain("neuer Tab");
});

it("does not create a map link for an empty address", () => {
  render(<ProjectLocations address={"  \n "} />);
  expect(screen.queryByRole("link")).toBeNull();
  expect(screen.getByText(/Die Adresse wird ergänzt/)).toBeTruthy();
});
