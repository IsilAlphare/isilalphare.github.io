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
    assert.equal(cleanups, 2);
    assert.equal(signals[1].aborted, true);
  } finally { globalThis.document = previous; }
});
