import "server-only";
import type { ContactInput } from "./contact.schema";
import { sendContactEmail } from "./contact.email";

export async function sendConfiguredContactEmail(input: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    throw new Error("Contact email delivery is not configured");
  }

  await sendContactEmail(input, {
    apiKey,
    from,
    recipient: process.env.CONTACT_EMAIL || "info@neuertag-ev.de",
  });
}
