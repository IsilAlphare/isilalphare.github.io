// A network timeout is ambiguous: the increment may already have reached Waline.
// Keep local feedback, record the outcome, and never automatically retry writes.
const attempted = new Set();
export function hasLocalStarlight(key, read) {
  return attempted.has(key) || read()?.lit === true;
}
export function lightStarlight({ key, read, write, send }) {
  if (hasLocalStarlight(key, read)) return false;
  attempted.add(key);
  write({ ...read(), lit: true, sync: 'pending' });
  void Promise.resolve().then(send).then(
    () => write({ ...read(), lit: true, sync: 'confirmed' }),
    () => write({ ...read(), lit: true, sync: 'unconfirmed' }),
  );
  return true;
}
