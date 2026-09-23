const valid = record => record && Number.isSafeInteger(record.value) && record.value >= 0 && Number.isFinite(record.at) && record.at > 0;
export function createStarlightCache({ read, write, request, onChange, now = Date.now, ttl = 300000, retryDelay = 30000 }) {
  let cached;
  try { const stored = read(); if (valid(stored) && stored.at <= now()) cached = stored; } catch {}
  let inFlight, attemptedAt = -Infinity, revision = 0;
  function accept(value) {
    if (!Number.isSafeInteger(value) || value < 0) return;
    revision++;
    cached = { value, at: now() };
    try { write(cached); } catch {}
    onChange(cached);
  }
  function refresh() {
    onChange(cached);
    if (inFlight) return inFlight;
    if ((cached && now() - cached.at < ttl) || now() - attemptedAt < retryDelay) return Promise.resolve();
    attemptedAt = now();
    const startedRevision = revision;
    inFlight = Promise.resolve().then(request).then(value => {
      // A late GET must not overwrite a newer successful increment response.
      if (revision === startedRevision) accept(value);
    }).catch(() => { onChange(cached); }).finally(() => { inFlight = undefined; });
    return inFlight;
  }
  return { refresh, accept, snapshot: () => cached };
}
