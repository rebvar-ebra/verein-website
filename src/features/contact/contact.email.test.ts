import { expect, test, vi } from "vitest";
import type { ContactInput } from "./contact.schema";

test("contact email is addressed to the organization and replies go to the sender", async () => {
  const { sendContactEmail } = await import("./contact.email");
  const request = vi.fn().mockResolvedValue(
    new Response(JSON.stringify({ id: "email-123" }), { status: 200 }),
  );
  const input: ContactInput = {
    name: "Test Person",
    email: "test@example.com",
    subject: "Allgemeine Frage",
    message: "Dies ist eine Testnachricht.",
  };

  await sendContactEmail(input, {
    apiKey: "re_test_key",
    recipient: "info@neuertag-ev.de",
    from: "Neuer Tag Website <website@example.test>",
    request,
  });

  const [, options] = request.mock.calls[0] as [string, RequestInit];
  expect(JSON.parse(String(options.body))).toEqual({
    from: "Neuer Tag Website <website@example.test>",
    to: ["info@neuertag-ev.de"],
    reply_to: "test@example.com",
    subject: "Neue Kontaktanfrage: Allgemeine Frage",
    text:
      "Name: Test Person\nE-Mail: test@example.com\nBetreff: Allgemeine Frage\n\nNachricht:\nDies ist eine Testnachricht.",
  });
});
