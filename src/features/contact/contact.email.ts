import type { ContactInput } from "./contact.schema";

type ContactEmailConfig = {
  apiKey: string;
  recipient: string;
  from: string;
  request?: typeof fetch;
};

export async function sendContactEmail(
  input: ContactInput,
  config: ContactEmailConfig,
) {
  const request = config.request ?? fetch;
  const response = await request("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.recipient],
      reply_to: input.email,
      subject: `Neue Kontaktanfrage: ${input.subject}`,
      text: [
        `Name: ${input.name}`,
        `E-Mail: ${input.email}`,
        `Betreff: ${input.subject}`,
        "",
        "Nachricht:",
        input.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error(`Email provider returned ${response.status}`);
  }
}
