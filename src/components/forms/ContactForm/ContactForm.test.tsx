import { afterEach, expect, test, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { ContactForm } from "./ContactForm";
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
test("empty fields show associated errors and focus the first invalid field", () => {
  render(<ContactForm />);
  fireEvent.click(screen.getByRole("button", { name: "Nachricht senden" }));
  const name = screen.getByLabelText("Name");
  expect(name.getAttribute("aria-invalid")).toBe("true");
  expect(
    document.getElementById(name.getAttribute("aria-describedby")!)
      ?.textContent,
  ).toContain("Namen");
  expect(document.activeElement).toBe(name);
});
test("valid input is sent and the form confirms delivery", async () => {
  const fetchSpy = vi.fn().mockResolvedValue(
    new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    }),
  );
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
  fireEvent.click(screen.getByRole("button", { name: "Nachricht senden" }));
  await waitFor(() =>
    expect(screen.getByRole("status").textContent).toContain("gesendet"),
  );
  expect(fetchSpy).toHaveBeenCalledWith(
    "/api/contact",
    expect.objectContaining({ method: "POST" }),
  );
  expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("");
});
