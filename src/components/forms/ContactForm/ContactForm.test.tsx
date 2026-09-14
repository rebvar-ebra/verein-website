import { afterEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ContactForm } from "./ContactForm";
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
test("empty fields show associated errors and focus the first invalid field", () => {
  render(<ContactForm />);
  fireEvent.click(screen.getByRole("button", { name: "Eingaben prüfen" }));
  const name = screen.getByLabelText("Name");
  expect(name.getAttribute("aria-invalid")).toBe("true");
  expect(
    document.getElementById(name.getAttribute("aria-describedby")!)
      ?.textContent,
  ).toContain("Namen");
  expect(document.activeElement).toBe(name);
});
test("valid preview input is checked locally and never claims a message was sent", () => {
  const fetchSpy = vi.fn();
  vi.stubGlobal("fetch", fetchSpy);
  render(<ContactForm />);
  fireEvent.change(screen.getByLabelText("Name"), {
    target: { value: "Test Person" },
  });
  fireEvent.change(screen.getByLabelText("E-Mail"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Betreff"), {
    target: { value: "Allgemeine Frage" },
  });
  fireEvent.change(screen.getByLabelText("Nachricht"), {
    target: { value: "Dies ist eine Testnachricht." },
  });
  fireEvent.click(screen.getByRole("button", { name: "Eingaben prüfen" }));
  expect(screen.getByRole("status").textContent).toContain("nicht gesendet");
  expect(fetchSpy).not.toHaveBeenCalled();
  expect(
    (screen.getByLabelText("Nachricht") as HTMLTextAreaElement).value,
  ).toBe("Dies ist eine Testnachricht.");
  fireEvent.change(screen.getByLabelText("E-Mail"), {
    target: { value: "invalid" },
  });
  expect(screen.queryByRole("status")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Eingaben prüfen" }));
  expect(screen.getByLabelText("E-Mail").getAttribute("aria-invalid")).toBe(
    "true",
  );
});
