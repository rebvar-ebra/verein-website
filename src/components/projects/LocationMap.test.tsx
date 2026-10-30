import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { LocationMap } from "./LocationMap";
afterEach(cleanup);
it("does not contact Google until the visitor explicitly loads the map", () => {
  const { container } = render(<LocationMap address="Berlin, Musterstraße 1" />);
  expect(container.querySelector("iframe")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Google Maps laden" }));
  const frame = container.querySelector("iframe");
  expect(frame?.getAttribute("src")).toContain("https://www.google.com/maps?");
  expect(new URL(frame!.getAttribute("src")!).searchParams.get("q")).toBe("Berlin, Musterstraße 1");
  fireEvent.click(screen.getByRole("button", { name: "Karte schließen" }));
  expect(container.querySelector("iframe")).toBeNull();
});
it("does not offer an empty map", () => {
  render(<LocationMap address="  " />);
  expect(screen.queryByRole("button")).toBeNull();
});
