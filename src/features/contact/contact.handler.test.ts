import { expect, test, vi } from "vitest";

test("a valid contact request is validated and handed to the email sender", async () => {
  const { handleContactRequest } = await import("./contact.handler");
  const send = vi.fn().mockResolvedValue(undefined);
  const request = new Request("https://example.test/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "192.0.2.1" },
    body: JSON.stringify({
      name: "  Test Person  ",
      email: "test@example.com",
      subject: "Allgemeine Frage",
      message: "Dies ist eine Testnachricht.",
      website: "",
    }),
  });

  const response = await handleContactRequest(request, {
    send,
    isRateLimited: () => false,
  });

  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ success: true });
  expect(send).toHaveBeenCalledWith({
    name: "Test Person",
    email: "test@example.com",
    subject: "Allgemeine Frage",
    message: "Dies ist eine Testnachricht.",
  });
});

test("a filled honeypot returns success without sending an email", async () => {
  const { handleContactRequest } = await import("./contact.handler");
  const send = vi.fn().mockResolvedValue(undefined);
  const request = new Request("https://example.test/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Test Person",
      email: "test@example.com",
      subject: "Allgemeine Frage",
      message: "Dies ist eine Testnachricht.",
      website: "spam.example",
    }),
  });

  const response = await handleContactRequest(request, {
    send,
    isRateLimited: () => false,
  });

  expect(response.status).toBe(200);
  expect(send).not.toHaveBeenCalled();
});

test("rate-limited requests are rejected before email delivery", async () => {
  const { handleContactRequest } = await import("./contact.handler");
  const send = vi.fn().mockResolvedValue(undefined);
  const request = new Request("https://example.test/api/contact", {
    method: "POST",
    body: JSON.stringify({
      name: "Test Person",
      email: "test@example.com",
      subject: "Allgemeine Frage",
      message: "Dies ist eine Testnachricht.",
      website: "",
    }),
  });

  const response = await handleContactRequest(request, {
    send,
    isRateLimited: () => true,
  });

  expect(response.status).toBe(429);
  expect(send).not.toHaveBeenCalled();
});

test("invalid contact data is rejected before email delivery", async () => {
  const { handleContactRequest } = await import("./contact.handler");
  const send = vi.fn().mockResolvedValue(undefined);
  const request = new Request("https://example.test/api/contact", {
    method: "POST",
    body: JSON.stringify({
      name: "X",
      email: "not-an-email",
      subject: "No",
      message: "Too short",
      website: "",
    }),
  });

  const response = await handleContactRequest(request, {
    send,
    isRateLimited: () => false,
  });

  expect(response.status).toBe(400);
  expect(send).not.toHaveBeenCalled();
});

test("line breaks in the subject are rejected before email delivery", async () => {
  const { handleContactRequest } = await import("./contact.handler");
  const send = vi.fn().mockResolvedValue(undefined);
  const request = new Request("https://example.test/api/contact", {
    method: "POST",
    body: JSON.stringify({
      name: "Test Person",
      email: "test@example.com",
      subject: "Frage\nBcc: attacker@example.com",
      message: "Dies ist eine Testnachricht.",
      website: "",
    }),
  });

  const response = await handleContactRequest(request, {
    send,
    isRateLimited: () => false,
  });

  expect(response.status).toBe(400);
  expect(send).not.toHaveBeenCalled();
});

test("the rate limiter allows five requests per address in ten minutes", async () => {
  const { createContactRateLimiter } = await import("./contact.rate-limit");
  const rateLimiter = createContactRateLimiter({
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  for (let request = 0; request < 5; request += 1) {
    expect(rateLimiter("192.0.2.1", 1_000)).toBe(false);
  }
  expect(rateLimiter("192.0.2.1", 1_000)).toBe(true);
  expect(rateLimiter("192.0.2.1", 601_001)).toBe(false);
});
