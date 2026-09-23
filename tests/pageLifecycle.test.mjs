import test from 'node:test';
import assert from 'node:assert/strict';
import { onPageLoad } from '../src/lib/pageLifecycle.ts';
test('navigation releases old resources and mounts each page once', () => {
  const previous = globalThis.document;
  const document = new EventTarget();
  globalThis.document = document;
  try {
    const signals = []; let cleanups = 0; let clicks = 0;
    onPageLoad(({signal, cleanup}) => {
      signals.push(signal);
      document.addEventListener('test-click', () => clicks++, {signal});
      cleanup(() => cleanups++);
    });
    document.dispatchEvent(new Event('astro:page-load'));
    document.dispatchEvent(new Event('test-click'));
    assert.equal(clicks, 1);
    document.dispatchEvent(new Event('astro:before-swap'));
    assert.equal(signals[0].aborted, true);
    assert.equal(cleanups, 1);
    document.dispatchEvent(new Event('test-click'));
    assert.equal(clicks, 1);
    document.dispatchEvent(new Event('astro:page-load'));
    document.dispatchEvent(new Event('test-click'));
    assert.equal(clicks, 2);
    assert.equal(signals.length, 2);
    document.dispatchEvent(new Event('astro:page-load'));
    assert.equal(cleanups, 1);
    assert.equal(signals[1].aborted, false);
  } finally { globalThis.document = previous; }
});

for (const readyState of ['loading', 'interactive', 'complete']) {
  test(`interaction starts before window load (${readyState}) and does not mount twice`, () => {
    const previous = globalThis.document;
    const document = new EventTarget();
    document.readyState = readyState;
    globalThis.document = document;
    try {
      let mounts = 0;
      onPageLoad(() => { mounts++; });
      if (readyState === 'loading') {
        assert.equal(mounts, 0);
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }
      assert.equal(mounts, 1);
      document.dispatchEvent(new Event('astro:page-load'));
      assert.equal(mounts, 1);
      document.dispatchEvent(new Event('astro:before-swap'));
      document.dispatchEvent(new Event('astro:after-swap'));
      assert.equal(mounts, 2);
      document.dispatchEvent(new Event('astro:page-load'));
      assert.equal(mounts, 2);
    } finally { globalThis.document = previous; }
  });
}
