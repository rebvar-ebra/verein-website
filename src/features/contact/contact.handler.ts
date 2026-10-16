import { z } from "zod";
import {
  contactSchema,
  type ContactInput,
} from "./contact.schema";

const contactRequestSchema = contactSchema.extend({
  website: z.string().max(200).optional().default(""),
});

type ContactHandlerDependencies = {
  send: (input: ContactInput) => Promise<void>;
  isRateLimited: (key: string) => boolean;
};

function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function handleContactRequest(
  request: Request,
  dependencies: ContactHandlerDependencies,
) {
  const rawBody = await request.text();
  if (rawBody.length > 20_000) {
    return Response.json({ error: "Ungültige Anfrage." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const result = contactRequestSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: "Bitte prüfe deine Eingaben." }, { status: 400 });
  }

  if (result.data.website) {
    return Response.json({ success: true });
  }

  if (dependencies.isRateLimited(clientKey(request))) {
    return Response.json(
      { error: "Bitte warte, bevor du eine weitere Nachricht sendest." },
      { status: 429 },
    );
  }

  const { name, email, subject, message } = result.data;
  try {
    await dependencies.send({ name, email, subject, message });
    return Response.json({ success: true });
  } catch {
    const requestId = crypto.randomUUID();
    console.error(`contact email sending failed: ${requestId}`);
    return Response.json(
      { error: "Die Nachricht konnte nicht gesendet werden." },
      { status: 503 },
    );
  }
}
