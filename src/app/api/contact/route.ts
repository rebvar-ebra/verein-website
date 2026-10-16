import { handleContactRequest } from "@/features/contact/contact.handler";
import { sendConfiguredContactEmail } from "@/features/contact/contact.email.server";
import { createContactRateLimiter } from "@/features/contact/contact.rate-limit";

const isRateLimited = createContactRateLimiter({
  limit: 5,
  windowMs: 10 * 60 * 1000,
});

export async function POST(request: Request) {
  return handleContactRequest(request, {
    send: sendConfiguredContactEmail,
    isRateLimited,
  });
}
