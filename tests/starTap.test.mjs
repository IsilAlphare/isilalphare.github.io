import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createDoubleTap } from '../src/lib/starTap.mjs';
test('touch activation requires two nearby taps and consumes the pair', () => {
  const tap=createDoubleTap();
  assert.equal(tap(100,20,20),false);
  assert.equal(tap(350,25,23),true);
  assert.equal(tap(500,20,20),false);
});
test('slow or distant taps do not activate', () => {
  const tap=createDoubleTap();
  assert.equal(tap(0,0,0),false);
  assert.equal(tap(600,0,0),false);
  assert.equal(tap(700,100,100),false);
});
test('dragging or cancelling clears the first tap', () => {
  const tap=createDoubleTap();
  tap(0,0,0);
  tap.reset();
  assert.equal(tap(100,0,0),false);
});
