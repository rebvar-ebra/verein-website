type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

export function createContactRateLimiter(options: RateLimitOptions) {
  const requests = new Map<string, number[]>();

  return (key: string, now = Date.now()) => {
    const windowStart = now - options.windowMs;
    const recent = (requests.get(key) ?? []).filter(
      (timestamp) => timestamp > windowStart,
    );
    const limited = recent.length >= options.limit;
    if (!limited) recent.push(now);
    requests.set(key, recent);
    return limited;
  };
}
