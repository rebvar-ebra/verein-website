import React from "react";
import { afterEach, expect, test } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Header } from "./Header";
afterEach(cleanup);
test("mobile navigation opens and closes after selecting a destination", () => {
  render(<Header />);
  const toggle = screen.getByRole("button", { name: "Menü öffnen" });
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  fireEvent.click(toggle);
  expect(toggle.getAttribute("aria-expanded")).toBe("true");
  const link = screen.getAllByRole("link", { name: "Über uns" }).at(-1)!;
  link.addEventListener("click", (event) => event.preventDefault());
  fireEvent.click(link);
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
});
test("Escape closes mobile navigation and returns focus to its toggle", () => {
  render(<Header />);
  const toggle = screen.getByRole("button", { name: "Menü öffnen" });
  fireEvent.click(toggle);
  fireEvent.keyDown(screen.getAllByRole("link", { name: "Über uns" }).at(-1)!, {
    key: "Escape",
  });
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  expect(document.activeElement).toBe(toggle);
});
test("desktop project dropdown exposes routes and closes on Escape", () => {
  render(<Header />);
  const button = screen.getByRole("button", { name: "Projekte" });
  fireEvent.click(button);
  expect(button.getAttribute("aria-expanded")).toBe("true");
  const link = screen.getByRole("link", { name: "Alle Projekte" });
  expect(link.getAttribute("href")).toBe("/projekte");
  fireEvent.keyDown(link, { key: "Escape" });
  expect(button.getAttribute("aria-expanded")).toBe("false");
  expect(document.activeElement).toBe(button);
});
